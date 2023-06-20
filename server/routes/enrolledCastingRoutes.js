import express from 'express';
import asyncHandler from 'express-async-handler';
import UserEnrolledCasting from '../models/UserEnrolledCasing.js';

import User from '../models/User.js';

import Casting from '../models/Casting.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const enrolledRoutes = express.Router();

const enrollOnCasting = asyncHandler(async (req, res) => {
	const { firstName, lastName, email, phoneNumber, isEdited } = req.body;
	const casting = await Casting.findById(req.params.id);
	let user = null;
	if (req.user) {
		user = await User.findById(req.user._id);
	}

	if (!firstName || !lastName || !email || !phoneNumber) {
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
				image: casting.image.filePath,
				town: casting.town,
				userImage: req.user.image.filePath,
				phoneNumber: req.user.phoneNumber,
				isEdited: casting.castingIsEdited,
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
				isEdited: casting.castingIsEdited,
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
			isEdited: userEnrolledCasting.isEdited,
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

const getAllEnrolledCastgins = asyncHandler(async (req, res) => {
	const enrolledCastings = await UserEnrolledCasting.find({});
	res.json(enrolledCastings);
});

const getEnrolledUsersForCasting = async (req, res) => {
	try {
		const { id } = req.params;

		// Tutaj dodaj logikę, która pobierze zapisanych użytkowników na casting o podanym ID
		// Możesz użyć Mongoose lub innej biblioteki do interakcji z bazą danych

		// Przykład kodu z użyciem Mongoose:
		const enrolledUsers = await UserEnrolledCasting.find({ casting: id });

		res.status(200).json(enrolledUsers);
	} catch (error) {
		res.status(500).json({ message: 'Wystąpił błąd podczas pobierania zapisanych użytkowników.' });
	}
};
const getEnrolledUsersForCastingByUser = async (req, res) => {
	try {
		const { id } = req.params;

		// Tutaj dodaj logikę, która pobierze zapisanych użytkowników na casting o podanym ID
		// Możesz użyć Mongoose lub innej biblioteki do interakcji z bazą danych

		// Przykład kodu z użyciem Mongoose:
		const enrolledUsers = await UserEnrolledCasting.find({ user: id });

		res.status(200).json(enrolledUsers);
	} catch (error) {
		res.status(500).json({ message: 'Wystąpił błąd podczas pobierania zapisanych użytkowników.' });
	}
};

const updateEnrollForCasting = asyncHandler(async (req, res) => {
	try {
		const { castingId } = req.body;

		console.log();

		const casting = await Casting.findById(castingId);

		if (!casting) {
			return res.status(404).json({ message: 'Casting nie istnieje.' });
		}

		const enroll = await UserEnrolledCasting.findById(req.params.id);

		if (enroll) {
			enroll.town = casting.town || enroll.town;
			enroll.movieName = casting.movieName || enroll.movieName;
			enroll.description = casting.description || enroll.description;
			enroll.image = casting.image.filePath || enroll.image;
			enroll.isEdited = false;
			const updateEnroll = await enroll.save();

			res.json(updateEnroll);
			res.json(casting);
		} else {
			res.status(404).json({ message: 'Zapis nie został znaleziony.' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Wystąpił błąd podczas aktualizacji zapisu.' });
	}
});

enrolledRoutes.route('/enroll/:id').post(protectRoute, enrollOnCasting);
enrolledRoutes.route('/enroll/unregister/:id').post(enrollOnCasting);
enrolledRoutes.route('/:id').delete(deleteEnroll);
enrolledRoutes.route('/').get(getAllEnrolledCastgins);
enrolledRoutes.route('/castings/:id/enrolled').get(getEnrolledUsersForCasting);
enrolledRoutes.route('/castings/:id/enrolledByUser').get(getEnrolledUsersForCastingByUser);
enrolledRoutes.route('/:id').put(updateEnrollForCasting);
export default enrolledRoutes;
