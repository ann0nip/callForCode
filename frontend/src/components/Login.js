import React, { useEffect } from "react";
import "antd/dist/antd.css";
import AppID from "ibmcloud-appid-js";
import { Layout, Card, Button, Typography } from "antd";
import { openNotification } from "./commons/Alert";
import { checkAuth, setAuth } from "./commons/Auth";
import styles from "./login.module.css";
import config from "../config.json";
import girl from "../images/girl.png";
import { LoginOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Text, Paragraph, Title } = Typography;
const cardBodyStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  height: "100%",
  justifyContent: "space-around",
};
export default function Login(props) {
  const appID = React.useMemo(() => {
    return new AppID();
  }, []);

  (async () => {
    try {
      await appID.init(config);
    } catch (e) {
      console.log(e.message);
    }
  })();

  useEffect(() => {
    if (checkAuth()) {
      props.history.push("/home");
    }
  }, []);

  const loginAction = async () => {
    try {
      const tokens = await appID.signin();
      setAuth(tokens.idToken, tokens.idTokenPayload.name);
      props.history.push("/home");
    } catch (e) {
      openNotification("Error", e.message);
    }
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Content className={styles.content}>
        <img src={girl} width="100%" alt="GirlBG"></img>
        <Card className={styles.card} bodyStyle={cardBodyStyles}>
          <Text strong style={{ color: "#F52200" }}>
            Be safe around the ones you love.
          </Text>
          <Title style={{ fontSize: "2em", margin: 0 }}>CoTR</Title>
          <Paragraph>
            Con tu registro podrás crear IDs de reuniones (meets) que serán tu
            identificación para que las personas que se van a reunir contigo
            sean agregados como participantes. En caso de que alguien resulte
            positivo Covid-19 y notifique a través de CoTR, las personas que
            estuvieron en contacto con él dentro de los 14 días anteriores serán
            notificadas.
          </Paragraph>
          <Button
            type="danger"
            shape="round"
            icon={<LoginOutlined />}
            size="large"
            onClick={loginAction}
          >
            INGRESAR
          </Button>
        </Card>
      </Content>
    </Layout>
  );
}
