import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCommentsByHotel } from "../../redux/actions/comment";
import CommentCard from "./CommentCard";

function HotelCommentList({ hotelId, hotelComments, getCommentsByHotel }) {
  useEffect(() => {
    getCommentsByHotel(hotelId);
  }, [hotelId, getCommentsByHotel]);
  return (
    <div>
      {hotelComments &&
        hotelComments.map((comment) => {
          return <CommentCard comment={comment} />;
        })}
    </div>
  );
}

const mapStateToProps = (state) => ({
  hotelComments: state.comment.hotelComments,
});
export default connect(mapStateToProps, {
  getCommentsByHotel,
})(HotelCommentList);
