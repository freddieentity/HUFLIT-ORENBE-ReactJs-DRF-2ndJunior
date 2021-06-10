import {
  SIGNUP_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT,
  SIGNUP_FAIL,
  LOGIN_FAIL,
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
} from "../actions/types";

const initialState = {
  token: sessionStorage.getItem("token"),
  isAuthenticated: sessionStorage.getItem("token") ? true : false,
  loading: false,
  user: {},
};

export default function foo(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case AUTHENTICATED_FAIL:
      return {
        ...state,
        isAuthenticated: false,
      };
    case USER_LOADED_SUCCESS:
      return {
        ...state,
        user: payload,
      };
    case USER_LOADED_FAIL:
      return {
        ...state,
        user: {},
      };
    case FACEBOOK_AUTH_SUCCESS:
    case LOGIN_SUCCESS:
      sessionStorage.setItem("token", payload.access);
      sessionStorage.setItem("email", payload.email);
      sessionStorage.setItem("name", payload.name);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        token: payload.access,
        user: {
          is_partner: payload.is_partner,
        },
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        loading: true,
      };
    case PATCH_USER:
      return {
        ...state,
        user: { ...payload },
      };
    case SIGNUP_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("name");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: {},
      };
    case PASSWORD_RESET_SUCCESS:
    case PASSWORD_RESET_FAIL:
    case PASSWORD_RESET_CONFIRM_SUCCESS:
    case PASSWORD_RESET_CONFIRM_FAIL:
    case FACEBOOK_AUTH_FAIL:
    case ACTIVATION_SUCCESS:
    case ACTIVATION_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}
