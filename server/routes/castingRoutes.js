import express from 'express';
import Casting from '../models/Casting.js';
import asyncHandler from 'express-async-handler';
import { protectRoute, admin } from '../middleware/authMiddleware.js';
import upload from '../utils/fileUpload.js';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import CastingEnrollment from '../models/UserEnrolledCasing.js';
import UserEnrolledCasting from '../models/UserEnrolledCasing.js';
import multer from 'multer';

dotenv.config();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});
const castingRoutes = express.Router();

const getCastings = async (req, res) => {
	const castings = await Casting.find({}); // all castings find
	res.json(castings);
};

const getCasting = async (req, res) => {
	try {
	  const casting = await Casting.findById(req.params.id);
  
	  if (casting) {
		res.json(casting);
	  } else {
		res.status(400).json({ message: 'Nie ma takiego castingu!' });
	  }
	} catch (error) {
		return  res.status(400).json({ message: 'Nie ma takiego castingu!' });
		
	}
  };

// create casting

const createNewCasting = asyncHandler(async (req, res) => {
	console.log(req.body);

	const { movieName, image, town, description, isNewCasting, isCastingEdited } = req.body;

	if (!movieName) {
		return res.status(401).json({ message: 'Nazwa filmu jest wymagana' });
	}
	if (!town) {
		return res.status(401).json({ message: 'Musisz podać miasto!' });
	}
	if (!description) {
		return res.status(401).json({ message: 'Musisz podać opis!' });
	}

	let fileData = {};
	if (!req.file) {
		return res.status(400).json({ message: 'Musisz dodać zdjęcie w odpowiednim formacie! ' });
	}

	if (req.file) {
		// save image to cloudinary
		let uploadedFile;

		try {
			uploadedFile = await cloudinary.uploader.upload(req.file.path, {
				folder: 'Casting movie images',
				resource_type: 'image',
			});
		} catch (error) {
			res.status(500).json({ message: 'Zdjęcie nie zostało dodane' });
		}
		console.log(uploadedFile);
		fileData = {
			fileName: req.file.originalname,
			publicId: uploadedFile.public_id,
			filePath: uploadedFile.secure_url,
			fileType: req.file.mimetype,
			fileSize: req.file.size,
		};
	}

	const newCasting = await Casting.create({
		movieName,
		image: fileData,
		town,
		description,
		isNewCasting,
		isCastingEdited,
	});

	await newCasting.save();

	const castings = await Casting.find({});

	if (newCasting) {
		res.json(castings);
	} else {
		return res.status(404).json({ message: 'Casting nie został dodany.' });
	}
});

// delete casting

const deleteCasting = asyncHandler(async (req, res) => {
	const casting = await Casting.findByIdAndDelete(req.params.id);

	if (casting) {
		await UserEnrolledCasting.deleteMany({ casting: casting._id });

		res.json({ message: 'Casting i związane zapisy zostały usunięte.' });
	} else {
		return res.status(404).json({ message: 'Casting nie znaleźiony.' });
	}
});

// update casting

const updateCasting = asyncHandler(async (req, res) => {
	try {
		await new Promise((resolve, reject) => {
			upload.single('image')(req, res, function (err) {
				if (err instanceof multer.MulterError) {
					// Obsługa błędu multer dotyczącego limitu rozmiaru pliku
					if (err.code === 'LIMIT_FILE_SIZE') {
						reject(new Error('Maxymalny rozmiar zdjęcia to: 10MB'));
					} else {
						reject(err);
					}
				} else if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
	const { movieName, image, town, description, isNewCasting, id } = req.body;
	const casting = await Casting.findById(id);
	let fileData = {};

	if (req.file) {
		console.log(req.file.mimetype);

		if (req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/jpg' && req.file.mimetype !== 'image/jpeg') {
			return res.status(400).json({ message: 'Nieprawidłowy format pliku. Akceptowane formaty to: PNG, JPG, JPEG.' });
		}

		if (casting.image && casting.image.filePath) {
			try {
				await cloudinary.uploader.destroy(casting.image.publicId);
				console.log('udało się usunać');
			} catch (error) {
				console.error('Błąd usuwania starego zdjęcia z Cloudinary:', error);
			}
		}
		// save image to cloudinary
		let uploadedFile;

		try {
			console.log(`req FILE.PATH ${req.file.path}`);
			uploadedFile = await cloudinary.uploader.upload(req.file.path, {
				folder: 'Casting movie images',
				resource_type: 'image',
			});
		} catch (error) {
			res.status(500).json({ message: 'Zdjęcie nie zostało dodane' });
		}

		casting.image = {
			fileName: req.file.originalname,
			filePath: uploadedFile.secure_url,
			fileType: req.file.mimetype,
			fileSize: req.file.size,
			publicId: uploadedFile.public_id,
		};
	}

	if (casting) {
		const isTownChanged = casting.town !== town; // Sprawdź, czy zmieniło się 'town'
		const isMovieNameChanged = casting.movieName !== movieName; // Sprawdź, czy zmieniło się 'movieName'
		casting.movieName = movieName;
		casting.town = town;
		casting.description = description;

		casting.isNewCasting = isNewCasting;

		const updatedCasting = await casting.save();

		if (isTownChanged || isMovieNameChanged) {
			// Jeśli 'town' lub 'movieName' się zmieniły
			await CastingEnrollment.updateMany({ casting: casting._id }, { isEdited: true });
		}
		res.json(updatedCasting);
	} else {
		return res.status(404).json({ message: 'Nie ma takiego castingu' });
	}
});

castingRoutes.route('/').get(getCastings);
castingRoutes.route('/:id').get(getCasting);

castingRoutes.route('/').put(protectRoute, admin, updateCasting);
// castingRoutes.route('/').put(protectRoute, admin, updateCasting);
castingRoutes.route('/:id').delete(protectRoute, admin, deleteCasting);
castingRoutes.route('/').post(upload.single('image'), protectRoute, admin, createNewCasting);

export default castingRoutes;
