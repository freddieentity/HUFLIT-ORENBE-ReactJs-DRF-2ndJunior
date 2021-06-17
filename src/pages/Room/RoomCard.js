import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import SquareFootIcon from "@material-ui/icons/SquareFoot";
import Typography from "@material-ui/core/Typography";
import { Paper } from "@material-ui/core";
import { Col, Image, Row } from "antd";
import { Link } from "react-router-dom";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { addDays } from "date-fns";

const baseURL = process.env.REACT_APP_BACKEND_API;

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    minWidth: "95%",
    minHeight: "95%",
    margin: "1% 1% 1% 1%",
  },
  book: {
    maxWidth: "95%",
    minHeight: "95%",
    margin: "1% 1% 1% 1%",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "95%",
    minHeight: "95%",
    margin: "1% 1% 1% 1%",
  },
  content: {
    textAlign: "left",
  },
  cover: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "cover",
    display: "flex",
    alignItems: "center",
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default function RoomCard({ room }) {
  const classes = useStyles();
  const [rB, setRB] = useState([]);
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  let dateArray = [];
  function getDates(startDate, stopDate) {
    var currentDate = Date.parse(startDate);
    while (currentDate <= Date.parse(stopDate)) {
      dateArray.push(formatDate(currentDate));
      currentDate = addDays(currentDate, 1);
    }
  }

  useEffect(() => {
    axios
      .get(`${baseURL}/api/hotels/roombooking/?room_id=${room.id}`)
      .then((res) => {
        console.log("Get room bookings successfully");
        setRB(res.data);
      })
      .catch((err) => console.log(`Get room bookings failed ! | ${err}`));
  }, [room.id]);

  rB.forEach((rb) => getDates(rb.checkin, rb.checkout));

  const renderDateFunction = (renderDate) => {
    if (dateArray?.includes(formatDate(renderDate))) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <>
      <Row span={24}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Room Timeline"
            initialFocusedDate={sessionStorage.getItem("checkin")}
            format="yyyy-MM-dd"
            fullWidth
            disablePast={true}
            shouldDisableDate={renderDateFunction}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
      </Row>
      <Row span={24}>
        <Col span={12}>
          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent>
                <Paper className={classes.cover}>
                  <Image src={`${baseURL}${room.main_photo}`} />
                </Paper>
              </CardContent>
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card className={classes.book}>
            <Link to={`/rooms/${room.slug}`} style={{ color: "black" }}>
              <CardContent className={classes.content}>
                <Typography>{room.name}</Typography>
                <div className={classes.flex}>
                  <Typography color="textSecondary">
                    <SquareFootIcon />
                    {room.square}
                  </Typography>
                  <Typography color="textSecondary">
                    <SupervisorAccountIcon />
                    {room.guest_quantity}
                  </Typography>
                </div>
                <Typography>
                  <h4>${room.base_price_per_night}</h4>
                </Typography>
              </CardContent>
            </Link>
            <CardContent>
              {room.is_available ? (
                <Link to={`/booking/${room.id}`} style={{ color: "white" }}>
                  <button className="custom-button">Book Now!</button>
                </Link>
              ) : (
                <Link to={`/search/`} style={{ color: "#942e26" }}>
                  <button className="custom-button">Unavailable</button>
                </Link>
              )}
            </CardContent>
          </Card>
        </Col>
      </Row>
    </>
  );
}
