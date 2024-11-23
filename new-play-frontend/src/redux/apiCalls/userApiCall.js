import axios from "../../utils/axios";
import {
    fetchUsersStart, fetchUsersSuccess, fetchUsersFailure
  } from "../slices/userSlice.js";

export const fetchUsers =  () => async (dispatch) => {
    dispatch(fetchUsersStart());
  try {
    const response = await axios.get("/user");
    console.log(response.data.users);
    dispatch(fetchUsersSuccess(response.data.users));
    // Vérifiez la structure de la réponse pour être sûr que c'est un tableau
    if (Array.isArray(response.data)) {

      return response.data.users;
    }
  } catch (error) {
    dispatch(fetchUsersFailure(error.message || "Failed to fetch user"));
  }
};
