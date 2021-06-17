import { toast } from "react-toastify";
import {
  GET_ADDRESS_BY_HOTEL,
  POST_ADDRESS,
  PATCH_ADDRESS,
  DELETE_ADDRESS,
} from "./types";
import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_API;

export const getHotelAddressByHotel = (hotel_id) => async (dispatch) => {
  axios
    .get(`${baseURL}/api/hotels/addresses/?hotel_id=${hotel_id}`)
    .then((res) => {
      dispatch({
        type: GET_ADDRESS_BY_HOTEL,
        payload: res.data,
      });
      console.log("Get hotel addresses successfully");
      console.log(res.data);
    })
    .catch((err) => console.log(`Get hotel addresses failed ! | ${err}`));
};

export const postHotelAddress = (data) => async (dispatch) => {
  axios
    .post(`${baseURL}/api/hotels/addresses/`, data)
    .then((res) => {
      dispatch({
        type: POST_ADDRESS,
        payload: res.data,
      });
      toast.success(`Create an address "${res.data.full_address}"`);
      console.log(res.data);
    })
    .catch((err) => toast.warning(`Post address failed ! | ${err}`));
};

export const patchHotelAddress = (id, data) => async (dispatch) => {
  axios
    .patch(`${baseURL}/api/hotels/addresses/?id=${id}`, data)
    .then((res) => {
      dispatch({
        type: PATCH_ADDRESS,
        payload: res.data,
      });
      toast.success(
        `Editing address for hotel ID:${res.data.hotel_id} successfully!`
      );
      console.log(res.data);
    })
    .catch((err) => toast.warning(`Editing hotel address failed ! | ${err}`));
};

export const deleteHotelAddress = (id) => async (dispatch) => {
  axios
    .delete(`${baseURL}/api/hotels/addresses/?id=${id}`)
    .then((res) => {
      dispatch({
        type: DELETE_ADDRESS,
        payload: id, //send id to reducers to update the state
      });
      toast.success(`Deleted address ID: "${id}" successfully`);
    })
    .catch((err) => {
      toast.warning("Deleted failure");
    });
};
