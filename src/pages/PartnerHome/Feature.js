import React from "react";
import { Row, Col } from "antd";
import { Card } from "antd";
const { Meta } = Card;

const image1 =
  "https://www.ritzparis.com/sites/default/files/images/header_slideshow/facaderitz_0.jpg";
const image2 =
  "https://www.ritzparis.com/sites/default/files/images/header_slideshow/pool_6_0.jpg";
const image3 =
  "https://www.ritzparis.com/sites/default/files/images/header_slideshow/winsdor_5_0.jpg";
const image4 =
  "https://www.ritzparis.com/sites/default/files/images/header_slideshow/headerbarvendometerrasse_0.jpg";
const image5 =
  "https://www.ritzparis.com/sites/default/files/images/header_slideshow/salon_ete_5_0.jpg";
const image6 =
  "https://www.ritzparis.com/sites/default/files/images/header_slideshow/terrassemansart_0.jpg";

function Feature() {
  return (
    <div id="feature" className="block featureBlock bgGray">
      <div className="container-fluid">
        <div className="titleHolder">
          <h2>Key Features and Benefits</h2>
          <p>
            Obcaecati consequatur libero repudiandae, aperiam itaque laborum!
          </p>
        </div>
        <Row gutter={[16, 16]}>
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <Card hoverable cover={<img alt="Modern Design" src={image1} />}>
              <Meta title="Modern Design" />
            </Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <Card hoverable cover={<img alt="Test" src={image2} />}>
              <Meta title="Clean and Elegant" />
            </Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <Card hoverable cover={<img alt="Test" src={image3} />}>
              <Meta title="Great Support" />
            </Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <Card hoverable cover={<img alt="Test" src={image4} />}>
              <Meta title="Easy to customise" />
            </Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <Card hoverable cover={<img alt="Test" src={image5} />}>
              <Meta title="Unlimited Features" />
            </Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <Card hoverable cover={<img alt="Test" src={image6} />}>
              <Meta title="Advanced Options" />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Feature;
