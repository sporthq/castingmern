import express from 'express';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import protectRoute from '../middleware/authMiddleware.js';
import UserEnrolledCasing from '../models/UserEnrolledCasing.js';

const userRoutes = express.Router();

// TODO: redefine expiresIn

const genToken = (id) => {
	return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: '60d' });
};

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (user && (await user.matchPasswords(password))) {
		res.json({
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			isAdmin: user.isAdmin,
			token: genToken(user._id),
			createdAt: user.createdAt,
		});
	} else {
		res.status(401);
		throw new Error('Nie prawidłowy email lub hasło');
	}
});

const registerUser = asyncHandler(async (req, res) => {
	const { firstName, lastName, email, password } = req.body;

	const userExist = await User.findOne({ email });
	if (userExist) {
		res.status(400);
		throw new Error('Podany email już istnieje w naszej bazie danych.');
	}

	const user = await User.create({
		firstName,
		lastName,
		email,
		password,
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			isAdmin: user.isAdmin,
			token: genToken(user._id),
		});
	} else {
		res.json(400);
		throw new Error('Nieprawidłowe dane użytkownika');
	}
});

const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);
	if (user) {
		user.firstName = req.body.firstName || user.firstName;
		user.lastName = req.body.lastName || user.lastName;
		user.email = req.body.email || user.email;
		if (req.body.password) {
			user.password = req.body.password;
		}
		const updatedUser = await user.save();
		res.json({
			_id: updatedUser._id,
			firstName: updatedUser.firstName,
			lastName: updatedUser.lastName,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			createdAt: updatedUser.createdAt,
		});
	} else {
		res.status(404);
		throw new Error('Użytkownik nie znaleźiony');
	}
});

const getUserCastings = asyncHandler(async (req, res) => {
	const userCastings = await UserEnrolledCasing.find({
		user: req.params.id,
	});

	if (userCastings) {
		res.json(userCastings);
	}else {
		res.status(404)
		throw new Error('Nie znaleźiono castingów')
	}
});

userRoutes.route('/login').post(loginUser);
userRoutes.route('/register').post(registerUser);
userRoutes.route('/profile/:id').put(protectRoute, updateUserProfile);
userRoutes.route('/:id').get(protectRoute, getUserCastings)

export default userRoutes;
