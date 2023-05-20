import mongoose from 'mongoose';

const castingLinksCount = new mongoose.Schema(
	{
		movieName: { type: String, required: true },
		likes: { type: Number, required: true },
		comment: { type: String, required: true },
		title: { type: String, required: true },
		user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
	},
	{ timestamps: true }
);

	const castingSchema = new mongoose.Schema(
		{
			movieName: { type: String, required: true },
			image: { type: String, required: true },
			town: { type: String, required: true },
			description: { type: String, required: true },
			isNewCasting: { type: Boolean, default: false },
			likes: [castingLinksCount],
			numberLikes: { type: Number, default: 0 },
		},
		{ timestamps: true }
	);

	// push on database
	const Casting = mongoose.model('Casting', castingSchema);

	export default Casting;
