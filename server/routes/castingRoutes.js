import express from 'express';
import Casting from '../models/Casting.js';
import asyncHandler from 'express-async-handler';
import {protectRoute, admin} from '../middleware/authMiddleware.js'
import upload from '../utils/fileUpload.js';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import CastingEnrollment from '../models/UserEnrolledCasing.js';
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
	const casting = await Casting.findById(req.params.id);
	console.log(casting);

	if (casting) {
		res.json(casting);
	} else {
		res.status(404);
		throw new Error('Nie ma takiego castingu');
	}
};

// create casting

const createNewCasting = asyncHandler(async (req, res) => {
	console.log(req.body);

	const { movieName, image, town, description, isNewCasting,isCastingEdited } = req.body;

	
	if(!movieName){
		 return  res.status(401).json({message:'Nazwa filmu jest wymagana'})
	}
	if(!town){
		 return  res.status(401).json({message:'Musisz podać miasto!'})
	}
	if(!description){
		 return  res.status(401).json({message:'Musisz podać opis!'})
	}
	

	let fileData = {};
	if (!req.file) {
		return res.status(400).json({ message: 'Dodaj zdjęcie! ' });
	}

	if (req.file) {
		
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
		console.log(uploadedFile);
		fileData = {
			fileName: req.file.originalname,
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
		isCastingEdited
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
		res.json(casting);
	} else {
		return res.status(404).json({ message: 'Casting nie znaleźiony.' });
	}
});

// update casting

const updateCasting = asyncHandler(async (req, res) => {
	const { movieName, image, town, description, isNewCasting, id } = req.body;
	
	

	const casting = await Casting.findById(id);
	
	let fileData = {};
	

	if (req.file) {
		
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
		
		fileData = {
			fileName: req.file.originalname,
			filePath: uploadedFile.secure_url,
			fileType: req.file.mimetype,
			fileSize: req.file.size,
		};
	}

	if (casting) {
		const isTownChanged = casting.town !== town; // Sprawdź, czy zmieniło się 'town'
		const isMovieNameChanged = casting.movieName !== movieName; // Sprawdź, czy zmieniło się 'movieName'
		casting.movieName = movieName;
		casting.town = town;
		casting.description = description;
		// casting.image = fileData
		if (req.file && req.file.filename) {
			casting.image = fileData;
		  } else {
			casting.image = casting.image ||  {}; // Przypisanie pustego obiektu, gdy casting.image jest niezdefiniowane
		  }
		  
		casting.isNewCasting = isNewCasting;
		
		

		const updatedCasting = await casting.save()

		if (isTownChanged || isMovieNameChanged) { // Jeśli 'town' lub 'movieName' się zmieniły
			await CastingEnrollment.updateMany({ casting: casting._id }, { isEdited: true });
		  }
		res.json(updatedCasting)
	}else {
		return res.status(404).json({message: "Nie ma takiego castingu"})
	}


});



castingRoutes.route('/').get(getCastings);
castingRoutes.route('/:id').get(getCasting);

castingRoutes.route('/').put(upload.single('image'),protectRoute,admin, updateCasting)
castingRoutes.route('/:id').delete(protectRoute,admin,deleteCasting)
castingRoutes.route('/').post(upload.single('image'),protectRoute,admin,createNewCasting)
export default castingRoutes;
