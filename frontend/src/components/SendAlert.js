import React, { useState } from "react";
import { Modal, Checkbox, DatePicker, Typography } from "antd";
import { sendAlert } from "../api/api";

const { Text } = Typography;
export function SendAlertModal({ visible, triggerModal }) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [covid, setCovid] = useState();

  async function handleOk() {
    setConfirmLoading(true);
    // Some props are hardcoded for now.
    await sendAlert({
      message: "Be careful someone that met one of your meetings got sick",
      email: "hola@mx1.ibm.com",
      covid19: covid,
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
  function onChange(date, dateString) {
    console.log(date, dateString);
  }

  return (
    <Modal
      title="Notificar test positivo en Covid-19"
      visible={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Checkbox style={{ marginBottom: 15 }} onChange={onChangeCheckBox}>
        Soy positivo en COVID-19
      </Checkbox>
      <br />
      <Text>Cuándo comenzaron los síntomas?</Text>
      <DatePicker
        style={{ display: "block", marginBottom: 10 }}
        onChange={onChange}
      />

      <Text disabled>
        * Al confirmar Covid-19 positivo. Las personas que estuvieron en
        contacto con Ud dentro de los 14 días anteriores a los síntomas serán
        notificados pero NO será revelada su identidad.
      </Text>
    </Modal>
  );
}
