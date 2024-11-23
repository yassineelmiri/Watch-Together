import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  videos: [],
  isPending: false,
  isError: false,
  error: null,
};

const videoSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    fetchVideosStart(state) {
      state.isPending = true;
      state.isError = false;
      state.error = null;
    },
    fetchVideosSuccess(state, action) {
      state.isPending = false;
      state.videos = action.payload;
    },
    fetchVideosFailure(state, action) {
      state.isPending = false;
      state.isError = true;
      state.error = action.payload;
    },
  },
});

export const { fetchVideosStart, fetchVideosSuccess, fetchVideosFailure } =
  videoSlice.actions;

export default videoSlice.reducer;
