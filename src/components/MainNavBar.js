import React, { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import $ from "jquery";
import { connect } from "react-redux";
import { logout } from "../redux/actions/auth";
import PropTypes from "prop-types";

const MainNavBar = ({ auth: { isAuthenticated, user }, logout }) => {
  function animation() {
    var tabsNewAnim = $("#navbarSupportedContent");
    var activeItemNewAnim = tabsNewAnim.find(".active");
    var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
    var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
    var itemPosNewAnimTop = activeItemNewAnim.position()
      ? activeItemNewAnim.position()
      : 0;
    var itemPosNewAnimLeft = activeItemNewAnim.position();

    $(".hori-selector").css({
      top: itemPosNewAnimTop.top + "px",
      left: itemPosNewAnimLeft.left + "px",
      height: activeWidthNewAnimHeight + "px",
      width: activeWidthNewAnimWidth + "px",
    });
    $("#navbarSupportedContent").on("click", "li", function (e) {
      $("#navbarSupportedContent ul li").removeClass("active");
      $(this).addClass("active");
      var activeWidthNewAnimHeight = $(this).innerHeight();
      var activeWidthNewAnimWidth = $(this).innerWidth();
      var itemPosNewAnimTop = $(this).position();
      var itemPosNewAnimLeft = $(this).position();
      $(".hori-selector").css({
        top: itemPosNewAnimTop.top + "px",
        left: itemPosNewAnimLeft.left + "px",
        height: activeWidthNewAnimHeight + "px",
        width: activeWidthNewAnimWidth + "px",
      });
    });
  }

  useEffect(() => {
    animation();
    $(window).on("resize", function () {
      setTimeout(function () {
        animation();
      }, 500);
    });
  }, []);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-mainbg"
      style={{ display: "flex", justifyContent: "space-around" }}
    >
      <NavLink className="navbar-brand navbar-logo" to="/" exact>
        <img
          src={`https://www.theritzlondon.com/wp-content/themes/Ritz/img/logo.svg`}
          alt="logo"
          height="50px"
        />
      </NavLink>
      <button
        className="navbar-toggler"
        onClick={function () {
          setTimeout(function () {
            animation();
          });
        }}
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="fas fa-bars text-white"></i>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <div className="hori-selector">
            <div className="left"></div>
            <div className="right"></div>
          </div>

          <li className="nav-item active">
            <NavLink className="nav-link" to="/partners" exact>
              Home
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/partners/hotels" exact>
              Hotel
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/partners/rooms" exact>
              Room
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/partners/amenities" exact>
              Amenitiy
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/partners/bookings" exact>
              Booking
            </NavLink>
          </li>
        </ul>
        <Link
          style={{
            display: "flex",
            verticalAlign: "center",
            marginLeft: "10%",
            color: "white",
          }}
          to="/partners/userinfo"
          exact
        >
          <div>Hello, {sessionStorage.getItem("email")}</div>
        </Link>
        <div>
          <button onClick={logout} className="custom-button">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};
MainNavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(MainNavBar);
