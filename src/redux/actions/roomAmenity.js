import { toast } from "react-toastify";
import {
  GET_ROOM_AMENITIES,
  POST_ROOM_AMENITY,
  PATCH_ROOM_AMENITY,
  DELETE_ROOM_AMENITY,
} from "./types";
import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_API;

export const getRoomAmenities = () => async (dispatch) => {
  axios
    .get(`${baseURL}/api/hotels/roomamenities/`)
    .then((res) => {
      dispatch({
        type: GET_ROOM_AMENITIES,
        payload: res.data,
      });
      console.log("Get room amenities successfully");
      console.log(res.data);
    })
    .catch((err) => console.log(`Get room amenities failed ! | ${err}`));
};

export const postRoomAmenity = (data) => async (dispatch) => {
  axios
    .post(`${baseURL}/api/hotels/roomamenities/`, data)
    .then((res) => {
      dispatch({
        type: POST_ROOM_AMENITY,
        payload: res.data,
      });
      toast.success(`Create an amenity "${res.data.name}"`);
      console.log(res.data);
    })
    .catch((err) => toast.warning(`Post amenity failed ! | ${err}`));
};

export const patchHotelAmenity = (id, data) => async (dispatch) => {
  axios
    .patch(`${baseURL}/api/hotels/roomamenities/?id=${id}`, data)
    .then((res) => {
      dispatch({
        type: PATCH_ROOM_AMENITY,
        payload: res.data,
      });
      toast.success(`Edited amenity to "${res.data.name}" successfully!`);
      console.log(res.data);
    })
    .catch((err) => toast.warning(`Editing room amenity failed ! | ${err}`));
};

export const deleteRoomAmenity = (id) => async (dispatch) => {
  axios
    .delete(`${baseURL}/api/hotels/roomamenities/?id=${id}`)
    .then((res) => {
      dispatch({
        type: DELETE_ROOM_AMENITY,
        payload: id, //send id to reducers to update the state
      });
      toast.success(`Deleted amenity ID: "${id}" successfully`);
    })
    .catch((err) => {
      toast.warning("Deleted failure");
    });
};
