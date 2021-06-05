import { toast } from "react-toastify";
import {
  GET_HOTEL_AMENITIES,
  POST_HOTEL_AMENITY,
  PATCH_HOTEL_AMENITY,
  DELETE_HOTEL_AMENITY,
} from "./types";
import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_API;

export const getHotelAmenities = () => async (dispatch) => {
  axios
    .get(`${baseURL}/api/hotels/amenities/`)
    .then((res) => {
      dispatch({
        type: GET_HOTEL_AMENITIES,
        payload: res.data,
      });
      console.log("Get hotel amenities successfully");
      console.log(res.data);
    })
    .catch((err) => console.log(`Get hotel amenities failed ! | ${err}`));
};

export const postHotelAmenity = (data) => async (dispatch) => {
  axios
    .post(`${baseURL}/api/hotels/amenities/`, data)
    .then((res) => {
      dispatch({
        type: POST_HOTEL_AMENITY,
        payload: res.data,
      });
      toast.success(`Create an amenity "${res.data.name}"`);
      console.log(res.data);
    })
    .catch((err) => toast.warning(`Post address failed ! | ${err}`));
};

export const patchHotelAmenity = (id, data) => async (dispatch) => {
  axios
    .patch(`${baseURL}/api/hotels/amenities/?id=${id}`, data)
    .then((res) => {
      dispatch({
        type: PATCH_HOTEL_AMENITY,
        payload: res.data,
      });
      toast.success(`Edited amenity to "${res.data.name}" successfully!`);
      console.log(res.data);
    })
    .catch((err) => toast.warning(`Editing hotel amenity failed ! | ${err}`));
};

export const deleteHotelAmenity = (id) => async (dispatch) => {
  axios
    .delete(`${baseURL}/api/hotels/amenities/?id=${id}`)
    .then((res) => {
      dispatch({
        type: DELETE_HOTEL_AMENITY,
        payload: id, //send id to reducers to update the state
      });
      toast.success(`Deleted amenity ID: "${id}" successfully`);
    })
    .catch((err) => {
      toast.warning("Deleted failure");
    });
};
