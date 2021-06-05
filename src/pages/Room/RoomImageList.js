import { Image } from "antd";
import React, { useEffect } from "react";
import { getRoomImages } from "../../redux/actions/roomImage";
import { connect } from "react-redux";

const baseURL = process.env.REACT_APP_BACKEND_API;

function RoomImageList({ roomImages, getRoomImages, room }) {
  useEffect(() => {
    getRoomImages();
  }, [getRoomImages]);
  return (
    <div>
      <Image.PreviewGroup>
        {roomImages.filter((roomImage) => roomImage.room_id === room.id) ? (
          roomImages
            .filter((roomImage) => roomImage.room_id === room.id)
            .map((room_image) => (
              <Image
                width={100}
                height={100}
                src={`${baseURL}${room_image.image}`}
              />
            ))
        ) : (
          <></>
        )}
      </Image.PreviewGroup>
    </div>
  );
}

const mapStateToProps = (state) => ({
  roomImages: state.roomImage.roomImages,
});
export default connect(mapStateToProps, { getRoomImages })(RoomImageList);
