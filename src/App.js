import HotelType from "./pages/HotelType/HotelType";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/privateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PartnerHome from "./pages/PartnerHome/PartnerHome";
import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import { ThemeProvider } from "@material-ui/core";
import { Provider } from "react-redux";
import store from "./redux/store";
import SignInForm from "./pages/Login/SignInForm";
import Login from "./pages/Login/Login";
import GuestLanding from "./pages/GuestLanding/GuestLanding";
import Hotel from "./pages/Hotel/Hotel";
import DetailHotel from "./pages/DetailHotel/DetailHotel";
import Room from "./pages/Room/Room";
import DetailRoom from "./pages/DetailRoom/DetailRoom";
import Amenity from "./pages/Amenity/Amenity";
import Booking from "./pages/Booking/Booking";
import theme from "./constants/theme";
import HotelSearchList from "./pages/HotelSearch/HotelSearchList";
import NotFoundPrivateRoute from "./components/NotFoundPrivateRoute";
import MainNavBar from "./components/MainNavBar";
import GuestPersonal from "./pages/GuestPersonal/GuestPersonal";
import PartnerBooking from "./pages/PartnerBooking/PartnerBooking";
import PartnerUserInfo from "./pages/PartnerUserInfo/PartnerUserInfo";
import Form from "./components/Form";
import Contact from "./pages/Contact/Contact";
import ResetPassword from "./pages/Login/ResetPassword";
import ResetPasswordConfirm from "./pages/Login/ResetPasswordConfirm";
import Activate from "./pages/Login/Activate";
import Main from "./pages/Report/Main";
import Facebook from "./pages/Login/Facebook";

function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/test" component={Form} />
          <Route exact path="/signup" component={SignInForm} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={GuestLanding} />
          <Route exact path="/booking/:room_id" component={Booking} />
          <Route exact path="/hotels/:slug" component={DetailHotel} />
          <Route exact path="/rooms/:slug" component={DetailRoom} />
          <Route exact path="/search" component={HotelSearchList} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/reset_password" component={ResetPassword} />
          <Route exact path="/activate/:uid/:token" component={Activate} />
          <Route exact path="/report" component={Main} />
          <Route exact path="/facebook" component={Facebook} />
          <Route
            exact
            path="/password/reset/confirm/:uid/:token"
            component={ResetPasswordConfirm}
          />
          <PrivateRoute
            exact
            path="/personal/:email"
            component={GuestPersonal}
          />

          <div>
            <MainNavBar />
            <PrivateRoute exact path="/partners" component={PartnerHome} />
            <PrivateRoute
              exact
              path="/partners/amenities"
              component={Amenity}
            />
            <PrivateRoute exact path="/partners/rooms" component={Room} />
            <PrivateRoute exact path="/partners/hotels" component={Hotel} />
            <PrivateRoute
              exact
              path="/partners/userinfo"
              component={PartnerUserInfo}
            />
            <PrivateRoute
              exact
              path="/partners/bookings"
              component={PartnerBooking}
            />
            <PrivateRoute
              exact
              path="/partners/hoteltypes"
              component={HotelType}
            />
          </div>
          <Route path="/" component={NotFoundPrivateRoute} />
        </Switch>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
