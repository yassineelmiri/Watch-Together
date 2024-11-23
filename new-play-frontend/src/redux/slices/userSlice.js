// src/redux/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  isPending: false,
  isError: false,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Action pour démarrer la récupération des utilisateurs
    fetchUsersStart(state) {
      state.isPending = true;
      state.isError = false;
      state.error = null;
    },
    // Action lorsque la récupération des utilisateurs réussit
    fetchUsersSuccess(state, action) {
      state.isPending = false;
      state.users = action.payload;
    },
    // Action lorsque la récupération des utilisateurs échoue
    fetchUsersFailure(state, action) {
      state.isPending = false;
      state.isError = true;
      state.error = action.payload;
    },
  },
});

export const { fetchUsersStart, fetchUsersSuccess, fetchUsersFailure } = userSlice.actions;


export default userSlice.reducer;
