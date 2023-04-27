import dotenv from 'dotenv';
import connectToDatabase from './database.js';
import express from 'express';

// our routes
import castingRoutes from './routes/castingRoutes.js';

dotenv.config();
connectToDatabase();
const app = express();

app.use(express.json());

const port = process.env.PORT || 5000;

app.use('/api/castings', castingRoutes)
app.listen(port, () => {
	console.log(`Server run on port ${port}`);
});
