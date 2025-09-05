import React from "react";
import { Spin } from "antd";

const UserLoading: React.FC = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
      }}
    >
      <Spin size="large" tip="Đang tải trang..." />
    </div>
  );
};

export default UserLoading;