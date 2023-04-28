import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
	loading: false,
	error: null,
	castings: [],
};

export const castingSlice = createSlice({
	name: 'castings',
	initialState,
	reducers: {
		setLoading: (state, action) => {
			state.loading = true;
		},
		setCastings: (state, { payload }) => {
			state.loading = false;
			state.error = false;
			state.castings = payload;
		},
		setError: (state, { payload }) => {
			state.error = payload;
			state.loading = false;
		},
	},
});

// actions === reducers importujemy akcje / funkcje
export const { setLoading, setCastings, setError } = castingSlice.actions;
export default castingSlice.reducer;
// to są nasze wszystkie castingi 
export const castingSelector = (state) => state.castings;
