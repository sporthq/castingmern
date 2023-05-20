import express from 'express';
import asyncHandler from 'express-async-handler';
import UserEnrolledCasting from '../models/UserEnrolledCasing.js';

import User from '../models/User.js';

import Casting from '../models/Casting.js';
import protectRoute from '../middleware/authMiddleware.js';

const enrolledRoutes = express.Router();

const enrollOnCasting = asyncHandler(async (req, res) => {
	const { firstName, lastName, email } = req.body;
	const casting = await Casting.findById(req.params.id);
	let user = null;
	if (req.user) {
		user = await User.findById(req.user._id);
	}

	if (!firstName || !lastName || !email) {
		if (!req.user) {
			res.status(400);
			throw new Error('Uzupełnij wymagane pola!');
		}
	}

	if (casting) {
		let userEnrolledCasting;

		if (req.user) {
			// Sprawdź, czy użytkownik już istnieje dla danego castingu
			const existingEnrollment = await UserEnrolledCasting.findOne({
				casting,
				user,
			});

			// Jeśli użytkownik już istnieje, zwróć odpowiednią odpowiedź lub obsłuż to zdarzenie
			if (existingEnrollment) {
				return res.status(409).json({ message: 'Jesteś juz zapisany na ten casting!' });
			}
			// Rejestracja dla zalogowanych użytkowników
			userEnrolledCasting = new UserEnrolledCasting({
				casting: casting._id,
				user: req.user._id,
				firstName: req.user.firstName,
				lastName: req.user.lastName,
				email: req.user.email,
				movieName: casting.movieName,
				image: casting.image,
				town: casting.town,
			});
		} else {
			const existingEnrollment = await UserEnrolledCasting.findOne({
				email,
			});

			// Jeśli użytkownik już istnieje, zwróć odpowiednią odpowiedź lub obsłuż to zdarzenie
			if (existingEnrollment) {
				return res.status(409).json({ message: 'Jesteś juz zapisany na ten casting!' });
			}
			// Rejestracja dla niezalogowanych użytkowników
			userEnrolledCasting = new UserEnrolledCasting({
				casting: casting._id,
				firstName,
				lastName,
				email,
				movieName: casting.movieName,
				image: casting.image,
				town: casting.town,
			});
		}

		await userEnrolledCasting.save();

		res.json({
			casting: userEnrolledCasting.casting._id,
			user: userEnrolledCasting.user,
			firstName: userEnrolledCasting.firstName,
			lastName: userEnrolledCasting.lastName,
			email: userEnrolledCasting.email,
			movieName: userEnrolledCasting.movieName,
			image: userEnrolledCasting.image,
			town: userEnrolledCasting.town,
		});
	} else {
		res.status(404).json({ message: 'Nie ma takiego castingu' });
	}
});

// delete enroll to casting

const deleteEnroll = asyncHandler(async (req, res) => {
	const enroll = await UserEnrolledCasting.findByIdAndDelete(req.params.id);

	if (enroll) {
		res.json(enroll);
	} else {
		res.status(404);
		throw new Error('Casting nie istnieje');
	}
});

enrolledRoutes.route('/enroll/:id').post(protectRoute, enrollOnCasting);
enrolledRoutes.route('/enroll/unregister/:id').post(enrollOnCasting);
enrolledRoutes.route('/:id').delete(deleteEnroll);

export default enrolledRoutes;
