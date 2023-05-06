import express from 'express';
import Casting from '../models/Casting.js';
const castingRoutes = express.Router();

const getCastings = async (req, res) => {
	const castings = await Casting.find({}); // all castings find
	res.json(castings);
};

const getCasting = async(req,res) => {
	const casting = await Casting.findById(req.params.id)
	console.log(casting);

	if(casting) {
		res.json(casting)
	} else {
		res.status(404);
		throw new Error('Nie ma takiego castingu')
	}
}
castingRoutes.route('/').get(getCastings);
castingRoutes.route('/:id').get(getCasting);

export default castingRoutes