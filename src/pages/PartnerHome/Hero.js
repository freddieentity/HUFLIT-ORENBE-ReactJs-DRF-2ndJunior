import React from "react";
import { Carousel } from "antd";

function Hero() {
  return (
    <div id="hero" className="heroBlock">
      <Carousel autoplay={true} autoplaySpeed={1800}>
        <div className="container-fluid">
          <div className="content">
            <div className="btnHolder"></div>
          </div>
        </div>
      </Carousel>
    </div>
  );
}

export default Hero;
