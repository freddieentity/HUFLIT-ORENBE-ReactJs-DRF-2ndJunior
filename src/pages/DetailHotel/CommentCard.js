import React from "react";
import { Avatar, Rate } from "antd";
import { AntDesignOutlined } from "@ant-design/icons";
import { Grid, Paper } from "@material-ui/core";
import { RiGhostSmileFill } from "react-icons/ri";

const baseURL = process.env.REACT_APP_BACKEND_API;
function CommentCard({ comment }) {
  console.log(comment);
  return (
    <Paper square style={{ padding: "1% 1% 1% 1%", margin: "1% 1% 1% 1%" }}>
      <Grid container item xs={12} spacing={2}>
        <Grid item xs={12} sm={6} lg={4}>
          <Avatar
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            src={baseURL + comment.booking_id.user.avatar}
            icon={<AntDesignOutlined />}
          />
          <h6>{comment.booking_id.user.name}</h6>
          <p style={{ fontSize: "12px" }}>{comment.booking_id.user.email}</p>
          <Rate
            disabled
            defaultValue={comment.rate / 2}
            character={<RiGhostSmileFill />}
            allowHalf
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={8}>
          <p style={{ fontSize: "13px" }}>
            Stayed in
            <i>
              {" "}
              <strong
                style={{ color: "#556B85" }}
              >{`"${comment.booking_id.room_id.name}"`}</strong>
            </i>
            {`${comment.booking_id.checkin.slice(
              0,
              10
            )}  ->  ${comment.booking_id.checkout.slice(0, 10)}`}
          </p>

          <p>
            <i>"{comment.content}"</i>
          </p>
          <p style={{ fontSize: "10px", color: "grey" }}>
            <i>Commented at {comment.at.slice(0, 10)}</i>
          </p>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default CommentCard;