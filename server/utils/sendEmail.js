import nodemailer from 'nodemailer';


const sendEmail = async (email, thead, msg, send_to, send_from, reply_to) => {
	const transporter = nodemailer.createTransport({
		service: 'Gmail',
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
		tls: {
			rejectUnauthorized: false,
		},
	});


	const options = {
		from: send_from,
		to: send_to,
		replyTo: reply_to,
		subject: thead,
		email,
		html: msg,
	};

	transporter.sendMail(options, function (err, info) {
		if (err) {
		
		} else {
			
		}
	});
};

export default sendEmail;
