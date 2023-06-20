import dotenv from 'dotenv';
import connectToDatabase from './database.js';
import express from 'express';

// our routes
import castingRoutes from './routes/castingRoutes.js';
import userRoutes from './routes/userRoutes.js';
import enrolledRoutes from './routes/enrolledCastingRoutes.js';
import contactUSRoutes from './routes/contactUsRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



dotenv.config();

connectToDatabase();
const app = express();

app.use(express.json());
// app.use(express.urlencoded({extended:true}))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const port = process.env.PORT || 5000;

app.use('/api/castings', castingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/', enrolledRoutes);
app.use('/api', contactUSRoutes);
app.listen(port, () => {
	console.log(`Server run on port ${port}`);
});
