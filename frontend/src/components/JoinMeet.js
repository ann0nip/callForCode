import React, { useState } from "react";
import { Modal, InputNumber } from "antd";
import { joinMeet } from "../api/api";

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
      <InputNumber onChange={onChange} />
    </Modal>
  );
}
