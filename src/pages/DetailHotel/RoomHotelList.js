import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getRoomsByHotelId } from "../../redux/actions/room";
import RoomCard from "../Room/RoomCard";

function RoomHotelList({ hotelId, hotelRoomList, getRoomsByHotelId }) {
  useEffect(() => {
    getRoomsByHotelId(hotelId);
  }, [hotelId, getRoomsByHotelId]);

  return (
    <div>
      {hotelRoomList &&
        hotelRoomList.map((room) => {
          return <RoomCard room={room} />;
        })}
    </div>
  );
}

const mapStateToProps = (state) => ({
  hotelRoomList: state.room.hotelRoomList,
});

export default connect(mapStateToProps, {
  getRoomsByHotelId,
})(RoomHotelList);
