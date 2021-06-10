import axios from "axios";
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  PATCH_USER,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  FACEBOOK_AUTH_SUCCESS,
  FACEBOOK_AUTH_FAIL,
} from "./types";
import { toast } from "react-toastify";
import peak from "../../constants/peak";
const baseURL = process.env.REACT_APP_BACKEND_API;
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const checkAuthenticated = () => async (dispatch) => {
  if (sessionStorage.getItem("token")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const body = JSON.stringify({ token: sessionStorage.getItem("token") });

    try {
      const res = await axios.post(`${baseURL}/auth/jwt/verify/`, body, config);

      if (res.data.code !== "token_not_valid") {
        dispatch({
          type: AUTHENTICATED_SUCCESS,
        });
      } else {
        dispatch({
          type: AUTHENTICATED_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: AUTHENTICATED_FAIL,
      });
    }
  } else {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
  }
};

export const load_user = () => async (dispatch) => {
  if (sessionStorage.getItem("token")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${sessionStorage.getItem("token")}`,
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(`${baseURL}/auth/users/me/`, config);

      dispatch({
        type: USER_LOADED_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USER_LOADED_FAIL,
      });
    }
  } else {
    dispatch({
      type: USER_LOADED_FAIL,
    });
  }
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
      const res = await axios.post(`${baseURL}/auth/jwt/create/`, body, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(load_user());
      toast.success(`Login successfully`);
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
      });

      toast.error(`Login failed`);
    }
  };

export const signup =
  ({ name, email, password, re_password }) =>
  async (dispatch) => {
    const body = JSON.stringify({ name, email, password, re_password });

    try {
      const res = await axios.post(`${baseURL}/auth/users/`, body, config);

      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data,
      });

      toast.success(`Signup successfully. Check your email to verify account!`);
    } catch (err) {
      dispatch({
        type: SIGNUP_FAIL,
      });
      toast.error(`Signup failed`);
    }
  };

export const verify = (uid, token) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ uid, token });

  try {
    await axios.post(`${baseURL}/auth/users/activation/`, body, config);

    peak("info", "Account Verified");
    dispatch({
      type: ACTIVATION_SUCCESS,
    });
  } catch (err) {
    peak("error", "Account Verification Failed");
    dispatch({
      type: ACTIVATION_FAIL,
    });
  }
};

export const reset_password = (email) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email });

  try {
    await axios.post(`${baseURL}/auth/users/reset_password/`, body, config);

    dispatch({
      type: PASSWORD_RESET_SUCCESS,
    });
    peak("success", "Request Sent");
  } catch (err) {
    dispatch({
      type: PASSWORD_RESET_FAIL,
    });
    peak("error", "Request Failed");
  }
};

export const reset_password_confirm =
  (uid, token, new_password, re_new_password) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
      await axios.post(
        `${baseURL}/auth/users/reset_password_confirm/`,
        body,
        config
      );
      peak("success", "Password Reset Successfully");

      dispatch({
        type: PASSWORD_RESET_CONFIRM_SUCCESS,
      });
    } catch (err) {
      peak("error", "Password Reset Failed");
      dispatch({
        type: PASSWORD_RESET_CONFIRM_FAIL,
      });
    }
  };

export const facebookAuthenticate = (state, code) => async (dispatch) => {
  if (state && code && !sessionStorage.getItem("token")) {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const details = {
      state: state,
      code: code,
    };

    const formBody = Object.keys(details)
      .map(
        (key) =>
          encodeURIComponent(key) + "=" + encodeURIComponent(details[key])
      )
      .join("&");

    try {
      const res = await axios.post(
        `${baseURL}/auth/o/facebook/?${formBody}`,
        config
      );

      dispatch({
        type: FACEBOOK_AUTH_SUCCESS,
        payload: res.data,
      });
      peak("info", "Login using Facebook successfully!");

      dispatch(load_user());
    } catch (err) {
      dispatch({
        type: FACEBOOK_AUTH_FAIL,
      });
      peak("error", "Login using Facebook failed!");
    }
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
