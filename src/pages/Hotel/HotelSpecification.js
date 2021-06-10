import React, { useEffect } from "react";
import { Tabs, Image } from "antd";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getHotelImages, postHotelImage } from "../../redux/actions/hotelImage";
import { connect } from "react-redux";
import HotelAddressForm from "./HotelAddressForm";
import AppsIcon from "@material-ui/icons/Apps";
import CameraIcon from "@material-ui/icons/Camera";

const { TabPane } = Tabs;
const baseURL = process.env.REACT_APP_BACKEND_API;

function HotelSpecification({ hotel, postHotelImage, images, getHotelImages }) {
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    getHotelImages();
  }, [getHotelImages]);

  const onUploadSubmit = (data) => {
    const fileData = [...data.images];
    const formData = new FormData();
    formData.append("hotel_id", hotel.id);
    fileData.forEach((image) => {
      formData.append("images", image, image.name);
    });

    postHotelImage(formData);
    toast.success(`Post images for hotel "${hotel.name}" successfully`);
  };
  return (
    <>
      <Tabs defaultActiveKey="2">
        <TabPane tab="Gallery" key="gallery">
          <Image.PreviewGroup>
            {images.filter((image) => image.hotel_id === hotel.id) ? (
              images
                .filter((image) => image.hotel_id === hotel.id)
                .map((hotelImage) => (
                  <Image
                    width={100}
                    height={100}
                    src={`${baseURL}${hotelImage.image}`}
                  />
                ))
            ) : (
              <></>
            )}
          </Image.PreviewGroup>
        </TabPane>
        <TabPane tab="Address" key="address">
          Address
        </TabPane>
      </Tabs>
      <Tabs type="card">
        <TabPane
          tab={
            <span>
              <AppsIcon />
              Address
            </span>
          }
          key="address_registration"
        >
          <HotelAddressForm hotel={hotel} />
        </TabPane>

        <TabPane
          tab={
            <span>
              <CameraIcon />
              Upload
            </span>
          }
          key="upload"
        >
          <form onSubmit={handleSubmit(onUploadSubmit)}>
            <input
              type="file"
              {...register("images")}
              multiple
              accept=".png, .jpg, .jpeg"
            />
            <input type="submit" />
          </form>
        </TabPane>
      </Tabs>
    </>
  );
}
const mapStateToProps = (state) => ({
  images: state.hotelImage.images,
});
export default connect(mapStateToProps, { getHotelImages, postHotelImage })(
  HotelSpecification
);
