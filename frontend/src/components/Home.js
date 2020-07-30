import React, { useContext, useState, useEffect } from "react";
import styles from "./home.module.css";
import { Row, Col, Typography, Button } from "antd";
import { WarningOutlined, ReloadOutlined } from "@ant-design/icons";
import { createMeeting, getHistory } from "../api/api";
import { GlobalContext } from "../context/global-context";
import Layout from "./commons/LayoutComponent";
import HistoryList from "./HistoryList";

const { Title } = Typography;
function Home() {
  const { setSpinnerStatus } = useContext(GlobalContext);
  const [meetList, setMeetList] = useState([]);

  useEffect(() => {
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
  return (
    <Layout>
      <Row className={styles.rowHeader}>
        <Col span={24} className={styles.rowHeader_username}>
          <Title level={3}>Nombre de usuario</Title>
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
          <Button shape="round" type="primary" size="large">
            Ingresar ID
          </Button>
        </Col>
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
