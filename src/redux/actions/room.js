import {
  GET_ROOMS,
  POST_ROOM,
  PATCH_ROOM,
  DELETE_ROOM,
  GET_ROOM_BY_ID,
  GET_ROOMS_BY_HOTEL_ID,
} from "./types";
import axios from "axios";
import { toast } from "react-toastify";

const baseURL = process.env.REACT_APP_BACKEND_API;
const roomConfig = {
  headers: {
    "content-type": "multipart/form-data",
  },
};

export const getRooms = () => async (dispatch) => {
  axios
    .get(`${baseURL}/api/hotels/rooms/`)
    .then((res) => {
      dispatch({
        type: GET_ROOMS,
        payload: res.data,
      });
      console.log("Get rooms successfully");
      console.log(res.data);
    })
    .catch((err) => console.log(`Get rooms failed ! | ${err}`));
};

export const getRoomsByHotelId = (hotel_id) => async (dispatch) => {
  axios
    .get(`${baseURL}/api/hotels/roomlist/?hotel_id=${hotel_id}`)
    .then((res) => {
      dispatch({
        type: GET_ROOMS_BY_HOTEL_ID,
        payload: res.data,
      });
      console.log("Get hotel room list successfully");
      console.log(res.data);
    })
    .catch((err) => console.log(`Get hotel room list failed ! | ${err}`));
};

export const getRoom = (room_id) => async (dispatch) => {
  axios
    .get(`${baseURL}/api/hotels/rooms/?id=${room_id}`)
    .then((res) => {
      dispatch({
        type: GET_ROOM_BY_ID,
        payload: res.data,
      });
      console.log("Get hotel room list successfully");
      console.log(res.data);
    })
    .catch((err) => console.log(`Get hotel room list failed ! | ${err}`));
};

export const postRoom = (data) => async (dispatch) => {
  axios
    .post(`${baseURL}/api/hotels/rooms/`, data, roomConfig)
    .then((res) => {
      dispatch({
        type: POST_ROOM,
        payload: res.data,
      });
      toast.success(`Post room "${res.data.name}" successfully`);
      console.log(res.data);
    })
    .catch((err) => toast.warning(`Post room failed ! | ${err}`));
};

export const patchRoom = (id, data) => async (dispatch) => {
  axios
    .patch(`${baseURL}/api/hotels/rooms/?id=${id}`, data, roomConfig)
    .then((res) => {
      dispatch({
        type: PATCH_ROOM,
        payload: res.data,
      });
      toast.success(`Edit room "${res.data.name}" successfully`);
      console.log(res.data);
    })
    .catch((err) => toast.warning(`Edit room failed ! | ${err}`));
};

export const deleteRoom = (id) => async (dispatch) => {
  axios
    .delete(`${baseURL}/api/hotels/rooms/?id=${id}`)
    .then((res) => {
      dispatch({
        type: DELETE_ROOM,
        payload: id, //send id to reducers to update the state
      });
      toast.success("Deleted successfully");
    })
    .catch((err) => {
      console.log(`Delete room failed ! | ${err}`);
      toast.warning("Deleted failure");
    });
};
