import express from 'express';
import Casting from '../models/Casting.js';
const castingRoutes = express.Router();

const getCastings = async (req, res) => {
	const castings = await Casting.find({}); // all castings find
	res.json(castings);
};

castingRoutes.route('/').get(getCastings);

export default castingRoutes