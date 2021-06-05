import {
  GET_ROOM_AMENITIES,
  POST_ROOM_AMENITY,
  PATCH_ROOM_AMENITY,
  DELETE_ROOM_AMENITY,
} from "../actions/types";

const initialState = {
  roomAmenities: [],
};

export default function foo(state = initialState, action) {
  switch (action.type) {
    case GET_ROOM_AMENITIES:
      return {
        ...state,
        roomAmenities: action.payload,
      };
    case POST_ROOM_AMENITY:
      return {
        ...state,
        roomAmenities: [...state.roomAmenities, action.payload],
      };
    case PATCH_ROOM_AMENITY:
      const index = state.roomAmenities.findIndex(
        (roomAmenity) => roomAmenity.id === action.payload.id
      ); // get the index
      //slice the array to find the between spot for the patched record
      const updatedState = [
        ...state.roomAmenities.slice(0, index),
        ...state.roomAmenities.slice(index + 1),
      ];
      //put the patched record into the spot sliced
      const finalState = [...updatedState, { ...action.payload }];
      return {
        ...state,
        roomAmenities: finalState,
      };
    case DELETE_ROOM_AMENITY:
      return {
        ...state,
        roomAmenities: state.roomAmenities.filter(
          (roomAmenity) => roomAmenity.id !== action.payload
        ), //return anything but the id we removed
      };
    default:
      return state;
  }
}
