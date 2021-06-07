import { Button } from "@material-ui/core";
import { Table } from "antd";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getBookingsByPartner,
  patchBooking,
} from "../../redux/actions/booking";
import { FcAnswers, FcApproval } from "react-icons/fc";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  disabledrow: {
    backgroundColor: "#DCDCDC",
    // pointerEvents: "none",
  },
});

function PartnerBooking({
  getBookingsByPartner,
  partnerBookings,
  patchBooking,
}) {
  const c = useStyles();
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
    },
    {
      title: "To",
      dataIndex: "checkout",
    },
    {
      title: "Price",
      dataIndex: ["room_id", "base_price_per_night"],
    },
    {
      title: "Payment",
      dataIndex: "payment",
    },
    {
      title: "Paid",
      dataIndex: "is_paid",

      render: (text, record) => (
        <Button
          variant="contained"
          color="warning"
          onClick={() => {
            patchBooking(record.id, { is_paid: !record.is_paid });
          }}
        >
          {record.is_paid ? <FcApproval /> : <FcAnswers />}
        </Button>
      ),
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        dataSource={partnerBookings}
        rowClassName={(record) => !record.is_paid && c.disabledrow}
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
