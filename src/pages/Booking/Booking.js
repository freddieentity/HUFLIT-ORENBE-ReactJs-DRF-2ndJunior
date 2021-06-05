import React, { useEffect } from "react";
import Footer from "./Footer";
import Main from "./Main";
import Header from "./Header";
import { connect } from "react-redux";
import { getRoom } from "../../redux/actions/room";
import { getHotelByRoomId } from "../../redux/actions/hotel";
import { getBookingsByRoom } from "../../redux/actions/booking";

function Booking({ match, getRoom, getHotelByRoomId, getBookingsByRoom }) {
  useEffect(() => {
    getRoom(match.params.room_id);
    getHotelByRoomId(match.params.room_id);
    getBookingsByRoom(match.params.room_id);
  }, [getRoom, getHotelByRoomId, getBookingsByRoom, match.params.room_id]);
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {
  getRoom,
  getHotelByRoomId,
  getBookingsByRoom,
})(Booking);
