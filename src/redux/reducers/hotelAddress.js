import {
  GET_ADDRESS_BY_HOTEL,
  POST_ADDRESS,
  PATCH_ADDRESS,
  DELETE_ADDRESS,
} from "../actions/types";

const initialState = {
  hotelAddresses: [],
};

export default function foo(state = initialState, action) {
  switch (action.type) {
    case GET_ADDRESS_BY_HOTEL:
      return {
        ...state,
        hotelAddresses: action.payload,
      };
    case POST_ADDRESS:
      return {
        ...state,
        hotelAddresses: [...state.hotelAddresses, action.payload],
      };
    case PATCH_ADDRESS:
      const index = state.hotelAddresses.findIndex(
        (hotel) => hotel.id === action.payload.id
      ); // get the index
      //slice the array to find the between spot for the patched record
      const updatedState = [
        ...state.hotelAddresses.slice(0, index),
        ...state.hotelAddresses.slice(index + 1),
      ];
      //put the patched record into the spot sliced
      const finalState = [...updatedState, { ...action.payload }];
      return {
        ...state,
        hotelAddresses: finalState,
      };
    case DELETE_ADDRESS:
      return {
        ...state,
        hotelAddresses: state.hotelAddresses.filter(
          (hotelAddress) => hotelAddress.id !== action.payload
        ), //return anything but the id we removed
      };
    default:
      return state;
  }
}
