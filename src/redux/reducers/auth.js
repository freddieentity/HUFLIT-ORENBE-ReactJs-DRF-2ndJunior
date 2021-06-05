import {
  SIGNUP_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT,
  SIGNUP_FAIL,
  LOGIN_FAIL,
  PATCH_USER,
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
          email: payload.email,
          name: payload.name,
          is_partner: payload.is_partner,
          firstname: payload.firstname,
          middlename: payload.middlename,
          lastname: payload.lastname,
          phone: payload.phone,
          avatar: payload.avatar,
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
        email: "",
        name: "",
        is_partner: false,
        firstname: "",
        middlename: "",
        lastname: "",
        phone: "",
        avatar: "",
      };
    default:
      return state;
  }
}
