import React, { useContext, useState, useEffect } from "react";
import styles from "./home.module.css";
import { Row, Col, Typography, Button } from "antd";
import { WarningOutlined, ReloadOutlined } from "@ant-design/icons";
import { createMeeting, getHistory } from "../api/api";
import { GlobalContext } from "../context/global-context";
import Layout from "./commons/LayoutComponent";
import HistoryList from "./HistoryList";
import { JoinMeetModal } from "./JoinMeet";
import { SendAlertModal } from "./SendAlert";

const { Title } = Typography;
function Home() {
  const { setSpinnerStatus } = useContext(GlobalContext);
  const [meetList, setMeetList] = useState([]);
  const [userName, setUserName] = useState("");
  const [joinModalVisible, setJoinModalVisible] = useState(false);
  const [sendAlertModalVisible, setSendAlertModalVisible] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("username");
    setUserName(username);
    getFullHistory();
  }, []);

  async function createMeet() {
    setSpinnerStatus(true);
    try {
      const res = await createMeeting();
      const meet = await res.json();
      setSpinnerStatus(false);
      setMeetList([meet, ...meetList]);
    } catch (error) {
      console.log(error);
    }
  }

  async function getFullHistory() {
    setSpinnerStatus(true);
    try {
      const res = await getHistory();
      const history = await res.json();
      setSpinnerStatus(false);
      setMeetList(history.meetings);
    } catch (error) {
      console.log(error);
    }
  }

  function triggerJoinMeetModal(value) {
    setJoinModalVisible(value);
  }
  function triggerSendAlertModal(value) {
    setSendAlertModalVisible(value);
  }

  return (
    <Layout>
      <Row className={styles.rowHeader}>
        <Col span={24} className={styles.rowHeader_username}>
          <Title level={3}>{userName}</Title>
        </Col>
        <Col span={24} className={styles.rowHeader_btns}>
          <Button onClick={createMeet} type="primary" size="large">
            Crear Meet
          </Button>
        </Col>
        <Col span={24} className={styles.rowHeader_btns}>
          <Button shape="round" type="primary" size="large" disabled>
            Escanear QR
          </Button>
          <Button
            onClick={() => triggerJoinMeetModal(true)}
            shape="round"
            type="primary"
            size="large"
          >
            Ingresar ID
          </Button>
        </Col>
        <JoinMeetModal
          visible={joinModalVisible}
          triggerModal={triggerJoinMeetModal}
        />
        <SendAlertModal
          visible={sendAlertModalVisible}
          triggerModal={triggerSendAlertModal}
        />
      </Row>

      <Row className={styles.rowHistory}>
        <Col span={24} className={styles.rowHistory_title}>
          <Title level={4}>Historial</Title>
          <ReloadOutlined
            onClick={getFullHistory}
            style={{ fontSize: 20, margin: 5 }}
          />
        </Col>
        <Col span={24} className={styles.rowHistory_list}>
          <HistoryList meetList={meetList} />
        </Col>
        <Col span={24} className={styles.rowHistory_alertBtn}>
          <Button
            onClick={() => triggerSendAlertModal(true)}
            type="danger"
            shape="round"
            size="large"
            icon={<WarningOutlined />}
          >
            Positivo COVID-19
          </Button>
        </Col>
      </Row>
    </Layout>
  );
}

export default Home;
