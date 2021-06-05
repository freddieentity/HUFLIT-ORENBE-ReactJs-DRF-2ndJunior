import {
  GET_HOTELS,
  SEARCH_HOTELS,
  GET_HOTEL_BY_ROOM_ID,
  DELETE_HOTEL,
  POST_HOTEL,
  PATCH_HOTEL,
} from "../actions/types";

const initialState = {
  hotels: [],
  hotelRoom: {},
  hotelsFiltered: [],
};

export default function foo(state = initialState, action) {
  switch (action.type) {
    case GET_HOTELS:
      return {
        ...state,
        hotels: action.payload,
      };
    case SEARCH_HOTELS:
      return {
        ...state,
        hotelsFiltered: action.payload,
      };
    case GET_HOTEL_BY_ROOM_ID:
      return {
        ...state,
        hotelRoom: action.payload,
      };
    case POST_HOTEL:
      return {
        ...state,
        hotels: [...state.hotels, action.payload],
      };
    case PATCH_HOTEL:
      const index = state.hotels.findIndex(
        (hotel) => hotel.id === action.payload.id
      ); // get the index
      //slice the array to find the between spot for the patched record
      const updatedState = [
        ...state.hotels.slice(0, index),
        ...state.hotels.slice(index + 1),
      ];
      //put the patched record into the new one
      const finalState = [...updatedState, { ...action.payload }];
      return {
        ...state,
        hotels: finalState,
      };
    case DELETE_HOTEL:
      return {
        ...state,
        hotels: state.hotels.filter((hotel) => hotel.id !== action.payload), //return anything but the id we removed
      };
    default:
      return state;
  }
}
