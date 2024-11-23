import axios from "../../utils/axios";
import {
    fetchroomsStart, fetchroomsSuccess, fetchroomsFailure
  } from "../slices/roomSlice.js";

export const fetchrooms =  () => async (dispatch) => {
    dispatch(fetchroomsStart());
  try {
    const response = await axios.get("/room");

    dispatch(fetchroomsSuccess(response.data));
    if (Array.isArray(response.data)) {
      return response.data.rooms;
    }
  } catch (error) {
    dispatch(fetchroomsFailure(error.message || "Failed to fetch user"));
  }
};
