import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCommentsByHotel } from "../../redux/actions/comment";
import CommentCard from "./CommentCard";

function HotelCommentList({ hotelId, hotelComments, getCommentsByHotel }) {
  useEffect(() => {
    getCommentsByHotel(hotelId);
  }, [hotelId, getCommentsByHotel]);
  const ro = (
    hotelComments.reduce((p, c) => p + c.rate, 0) / hotelComments.length
  ).toFixed(1);
  console.log(hotelComments);
  return (
    <>
      {hotelComments !== [] ? (
        <div>
          <h3 style={{ padding: "1% 1% 1% 1%" }}>
            Based on <strong>{hotelComments.length}</strong> reviews
          </h3>
          <div className="review-overall-container">
            <div className="review-overall-body">
              <div className="review-overall">{ro}</div>
            </div>
          </div>
          {hotelComments &&
            hotelComments.map((comment) => {
              return <CommentCard comment={comment} />;
            })}
        </div>
      ) : (
        `Currently there's no comment!`
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  hotelComments: state.comment.hotelComments,
});
export default connect(mapStateToProps, {
  getCommentsByHotel,
})(HotelCommentList);
