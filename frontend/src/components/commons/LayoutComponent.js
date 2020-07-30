import React, { useContext } from "react";
import { Layout, Spin } from "antd";
import { GlobalContext } from "../../context/global-context";
import styles from "./layout.module.css";

const { Content } = Layout;
export default function LayoutComponent({ children }) {
  const { isLoading } = useContext(GlobalContext);

  return (
    <Spin spinning={isLoading} tip="Loading...">
      <Layout style={{ height: "100vh" }}>
        <Content className={styles.content}>{children}</Content>
      </Layout>
    </Spin>
  );
}
