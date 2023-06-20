import axios from 'axios';
import { setCastings, setLoading, setError, setCasting,resetError  } from '../slices/castings';

export const getCastings = () => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		// ustawiamy proxy w package.json , żeby nie pisać 'http://localhost:5000
		const { data } = await axios.get('/api/castings');
		
		dispatch(setCastings(data));
	} catch (error) {
		dispatch(
			setError(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
					? error.message
					: 'Nieoczekiwany błąd'
			)
		);
	}
};

export const getCasting = (id) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const { data } = await axios.get(`/api/castings/${id}`);
		dispatch(setCasting(data));
	} catch (error) {
		dispatch(
			setError(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
					? error.message
					: 'Nieoczekiwany błąd'
			)
		);
	}
};

export const resetCastingError = () => async (dispatch) => {
	dispatch(resetError());
  };