import axios from "axios";
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  PATCH_USER,
} from "./types";
import { toast } from "react-toastify";
const baseURL = process.env.REACT_APP_BACKEND_API;
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const patchUser = (email, data) => async (dispatch) => {
  axios
    .patch(`${baseURL}/api/accounts/userinfo/?email=${email}`, data)
    .then((res) => {
      dispatch({
        type: PATCH_USER,
        payload: res.data,
      });
      toast.success(`Change user info successfully!`);
      console.log(res.data);
    })
    .catch((err) => toast.warning(`Change user info failed ! | ${err}`));
};

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post(`${baseURL}/api/token`, body, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      toast.success(`Login successfully`);
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
      });

      toast.error(`Login failed`);
    }
  };

export const signup =
  ({ name, email, password, password2 }) =>
  async (dispatch) => {
    const body = JSON.stringify({ name, email, password, password2 });

    try {
      const res = await axios.post(
        `http://127.0.0.1:8000/api/accounts/signup`,
        body,
        config
      );

      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data,
      });

      toast.success(`Signup successfully`);
    } catch (err) {
      dispatch({
        type: SIGNUP_FAIL,
      });
      toast.error(`Signup failed`);
    }
  };

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
