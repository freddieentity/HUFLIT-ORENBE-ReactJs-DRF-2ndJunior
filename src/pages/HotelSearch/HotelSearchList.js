import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { searchHotels } from "../../redux/actions/hotel";
import { Col, Rate, Row, Card } from "antd";
import { Link } from "react-router-dom";
import SearchTools from "./SearchTools";
import NavBar from "../../components/NavBar";
import SyncLoader from "react-spinners/SyncLoader";
import Dropdown from "../../components/Dropdown";
const { Meta } = Card;

function HotelSearchList({ hotelsFiltered, searchHotels }) {
  const { search } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState({
    key: "rating",
    order: "asc",
  });

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      searchHotels(search);
    }, 700);
  }, [searchHotels, search, type]);
  function compareValues(key = "rating", order = "asc") {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA =
        typeof parseFloat(a[key]) === "number"
          ? parseFloat(a[key])
          : typeof a[key] === "string"
          ? a[key].toUpperCase()
          : a[key];
      const varB =
        typeof parseFloat(b[key]) === "number"
          ? parseFloat(b[key])
          : typeof b[key] === "string"
          ? b[key].toUpperCase()
          : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === "desc" ? comparison * -1 : comparison;
    };
  }

  return (
    <>
      <NavBar toggle={toggle} />
      <Dropdown isOpen={isOpen} toggle={toggle} />
      <Row
        gutter={[16, 16]}
        style={{ padding: "80px 2% 2% 2%", position: "relative" }}
      >
        <Col xs={{ span: 24 }} sm={{ span: 8 }} md={{ span: 8 }}>
          <SearchTools setType={setType} />
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 16 }} md={{ span: 16 }}>
          {loading ? (
            <div className="spinner">
              <SyncLoader color="#8BA0BD" />
            </div>
          ) : (
            <Row gutter={[16, 16]}>
              {hotelsFiltered &&
                hotelsFiltered
                  .sort(compareValues(type.key, type.order))
                  .map((h) => (
                    <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
                      <Link to={`/hotels/${h.slug}`}>
                        <Card
                          hoverable
                          cover={
                            <img
                              alt={h.name}
                              src={h.main_photo}
                              style={{
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10,
                                textAlign: "center",
                                minHeight: "200px",
                              }}
                            />
                          }
                          style={{
                            borderRadius: "10px 10px 10px 10px",
                            height: "100%",
                          }}
                        >
                          <Meta title={h.name} />
                          <Rate disabled value={h.rating} />
                        </Card>
                      </Link>
                    </Col>
                  ))}
            </Row>
          )}
        </Col>
      </Row>
    </>
  );
}

const mapStateToProps = (state) => ({
  hotelsFiltered: state.hotel.hotelsFiltered,
});

export default connect(mapStateToProps, { searchHotels })(HotelSearchList);
