import { Button, Input } from "@material-ui/core";
import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getBookingsByPartner,
  patchBooking,
} from "../../redux/actions/booking";
import ErrorIcon from "@material-ui/icons/Error";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import { makeStyles } from "@material-ui/core/styles";
import peak from "../../constants/peak";

const useStyles = makeStyles({
  disabledrow: {
    backgroundColor: "#DCDCDC",
    // pointerEvents: "none",
  },
  canceledrow: {
    backgroundColor: "#94312e",
    //pointerEvents: "none",
  },
});

function PartnerBooking({
  getBookingsByPartner,
  partnerBookings,
  patchBooking,
}) {
  const c = useStyles();
  const [value, setValue] = useState("");

  useEffect(() => {
    getBookingsByPartner(sessionStorage.getItem("email"));
  }, [getBookingsByPartner]);

  const columns = [
    {
      title: "Hotel",
      dataIndex: ["hotel_id", "name"],
    },
    {
      title: "Room",
      dataIndex: ["room_id", "name"],
    },
    {
      title: "Email",
      dataIndex: ["user", "email"],
    },
    {
      title: "Guest",
      dataIndex: "guest_name",
    },
    {
      title: "From",
      dataIndex: "checkin",
      sorter: (a, b) => Date.parse(a.checkin) - Date.parse(b.checkin),
    },
    {
      title: "To",
      dataIndex: "checkout",
      sorter: (a, b) => Date.parse(a.checkout) - Date.parse(b.checkout),
    },
    {
      title: "Price",
      dataIndex: ["room_id", "base_price_per_night"],
      sorter: (a, b) =>
        a.room_id.base_price_per_night - b.room_id.base_price_per_night,
    },
    {
      title: "Payment",
      dataIndex: "payment",
      sorter: (a, b) => a.payment - b.payment,
    },
    {
      title: "Paid",
      dataIndex: "is_paid",
      sorter: (a, b) => a.is_paid - b.is_paid,

      render: (text, record) => (
        <Button
          variant="contained"
          color="warning"
          onClick={() => {
            patchBooking(record.id, { is_paid: !record.is_paid });
            peak("info", "Paid status has been changed!");
          }}
        >
          {record.is_paid ? <VerifiedUserIcon /> : <ErrorIcon />}
        </Button>
      ),
    },
    {
      title: "Cancel",
      dataIndex: "is_cancel",
      sorter: (a, b) => a.is_cancel - b.is_cancel,

      render: (text, record) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            patchBooking(record.id, { is_cancel: !record.is_cancel });
            peak("info", "Booking cancellation status has been changed!");
          }}
        >
          {record.is_cancel ? <CancelPresentationIcon /> : <DoneAllIcon />}
        </Button>
      ),
    },
  ];
  return (
    <div>
      <Input
        placeholder="Search Name"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <Table
        columns={columns}
        dataSource={partnerBookings}
        rowClassName={(record) =>
          record.is_cancel ? c.canceledrow : !record.is_paid && c.disabledrow
        }
      />
    </div>
  );
}
const mapStateToProps = (state) => ({
  partnerBookings: state.booking.partnerBookings,
});
export default connect(mapStateToProps, { getBookingsByPartner, patchBooking })(
  PartnerBooking
);
