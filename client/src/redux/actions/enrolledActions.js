import axios from 'axios';
import enrolledSlice, { setEnrolledCasting, setError, setLoading, resetError } from '../slices/enrolled';


export const enrollCastingUser = (castingID, firstName, lastName, email,phoneNumber,isEdited) => async (dispatch, getState) => {
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
		const response = await axios.post(`/api/enroll/${castingID}`, { firstName, lastName, email,phoneNumber,isEdited }, config);
		dispatch(resetError())

		dispatch(setEnrolledCasting(response.data));
		
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
	} finally {
		dispatch(setLoading(false));
	}
};

export const enrollUnregisterUserCasting = (castingID, firstName, lastName, email) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const response = await axios.post(`/api/enroll/unregister/${castingID}`, { firstName, lastName, email }, config);
		dispatch(resetError())
		dispatch(setEnrolledCasting(response.data));
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
	} finally {
		dispatch(setLoading(false));
	}
};

export const updateEnroll = (enrollId, castingId) => async (dispatch) => {
	dispatch(setLoading(true));
  
	try {
	  const config = {
		headers: {
		  'Content-Type': 'application/json',
		},
	  };
  
	  const response = await axios.put(`/api/${enrollId}`,  {castingId} , config);
	  dispatch(resetError());
	  dispatch(setEnrolledCasting(response.data));
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
	} finally {
	  dispatch(setLoading(false));
	}
  };

export default enrolledSlice.reducer;
