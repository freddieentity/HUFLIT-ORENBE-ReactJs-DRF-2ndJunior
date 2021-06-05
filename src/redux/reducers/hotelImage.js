import {
  GET_HOTEL_IMAGES,
  GET_HOTEL_IMAGES_BY_HOTEL_ID,
  POST_HOTEL_IMAGE,
  PATCH_HOTEL_IMAGE,
  DELETE_HOTEL_IMAGE,
} from "../actions/types";

const initialState = {
  images: [],
  hotelImages: [],
};

export default function foo(state = initialState, action) {
  switch (action.type) {
    case GET_HOTEL_IMAGES:
      return {
        ...state,
        images: action.payload,
      };
    case GET_HOTEL_IMAGES_BY_HOTEL_ID:
      return {
        ...state,
        hotelImages: action.payload,
      };
    case POST_HOTEL_IMAGE:
      return {
        ...state,
        images: [...state.images, action.payload],
      };
    case PATCH_HOTEL_IMAGE:
      const index = state.images.findIndex(
        (hotel) => hotel.id === action.payload.id
      ); // get the index
      //slice the array to find the between spot for the patched record
      const updatedState = [
        ...state.images.slice(0, index),
        ...state.images.slice(index + 1),
      ];
      //put the patched record into the spot sliced
      const finalState = [...updatedState, { ...action.payload }];
      return {
        ...state,
        images: finalState,
      };
    case DELETE_HOTEL_IMAGE:
      return {
        ...state,
        images: state.images.filter((image) => image.id !== action.payload), //return anything but the id we removed
      };
    default:
      return state;
  }
}
