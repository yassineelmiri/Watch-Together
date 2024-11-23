// src/redux/slices/roomslice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rooms: [],
  isPending: false,
  isError: false,
  error: null,
};

const roomslice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    // Action pour démarrer la récupération des utilisateurs
    fetchroomsStart(state) {
      state.isPending = true;
      state.isError = false;
      state.error = null;
    },
    // Action lorsque la récupération des utilisateurs réussit
    fetchroomsSuccess(state, action) {
      state.isPending = false;
      state.rooms = action.payload;
    },
    // Action lorsque la récupération des utilisateurs échoue
    fetchroomsFailure(state, action) {
      state.isPending = false;
      state.isError = true;
      state.error = action.payload;
    },
  },
});

export const { fetchroomsStart, fetchroomsSuccess, fetchroomsFailure } = roomslice.actions;


export default roomslice.reducer;
