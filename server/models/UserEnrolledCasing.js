import mongoose from 'mongoose';

const userEnrolledCasingSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		firstName: {
			type: String,
			required: true,
			ref: 'User',
		},
		email: {
			type: String,
			required: true,
			ref: 'User',
		},
		castinEnrolled: [
			{
				movieName: { type: String, required: true },
				image: { type: String, required: true },
				town: { type: String, required: true },
				casting_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Casting' },
			},
		],
	},
	{ timestamps: true }
);

const enrolledCastingUser = mongoose.model('userEnrolledCasing', userEnrolledCasingSchema);

export default enrolledCastingUser;
