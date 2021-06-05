import {
  GET_HOTEL_IMAGES,
  GET_HOTEL_IMAGES_BY_HOTEL_ID,
  POST_HOTEL_IMAGE,
  PATCH_HOTEL_IMAGE,
  DELETE_HOTEL_IMAGE,
} from "./types";
import axios from "axios";
import { toast } from "react-toastify";

const baseURL = "http://127.0.0.1:8000";
const hotelImageConfig = {
  headers: {
    "content-type": "multipart/form-data",
  },
};

export const getHotelImages = () => async (dispatch) => {
  axios
    .get(`${baseURL}/api/hotels/hotelimages/`)
    .then((res) => {
      dispatch({
        type: GET_HOTEL_IMAGES,
        payload: res.data,
      });
      console.log("Get hotel images successfully");
      console.log(res.data);
    })
    .catch((err) => console.log(`Get hotel images failed ! | ${err}`));
};

export const getHotelImagesByHotelId = (hotel_id) => async (dispatch) => {
  axios
    .get(`${baseURL}/api/hotels/hotelimages/?hotel_id=${hotel_id}`)
    .then((res) => {
      dispatch({
        type: GET_HOTEL_IMAGES_BY_HOTEL_ID,
        payload: res.data,
      });
      console.log("Get hotel images successfully");
      console.log(res.data);
    })
    .catch((err) => console.log(`Get hotel images failed ! | ${err}`));
};

export const postHotelImage = (data) => async (dispatch) => {
  axios
    .post(`${baseURL}/api/hotels/hotelimages/`, data, hotelImageConfig)
    .then((res) => {
      dispatch({
        type: POST_HOTEL_IMAGE,
        payload: res.data,
      });
      console.log(res.data);
    })
    .catch((err) => toast.warning(`Post hotel failed ! | ${err}`));
};

export const patchHotelImage = (id, data) => async (dispatch) => {
  axios
    .patch(
      `${baseURL}/api/hotels/hotelimages/?id=${id}`,
      data,
      hotelImageConfig
    )
    .then((res) => {
      dispatch({
        type: PATCH_HOTEL_IMAGE,
        payload: res.data,
      });
      toast.success(
        `Edit images for hotel ID:${res.data.hotel_id} successfully`
      );
      console.log(res.data);
    })
    .catch((err) => toast.warning(`Edit hotel images failed ! | ${err}`));
};

export const deleteHotelImage = (id) => async (dispatch) => {
  axios
    .delete(`${baseURL}/api/hotels/hotelimages/?id=${id}`)
    .then((res) => {
      dispatch({
        type: DELETE_HOTEL_IMAGE,
        payload: id, //send id to reducers to update the state
      });
      toast.success(`Deleted hotel ID:${id} successfully`);
    })
    .catch((err) => {
      console.log(`Delete hotels failed ! | ${err}`);
      toast.warning("Deleted failure");
    });
};
