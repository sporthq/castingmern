import express from 'express';
import User from '../models/User.js'
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

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

userRoutes.route('/login').post(loginUser);
userRoutes.route('/register').post(registerUser)

export default userRoutes;
