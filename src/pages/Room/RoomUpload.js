import React from "react";
import { useForm } from "react-hook-form";
import { postRoomImage } from "../../redux/actions/roomImage";
import { connect } from "react-redux";

function RoomUpload({ room, postRoomImage }) {
  const { register, handleSubmit } = useForm();

  const onUploadSubmit = (data) => {
    const fileData = [...data.images];
    const formData = new FormData();
    formData.append("room_id", room.id);
    fileData.forEach((image) => {
      formData.append("images", image, image.name);
    });

    postRoomImage(formData);
  };
  return (
    <form onSubmit={handleSubmit(onUploadSubmit)}>
      <input
        type="file"
        {...register("images")}
        multiple
        accept=".png, .jpg, .jpeg"
      />
      <input type="submit" />
    </form>
  );
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { postRoomImage })(RoomUpload);
