import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import Dropdown from "../../components/Dropdown";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Navigation from "./Navigation";
import { getBookingsByUser, getBookings } from "../../redux/actions/booking";
import { getSavedHotelsByUser } from "../../redux/actions/savedHotel";

const useStyles = makeStyles({
  root: {
    width: 500,
  },
  nav: {
    padding: "60px 0 2% 0",
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
  },
});

function GuestPersonal({
  user,
  match,
  getBookingsByUser,
  getSavedHotelsByUser,
  guestBookings,
  savedHotels,
}) {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    getBookingsByUser(match.params.email);
    getSavedHotelsByUser(match.params.email);
  }, [match.params.email, getBookingsByUser, getSavedHotelsByUser]);

  console.log(savedHotels);
  return (
    <div>
      <NavBar toggle={toggle} />
      <Dropdown isOpen={isOpen} toggle={toggle} />
      <div className={classes.nav}>
        <Navigation
          user={user}
          guestBookings={guestBookings}
          savedHotels={savedHotels}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  savedHotels: state.savedHotel.savedHotels,
  guestBookings: state.booking.guestBookings,
});

export default connect(mapStateToProps, {
  getBookingsByUser,
  getBookings,
  getSavedHotelsByUser,
})(GuestPersonal);
