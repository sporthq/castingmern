import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

const protectRoute = asyncHandler(async (req, res, next) => {
	let token;
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
		try {
			token = req.headers.authorization.split(' ')[1];
			const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

			req.user = await User.findById(decoded.id);

			next();
		} catch (error) {
			res.status(401);
			throw new Error('Nie masz dostępu, token nieprawidłowy');
		}

        if(!token) {
            res.status(401)
            throw new Error('Brak autoryzacji')
        }
});

export default protectRoute