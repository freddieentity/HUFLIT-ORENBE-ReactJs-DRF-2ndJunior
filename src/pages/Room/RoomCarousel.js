import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Paper } from "@material-ui/core";

const slidesData = [
  {
    id: 1,
    title: "repellendus id ullam",
    label: "Dolorem officiis temporibus.",
  },
  {
    id: 2,
    title: "excepturi consequatur est",
    label: "Officia non provident dolor esse et neque.",
  },
  {
    id: 3,
    title: "eius doloribus blanditiis",
    label: "Ut recusandae vel vitae molestiae id soluta.",
  },
  {
    id: 4,
    title: "nihil voluptates delectus",
    label: "Qui vel consequatur recusandae illo repellendus.",
  },
  {
    id: 5,
    title: "nemo dolorem necessitatibus",
    label: "Placeat odit velit itaque voluptatem.",
  },
  {
    id: 6,
    title: "dolorem quibusdam quasi",
    label: "Adipisci officiis repudiandae.",
  },
];

function RoomCarousel() {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  });
  const settingsMain = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    asNavFor: ".slider-nav",
  };
  return (
    <Paper
      style={{
        borderRadius: "8px",
        padding: "10px 10px 10px 10px",
        minHeight: "80vh",
      }}
      elevation={6}
    >
      <div className="slider-wrapper">
        <Slider
          {...settingsMain}
          asNavFor={nav2}
          ref={(slider) => setSlider1(slider)}
        >
          {slidesData.map((slide) => (
            <div className="slick-slide" key={slide.id}>
              <img
                className="slick-slide-image"
                src={`https://picsum.photos/800/400?img=${slide.id}`}
              />
            </div>
          ))}
        </Slider>
      </div>
    </Paper>
  );
}

export default RoomCarousel;
