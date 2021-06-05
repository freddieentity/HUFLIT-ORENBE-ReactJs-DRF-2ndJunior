import React from "react";
import { Col, Rate, Row, Card } from "antd";
import { Link } from "react-router-dom";
import { FcLikePlaceholder } from "react-icons/fc";
import { connect } from "react-redux";
import { deleteSavedHotel } from "../../redux/actions/savedHotel";
const { Meta } = Card;

const baseURL = process.env.REACT_APP_BACKEND_API;
function SavedHotelItem({ savedHotels, deleteSavedHotel }) {
  return (
    <Row gutter={[16, 16]} style={{ padding: "2% 2% 2% 2%" }}>
      <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }}>
        <Row gutter={[16, 16]}>
          {savedHotels &&
            savedHotels.map((h) => (
              <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={h.hotel_id.name}
                      src={baseURL + h.hotel_id.main_photo}
                      style={{
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        textAlign: "center",
                        minHeight: "300px",
                      }}
                    />
                  }
                  style={{
                    borderRadius: "10px 10px 10px 10px",
                    height: "100%",
                  }}
                >
                  <FcLikePlaceholder
                    style={{ fontSize: "40px" }}
                    onClick={() => deleteSavedHotel(h.id)}
                  />
                  <Link to={`/hotels/${h.hotel_id.slug}`}>
                    <Meta title={h.hotel_id.name} />
                    <Rate disabled value={h.hotel_id.rating} />
                  </Link>
                </Card>
              </Col>
            ))}
        </Row>
      </Col>
    </Row>
  );
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { deleteSavedHotel })(SavedHotelItem);
