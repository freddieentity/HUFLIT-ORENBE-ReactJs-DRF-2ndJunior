import { Paper } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { SimpleCarousel } from "./SimpleCarousel";
import { Row, Col, Rate } from "antd";
import axios from "axios";
import NavBar from "../../components/NavBar";
import Dropdown from "../../components/Dropdown";

const baseURL = process.env.REACT_APP_BACKEND_API;

function DetailRoom(props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const [room, setRoom] = useState({});
  const [roomImages, setRoomImages] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/hotels/rooms/${props.match.params.slug}`)
      .then((res) => {
        setRoom(res.data);
      });

    axios.get(`${baseURL}/api/hotels/roomimages/`).then((resp) => {
      setRoomImages(resp.data);
    });
  }, [props.match.params.slug]);

  return (
    <>
      <div style={{ paddingBottom: "8%" }}>
        <NavBar toggle={toggle} />
        <Dropdown isOpen={isOpen} toggle={toggle} />
      </div>
      <Paper
        style={{
          borderRadius: "15px",
          margin: "0px 20px 10% 20px",
          padding: "20px 20px 40px 20px",
        }}
        elevation="12"
      >
        <Row>
          <Col span={8}>
            <div style={{ minHeight: "20vh" }}>
              <h4 style={{ textAlign: "center" }}>{room.name}</h4>
              <h5 style={{ textAlign: "center" }}>
                <Rate disabled value={room.rating} />
              </h5>
              <h5 style={{ textAlign: "right" }}>
                ${room.base_price_per_night}
              </h5>
              <h6 style={{ textAlign: "right" }}>
                {room.guest_quantity} Guest(s)
              </h6>
            </div>
            <Paper
              style={{
                borderRadius: "8px",
                padding: "10px 10px 10px 10px",
                minHeight: "80vh",
              }}
              elevation="4"
            >
              <div style={{ color: "green", textAlign: "right" }}>
                <h6 style={{ fontSize: "10px" }}>Square</h6>
                <div>{room.square}</div>
              </div>
              <div style={{ margin: "10px 0px 50px 10px" }}>
                {/* <p style={{ fontSize: "16px" }}>{room.hotel_id.name}</p> */}
              </div>
              <div>
                {/* <h5 style={{ textAlign: "center" }}>Hotel Introduction</h5> */}
                {/* <p>{room.hotel_id.description}</p> */}
              </div>
            </Paper>
          </Col>
          <Col span={16}>
            <SimpleCarousel
              roomImages={roomImages.filter((ri) => ri.room_id === room.id)}
            />
          </Col>
        </Row>
      </Paper>
    </>
  );
}

export default DetailRoom;
