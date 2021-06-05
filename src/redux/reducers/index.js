import { combineReducers } from "redux";
import auth from "./auth";
import hotel from "./hotel";
import hotelImage from "./hotelImage";
import room from "./room";
import roomImage from "./roomImage";
import hotelAddress from "./hotelAddress";
import hotelAmenity from "./hotelAmenity";
import roomAmenity from "./roomAmenity";
import booking from "./booking";
import savedHotel from "./savedHotel";
import comment from "./comment";

export default combineReducers({
  comment,
  savedHotel,
  booking,
  hotelAmenity,
  roomAmenity,
  hotelAddress,
  roomImage,
  room,
  hotelImage,
  hotel,
  auth,
});
