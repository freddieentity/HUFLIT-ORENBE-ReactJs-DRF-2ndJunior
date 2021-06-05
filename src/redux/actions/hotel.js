import {
  GET_HOTELS,
  SEARCH_HOTELS,
  GET_HOTEL_BY_ROOM_ID,
  POST_HOTEL,
  PATCH_HOTEL,
  DELETE_HOTEL,
} from "./types";
import axios from "axios";
import { toast } from "react-toastify";

const baseURL = "http://127.0.0.1:8000";
const hotelConfig = {
  headers: {
    "content-type": "multipart/form-data",
  },
};

export const getHotels = () => async (dispatch) => {
  axios
    .get(`${baseURL}/api/hotels/`)
    .then((res) => {
      dispatch({
        type: GET_HOTELS,
        payload: res.data,
      });
      console.log("Get hotels successfully");
      console.log(res.data);
    })
    .catch((err) => console.log(`Get hotels failed ! | ${err}`));
};

export const searchHotels = (queryString) => async (dispatch) => {
  axios
    .get(`${baseURL}/api/hotels/search/${queryString}`)
    .then((res) => {
      dispatch({
        type: SEARCH_HOTELS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(`Search hotels failed ! | ${err}`));
};

export const getHotelByRoomId = (room_id) => async (dispatch) => {
  axios
    .get(`${baseURL}/api/hotels/rooms/?id=${room_id}`)
    .then((res) => {
      axios
        .get(`${baseURL}/api/hotels/?id=${res.data.hotel_id}`)
        .then((resp) => {
          dispatch({
            type: GET_HOTEL_BY_ROOM_ID,
            payload: resp.data,
          });
          console.log("Get hotel by room id successfully");
          console.log(resp.data);
        })
        .catch((err) => console.log(`Get hotels failed ! | ${err}`));
    })
    .catch((err) => console.log(`Get rooms failed ! | ${err}`));
};

export const postHotel = (data) => async (dispatch) => {
  axios
    .post(`${baseURL}/api/hotels/`, data, hotelConfig)
    .then((res) => {
      dispatch({
        type: POST_HOTEL,
        payload: res.data,
      });
      toast.success(`Post hotel ${res.data.name} successfully`);
      console.log(res.data);
    })
    .catch((err) => toast.warning(`Post hotel failed ! | ${err}`));
};

export const patchHotel = (id, data) => async (dispatch) => {
  axios
    .patch(`${baseURL}/api/hotels/?id=${id}`, data, hotelConfig)
    .then((res) => {
      dispatch({
        type: PATCH_HOTEL,
        payload: res.data,
      });
      toast.success(`Edit hotel ${res.data.name} successfully`);
      console.log(res.data);
    })
    .catch((err) => toast.warning(`Edit hotel failed ! | ${err}`));
};

export const deleteHotel = (id) => async (dispatch) => {
  axios
    .delete(`${baseURL}/api/hotels/?id=${id}`)
    .then((res) => {
      dispatch({
        type: DELETE_HOTEL,
        payload: id, //send id to reducers to update the state
      });
      toast.success("Deleted successfully");
    })
    .catch((err) => {
      console.log(`Delete hotels failed ! | ${err}`);
      toast.warning("Deleted failure");
    });
};
