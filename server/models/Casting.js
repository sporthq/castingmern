import mongoose from 'mongoose';
import { MongoClient }  from 'mongodb'
const castingSchema = new mongoose.Schema(
	{
		movieName: { type: String, required: true },
		image: {
			type: Object,
			default: {},
		},
		town: { type: String, required: true },
		description: { type: String, required: true },
		isNewCasting: { type: Boolean, default: false },
		castingIsEdited: { type: Boolean, default: false },
	
	},
	{ timestamps: true }
);

// push on database
const Casting = mongoose.model('Casting', castingSchema);



export default Casting;
