import React, { useEffect, useState } from "react";
import { Form, Input, Button, Drawer } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";

function AddHotelType({
  show,
  handleOnClose,
  handleOnFinish,
  mode,
  hotelType,
}) {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    mode === "add" ? handleOnFinish(data) : handleOnFinish(hotelType.id, data);
  };

  const [form] = Form.useForm();
  const [, forceUpdate] = useState({}); // To disable submit button at the beginning.

  useEffect(() => {
    forceUpdate({});
  }, []);

  return (
    <Drawer
      width={350}
      visible={show}
      onClose={handleOnClose}
      maskClosable={true}
      title={`${mode === "edit" ? "Edit Details" : "Manage Hotel Types"}`}
      destroyOnClose={true}
    >
      <Form
        form={form}
        name="horizontal_login"
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
        initialValues={hotelType}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input the hotel type!" }]}
        >
          <Input
            prefix={<HomeOutlined className="site-form-item-icon" />}
            type="text"
            placeholder="Enter hotel type"
            label="Hotel Type"
            {...register("name", { required: true })}
            autoFocus
          />
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <>
              <Button
                type="default"
                htmlType="submit"
                className="btn btn-primary mt-1"
                disabled={
                  !form.isFieldsTouched(true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
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
      </Form>
    </Drawer>
  );
}

export default AddHotelType;
