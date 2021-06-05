import {
  GET_HOTEL_AMENITIES,
  POST_HOTEL_AMENITY,
  PATCH_HOTEL_AMENITY,
  DELETE_HOTEL_AMENITY,
} from "../actions/types";

const initialState = {
  hotelAmenities: [],
};

export default function foo(state = initialState, action) {
  switch (action.type) {
    case GET_HOTEL_AMENITIES:
      return {
        ...state,
        hotelAmenities: action.payload,
      };
    case POST_HOTEL_AMENITY:
      return {
        ...state,
        hotelAmenities: [...state.hotelAmenities, action.payload],
      };
    case PATCH_HOTEL_AMENITY:
      const index = state.hotelAmenities.findIndex(
        (hotelAmenity) => hotelAmenity.id === action.payload.id
      ); // get the index
      //slice the array to find the between spot for the patched record
      const updatedState = [
        ...state.hotelAmenities.slice(0, index),
        ...state.hotelAmenities.slice(index + 1),
      ];
      //put the patched record into the spot sliced
      const finalState = [...updatedState, { ...action.payload }];
      return {
        ...state,
        hotelAmenities: finalState,
      };
    case DELETE_HOTEL_AMENITY:
      return {
        ...state,
        hotelAmenities: state.hotelAmenities.filter(
          (hotelAmenity) => hotelAmenity.id !== action.payload
        ), //return anything but the id we removed
      };
    default:
      return state;
  }
}
