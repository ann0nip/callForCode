import React from "react";
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";

export const openNotification = ({ title, message }) => {
  notification.open({
    message: title,
    description: message,
    icon: <SmileOutlined style={{ color: "#108ee9" }} />,
  });
};
