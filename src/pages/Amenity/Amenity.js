import { Button, Paper } from "@material-ui/core";
import { Col, Row, Table } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { Button as BB } from "../../components/Button";
import { AiFillFileAdd } from "react-icons/ai";
import { MdLibraryAdd } from "react-icons/md";
import { GrFormEdit } from "react-icons/gr";
import { FiDelete } from "react-icons/fi";
import { connect } from "react-redux";
import {
  getHotelAmenities,
  deleteHotelAmenity,
} from "../../redux/actions/hotelAmenity";
import {
  getRoomAmenities,
  deleteRoomAmenity,
} from "../../redux/actions/roomAmenity";
import RoomAmenityManage from "./RoomAmenityManage";
import HotelAmenityManage from "./HotelAmenityManage";

function Amenity({
  roomAmenities,
  hotelAmenities,
  getHotelAmenities,
  deleteHotelAmenity,
  getRoomAmenities,
  deleteRoomAmenity,
}) {
  const [iRMV, setIRMV] = useState(false);
  const [iRDMV, setIRDMV] = useState(false);
  const [iHMV, setIHMV] = useState(false);
  const [iHDMV, setIHDMV] = useState(false);
  const [roomMode, setRoomMode] = useState("add");
  const [hotelMode, setHotelMode] = useState("add");

  useEffect(() => {
    getHotelAmenities();
    getRoomAmenities();
  }, [getHotelAmenities, getRoomAmenities]);
  const roomColumns = [
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Manage",
      align: "center",
      render: (text, room) => (
        <>
          <Button
            onClick={() => {
              setIRMV(true);
              setRoomMode("edit");
            }}
          >
            <GrFormEdit />
          </Button>
          <Modal
            style={{ textAlign: "center" }}
            footer={null}
            width="50vw"
            title="Specification"
            visible={iRMV}
            onCancel={() => {
              setIRMV(false);
              setRoomMode("add");
            }}
          >
            <RoomAmenityManage room={room} mode={roomMode} />
          </Modal>
          <Button onClick={() => setIRDMV(true)}>
            <FiDelete />
          </Button>
          <Modal
            onOk={() => deleteRoomAmenity(room.id)}
            title={`Are you sure to delete ${room.name}?`}
            visible={iRDMV}
            onCancel={() => setIRDMV(false)}
          >
            room The delete process is irreversible!
          </Modal>
        </>
      ),
    },
  ];
  const hotelColumns = [
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Manage",
      align: "center",
      render: (text, hotel) => (
        <>
          <Button
            onClick={() => {
              setIHMV(true);
              setHotelMode("edit");
            }}
          >
            <GrFormEdit />
          </Button>
          <Modal
            style={{ textAlign: "center" }}
            footer={null}
            width="50vw"
            title="Specification"
            visible={iHMV}
            onCancel={() => {
              setIHMV(false);
              setHotelMode("add");
            }}
          >
            <HotelAmenityManage hotel={hotel} mode={hotelMode} />
          </Modal>
          <Button onClick={() => setIHDMV(true)}>
            <FiDelete />
          </Button>
          <Modal
            onOk={() => deleteRoomAmenity(hotel.id)}
            title={`Are you sure to delete ${hotel.name}?`}
            visible={iHDMV}
            onCancel={() => setIHDMV(false)}
          >
            hotel The delete process is irreversible!
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
        <Row span={24} style={{ padding: "2% 0% 0% 0%" }}>
          <Col span={12} style={{ display: "flex", justifyContent: "center" }}>
            <BB
              primary="false"
              css={`
                max-width: 80px;
              `}
              style={{ color: "white" }}
              onClick={() => setIRMV(true)}
            >
              <AiFillFileAdd />
              Room
            </BB>
          </Col>
          <Col span={12} style={{ display: "flex", justifyContent: "center" }}>
            <BB
              primary="false"
              css={`
                max-width: 80px;
              `}
              style={{ color: "white" }}
              onClick={() => setIHMV(true)}
            >
              <MdLibraryAdd />
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
});

export default connect(mapStateToProps, {
  getHotelAmenities,
  deleteHotelAmenity,
  getRoomAmenities,
  deleteRoomAmenity,
})(Amenity);
