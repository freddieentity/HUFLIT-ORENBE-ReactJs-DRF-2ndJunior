import React from "react";

import { Row, Col } from "antd";

const items = [
  {
    key: "1",
    icon: <i className="fas fa-chart-pie"></i>,
    title: "High Performance",
    content:
      "cu nostro dissentias consectetuer mel. Ut admodum conceptam mei, cu eam tation fabulas abhorreant. His ex mandamus.",
  },
  {
    key: "2",
    icon: <i className="fas fa-desktop"></i>,
    title: "Flat Design",
    content:
      "cu nostro dissentias consectetuer mel. Ut admodum conceptam mei, cu eam tation fabulas abhorreant. His ex mandamus.",
  },
  {
    key: "3",
    icon: <i className="fas fa-database"></i>,
    title: "Simplified Workflow",
    content:
      "cu nostro dissentias consectetuer mel. Ut admodum conceptam mei, cu eam tation fabulas abhorreant. His ex mandamus.",
  },
];

function About() {
  return (
    <div id="about" className="block aboutBlock">
      <div className="container-fluid">
        <div className="titleHolder">
          <h2>About Us</h2>
          <p>A Window Onto the Sky</p>
        </div>
        <div className="contentHolder">
          <p>
            The Ritz Paris is currently open and our teams are delighted to
            welcome you back. We are here to ensure an unforgettable stay, in
            the utmost comfort. Enjoy the Bar Vendôme in the shelter of its
            retractable glass roof, by day and by night. For a true moment of
            well-being, reserve a facial, massage, or body treatment at the Ritz
            Club. Delight those you love with a Ritz Paris experience: our gift
            cards are available online. Would you like to drop by and see what’s
            new? The Tasaki and TWG Tea boutiques present their latest offerings
            to their visitors. We thank you, as ever, for your loyalty. The
            teams at the Ritz Paris
          </p>
        </div>
        <Row gutter={[16, 16]}>
          {items.map((item) => {
            return (
              <Col md={{ span: 8 }} key={item.key}>
                <div className="content">
                  <div className="icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.content}</p>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}

export default About;
