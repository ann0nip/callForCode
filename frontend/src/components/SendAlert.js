import React, { useState } from "react";
import { Modal, Checkbox, Input } from "antd";
import { sendAlert } from "../api/api";

export function SendAlertModal({ visible, triggerModal }) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [covid, setCovid] = useState();
  const [health, setHealth] = useState();

  async function handleOk() {
    setConfirmLoading(true);
    // Some props are hardcoded for now.
    await sendAlert({
      message: "Be careful someone that met one of your meetings got sick",
      email: "hola@mx1.ibm.com",
      covid19: covid,
      health: health,
      symptoms: ["fever", "cough"],
      testedPositive: [
        { kind: "Test A", testedAt: "2020-07-30T00:26:36.396Z" },
      ],
    });
    setConfirmLoading(false);
    triggerModal(false);
  }

  function handleCancel() {
    triggerModal(false);
  }

  function onChangeCheckBox(e) {
    setCovid(e.target.checked);
  }
  function onChange(e) {
    setHealth(e.target.checked);
  }

  return (
    <Modal
      title="Desea unirse a una Meet?"
      visible={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Checkbox onChange={onChangeCheckBox}>Soy positivo en COVID-19</Checkbox>

      <Input
        onChange={onChange}
        placeholder="Describe como te encuentras brevemente"
      />
    </Modal>
  );
}

function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}
