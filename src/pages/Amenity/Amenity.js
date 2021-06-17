import { Button, Paper, TextField } from "@material-ui/core";
import { Col, Row, Table } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { Button as BB } from "../../components/Button";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import BackspaceIcon from "@material-ui/icons/Backspace";
import { connect } from "react-redux";
import {
  getHotelAmenitiesAssc,
  deleteHotelAmenity,
} from "../../redux/actions/hotelAmenity";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  getRoomAmenitiesAssc,
  deleteRoomAmenity,
} from "../../redux/actions/roomAmenity";
import RoomAmenityManage from "./RoomAmenityManage";
import HotelAmenityManage from "./HotelAmenityManage";
import { getHotelsByPartner } from "../../redux/actions/hotel";
import { getRoomsByPartner } from "../../redux/actions/room";

function Amenity({
  roomAmenities,
  hotelAmenities,
  partnerHotels,
  getHotelAmenitiesAssc,
  deleteHotelAmenity,
  getRoomAmenitiesAssc,
  deleteRoomAmenity,
  getHotelsByPartner,
  partnerRoomList,
  getRoomsByPartner,
}) {
  const [iRMV, setIRMV] = useState(false);
  const [iRDMV, setIRDMV] = useState(false);
  const [iHMV, setIHMV] = useState(false);
  const [iHDMV, setIHDMV] = useState(false);
  const [hotel, setHotel] = useState({ id: null });
  const [room, setRoom] = useState({ id: null });

  useEffect(() => {
    getRoomsByPartner(sessionStorage.getItem("email"));
    getHotelsByPartner(sessionStorage.getItem("email"));
  }, [getHotelsByPartner, getRoomsByPartner]);
  const roomColumns = [
    {
      title: "Category",
      dataIndex: ["room_amenity_id", "category"],
    },
    {
      title: "Name",
      dataIndex: ["room_amenity_id", "name"],
    },
    {
      title: "Manage",
      align: "center",
      render: (text, ra) => (
        <>
          <Button onClick={() => setIRDMV(true)}>
            <BackspaceIcon />
          </Button>
          <Modal
            onOk={() => deleteRoomAmenity(ra.id)}
            title={`Are you sure to delete room ${
              room[0] && room[0].name
            } amenity?`}
            visible={iRDMV}
            onCancel={() => setIRDMV(false)}
          >
            The room amenity delete process is irreversible!
          </Modal>
        </>
      ),
    },
  ];
  const hotelColumns = [
    {
      title: "Category",
      dataIndex: ["hotel_amenity_id", "category"],
    },
    {
      title: "Name",
      dataIndex: ["hotel_amenity_id", "name"],
    },
    {
      title: "Manage",
      align: "center",
      render: (text, ha) => (
        <>
          <Button onClick={() => setIHDMV(true)}>
            <BackspaceIcon />
          </Button>
          <Modal
            onOk={() => deleteHotelAmenity(ha.id)}
            title={`Are you sure to delete hotel ${
              hotel[0] && hotel[0].name
            } amenity?`}
            visible={iHDMV}
            onCancel={() => setIHDMV(false)}
          >
            The hotel amenity delete process is irreversible!
          </Modal>
        </>
      ),
    },
  ];
  return (
    <div
      style={{
        padding: "2% 8% 2% 8%",
        backgroundColor: "#E0BBE4",
      }}
    >
      <Paper
        style={{ margin: "2% 2%", backgroundColor: "#957DAD" }}
        elevation={4}
      >
        <Row span={24} style={{ padding: "2% 2% 2% 2%", textAlign: "center" }}>
          <Col span={12}>
            <Autocomplete
              style={{ padding: "2% 4% 2% 4%", textAlign: "center" }}
              variant="outlined"
              disableClearable
              options={partnerRoomList}
              getOptionLabel={(option) => option.name}
              onInputChange={async (e, value) => {
                const r = await partnerRoomList.filter(
                  (pr) => pr.name === value
                );
                setRoom(r);
                getRoomAmenitiesAssc(r[0].id);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Room"
                  variant="outlined"
                />
              )}
            />
          </Col>
          <Col span={12}>
            <Autocomplete
              style={{ padding: "2% 4% 2% 4%", textAlign: "center" }}
              variant="outlined"
              disableClearable
              options={partnerHotels}
              getOptionLabel={(option) => option.name}
              onInputChange={async (e, value) => {
                const h = await partnerHotels.filter((ph) => ph.name === value);
                setHotel(h);
                getHotelAmenitiesAssc(h[0].id);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Hotel"
                  variant="outlined"
                />
              )}
            />
          </Col>
        </Row>
        <Row span={24} style={{ padding: "2% 0% 0% 0%" }}>
          <Col span={12} style={{ display: "flex", justifyContent: "center" }}>
            <Modal
              style={{ textAlign: "center" }}
              footer={null}
              width="50vw"
              title="Specification"
              visible={iRMV}
              onCancel={() => {
                setIRMV(false);
              }}
            >
              <RoomAmenityManage
                roomId={room[0] && room[0].id}
                roomName={room[0] && room[0].name}
              />
            </Modal>
            <BB
              primary="false"
              css={`
                max-width: 80px;
              `}
              style={{ color: "white" }}
              onClick={() => setIRMV(true)}
            >
              <NoteAddIcon />
              Room
            </BB>
          </Col>
          <Col span={12} style={{ display: "flex", justifyContent: "center" }}>
            <Modal
              style={{ textAlign: "center" }}
              footer={null}
              width="50vw"
              title="Specification"
              visible={iHMV}
              onCancel={() => {
                setIHMV(false);
              }}
            >
              <HotelAmenityManage
                hotelId={hotel[0] ? hotel[0].id : null}
                hotelName={hotel[0] ? hotel[0].name : null}
              />
            </Modal>
            <BB
              primary="false"
              css={`
                max-width: 80px;
              `}
              style={{ color: "white" }}
              onClick={() => setIHMV(true)}
            >
              <NoteAddIcon />
              Hotel
            </BB>
          </Col>
        </Row>
        <Row span={24}>
          <Col span={12}>
            <Paper style={{ margin: "4% 4%" }}>
              <Table
                pagination={{ defaultPageSize: 4 }}
                dataSource={roomAmenities}
                columns={roomColumns}
                style={{ margin: "1% 1%" }}
              />
            </Paper>
          </Col>
          <Col span={12}>
            <Paper style={{ margin: "4% 4%" }}>
              <Table
                pagination={{ defaultPageSize: 4 }}
                dataSource={hotelAmenities}
                columns={hotelColumns}
                style={{ margin: "1% 1%" }}
              />
            </Paper>
          </Col>
        </Row>
      </Paper>
    </div>
  );
}

const mapStateToProps = (state) => ({
  roomAmenities: state.roomAmenity.roomAmenities,
  hotelAmenities: state.hotelAmenity.hotelAmenities,
  partnerHotels: state.hotel.partnerHotels,
  partnerRoomList: state.room.partnerRoomList,
});

export default connect(mapStateToProps, {
  getHotelAmenitiesAssc,
  deleteHotelAmenity,
  getRoomAmenitiesAssc,
  deleteRoomAmenity,
  getHotelsByPartner,
  getRoomsByPartner,
})(Amenity);
