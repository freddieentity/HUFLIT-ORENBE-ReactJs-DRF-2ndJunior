import {
  GET_BOOKINGS,
  GET_BOOKINGS_BY_USER,
  GET_BOOKINGS_BY_PARTNER,
  GET_BOOKINGS_BY_ROOM,
  POST_BOOKING,
  PATCH_BOOKING,
  DELETE_BOOKING,
} from "../actions/types";

const initialState = {
  bookings: [],
  guestBookings: [],
  partnerBookings: [],
  roomBookings: [],
};

export default function foo(state = initialState, action) {
  switch (action.type) {
    case GET_BOOKINGS:
      return {
        ...state,
        bookings: action.payload,
      };
    case GET_BOOKINGS_BY_USER:
      return {
        ...state,
        guestBookings: action.payload,
      };
    case GET_BOOKINGS_BY_PARTNER:
      return {
        ...state,
        partnerBookings: action.payload,
      };
    case GET_BOOKINGS_BY_ROOM:
      return {
        ...state,
        roomBookings: action.payload,
      };
    case POST_BOOKING:
      return {
        ...state,
        bookings: [...state.bookings, action.payload],
      };
    case PATCH_BOOKING:
      const index = state.bookings.findIndex((b) => b.id === action.payload.id); // get the index
      //slice the array to find the between spot for the patched record
      const updatedState = [
        ...state.bookings.slice(0, index),
        ...state.bookings.slice(index + 1),
      ];
      //put the patched record into the spot sliced
      const finalState = [...updatedState, { ...action.payload }];

      const index1 = state.partnerBookings.findIndex(
        (b) => b.id === action.payload.id
      ); // get the index
      //slice the array to find the between spot for the patched record
      const updatedState1 = [
        ...state.partnerBookings.slice(0, index1),
        ...state.partnerBookings.slice(index1 + 1),
      ];
      //put the patched record into the spot sliced
      const finalState1 = [...updatedState1, { ...action.payload }];

      const index2 = state.guestBookings.findIndex(
        (b) => b.id === action.payload.id
      ); // get the index
      //slice the array to find the between spot for the patched record
      const updatedState2 = [
        ...state.guestBookings.slice(0, index2),
        ...state.guestBookings.slice(index2 + 1),
      ];
      //put the patched record into the spot sliced
      const finalState2 = [...updatedState2, { ...action.payload }];
      return {
        ...state,
        bookings: finalState,
        partnerBookings: finalState1,
        guestBookings: finalState2,
      };
    case DELETE_BOOKING:
      return {
        ...state,
        bookings: state.bookings.filter((b) => b.id !== action.payload), //return anything but the id we removed
      };
    default:
      return state;
  }
}
