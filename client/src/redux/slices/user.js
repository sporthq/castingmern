import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
	loading: false,
	error: null,
	userInfo: JSON.parse(localStorage.getItem('userInfo')) ?? null,
	updateSuccess: false,
	enrolledCastings: [],
	sendEmail: false,
	resetSendEmail: false,
	resetPasswordSucces: null,
	sendConfirmMail: false,
	success: null
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setLoading: (state, action) => {
			state.loading = true;
		},
		userLogin: (state, { payload }) => {
			state.userInfo = payload;
			state.error = null;
			state.loading = false;
		},
		userLogout: (state) => {
			state.loading = false;
			state.error = null;
			state.userInfo = null;
		},
		setError: (state, { payload }) => {
			state.error = payload;
			state.loading = false;
		},
		updateUserProfile: (state, { payload }) => {
			state.userProfile = payload;
			state.updateSuccess = true;
			state.loading = false;
			state.error = null;
		},
		resetUpdate: (state) => {
			state.updateSuccess = false;
		},
		setUserCastings: (state, { payload }) => {
			state.error = null;
			state.enrolledCastings = payload;
			state.loading = false;
		},
		setSendEmail: (state, { payload }) => {
			state.loading = false;
			state.error = null;
			state.sendEmail = true;
		},
		resetSendEmail: (state) => {
			state.sendEmail = false;
		},
		setResetPasswordSucces: (state, { payload }) => {
			state.resetPasswordSucces = payload;
			state.loading = false;
			state.error = false;
		},
		setSendConfirmMail: (state) => {
			state.error = false;
			state.loading = false;
			state.sendConfirmMail = true;
		},
		resetError: (state) => {
			state.error = null;
		},
		setSuccess: (state, action) => {
			state.success = action.payload; // Przechowuj wiadomość sukcesu w stanie
		  },
	},
});

// actions === reducers importujemy akcje / funkcje
export const {
	setResetPasswordSucces,
	setSendEmail,
	resetSendEmail,
	setLoading,
	setError,
	userLogin,
	userLogout,
	updateUserProfile,
	resetUpdate,
	setUserCastings,
	setSendConfirmMail,
	resetError,
	setSuccess
} = userSlice.actions;
export default userSlice.reducer;

export const userSelector = (state) => state.user;
