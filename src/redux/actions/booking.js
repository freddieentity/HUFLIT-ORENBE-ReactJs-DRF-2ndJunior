import { toast } from "react-toastify";
import {
  GET_BOOKINGS,
  GET_BOOKINGS_BY_USER,
  GET_BOOKINGS_BY_PARTNER,
  POST_BOOKING,
  PATCH_BOOKING,
  DELETE_BOOKING,
  GET_BOOKINGS_BY_ROOM,
} from "./types";
import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_API;

export const getBookings = () => async (dispatch) => {
  axios
    .get(`${baseURL}/api/hotels/booking/`)
    .then((res) => {
      dispatch({
        type: GET_BOOKINGS,
        payload: res.data,
      });
      console.log("Get bookings successfully");
      console.log(res.data);
    })
    .catch((err) => console.log(`Get bookings failed ! | ${err}`));
};

export const getBookingsByUser = (email) => async (dispatch) => {
  axios
    .get(`${baseURL}/api/hotels/guestbooking/?email=${email}`)
    .then((res) => {
      dispatch({
        type: GET_BOOKINGS_BY_USER,
        payload: res.data,
      });
      console.log("Get guest bookings successfully");
      console.log(res.data);
    })
    .catch((err) => console.log(`Get guest bookings failed ! | ${err}`));
};

export const getBookingsByPartner = (email) => async (dispatch) => {
  axios
    .get(`${baseURL}/api/hotels/partnerbooking/?email=${email}`)
    .then((res) => {
      dispatch({
        type: GET_BOOKINGS_BY_PARTNER,
        payload: res.data,
      });
      console.log("Get partner bookings successfully");
      console.log(res.data);
    })
    .catch((err) => console.log(`Get partner bookings failed ! | ${err}`));
};

export const getBookingsByRoom = (room_id) => async (dispatch) => {
  axios
    .get(`${baseURL}/api/hotels/roombooking/?room_id=${room_id}`)
    .then((res) => {
      dispatch({
        type: GET_BOOKINGS_BY_ROOM,
        payload: res.data,
      });
      console.log("Get room bookings successfully");
      console.log(res.data);
    })
    .catch((err) => console.log(`Get room bookings failed ! | ${err}`));
};

export const postBooking = (data) => async (dispatch) => {
  axios
    .post(`${baseURL}/api/hotels/booking/`, data)
    .then((res) => {
      dispatch({
        type: POST_BOOKING,
        payload: res.data,
      });
      toast.success(`Create booking successfully`);
      console.log(res.data);
    })
    .catch((err) => toast.warning(`Create booking failed ! | ${err}`));
};

export const patchBooking = (id, data) => async (dispatch) => {
  axios
    .patch(`${baseURL}/api/hotels/booking/?id=${id}`, data)
    .then((res) => {
      dispatch({
        type: PATCH_BOOKING,
        payload: res.data,
      });
      toast.success(`Editing booking successfully!`);
      console.log(res.data);
    })
    .catch((err) => toast.warning(`Editing booking failed ! | ${err}`));
};

export const deleteBooking = (id) => async (dispatch) => {
  axios
    .delete(`${baseURL}/api/hotels/booking/?id=${id}`)
    .then((res) => {
      dispatch({
        type: DELETE_BOOKING,
        payload: id, //send id to reducers to update the state
      });
      toast.success(`Deleted booking ID: "${id}" successfully`);
    })
    .catch((err) => {
      toast.warning("Deleted failure");
    });
};
