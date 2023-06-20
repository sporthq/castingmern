import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
	error: null,
	userList: null,
	userRemoval: false,
	loading: false,
	enrolledUserList : null,
	
};

export const adminSlice = createSlice({
	name: 'admin',
	initialState,
	reducers: {
		setLoading: (state, action) => {
			state.loading = true;
		},

		setError: (state, { payload }) => {
			state.error = payload;
			state.loading = false;
		},
		getUsers: (state, { payload }) => {
			state.userList = payload;
			state.error = null;
			state.loading = false;
		},
		userDelete: (state) => {
			state.error = null;
			state.loading = false;
			state.userRemoval = true;
		},
		resetError: (state) => {
			state.error = null;
			state.userRemoval = false ; 
            state.loading = false
		},
		setUserEnrolledList: (state,{payload})=> {
			state.enrolledUserList = payload;
			state.error = null;
			state.loading = false;
		},
		resetError: (state) => {
			state.loading = false;
			state.error = null;
		},
	},
});

// actions === reducers importujemy akcje / funkcje
export const { setLoading, setError, getUsers, userDelete , resetError,setUserEnrolledList} = adminSlice.actions;
export default adminSlice.reducer;

export const adminSelector = (state) => state.admin;
