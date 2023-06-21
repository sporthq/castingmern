import dotenv from 'dotenv';
dotenv.config();
import connectToDatabase from './database.js';
import express from 'express';

// our routes
import castingRoutes from './routes/castingRoutes.js';
import userRoutes from './routes/userRoutes.js';
import enrolledRoutes from './routes/enrolledCastingRoutes.js';
import contactUSRoutes from './routes/contactUsRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';

connectToDatabase();
const app = express();
app.use(express.json());
app.use('/api/castings', castingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/', enrolledRoutes);
app.use('/api', contactUSRoutes);
const port = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// const __dirname = path.resolve();
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/client/build')));

	app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

app.listen(port, () => {
	console.log(`Server run on port ${port}`);
});
