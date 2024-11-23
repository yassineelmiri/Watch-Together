// src/redux/slices/chatslice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chats: [],
  isPending: false,
  isError: false,
  error: null,
};

const chatslice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    // Action pour démarrer la récupération des utilisateurs
    fetchchatsStart(state) {
      state.isPending = true;
      state.isError = false;
      state.error = null;
    },
    // Action lorsque la récupération des utilisateurs réussit
    fetchchatsSuccess(state, action) {
      state.isPending = false;
      state.chats = action.payload;
    },
    // Action lorsque la récupération des utilisateurs échoue
    fetchchatsFailure(state, action) {
      state.isPending = false;
      state.isError = true;
      state.error = action.payload;
    },
  },
});

export const { fetchchatsStart, fetchchatsSuccess, fetchchatsFailure } = chatslice.actions;


export default chatslice.reducer;
