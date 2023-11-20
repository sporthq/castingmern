import axios from 'axios';
import {
	setLoading,
	setError,
	userLogin,
	userLogout,
	updateUserProfile,
	resetUpdate,
	setUserCastings,
	setSendEmail,
	setResetPasswordSucces,
	setSendConfirmMail,
	resetError,
	setSuccess
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

export const register = (firstName, lastName, email, password, image, phoneNumber) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const formData = new FormData();
		formData.append('firstName', firstName);
		formData.append('lastName', lastName);
		formData.append('email', email);
		formData.append('password', password);
		formData.append('image', image);
		formData.append('phoneNumber', phoneNumber);
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		};
		const { data } = await axios.post('/api/users/register', formData, config);

		
	
		dispatch(setSendConfirmMail());
		
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
export const updateProfile = (id, firstName, lastName, email, password, phoneNumber,image) => async (dispatch, getState) => {
	const {
	  user: { userInfo },
	} = getState();
  
	try {
	  const formData = new FormData();
	  formData.append('_id', id);
	  formData.append('firstName', firstName);
	  formData.append('lastName', lastName);
	  formData.append('email', email);
	  formData.append('password', password);
	  formData.append('phoneNumber', phoneNumber);
	  formData.append('image', image);
  
	  const config = {
		headers: {
		  Authorization: `Bearer ${userInfo.token}`,
		  'Content-Type': 'multipart/form-data',
		},
	  };
  
	  const { data } = await axios.put(`/api/users/profile/${id}`, formData, config);
  
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
	dispatch(setLoading(true));
	const {
		user: { userInfo },
	} = getState();

	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const { data } = await axios.delete(`/api/${id}`, config);
		dispatch(setUserCastings(data));
		dispatch(getUserCastings());
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

export const forgotPasword = (email) => async (dispatch) => {
	try {
		dispatch(setLoading(true));
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const { data } = await axios.post(`/api/users/forgotpassword`, { email }, config);
		
		dispatch(setSendEmail());
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

export const resetPassword = (resetToken, password) => async (dispatch) => {
	try {
		dispatch(setLoading(true));
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const { data } = await axios.put(`/api/users/resetpassword/${resetToken}`, { password }, config);
		
		dispatch(setResetPasswordSucces(data.message));
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

export const verifyUser = (token) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
	  const config = {
		headers: {
		  'Content-Type': 'application/json',
		},
	  };
	  const response = await axios.get(`/api/users/verify/${token}`, config);
	  const successMessage = response.data.message; // Pobierz wiadomość sukcesu z odpowiedzi
  
	  dispatch(setSuccess(successMessage)); // Ustaw wiadomość sukcesu w stanie
	  dispatch(setError(null)); // Wyczyść błąd
  
	  // Wywołaj odpowiednie akcje lub obsłuż pomyślną odpowiedź według potrzeb
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
	  dispatch(setSuccess(null)); // W przypadku błędu wyczyść wiadomość sukcesu
	}
  };