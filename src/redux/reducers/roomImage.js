import {
  GET_ROOM_IMAGES,
  POST_ROOM_IMAGE,
  DELETE_ROOM_IMAGE,
} from "../actions/types";

const initialState = {
  roomImages: [],
};

export default function foo(state = initialState, action) {
  switch (action.type) {
    case GET_ROOM_IMAGES:
      return {
        ...state,
        roomImages: action.payload,
      };
    case POST_ROOM_IMAGE:
      return {
        ...state,
        roomImages: [...state.roomImages, action.payload],
      };
    case DELETE_ROOM_IMAGE:
      return {
        ...state,
        roomImages: state.roomImages.filter(
          (roomImage) => roomImage.id !== action.payload
        ), //return anything but the id we removed
      };
    default:
      return state;
  }
}
