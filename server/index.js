import dotenv from 'dotenv';
import connectToDatabase from './database.js';
import express from 'express';

// our routes
import castingRoutes from './routes/castingRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
connectToDatabase();
const app = express();

app.use(express.json());

const port = process.env.PORT || 5000;

app.use('/api/castings', castingRoutes)
app.use('/api/users', userRoutes)

app.listen(port, () => {
	console.log(`Server run on port ${port}`);
});
