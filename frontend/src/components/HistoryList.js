import React from "react";
import moment from "moment";
import { List } from "antd";
import { QrcodeOutlined } from "@ant-design/icons";

export default function HistoryList(params) {
  const { meetList } = params;
  return (
    <List
      itemLayout="horizontal"
      dataSource={meetList}
      renderItem={(meet) => (
        <List.Item>
          <List.Item.Meta
            style={{ alignItems: "center" }}
            avatar={<QrcodeOutlined style={{ fontSize: 45 }} />}
            title={
              <span>
                Meet ID: <strong>{meet.meetingId}</strong>
              </span>
            }
            description={`Creado por: ${meet.createdBy} · ${moment(
              meet.createdAt
            ).format("llll")}
              · Cantidad de personas: ${meet.totalMembers}
            `}
          />
        </List.Item>
      )}
    />
  );
}
