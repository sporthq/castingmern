import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
	loading: false,
	error: null,
	success: false,
	errorReset: false,
};

export const contactSlice = createSlice({
	name: 'contact',
	initialState,
	reducers: {
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		setError: (state, { payload }) => {
			state.error = payload;
			state.loading = false;
			state.success = false;
		},
		setSuccess: (state) => {
			state.loading = false;
			state.error = null;
			state.success = true;
		},
		resetError: (state) => {
			state.errorReset = false;
			state.error = null;
		},
	},
});

export const { setLoading, setError, setSuccess, resetError } = contactSlice.actions;
export default contactSlice.reducer;
