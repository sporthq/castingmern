import axios from 'axios';
import { getUsers, setError, userDelete, resetError, setUserEnrolledList } from '../slices/admin';
import { castingSelector, setCastingUpdateFlag, setCastings } from '../slices/castings';
import { deleteEnrolledOnCasting, getUserCastings } from './userActions';

export const getAllUsers = () => async (dispatch, getState) => {
	const {
		user: { userInfo },
	} = getState();

	try {
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
				'Content-type': 'appliaction/json',
			},
		};
		const { data } = await axios.get('/api/users', config);
		dispatch(getUsers(data));
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

export const deleteUser = (id) => async (dispatch, getState) => {
	const {
		user: { userInfo },
	} = getState();

	try {
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
				'Content-type': 'application/json',
			},
		};
		const { data: enrolledUsers } = await axios.get(`/api/castings/${id}/enrolledByUser`, config);
		console.log('Zapisani użytkownicy:', enrolledUsers);
		for (const user of enrolledUsers) {
			await dispatch(deleteEnrolledOnCasting(user._id));
		}

		const { data } = await axios.delete(`/api/users/${id}`, config);

		dispatch(userDelete(data));
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
export const resetErrorAndRemoval = () => async (dispatch) => {
	dispatch(resetError());
};

// update casting

export const updateCasting =
(movieName, image, town, description, isNewCasting, id, isCastingEdited) => async (dispatch, getState) => {
		const {
			user: { userInfo },
		} = getState();
		const { castings } = castingSelector(getState());
		try {
			const formData = new FormData();
			formData.append('movieName', movieName);
			formData.append('image', image);
			formData.append('town', town);
			formData.append('description', description);
			formData.append('isNewCasting', isNewCasting);
			formData.append('id', id);
			formData.append('isCastingEdited', isCastingEdited);
			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
					'Content-type': 'multipart/form-data',
				},
			};

			const { data } = await axios.put('/api/castings', formData, config);

			dispatch(setCastings(data));
			dispatch(setCastingUpdateFlag());
			dispatch(resetError());
		} catch (error) {
			dispatch(
				setError(
					error.response && error.response.data.message
						? error.response.data.message
						: error.message
						? error.message
						: 'Casting nie został zaktualizowany'
				)
			);
		}
	};	
// delete casting

export const deleteCasting = (id) => async (dispatch, getState) => {
	const {
		user: { userInfo },
	} = getState();

	try {
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
				'Content-type': 'application/json',
			},
		};

		// Pobierz listę zapisanych użytkowników na casting
		const { data: enrolledUsers } = await axios.get(`/api/castings/${id}/enrolled`, config);

		// Usuń casting
		await axios.delete(`/api/castings/${id}`, config);

		// Usuń zapisy na casting dla każdego użytkownika
		for (const user of enrolledUsers) {
			console.log(user);
			await dispatch(deleteEnrolledOnCasting(user._id)); // Wywołaj funkcję deleteEnrolledOnCasting dla danego użytkownika
		}

		// Pobierz zaktualizowaną listę castingów
		await dispatch(getUserCastings());

		dispatch(setCastingUpdateFlag());
		dispatch(resetError());
	} catch (error) {
		dispatch(
			setError(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
					? error.message
					: 'Casting nie został usunięty'
			)
		);
	}
};
// add casting
export const uploadCasting =
	(movieName, image, town, description, isNewCasting, isCastingEdited, resetFormValues) =>
	async (dispatch, getState) => {
		const {
			user: { userInfo },
		} = getState();

		try {
			const formData = new FormData();
			formData.append('movieName', movieName);
			formData.append('image', image);
			formData.append('town', town);
			formData.append('description', description);
			formData.append('isNewCasting', isNewCasting);
			formData.append('isCastingEdited', isCastingEdited);

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
					'Content-type': 'multipart/form-data',
				},
			};
			const { data } = await axios.post('/api/castings', formData, config);
			dispatch(setCastings(data));
			dispatch(setCastingUpdateFlag());

			resetFormValues();
			dispatch(resetError());
		} catch (error) {
			dispatch(
				setError(
					error.response && error.response.data.message
						? error.response.data.message
						: error.message
						? error.message
						: 'Casting nie został dodany'
				)
			);
		}
	};

export const getAllEnrolledUsers = () => async (dispatch, getState) => {
	const {
		user: { userInfo },
	} = getState();

	try {
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
				'Content-type': 'appliaction/json',
			},
		};
		const { data } = await axios.get('/api/', config);
		dispatch(setUserEnrolledList(data));
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
