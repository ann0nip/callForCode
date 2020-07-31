import React, { useState } from "react";
import { Modal, InputNumber, Typography } from "antd";
import { joinMeet } from "../api/api";

const { Text } = Typography;
export function JoinMeetModal({ visible, triggerModal }) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [meetingId, setMeetingId] = useState();

  async function handleOk() {
    setConfirmLoading(true);
    await joinMeet(meetingId);
    setConfirmLoading(false);
    triggerModal(false);
  }

  function handleCancel() {
    triggerModal(false);
  }

  function onChange(value) {
    setMeetingId(value);
  }

  return (
    <Modal
      title="Desea unirse a una Meet?"
      visible={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Text style={{ marginRight: 10 }} type="secondary">
        Meet ID
      </Text>

      <InputNumber onChange={onChange} />
    </Modal>
  );
}
