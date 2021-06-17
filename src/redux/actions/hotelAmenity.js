import { toast } from "react-toastify";
import {
  GET_HOTEL_AMENITIES,
  POST_HOTEL_AMENITY,
  PATCH_HOTEL_AMENITY,
  DELETE_HOTEL_AMENITY,
} from "./types";
import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_API;

export const getHotelAmenitiesAssc = (hotel_id) => async (dispatch) => {
  axios
    .get(`${baseURL}/api/hotels/amenitiesassc/?hotel_id=${hotel_id}`)
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
    .post(`${baseURL}/api/hotels/amenitiesassc/`, data)
    .then((res) => {
      dispatch({
        type: POST_HOTEL_AMENITY,
        payload: res.data,
      });
      toast.success(`Created an amenity`);
      console.log(res.data);
    })
    .catch((err) => toast.warning(`Create amenity failed ! | ${err}`));
};

export const patchHotelAmenity = (id, data) => async (dispatch) => {
  console.log(id);
  console.log(data);
  axios
    .patch(`${baseURL}/api/hotels/amenitiesassc/?id=${id}`, data)
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
    .delete(`${baseURL}/api/hotels/amenitiesassc/?id=${id}`)
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
