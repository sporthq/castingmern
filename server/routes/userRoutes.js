import express from 'express';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { protectRoute, admin } from '../middleware/authMiddleware.js';
import UserEnrolledCasing from '../models/UserEnrolledCasing.js';
import crypto from 'crypto';
import Token from '../models/Token.js';
import sendEmail from '../utils/sendEmail.js';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log(process.env.CLOUDINARY_NAME,process.env.CLOUDINARY_API_KEY,process.env.CLOUDINARY_API_SECRET );

import upload from '../utils/fileUpload.js';
const userRoutes = express.Router();

// TODO: redefine expiresIn
const genToken = (id) => {
	return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: '1d' });
};

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	console.log(user);
	if (!user) {
		return res.status(401).json({ message: 'Nie ma takiego użytkownika.' });
	}

	if (user && (await user.matchPasswords(password))) {
		let verificationToken = await Token.findOne({ userId: user._id });

		if (verificationToken && verificationToken.expiresAt < Date.now()) {
			// Usunięcie wygasłego tokenu z bazy danych
			await Token.deleteOne({ token: verificationToken.token });

			// Sprawdzenie, czy usunięto token
			verificationToken = await Token.findOne({ userId: user._id });
			if (!verificationToken) {
				// Usunięcie użytkownika
				await User.deleteOne({ _id: user._id });

				return res.status(400).json({
					message: 'Twój token wygasł. Załóż nowe konto.',
					createNewAccount: true,
				});
			}
		}

		if (!user.isVerified) {
			return res.status(401).json({ message: 'Konto nie zostało zweryfikowane. Sprawdź e-mail aby dokończyć rejestrację!' });
		}

		res.json({
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			isAdmin: user.isAdmin,
			token: genToken(user._id),
			createdAt: user.createdAt,
			image: user.image,
			phoneNumber: user.phoneNumber,
		});
	} else {
		return res.status(401).json({ message: 'Nieprawidłowy email lub hasło.' });
	}
});

const registerUser = asyncHandler(async (req, res) => {
	const { firstName, lastName, email, password, phoneNumber } = req.body;

	const userExist = await User.findOne({ email });

	if (userExist) {
		const tokenExist = await Token.findOne({ userId: userExist._id });
		console.log(tokenExist);
	}

	if (userExist?.isVerified === false) {
		res.status(400).json({ message: 'Sprawdź swój e-mail i potwierdź swoje konto ' });
	}
	if (userExist) {
		res.status(400).json({ message: 'Podany email już istnieje w naszej bazie danych.' });
	}

	// handle upload image

	let fileData = {};
	if (!req.file) {
		return res.status(400).json({ message: 'Dodaj zdjęcie! ' });
	}
	if (req.file) {
		// save image to cloudinary
		let uploadedFile;

		
		try {
			uploadedFile = await cloudinary.uploader.upload(req.file.path, {
				folder: 'Casting user images',
				resource_type: 'image',
			});
		} catch (error) {
			res.status(500).json({ message: 'Zdjęcie nie zostało dodane' });
		}
		
		fileData = {
			fileName: req.file.originalname,
			filePath: uploadedFile.secure_url,
			fileType: req.file.mimetype,
			fileSize: req.file.size,
		};
	}

	const user = await User.create({
		firstName,
		lastName,
		email,
		password,
		image: fileData,
		createdAt: new Date(),
		phoneNumber,
	});

	const confirmToken = crypto.randomBytes(32).toString('hex') + user._id;

	const token = new Token({
		userId: user._id,
		token: confirmToken,
		createdAt: Date.now(),
		expiresAt: Date.now() + 24 * 60 * 60 * 1000, // dodajemy 24 godziny do aktualnego czasu
	});

	try {
		await token.save();

		// Construct verification URL
		const verificationUrl = `${process.env.FRONTEND_URL}/verify/${token.token}`;

		// Construct verification email
		const emailSubject = 'Potwierdzenie rejestracji';
		const emailMessage = `
		  <h2>Cześć ${user.firstName}</h2>
		  <p>Dziękujemy za rejestrację. Kliknij poniższy link, aby potwierdzić swoje konto:</p>
		  <a href="${verificationUrl}">${verificationUrl}</a>
		  <p>Link jest ważny przez 24h od daty</p>
		`;

		// Send verification email
		await sendEmail(email, emailSubject, emailMessage, user.email, process.env.EMAIL_USER);

		res.status(201).json({
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			isAdmin: user.isAdmin,
			token: genToken(user._id),
			image: user.image,
			phoneNumber: user.phoneNumber,
			isVerified: user.isVerified,
		});
	} catch (error) {
		res.status(500).json({ message: 'Błąd podczas tworzenia użytkownika' });
	}

	
});

const verifyUser = asyncHandler(async (req, res) => {
	// Pobranie tokenu weryfikacyjnego z parametru URL
	let verificationToken = await Token.findOne({ token: req.params.token });
  
	if (!verificationToken) {
	  return res.status(400).json({ message: 'Twój token wygasł.' });
	}
  
	if (verificationToken.expiresAt < Date.now()) {
	  console.log('Token wygasł');
	  // Usunięcie wygasłego tokenu z bazy danych
	  await Token.deleteOne({ token: verificationToken.token });
  
	  // Znalezienie użytkownika powiązanego z wygasłym tokenem
	  const user = await User.findById(verificationToken.userId);
  
	  // Sprawdzenie, czy użytkownik istnieje
	  if (!user) {
		return res.status(404).json({ message: 'Użytkownik nie znaleziony.' });
	  }
  
	  // Usunięcie użytkownika
	  await User.deleteOne({ _id: user._id });
  
	  return res.status(400).json({
		message: 'Twój token wygasł. Załóż nowe konto.',
		createNewAccount: true,
	  });
	}
  
	// Znalezienie użytkownika na podstawie tokenu weryfikacyjnego
	const user = await User.findById(verificationToken.userId);
  
	if (!user) {
	  return res.status(404).json({ message: 'Użytkownik nie znaleziony.' });
	}
  
	// Sprawdzenie, czy użytkownik jest już zweryfikowany
	if (user.isVerified) {
	  return res.status(400).json({ message: 'Konto jest już zweryfikowane.' });
	}
  
	// Uaktualnienie statusu weryfikacji użytkownika
	user.isVerified = true;
	await user.save();
  
	// Usunięcie tokenu weryfikacyjnego z bazy danych
	await Token.deleteOne({ token: req.params.token });
  
	res.status(200).json({ message: 'Twoje konto zostało zweryfikowane pomyślnie.' });
  });
  
  const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        user.phoneNumber = req.body.phoneNumber || user.phoneNumber;

        if (req.body.password) {
            user.password = req.body.password;
        }

		
        if (req.file) {
            // Usuń stare zdjęcie z Cloudinary
            if (user.image && user.image.filePath) {
                try {
                    await cloudinary.uploader.destroy(user.image.publicId);
					console.log('zdjecie usuniete')
                } catch (error) {
                    console.error('Błąd usuwania starego zdjęcia z Cloudinary:', error);
                }
            }

            // Zapisz nowe zdjęcie w Cloudinary
            let uploadedFile;
            try {
                uploadedFile = await cloudinary.uploader.upload(req.file.path, {
                    folder: 'Casting user images',
                    resource_type: 'image',
                });
            } catch (error) {
                console.error('Błąd dodawania nowego zdjęcia do Cloudinary:', error);
                return res.status(500).json({ message: 'Zdjęcie nie zostało dodane' });
            }

            // Zaktualizuj dane zdjęcia użytkownika
            user.image = {
                fileName: req.file.originalname,
                filePath: uploadedFile.secure_url,
                fileType: req.file.mimetype,
                fileSize: req.file.size,
                publicId: uploadedFile.public_id, // Dodaj publicId do danych zdjęcia
            };
        }

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            phoneNumber: updatedUser.phoneNumber,
            image: updatedUser.image,
            token: genToken(updatedUser._id),
            isAdmin: updatedUser.isAdmin,
            createdAt: updatedUser.createdAt,
        });
    } else {
        res.status(404);
        throw new Error('Użytkownik nie znaleziony');
    }
});



const getUserCastings = asyncHandler(async (req, res) => {
	const userCastings = await UserEnrolledCasing.find({
		user: req.params.id,
	});

	if (userCastings) {
		res.json(userCastings);
	} else {
		res.status(404);
		throw new Error('Nie znaleźiono castingów');
	}
});

const forgotPassword = asyncHandler(async (req, res) => {
	console.log(req.body);
	const { email } = req.body;
	const user = await User.findOne({ email });

	if (!user) {
		return res.status(404).json({ message: 'Użytkownik nie istnieje' });
		// throw new Error('Użytkownik nie istnieje')
	}

	// delete token if it exists in DB

	let token = await Token.findOne({ userId: user._id });
	if (token) {
		await token.deleteOne();
	}

	let resetToken = crypto.randomBytes(32).toString('hex') + user._id;

	// hash token before saving to DB

	const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

	// save token to DB

	await new Token({
		userId: user._id,
		token: hashedToken,
		createdAt: Date.now(),
		expiresAt: Date.now() + 30 * 60 * 1000,
	}).save();

	// constuct reset URL
	const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

	// reset email
	const msg = `
		<h2>Cześć ${user.firstName}</h2>
		<p>Aby zresetować hasło kliknij w link poniżej</p>
		<p>Link jest ważny przez 30minut</p>
		<a href=${resetUrl} clicktracking=off>${resetUrl}</a>
	`;

	const thead = 'Zresetuj swoje hasło';
	const send_to = user.email;
	const send_from = process.env.EMAIL_USER;

	try {
		await sendEmail(email, thead, msg, send_to, send_from);

		res.status(200).json({ success: true, message: 'Email z resetem hasła został wysłany' });
	} catch (error) {
		res.status(500);
		throw new Error('Email nie wysłany, spróbuj ponownie');
	}
});

const resetPassword = asyncHandler(async (req, res) => {
	const { password } = req.body;
	const { resetToken } = req.params;

	const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

	// find token in DB

	const userToken = await Token.findOne({
		token: hashedToken,
		expiresAt: {
			$gt: Date.now(),
		},
	});

	if (!userToken) {
		return res.status(404).json({ message: 'Twój link wygasł!' });
	}

	// find user

	const user = await User.findOne({ _id: userToken.userId });

	user.password = password;

	await user.save();

	res.status(200).json({ success: true, message: 'Hasło zostało zmienione' });
});

const getUsers = asyncHandler(async (req, res) => {
	const users = await User.find({});
	res.json(users);
});

const deleteUser = asyncHandler(async (req, res) => {
	try {
		const user = await User.findByIdAndRemove(req.params.id);
		res.json(user);
	} catch (error) {
		res.status(404).json({ message: 'Użytkownik nie istnieje' });
	}
});

userRoutes.route('/login').post(loginUser);
userRoutes.route('/register').post(upload.single('image'), registerUser);
userRoutes.route('/profile/:id').put(upload.single('image'), updateUserProfile);
userRoutes.route('/:id').get(protectRoute, getUserCastings);
userRoutes.route('/forgotpassword').post(forgotPassword);
userRoutes.route('/resetpassword/:resetToken').put(resetPassword);
userRoutes.route('/').get(protectRoute, admin, getUsers);
userRoutes.route('/:id').delete(protectRoute, admin, deleteUser);
userRoutes.get('/verify/:token', verifyUser);
export default userRoutes;
