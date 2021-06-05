import IconButton from "@material-ui/core/IconButton";
import {
  Col,
  Drawer,
  Input,
  Row,
  Form,
  Button,
  Select,
  Image,
  Tabs,
} from "antd";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { DollarCircleOutlined } from "@ant-design/icons";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";
import BackupTwoToneIcon from "@material-ui/icons/BackupTwoTone";
import { postRoom, patchRoom } from "../../redux/actions/room";
import { connect } from "react-redux";
import RoomUpload from "./RoomUpload";
import RoomCalendar from "./RoomCalendar";

const { Option } = Select;
const { TabPane } = Tabs;

function RoomManage({
  handleOnClose,
  mode,
  show,
  room,
  hotels,
  postRoom,
  patchRoom,
  setLoading,
  setShowDrawer,
}) {
  const { register, handleSubmit, control } = useForm();
  const [{ alt, src, pic }, setImg] = useState({
    pic: "",
    src: "https://i.stack.imgur.com/y9DpT.jpg",
    alt: "Upload an Image",
  });
  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        pic: e.target.files[0],
        src: URL.createObjectURL(e.target.files[0]),
        alt: e.target.files[0].name,
      });
    }
  };

  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onSubmit = (rawData) => {
    setShowDrawer(false);
    setLoading(true);
    const data = { ...rawData, main_photo: pic };
    const formData = new FormData();
    data.name && formData.append("name", data.name);
    data.guest_quantity &&
      formData.append("guest_quantity", data.guest_quantity);
    data.base_price_per_night &&
      formData.append("base_price_per_night", data.base_price_per_night);
    data.square && formData.append("square", data.square);
    data.hotel_id && formData.append("hotel_id", data.hotel_id);
    pic && formData.append("main_photo", pic, pic.name);

    mode === "add" ? postRoom(formData) : patchRoom(room.id, formData);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };
  return (
    <Drawer
      width={"60vw"}
      visible={show}
      onClose={handleOnClose}
      maskClosable={true}
      title={mode === "add" ? `Rooms Management` : `Room Specification`}
      style={{ textAlign: "center" }}
      destroyOnClose={true}
    >
      <Tabs type="card">
        <TabPane tab="Room" key="room">
          <Form
            form={form}
            name="horizontal_login"
            layout="vertical"
            onFinish={handleSubmit(onSubmit)}
            initialValues={room}
          >
            <Row>
              <Col span={24}>
                <Form.Item
                  name="name"
                  rules={[{ required: true, message: "Please input room!" }]}
                >
                  <Input
                    type="text"
                    placeholder="Room name"
                    {...register("name", { required: true })}
                    autoFocus
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  name="square"
                  rules={[{ required: true, message: "Please input square!" }]}
                >
                  <Input
                    prefix={<AspectRatioIcon />}
                    type="number"
                    placeholder="Square"
                    {...register("square", { required: true })}
                    autoFocus
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="guest_quantity"
                  rules={[
                    {
                      required: true,
                      message: "Please input Passenger quantity!",
                    },
                  ]}
                >
                  <Input
                    prefix={<PeopleOutlineIcon />}
                    type="number"
                    placeholder="Passenger(s)"
                    {...register("guest_quantity", { required: true })}
                    autoFocus
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  name="base_price_per_night"
                  label="Price per night"
                  rules={[
                    {
                      required: true,
                      message: "Please input base price per night!",
                    },
                  ]}
                >
                  <Input
                    prefix={
                      <DollarCircleOutlined className="site-form-item-icon" />
                    }
                    type="text"
                    placeholder="Base price per night"
                    {...register("base_price_per_night", { required: true })}
                    autoFocus
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Hotel">
                  <Controller
                    defaultValue={room && room.hotel_id}
                    control={control}
                    name="hotel_id"
                    render={({ field }) => (
                      <Select {...field}>
                        {hotels &&
                          hotels.map((hotel) => (
                            <Option value={hotel.id}>{hotel.name}</Option>
                          ))}
                      </Select>
                    )}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col>
                <div
                  style={{
                    justifyContent: "space-around",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {room.main_photo && mode === "edit" && (
                    <Image
                      width={200}
                      height={200}
                      src={room.main_photo}
                      alt={alt}
                    />
                  )}
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    {...register("main_photo")}
                    id="main_photo"
                    style={{ display: "none" }}
                    onChange={handleImg}
                  />
                  <label htmlFor="main_photo">
                    <IconButton
                      color="inherit"
                      aria-label="upload picture"
                      component="span"
                    >
                      <BackupTwoToneIcon />
                    </IconButton>
                  </label>
                  <Image width={200} height={200} src={src} alt={alt} />
                </div>
              </Col>
            </Row>
            <Row>
              <Form.Item shouldUpdate>
                {() => (
                  <>
                    <Button
                      type="default"
                      style={{ float: "left" }}
                      htmlType="submit"
                      className="btn btn-primary mt-1"
                      disabled={
                        !form.isFieldsTouched(false) ||
                        !!form
                          .getFieldsError()
                          .filter(({ errors }) => errors.length).length
                      }
                    >
                      Submit
                    </Button>
                    <Button
                      style={{ float: "right" }}
                      type="default"
                      htmlType="button"
                      className="btn btn-danger mt-1"
                      onClick={() => form.resetFields()}
                    >
                      Reset
                    </Button>
                  </>
                )}
              </Form.Item>
            </Row>
          </Form>
        </TabPane>
        <TabPane tab="Upload" key="upload">
          <RoomUpload room={room} />
        </TabPane>
        <TabPane tab="Calendar" key="calendar">
          <RoomCalendar />
        </TabPane>
      </Tabs>
    </Drawer>
  );
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { postRoom, patchRoom })(RoomManage);
