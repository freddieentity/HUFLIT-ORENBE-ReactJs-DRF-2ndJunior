import { toast } from "react-toastify";
import {
  GET_SAVED_HOTELS_BY_USER,
  POST_SAVED_HOTEL,
  DELETE_SAVED_HOTEL,
} from "./types";
import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_API;

export const getSavedHotelsByUser = (email) => async (dispatch) => {
  axios
    .get(`${baseURL}/api/hotels/savedhotels/?email=${email}`)
    .then((res) => {
      dispatch({
        type: GET_SAVED_HOTELS_BY_USER,
        payload: res.data,
      });
      console.log("Get saved hotels successfully");
      console.log(res.data);
    })
    .catch((err) => console.log(`Get saved hotels failed ! | ${err}`));
};

export const postSavedHotel = (data) => async (dispatch) => {
  axios
    .post(`${baseURL}/api/hotels/savedhotels/`, data)
    .then((res) => {
      dispatch({
        type: POST_SAVED_HOTEL,
        payload: res.data,
      });
      toast.success(`Hotel's saved`);
      console.log(res.data);
    })
    .catch((err) => toast.warning(`Post address failed ! | ${err}`));
};

export const deleteSavedHotel = (id) => async (dispatch) => {
  axios
    .delete(`${baseURL}/api/hotels/savedhotels/?id=${id}`)
    .then((res) => {
      dispatch({
        type: DELETE_SAVED_HOTEL,
        payload: id, //send id to reducers to update the state
      });
      toast.success(`Unliked hotel successfully`);
    })
    .catch((err) => {
      toast.warning("Deleted failure");
    });
};
