// src/components/common/ConfirmAction.tsx
import React from "react";
import { Popconfirm, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

interface ConfirmActionProps {
  title?: string;
  description?: string;
  okText?: string;
  cancelText?: string;
  onConfirm: () => void;
  children: React.ReactNode;
}

const ConfirmAction: React.FC<ConfirmActionProps> = ({
  title = "Bạn có chắc chắn?",
  description,
  okText = "Đồng ý",
  cancelText = "Hủy",
  onConfirm,
  children,
}) => {
  return (
    <Popconfirm
      title={title}
      description={description}
      okText={okText}
      cancelText={cancelText}
      onConfirm={onConfirm}
      icon={<ExclamationCircleOutlined style={{ color: "red" }} />}
    >
      {children}
    </Popconfirm>
  );
};

export default ConfirmAction;