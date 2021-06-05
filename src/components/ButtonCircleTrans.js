import React, { useState } from "react";
import { IoConstructOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaHotel } from "react-icons/fa";
import { GiVikingLonghouse } from "react-icons/gi";
import { GrBusinessService } from "react-icons/gr";

function ButtonCircleTrans({ show }) {
  const [active, setActive] = useState(false);
  return (
    <>
      {show && (
        <div className={`container-menu ${active && "active"}`}>
          <div className="btn-menu" onClick={() => setActive(!active)}>
            <div className="ligne"></div>
          </div>
          <Link to="/partners/hoteltypes" style={{ color: "#EFBD91" }}>
            <div className="blob blob-1">
              <IoConstructOutline />
            </div>
          </Link>
          <Link to="/partners/hotels" style={{ color: "#957DAD" }}>
            <div className="blob blob-2">
              <FaHotel />
            </div>
          </Link>
          <Link to="/partners/rooms" style={{ color: "#BFB8F4" }}>
            <div className="blob blob-3">
              <GiVikingLonghouse />
            </div>
          </Link>
          <Link to="/partners/amenities" style={{ color: "#BFB8F4" }}>
            <div className="blob blob-4">
              <GrBusinessService />
            </div>
          </Link>
          <Link to="/partners/rooms" style={{ color: "#BFB8F4" }}>
            <div className="blob blob-5">
              <GiVikingLonghouse />
            </div>
          </Link>
          <Link to="/partners/rooms" style={{ color: "#BFB8F4" }}>
            <div className="blob blob-6">
              <GiVikingLonghouse />
            </div>
          </Link>
          <Link to="/partners/rooms" style={{ color: "#BFB8F4" }}>
            <div className="blob blob-7">
              <GiVikingLonghouse />
            </div>
          </Link>
          <Link to="/partners/rooms" style={{ color: "#BFB8F4" }}>
            <div className="blob blob-8">
              <GiVikingLonghouse />
            </div>
          </Link>
        </div>
      )}
    </>
  );
}

export default ButtonCircleTrans;
