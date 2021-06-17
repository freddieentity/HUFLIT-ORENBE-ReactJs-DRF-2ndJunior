import {
  GET_HOTELS,
  SEARCH_HOTELS,
  GET_HOTELS_BY_PARTNER,
  GET_HOTEL_BY_ROOM_ID,
  DELETE_HOTEL,
  POST_HOTEL,
  PATCH_HOTEL,
} from "../actions/types";

const initialState = {
  hotels: [],
  hotelRoom: {},
  hotelsFiltered: [],
  partnerHotels: [],
};

export default function foo(state = initialState, action) {
  switch (action.type) {
    case GET_HOTELS:
      return {
        ...state,
        hotels: action.payload,
      };
    case GET_HOTELS_BY_PARTNER:
      return {
        ...state,
        partnerHotels: action.payload,
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
        partnerHotels: [...state.hotels, action.payload],
      };
    case PATCH_HOTEL:
      const index = state.partnerHotels.findIndex(
        (hotel) => hotel.id === action.payload.id
      );
      const updatedState = [
        ...state.partnerHotels.slice(0, index),
        ...state.partnerHotels.slice(index + 1),
      ];
      const finalState = [...updatedState, { ...action.payload }];
      return {
        ...state,
        partnerHotels: finalState,
      };
    case DELETE_HOTEL:
      return {
        ...state,
        partnerHotels: state.hotels.filter(
          (hotel) => hotel.id !== action.payload
        ),
      };
    default:
      return state;
  }
}
