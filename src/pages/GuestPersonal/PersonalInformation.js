import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { Form, Input, Button, Row, Image, Col } from "antd";
import IconButton from "@material-ui/core/IconButton";
import { FcAddImage } from "react-icons/fc";
import { connect } from "react-redux";
import { patchUser } from "../../redux/actions/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: "1% 1% 1% 1%",
  },
  background: {
    backgroundColor: "#DCEFE8",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    textAlign: "center",
  },
}));

function PersonalInformation({ user, patchUser }) {
  const c = useStyles();
  const { register, handleSubmit } = useForm();
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});
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
  useEffect(() => {
    forceUpdate({});
  }, []);
  const onSubmit = (data) => {
    const upd = { ...data, avatar: pic };
    const fd = new FormData();
    upd.email && fd.append("email", upd.email);
    upd.name && fd.append("name", upd.name);
    upd.phone && fd.append("phone", upd.phone);
    upd.firstname && fd.append("firstname", upd.firstname);
    upd.middlename && fd.append("middlename", upd.middlename);
    upd.lastname && fd.append("lastname", upd.lastname);
    pic && fd.append("avatar", pic, pic.name);

    patchUser(user.email, fd);
  };
  return (
    <Paper square className={c.root}>
      <Form
        form={form}
        name="horizontal_login"
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
        initialValues={user}
      >
        <Row>
          <Col span={16}>
            <Row>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Enter your email"
                    {...register("email", { required: true })}
                    autoFocus
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="phone"
                  label="Phone"
                  rules={[
                    { required: true, message: "Please input your phone!" },
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Enter your phone"
                    {...register("phone", { required: true })}
                    autoFocus
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[
                    { required: true, message: "Please input your name!" },
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    {...register("name", { required: true })}
                    autoFocus
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="lastname"
                  label="Lastname"
                  rules={[
                    { required: true, message: "Please input your lastname!" },
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Enter your lastname"
                    {...register("lastname", { required: true })}
                    autoFocus
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  name="firstname"
                  label="Firstname"
                  rules={[
                    { required: true, message: "Please input your firstname!" },
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Enter your firstname"
                    {...register("firstname", { required: true })}
                    autoFocus
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="middlename"
                  label="Middlename"
                  rules={[
                    {
                      required: true,
                      message: "Please input your middlename!",
                    },
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Enter your middlename"
                    {...register("middlename", { required: true })}
                    autoFocus
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            <Row>
              <Col span={24}>
                <div
                  style={{
                    justifyContent: "space-around",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Image
                    width={300}
                    height={250}
                    src={user.avatar}
                    alt={user.name}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <div
                  style={{
                    justifyContent: "space-around",
                    display: "flex",
                    alignItems: "center",
                    margin: "1% 1% 1% 1%",
                  }}
                >
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    {...register("avatar")}
                    id="avatar"
                    style={{ display: "none" }}
                    onChange={handleImg}
                  />
                  <label htmlFor="avatar">
                    <IconButton
                      color="inherit"
                      aria-label="upload picture"
                      component="span"
                    >
                      <FcAddImage />
                    </IconButton>
                  </label>
                  <Image width={100} height={100} src={src} alt={alt} />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
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
    </Paper>
  );
}
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { patchUser })(PersonalInformation);
