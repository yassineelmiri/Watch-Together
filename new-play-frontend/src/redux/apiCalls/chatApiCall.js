import axios from "../../utils/axios";
import {
    fetchchatsStart, fetchchatsSuccess, fetchchatsFailure
  } from "../slices/chatSlice.js";

export const fetchchats =  () => async (dispatch) => {
    dispatch(fetchchatsStart());
  try {
    console.log("hhhhhhhhhhhhhhhhhhhhhhh");
    
    const response = await axios.get("/chat");

    dispatch(fetchchatsSuccess(response.data));
    if (Array.isArray(response.data)) {
      return response.data.chats;
    }
  } catch (error) {
    dispatch(fetchchatsFailure(error.message || "Failed to fetch user"));
  }
};
