import React from "react";
import styles from "./home.module.css";
import { Layout, Row, Col, Typography, Button } from "antd";
import { WarningOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title } = Typography;
function Home() {
  return (
    <Layout style={{ height: "100vh" }}>
      <Content className={styles.content}>
        <Row className={styles.rowHeader}>
          <Col span={24} className={styles.rowHeader_username}>
            <Title level={3}>Nombre de usuario</Title>
          </Col>
          <Col span={24} className={styles.rowHeader_btns}>
            <Button type="primary" size="large">
              Crear Meet
            </Button>
          </Col>
          <Col span={24} className={styles.rowHeader_btns}>
            <Button type="primary" size="large">
              Escanear QR
            </Button>
            <Button type="primary" size="large">
              Ingresar ID
            </Button>
          </Col>
        </Row>
        <Row className={styles.rowHistory}>
          <Col span={24} className={styles.rowHistory_title}>
            <Title level={4}>Historial</Title>
          </Col>
          <Col span={24} className={styles.rowHistory_list}>
            - - -
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
      </Content>
    </Layout>
  );
}

export default Home;
