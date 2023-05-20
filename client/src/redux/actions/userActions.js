import axios from 'axios';
import {
	setLoading,
	setError,
	userLogin,
	userLogout,
	updateUserProfile,
	resetUpdate,
	setUserCastings,
} from '../slices/user';

export const login = (email, password) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const { data } = await axios.post('/api/users/login', { email, password }, config);
		dispatch(userLogin(data));
		localStorage.setItem('userInfo', JSON.stringify(data));
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

export const logout = () => (dispatch) => {
	localStorage.removeItem('userInfo');
	dispatch(userLogout());
};

export const register = (firstName, lastName, email, password) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const { data } = await axios.post('/api/users/register', { firstName, lastName, email, password }, config);
		dispatch(userLogin(data));
		localStorage.setItem('userInfo', JSON.stringify(data));
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

export const updateProfile = (id, firstName, lastName, email, password) => async (dispatch, getState) => {
	const {
		user: { userInfo },
	} = getState();

	try {
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
				'Content-Type': 'application/json',
			},
		};
		const { data } = await axios.put(
			`/api/users/profile/${id}`,
			{ _id: id, firstName, lastName, email, password },
			config
		);
		localStorage.setItem('userInfo', JSON.stringify(data));
		dispatch(updateUserProfile(data));
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

export const resetUpdateSucces = () => async (dispatch) => {
	dispatch(resetUpdate());
};

export const getUserCastings = () => async (dispatch, getState) => {
	dispatch(setLoading(true));
	const {
		user: { userInfo },
	} = getState();

	try {
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
				'Content-Type': 'application/json',
			},
		};
		const { data } = await axios.get(`/api/users/${userInfo._id}`, config);
		dispatch(setUserCastings(data));
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

export const deleteEnrolledOnCasting = (id) => async (dispatch, getState) => {
	const {
		user: { userInfo },
	} = getState();

	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const {data} = await axios.delete(`/api/${id}`, config)
		dispatch(setUserCastings(data))
		dispatch(getUserCastings())
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