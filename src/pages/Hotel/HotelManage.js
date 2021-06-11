import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Drawer,
  Select,
  Row,
  Image,
  Col,
  Typography,
  Checkbox,
} from "antd";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import GradeIcon from "@material-ui/icons/Grade";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import PolicyIcon from "@material-ui/icons/Policy";
import IconButton from "@material-ui/core/IconButton";
import { useForm, Controller } from "react-hook-form";
import { connect } from "react-redux";
import { postHotel, patchHotel } from "../../redux/actions/hotel";
import FormItem from "antd/lib/form/FormItem";
import { getHotelTypes } from "../HotelType/api";

const { Option } = Select;
const { Text } = Typography;

function HotelManage({
  hotel,
  show,
  handleOnClose,
  mode,
  postHotel,
  patchHotel,
  setLoading,
  setShowDrawer,
}) {
  const [hotelTypes, setHotelTypes] = useState([]);
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

  const onSubmit = (rawData) => {
    console.log(rawData);
    setShowDrawer(false);
    setLoading(true);
    const data = {
      ...rawData,
      main_photo: pic,
      is_online_checked_in: rawData.is_online_checked_in.toString(),
      is_available: rawData.is_available.toString(),
    };
    const formData = new FormData();
    data.name && formData.append("name", data.name);
    data.base_price_per_night &&
      formData.append("base_price_per_night", data.base_price_per_night);
    data.description && formData.append("description", data.description);
    data.hotel_type_id && formData.append("hotel_type_id", data.hotel_type_id);
    data.is_online_checked_in &&
      formData.append("is_online_checked_in", data.is_online_checked_in);
    pic && formData.append("main_photo", pic, pic.name);
    data.policy && formData.append("policy", data.policy);
    data.rating && formData.append("rating", data.rating);
    data.is_available && formData.append("is_available", data.is_available);
    data.business_license &&
      formData.append("business_license", data.business_license);

    mode === "add" ? postHotel(formData) : patchHotel(hotel.id, formData);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  const [form] = Form.useForm();
  const [, forceUpdate] = useState({}); // To disable submit button at the beginning.

  useEffect(() => {
    forceUpdate({});
  }, []);

  const loadHotelTypes = () =>
    getHotelTypes().then((res) => setHotelTypes(res.data));

  useEffect(() => {
    loadHotelTypes();
  }, []);

  return (
    <Drawer
      width={"85vw"}
      visible={show}
      onClose={handleOnClose}
      maskClosable={true}
      title={mode === "add" ? `Hotels management` : `Hotel details`}
      style={{ textAlign: "center" }}
      destroyOnClose={true}
    >
      <Text type="success">Registration</Text>
      <Form
        form={form}
        name="horizontal_login"
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
        initialValues={hotel}
      >
        <Row>
          <Col span={12}>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="name"
                  label="Hotel name"
                  rules={[
                    { required: true, message: "Please input the hotel type!" },
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Enter hotel name"
                    {...register("name", { required: true })}
                    autoFocus
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <Form.Item label="Hotel type">
                  <Controller
                    defaultValue={hotel.hotel_type_id}
                    control={control}
                    name="hotel_type_id"
                    render={({ field }) => (
                      <Select {...field}>
                        {hotelTypes &&
                          hotelTypes.map((hotelType) => (
                            <Option value={hotelType.id}>
                              {hotelType.name}
                            </Option>
                          ))}
                      </Select>
                    )}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <FormItem label="Online check-in">
                  <Controller
                    control={control}
                    defaultValue={hotel.is_online_checked_in}
                    name="is_online_checked_in"
                    render={({ field: { value, onChange } }) => (
                      <Checkbox
                        checked={value}
                        onChange={(e) => {
                          onChange(e.target.checked);
                        }}
                      />
                    )}
                  />
                </FormItem>
              </Col>
              <Col span={6}>
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
                      <MonetizationOnIcon className="site-form-item-icon" />
                    }
                    type="text"
                    placeholder="Enter base price per night"
                    {...register("base_price_per_night", { required: true })}
                    autoFocus
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="rating"
                  label="Rating"
                  type="text"
                  tooltip="Based on the Michelin star ranking list"
                  rules={[
                    {
                      required: true,
                      message: "Please input from 1 to 5!",
                      max: 5,
                      min: 1,
                    },
                  ]}
                >
                  <Input
                    prefix={<GradeIcon className="site-form-item-icon" />}
                    placeholder="Enter rating"
                    {...register("rating", { required: true })}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row>
              <Col span={12}>
                <Form.Item
                  name="policy"
                  label="Hotel's policy"
                  tooltip="What are the main policies of the hotel?"
                  rules={[{ required: true, message: "Please input policy!" }]}
                >
                  <Input
                    prefix={<PolicyIcon className="site-form-item-icon" />}
                    type="text"
                    placeholder="Enter hotel policy"
                    name="policy"
                    {...register("policy", { required: true })}
                    autoFocus
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <FormItem label="Available">
                  <Controller
                    control={control}
                    defaultValue={hotel.is_available}
                    name="is_available"
                    render={({ field: { value, onChange } }) => (
                      <Checkbox
                        checked={value}
                        onChange={(e) => {
                          onChange(e.target.checked);
                        }}
                      />
                    )}
                  />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  name="description"
                  tooltip="Other information about the hotel."
                  label="Hotel description"
                  rules={[
                    {
                      required: true,
                      message: "Please input hotel description!",
                    },
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Enter description"
                    {...register("description", { required: true })}
                    autoFocus
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                {mode === "add" && (
                  <Form.Item
                    name="business_license"
                    tooltip="Other information about the hotel."
                    label="Hotel business license"
                    rules={[
                      {
                        required: true,
                        message: "Please input hotel business license!",
                      },
                    ]}
                  >
                    <Input
                      type="text"
                      placeholder="Enter business license"
                      {...register("business_license", { required: true })}
                      autoFocus
                    />
                  </Form.Item>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <div
              style={{
                justifyContent: "space-around",
                display: "flex",
                alignItems: "center",
              }}
            >
              {hotel.main_photo && mode === "edit" && (
                <Image
                  width={200}
                  height={200}
                  src={hotel.main_photo}
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
                  <AddPhotoAlternateIcon />
                </IconButton>
              </label>
              <Image width={200} height={200} src={src} alt={alt} />
            </div>
          </Col>
          <Col span={12}>
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
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { postHotel, patchHotel })(HotelManage);
