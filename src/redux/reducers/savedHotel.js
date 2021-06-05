import {
  POST_SAVED_HOTEL,
  DELETE_SAVED_HOTEL,
  GET_SAVED_HOTELS_BY_USER,
} from "../actions/types";

const initialState = {
  savedHotels: [],
};

export default function foo(state = initialState, action) {
  switch (action.type) {
    case GET_SAVED_HOTELS_BY_USER:
      return {
        ...state,
        savedHotels: action.payload,
      };
    case POST_SAVED_HOTEL:
      return {
        ...state,
        savedHotels: [...state.savedHotels, action.payload],
      };
    case DELETE_SAVED_HOTEL:
      return {
        ...state,
        savedHotels: state.savedHotels.filter((sh) => sh.id !== action.payload), //return anything but the id we removed
      };
    default:
      return state;
  }
}
