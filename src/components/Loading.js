import { Space, Spin } from "antd";
import React from "react";

function Loading() {
  return (
    <Space
      size="middle"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        minHeight: "100vh",
      }}
    >
      <Spin size="large" />
    </Space>
  );
}

export default Loading;
