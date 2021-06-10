import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout, Table, Rate, Card, Button, Image, Modal } from "antd";
import HotelManage from "./HotelManage";
import { Button as BlackButton } from "../../components/Button";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import { getHotelsByPartner, deleteHotel } from "../../redux/actions/hotel";
import { connect } from "react-redux";
import HotelSpecification from "./HotelSpecification";
import { Paper } from "@material-ui/core";
import BackspaceIcon from "@material-ui/icons/Backspace";
import DetailsIcon from "@material-ui/icons/Details";
import EditAttributesIcon from "@material-ui/icons/EditAttributes";
import HashLoader from "react-spinners/HashLoader";
import { makeStyles } from "@material-ui/core/styles";

const { Meta } = Card;
const baseURL = process.env.REACT_APP_BACKEND_API;
const defaultHotelValue = {
  id: null,
  base_price_per_night: 0.0,
  description: "",
  hotel_type_id: null,
  is_online_checked_in: false,
  name: "",
  main_photo: "https://i.stack.imgur.com/y9DpT.jpg",
  policy: "",
  rating: 0,
  sub_name: "",
};
const useStyles = makeStyles({
  disabledrow: {
    backgroundColor: "#d8f2f1",
    pointerEvents: "none",
  },
  unavailable: {
    backgroundColor: "#f5b8b8",
  },
});

function Hotel({ hotels, getHotelsByPartner, deleteHotel }) {
  const c = useStyles();
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mode, setMode] = useState("add");
  const [showDrawer, setShowDrawer] = useState(false);
  const [hotelEdit, setHotelEdit] = useState(defaultHotelValue);

  useEffect(() => {
    getHotelsByPartner(sessionStorage.getItem("email"));
  }, [getHotelsByPartner]);

  const columns = [
    {
      title: "Hotel",
      align: "center",
      dataIndex: "rating",
      sorter: (a, b) => a.rating - b.rating,
      render: (text, hotel) => (
        <span>
          <Card
            style={{ width: 300 }}
            cover={
              <Image alt="example" src={`${baseURL}${hotel.main_photo}`} />
            }
            actions={[
              <>
                <DetailsIcon
                  key={hotel.id}
                  onClick={() => {
                    setIsModalVisible(true);
                    setHotelEdit(hotel);
                  }}
                />
                <Modal
                  style={{ textAlign: "center" }}
                  footer={null}
                  width="50vw"
                  title="Specification"
                  visible={isModalVisible}
                  onCancel={() => setIsModalVisible(false)}
                >
                  <HotelSpecification hotel={hotelEdit} />
                </Modal>
              </>,
              <Link to={`/hotels/${hotel.slug}`}>
                <DetailsIcon />
              </Link>,
            ]}
          >
            <Meta
              style={{ textAlign: "center" }}
              title={<Rate disabled value={hotel.rating} />}
              description={hotel.name}
            />
          </Card>
        </span>
      ),
    },
    {
      title: "Price",
      dataIndex: "base_price_per_night",
      sorter: (a, b) => a.base_price_per_night - b.base_price_per_night,
    },

    {
      title: "Manage",
      key: "manage",
      align: "center",
      render: (text, hotel) => (
        <span>
          <Button
            onClick={() => {
              setMode("edit");
              setHotelEdit(() => ({
                ...hotel,
                main_photo: baseURL + hotel.main_photo,
              }));
              setShowDrawer(true);
            }}
            icon={<EditAttributesIcon />}
          ></Button>
          <Button
            onClick={() => {
              setLoading(true);
              deleteHotel(hotel.id);
              setTimeout(() => {
                setLoading(false);
              }, 800);
            }}
            icon={<BackspaceIcon />}
          ></Button>
        </span>
      ),
    },
  ];
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          {loading ? (
            <div className="spinner">
              <HashLoader color="#2A5A96" />
            </div>
          ) : (
            <>
              <div style={{ textAlign: "center" }}>
                <DetailsIcon />
                <h2>Hotels Management</h2>
              </div>

              <BlackButton
                primary="false"
                css={`
                  max-width: 80px;
                `}
                style={{ color: "white" }}
                onClick={() => {
                  setShowDrawer(true);
                  setMode("add");
                  setHotelEdit(defaultHotelValue);
                }}
              >
                <LibraryAddIcon />
              </BlackButton>
              <Layout.Content style={{ marginTop: 10 }}>
                <Paper
                  elevation={4}
                  style={{
                    padding: "5px 5px 5px 5px",
                    margin: "5px 0px 5px 0px",
                  }}
                >
                  <Table
                    dataSource={hotels}
                    columns={columns}
                    pagination={{ defaultPageSize: 4 }}
                    loading={loading}
                    rowClassName={(record) =>
                      !record.is_approved
                        ? c.disabledrow
                        : !record.is_available && c.unavailable
                    }
                  />
                </Paper>
              </Layout.Content>

              {showDrawer && (
                <HotelManage
                  show={showDrawer}
                  handleOnClose={() => {
                    setShowDrawer(false);
                    setHotelEdit(defaultHotelValue);
                    setMode("add");
                  }}
                  mode={mode}
                  hotel={hotelEdit}
                  setLoading={setLoading}
                  setShowDrawer={setShowDrawer}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  hotels: state.hotel.partnerHotels,
});

export default connect(mapStateToProps, {
  getHotelsByPartner,
  deleteHotel,
})(Hotel);
