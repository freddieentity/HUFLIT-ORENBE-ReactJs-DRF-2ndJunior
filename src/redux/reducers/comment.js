import {
  GET_COMMENTS_BY_USER,
  POST_COMMENT,
  PATCH_COMMENT,
  DELETE_COMMENT,
  GET_COMMENTS_BY_HOTEL,
} from "../actions/types";

const initialState = {
  userComments: [],
  hotelComments: [],
};

export default function foo(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS_BY_USER:
      return {
        ...state,
        userComments: action.payload,
      };
    case GET_COMMENTS_BY_HOTEL:
      return {
        ...state,
        hotelComments: action.payload,
      };
    case POST_COMMENT:
      return {
        ...state,
        userComments: [...state.userComments, action.payload],
        hotelComments: [...state.hotelComments, action.payload],
      };
    case PATCH_COMMENT:
      const index = state.userComments.findIndex(
        (hc) => hc.id === action.payload.id
      ); // get the index
      //slice the array to find the between spot for the patched record
      const updatedState = [
        ...state.userComments.slice(0, index),
        ...state.userComments.slice(index + 1),
      ];
      //put the patched record into the spot sliced
      const finalState = [...updatedState, { ...action.payload }];
      const index1 = state.hotelComments.findIndex(
        (hc) => hc.id === action.payload.id
      ); // get the index
      //slice the array to find the between spot for the patched record
      const updatedState1 = [
        ...state.hotelComments.slice(0, index1),
        ...state.hotelComments.slice(index1 + 1),
      ];
      //put the patched record into the spot sliced
      const finalState1 = [...updatedState1, { ...action.payload }];
      return {
        ...state,
        userComments: finalState,
        hotelComments: finalState1,
      };
    case DELETE_COMMENT:
      return {
        ...state,
        userComments: state.userComments.filter((c) => c.id !== action.payload),
        hotelComments: state.hotelComments.filter(
          (c) => c.id !== action.payload
        ),
      };
    default:
      return state;
  }
}
