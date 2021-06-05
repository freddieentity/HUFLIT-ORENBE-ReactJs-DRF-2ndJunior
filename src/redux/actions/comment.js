import { toast } from "react-toastify";
import {
  GET_COMMENTS_BY_HOTEL,
  GET_COMMENTS_BY_USER,
  POST_COMMENT,
  PATCH_COMMENT,
  DELETE_COMMENT,
} from "./types";
import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_API;

export const getCommentsByHotel = (hotel_id) => async (dispatch) => {
  axios
    .get(`${baseURL}/api/hotels/comments/?hotel_id=${hotel_id}`)
    .then((res) => {
      dispatch({
        type: GET_COMMENTS_BY_HOTEL,
        payload: res.data,
      });
      console.log("Get hotel's comments successfully");
      console.log(res.data);
    })
    .catch((err) => console.log(`Get hotel's comments failed ! | ${err}`));
};

export const getCommentsByUser = (email) => async (dispatch) => {
  axios
    .get(`${baseURL}/api/hotels/comments/?email=${email}`)
    .then((res) => {
      dispatch({
        type: GET_COMMENTS_BY_USER,
        payload: res.data,
      });
      console.log("Get hotel's comments of user successfully");
      console.log(res.data);
    })
    .catch((err) =>
      console.log(`Get hotel's comments of user failed ! | ${err}`)
    );
};

export const postComment = (data) => async (dispatch) => {
  axios
    .post(`${baseURL}/api/hotels/comments/`, data)
    .then((res) => {
      dispatch({
        type: POST_COMMENT,
        payload: res.data,
      });
      toast.success(`Comment on this hotel successfully `);
      console.log(res.data);
    })
    .catch((err) => toast.warning(`Comment on this hotel failed ! | ${err}`));
};

export const patchComment = (id, data) => async (dispatch) => {
  axios
    .patch(`${baseURL}/api/hotels/comments/?id=${id}`, data)
    .then((res) => {
      dispatch({
        type: PATCH_COMMENT,
        payload: res.data,
      });
      toast.success(`Editing comment successfully!`);
      console.log(res.data);
    })
    .catch((err) => toast.warning(`Editing comment failed ! | ${err}`));
};

export const deleteComment = (id) => async (dispatch) => {
  axios
    .delete(`${baseURL}/api/hotels/comments/?id=${id}`)
    .then((res) => {
      dispatch({
        type: DELETE_COMMENT,
        payload: id, //send id to reducers to update the state
      });
      toast.success(`Deleted comment successfully`);
    })
    .catch((err) => {
      toast.warning("Deleted comment failure");
    });
};
