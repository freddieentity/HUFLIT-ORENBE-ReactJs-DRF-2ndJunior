import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Rate } from "antd";
import { Chip, Paper } from "@material-ui/core";
import { SimpleCarousel } from "./SimpleCarousel";
import { CheckCircleOutlined } from "@ant-design/icons";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import RoomHotelList from "./RoomHotelList";
import NavBar from "../../components/NavBar";
import Dropdown from "../../components/Dropdown";
import { connect } from "react-redux";
import { postSavedHotel } from "../../redux/actions/savedHotel";
import HotelCommentList from "./HotelCommentList";

const baseURL = process.env.REACT_APP_BACKEND_API;

function DetailHotel({ match, postSavedHotel }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const [hotel, setHotel] = useState({});
  const [hotelImages, setHotelImages] = useState([]);

  const fetchHotelImage = () => {
    axios.get(`${baseURL}/api/hotels/hotelimages/`).then((resp) => {
      setHotelImages(resp.data);
    });
  };

  useEffect(() => {
    const fetchHotel = () => {
      axios.get(`${baseURL}/api/hotels/${match.params.slug}`).then((res) => {
        setHotel(res.data);
      });
    };

    fetchHotel();
    fetchHotelImage();
  }, [match.params.slug]);

  console.log(hotel.id);

  return (
    <>
      <div style={{ paddingBottom: "60px" }}>
        <NavBar toggle={toggle} />
        <Dropdown isOpen={isOpen} toggle={toggle} />
      </div>
      <Paper
        style={{
          padding: "0px 0px 20px 0px",
          backgroundColor: "#556B85",
        }}
      >
        <div>
          <img
            style={{
              objectFit: "cover",
            }}
            width="100%"
            height="100%"
            alt={hotel.name}
            src={`${hotel.main_photo}`}
          />
        </div>
        <Paper
          style={{
            borderRadius: "15px",
            margin: "10px 10% 20px 10%",
            padding: "20px 20px 40px 20px",
            position: "relative",
            marginTop: "-100vh",
            marginBottom: "45px",
          }}
          elevation="6"
        >
          <Row
            span={24}
            style={{
              textAlign: "left",
              borderBottom: "1px solid #EEEBE5",
              marginBottom: "1%",
            }}
          >
            <Col span={24}>
              <div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h4>{hotel.name}</h4>
                  <h4
                    onClick={() =>
                      postSavedHotel({
                        hotel_id: hotel.id,
                        email: sessionStorage.getItem("email"),
                      })
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <BookmarksIcon fontSize="40px" />
                  </h4>
                </div>
                <h5>
                  <Chip
                    size="small"
                    // label={`${hotel.hotel_type_id.name.toUpperCase()}`}
                    label={"HOTEL"}
                    color="primary"
                  />
                </h5>
                <h5>
                  <Rate disabled value={hotel.rating} />
                </h5>
                <h5>{hotel.base_price_per_night}</h5>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={16}>
              <SimpleCarousel
                hotelImages={hotelImages.filter(
                  (hi) => hi.hotel_id === hotel.id
                )}
              />
            </Col>
            <Col span={8}>
              <Paper
                style={{
                  borderRadius: "8px",
                  padding: "10px 10px 10px 10px",
                  margin: "0px 10px 0px 10px",
                  minHeight: "90vh",
                }}
                elevation="4"
              >
                <div style={{ color: "green", textAlign: "right" }}>
                  <h6 style={{ fontSize: "10px" }}>Online check-in</h6>
                  <CheckCircleOutlined size="large" />
                </div>
                <div style={{ margin: "10px 0px 50px 10px" }}>
                  <h5 style={{ fontSize: "14px" }}>Policy</h5>
                  <p style={{ fontSize: "12px" }}>{hotel.policy}</p>
                </div>
                <div>
                  <h5 style={{ textAlign: "center" }}>Description</h5>
                  <p>{hotel.description}</p>
                </div>
              </Paper>
            </Col>
          </Row>
        </Paper>
        <Paper
          style={{
            borderRadius: "15px",
            margin: "10px 10% 20px 10%",
            padding: "20px 20px 40px 20px",
          }}
          elevation="6"
        >
          <RoomHotelList hotelId={hotel.id} />
        </Paper>
        <Paper
          style={{
            borderRadius: "15px",
            margin: "10px 10% 20px 10%",
            padding: "20px 20px 40px 20px",
          }}
          elevation="6"
        >
          <HotelCommentList hotelId={hotel.id} />
        </Paper>
      </Paper>
    </>
  );
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { postSavedHotel })(DetailHotel);
