import express from 'express';
// import protectRoute from '../middleware/authMiddleware.js'
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import sendEmail from '../utils/sendEmail.js';

const contactUSRoutes = express.Router();

const MIN_MESSAGE_INTERVAL = 1 * 60 * 1000;
let lastMessageSentAt = {};
const contactUS = asyncHandler(async (req, res) => {
	const { thead, msg } = req.body;
	let { email } = req.body;

	let sessionIdentifier;

	if (req.user) {
		const user = await User.findById(req.user._id);
		console.log(`USER: ${user}`);
		if (user) {
			console.log(user);
			email = user.email;
			sessionIdentifier = user._id;
		}
	} else {
		sessionIdentifier = req.ip;
	}

	
	const lastMessageSentAt = getLastMessageSentAt(sessionIdentifier);

	const currentTime = new Date().getTime();
	if (lastMessageSentAt && currentTime - lastMessageSentAt < MIN_MESSAGE_INTERVAL) {
		
		return res.status(409).json({ message: 'Możesz wysłać wiadomość co 5 minut!' });
		
	}
	// validation
	if (!email || !thead || !msg) {
		res.status(400);
		// throw new Error('Musisz wypełnić wszytkie pola');
		return res.status(409).json({ message: 'Musisz wypełnić wszytkie pola' });

	}
	console.log(email);

	const send_to = process.env.EMAIL_USER;
	const send_from = email;
	const reply_to = email;

	try {
		await sendEmail(email, thead, msg, send_to, send_from, reply_to);
		saveLastMessageSentAt(sessionIdentifier, currentTime);
		res.status(200).json({ success: true, message: 'Email wysłany' });
	} catch (error) {
		res.status(500);
		throw new Error('Nie udało się wysłać wiadomości, spróbuj ponownie');
	}
});
function getLastMessageSentAt(sessionIdentifier) {
	// Pobierz czas ostatniego wysłania wiadomości dla danego identyfikatora sesji
	return lastMessageSentAt[sessionIdentifier] || null;
}

function saveLastMessageSentAt(sessionIdentifier, timestamp) {
	// Zapisz czas ostatniego wysłania wiadomości dla danego identyfikatora sesji
	lastMessageSentAt[sessionIdentifier] = timestamp;
}
contactUSRoutes.route('/contact').post(contactUS);

export default contactUSRoutes;
