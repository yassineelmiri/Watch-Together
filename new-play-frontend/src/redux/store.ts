import { configureStore } from '@reduxjs/toolkit';
import videoReducer from './slices/videoSlice';
import userReducer from './slices/userSlice'; 
import roomReducer from './slices/roomSlice'; 
import chatReducer from './slices/chatSlice'; 

const store = configureStore({
  reducer: {
    videos: videoReducer,
    users: userReducer,
    rooms: roomReducer,
    chat: chatReducer,
  },
});

// Define the types for Redux state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
