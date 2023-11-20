import axios from 'axios';
import { setError, setLoading, setSuccess, resetError } from '../slices/contact';

export const sendEmail = (values) => async (dispatch) => {
	dispatch(setLoading(true));

	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const res = await axios.post(`/api/contact`, values, config);
	
		dispatch(setSuccess(true)); // Dodaj tę linię
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

export const resetContactError = () => async (dispatch) => {
	dispatch(resetError());
};
