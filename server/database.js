// connection to DB

import mongoose from 'mongoose';

const connectToDatabase = async () => {
	try {
		mongoose.set('strictQuery', false);
		const connect = await mongoose.connect(process.env.MONGO_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		});
		
	} catch (error) {
        
    }
};


export default connectToDatabase