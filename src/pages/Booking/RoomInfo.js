import { Paper, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { FaHotel } from "react-icons/fa";
import RoomInfoCard from "./RoomInfoCard";

const style = makeStyles((theme) => ({
  box: {
    position: "relative",
    marginTop: "40% 4% 4% 4%",
    padding: "2% 2% 2% 2%",
    background: theme.palette.background.default,
  },
}));

function RoomInfo({ singleRoom, hotelRoom }) {
  const classes = style();

  console.log(hotelRoom);
  return (
    <Paper className={classes.box} square>
      <Typography
        variant="h5"
        component="h1"
        noWrap
        style={{ color: "#445A67", textAlign: "center", margin: "1% 1% 1% 1%" }}
      >
        <FaHotel />
      </Typography>
      <Typography
        variant="h5"
        component="h1"
        noWrap
        style={{
          color: "#96B3C2",
          textAlign: "center",
          margin: "1% 1% 1% 1%",
        }}
      >
        <strong>{hotelRoom.name}</strong>
      </Typography>
      <RoomInfoCard room={singleRoom} />
    </Paper>
  );
}

const mapStateToProps = (state) => ({
  singleRoom: state.room.singleRoom,
  hotelRoom: state.hotel.hotelRoom,
});

export default connect(mapStateToProps)(RoomInfo);
