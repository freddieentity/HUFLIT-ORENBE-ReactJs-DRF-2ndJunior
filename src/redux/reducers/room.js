import {
  GET_ROOMS,
  POST_ROOM,
  PATCH_ROOM,
  DELETE_ROOM,
  GET_ROOMS_BY_HOTEL_ID,
  GET_ROOM_BY_ID,
  GET_ROOMS_BY_PARTNER,
} from "../actions/types";

const initialState = {
  rooms: [],
  hotelRoomList: [],
  singleRoom: {},
  partnerRoomList: [],
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
    case GET_ROOMS_BY_PARTNER:
      return {
        ...state,
        partnerRoomList: action.payload,
      };
    case GET_ROOM_BY_ID:
      return {
        ...state,
        singleRoom: action.payload,
      };
    case POST_ROOM:
      return {
        ...state,
        partnerRoomList: [...state.partnerRoomList, action.payload],
      };
    case PATCH_ROOM:
      const index = state.partnerRoomList.findIndex(
        (room) => room.id === action.payload.id
      );
      const updatedState = [
        ...state.partnerRoomList.slice(0, index),
        ...state.partnerRoomList.slice(index + 1),
      ];
      const finalState = [...updatedState, { ...action.payload }];
      return {
        ...state,
        partnerRoomList: finalState,
      };
    case DELETE_ROOM:
      return {
        ...state,
        partnerRoomList: state.partnerRoomList.filter(
          (room) => room.id !== action.payload
        ),
      };
    default:
      return state;
  }
}
