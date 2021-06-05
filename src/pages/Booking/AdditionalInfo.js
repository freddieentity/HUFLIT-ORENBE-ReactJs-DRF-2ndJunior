import React from "react";
import { Collapse } from "antd";
const { Panel } = Collapse;

function AdditionalInfo() {
  return (
    <Collapse defaultActiveKey={["0"]} style={{ margin: "2% 2% 2% 2%" }}>
      <Panel icon header={`!!! Important Authorities's Notice`} key="1">
        <p>
          As COVID-19 situation evolves, make sure the cancellation policy suits
          your needs. Child Policy applies at this hotel. Additional fee may
          apply for children above 5 years old who stay in the same room with
          adult guests.
        </p>
      </Panel>
    </Collapse>
  );
}

export default AdditionalInfo;
