import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
	loading: false,
	error: null,
	castings: [],
	casting: null,
	castingUpdate: false,
	isCastingEdited: false,
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
		setCasting: (state, { payload }) => {
			state.casting = payload;
			state.loading = false;
			state.error = null;
		},
		setError: (state, { payload }) => {
			state.error = payload;
			state.loading = false;
		},
		setCastingUpdateFlag: (state) => {
			state.castingUpdate = true;
			state.loading = false;
			state.isCastingEdited = true;
		
		},
		resetError: (state) => {
			state.error = null;
			state.castingUpdate = false;
		},
	},
});

// actions === reducers importujemy akcje / funkcje
export const { setLoading, setCastings, setError, setCasting, setCastingUpdateFlag, resetError } = castingSlice.actions;
export default castingSlice.reducer;
// to są nasze wszystkie castingi
export const castingSelector = (state) => state.castings;
