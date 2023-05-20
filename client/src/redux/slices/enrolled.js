import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  error: null,
  enrolledCasting: null,
};

const enrolledSlice = createSlice({
  name: 'enrolled',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setEnrolledCasting: (state, action) => {
      state.enrolledCasting = action.payload;
    },
   
  },
});

export const {
  setLoading,
  setError,
  setEnrolledCasting,
  setEnrolledUnregisterCasting
} = enrolledSlice.actions;

export default enrolledSlice.reducer

export const enrollSelector = (state) => state.enrolled;