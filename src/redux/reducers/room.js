import {
  GET_ROOMS,
  POST_ROOM,
  PATCH_ROOM,
  DELETE_ROOM,
  GET_ROOMS_BY_HOTEL_ID,
  GET_ROOM_BY_ID,
} from "../actions/types";

const initialState = {
  rooms: [],
  hotelRoomList: [],
  singleRoom: {},
};

export default function foo(state = initialState, action) {
  switch (action.type) {
    case GET_ROOMS:
      return {
        ...state,
        rooms: action.payload,
      };
    case GET_ROOMS_BY_HOTEL_ID:
      return {
        ...state,
        hotelRoomList: action.payload,
      };
    case GET_ROOM_BY_ID:
      return {
        ...state,
        singleRoom: action.payload,
      };
    case POST_ROOM:
      return {
        ...state,
        rooms: [...state.rooms, action.payload],
      };
    case PATCH_ROOM:
      const index = state.rooms.findIndex(
        (room) => room.id === action.payload.id
      ); // get the index
      //slice the array to find the between spot for the patched record
      const updatedState = [
        ...state.rooms.slice(0, index),
        ...state.rooms.slice(index + 1),
      ];
      //put the patched record into the new one
      const finalState = [...updatedState, { ...action.payload }];
      return {
        ...state,
        rooms: finalState,
      };
    case DELETE_ROOM:
      return {
        ...state,
        rooms: state.rooms.filter((room) => room.id !== action.payload), //return anything but the id we removed
      };
    default:
      return state;
  }
}
