import { GET_ROOM_IMAGES, POST_ROOM_IMAGE, DELETE_ROOM_IMAGE } from "./types";
import axios from "axios";
import { toast } from "react-toastify";

const baseURL = process.env.REACT_APP_BACKEND_API;
const roomImageConfig = {
  headers: {
    "content-type": "multipart/form-data",
  },
};

export const getRoomImages = () => async (dispatch) => {
  axios
    .get(`${baseURL}/api/hotels/roomimages/`)
    .then((res) => {
      dispatch({
        type: GET_ROOM_IMAGES,
        payload: res.data,
      });
      console.log("Get room images successfully");
      console.log(res.data);
    })
    .catch((err) => console.log(`Get hotel images failed ! | ${err}`));
};

export const postRoomImage = (data) => async (dispatch) => {
  axios
    .post(`${baseURL}/api/hotels/roomimages/`, data, roomImageConfig)
    .then((res) => {
      dispatch({
        type: POST_ROOM_IMAGE,
        payload: res.data,
      });
      console.log(res.data);
      toast.success(`Post images for room "${res.data.name}" successfully`);
    })
    .catch((err) => toast.warning(`Post room failed ! | ${err}`));
};

export const deleteRoomImage = (id) => async (dispatch) => {
  axios
    .delete(`${baseURL}/api/hotels/hotelimages/?id=${id}`)
    .then((res) => {
      dispatch({
        type: DELETE_ROOM_IMAGE,
        payload: id,
      });
      toast.success(`Deleted room ID:${id} successfully`);
    })
    .catch((err) => {
      console.log(`Delete room failed ! | ${err}`);
      toast.warning("Deleted failure");
    });
};
