import axios from "../../utils/axios";
import {
  fetchVideosStart,
  fetchVideosSuccess,
  fetchVideosFailure,
} from "../slices/videoSlice";

export const fetchVideos = () => async (dispatch) => {
  dispatch(fetchVideosStart());
  try {
    const { data } = await axios.get("/videos/list");
    dispatch(fetchVideosSuccess(data.videos));
  } catch (error) {
    dispatch(fetchVideosFailure(error.message || "Failed to fetch videos"));
  }
};
