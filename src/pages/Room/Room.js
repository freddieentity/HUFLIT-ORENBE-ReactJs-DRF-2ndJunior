import { Paper } from "@material-ui/core";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import AddIcon from "@material-ui/icons/Add";
import { Table, Layout, Button } from "antd";
import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { Button as BlackButton } from "../../components/Button";
import { EditOutlined } from "@ant-design/icons";
import RoomManage from "./RoomManage";
import { getRooms, deleteRoom } from "../../redux/actions/room";
import { getHotels } from "../../redux/actions/hotel";
import { connect } from "react-redux";
import RoomCard from "./RoomCard";
import RoomImageList from "./RoomImageList";
import { Link } from "react-router-dom";

function Room({ rooms, hotels, getRooms, deleteRoom, getHotels }) {
  const [mode, setMode] = useState("add");
  const [showDrawer, setShowDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [room, setRoom] = useState({});

  useEffect(() => {
    getRooms();
    getHotels();
  }, [getRooms, getHotels]);

  const columns = [
    {
      title: "Room",
      align: "center",
      render: (text, r) => {
        return (
          <Link to={`/rooms/${r.slug}`}>
            <RoomCard room={r} />
          </Link>
        );
      },
    },
    {
      title: "Square ",
      align: "center",
      dataIndex: "square",
      sorter: (a, b) => a.square - b.square,
    },
    {
      title: "Person(s)",
      align: "center",
      dataIndex: "guest_quantity",
      sorter: (a, b) => a.guest_quantity - b.guest_quantity,
    },
    {
      title: "Price",
      align: "center",
      dataIndex: "base_price_per_night",
      sorter: (a, b) => a.base_price_per_night - b.base_price_per_night,
    },
    {
      title: "Manage",
      align: "center",
      render: (text, r) => (
        <span style={{ display: "flex", alignItems: "center" }}>
          <Button
            onClick={() => {
              setMode("edit");
              setRoom(() => ({
                ...r,
                main_photo: process.env.REACT_APP_BACKEND_API + r.main_photo,
              }));
              setShowDrawer(true);
            }}
            icon={<EditOutlined />}
          ></Button>
          <Button
            className="btn btn-warning mt-1"
            onClick={() => {
              window.confirm("Sure?");
              setLoading(true);
              deleteRoom(r.id);
              setTimeout(() => {
                setLoading(false);
              }, 800);
            }}
            icon={<DeleteForeverOutlinedIcon />}
          ></Button>
        </span>
      ),
    },
  ];

  return (
    <div style={{ padding: "40px 40px 40px 40px" }}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div style={{ textAlign: "center" }}>
            <h2>Rooms Management</h2>
          </div>

          <BlackButton
            primary="false"
            css={`
              min-width: 40px;
            `}
            style={{ color: "white" }}
            onClick={() => {
              setShowDrawer(true);
              setMode("add");
              setRoom({});
            }}
          >
            <AddIcon />
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
                dataSource={rooms}
                columns={columns}
                pagination={{ defaultPageSize: 4 }}
                loading={loading}
                rowKey="id"
                expandable={{
                  expandedRowRender: (record) => (
                    <RoomImageList room={record} />
                  ),
                }}
              />
            </Paper>
          </Layout.Content>

          {showDrawer && (
            <RoomManage
              show={showDrawer}
              handleOnClose={() => {
                setShowDrawer(false);
                setMode("add");
              }}
              mode={mode}
              setLoading={setLoading}
              setShowDrawer={setShowDrawer}
              room={room}
              hotels={hotels}
            />
          )}
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    rooms: state.room.rooms,
    hotels: state.hotel.hotels,
  };
};

export default connect(mapStateToProps, { getRooms, deleteRoom, getHotels })(
  Room
);
