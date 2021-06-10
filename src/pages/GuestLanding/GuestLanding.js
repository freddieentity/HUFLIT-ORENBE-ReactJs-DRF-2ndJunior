import React, { useState, useEffect } from "react";
import Dropdown from "../../components/Dropdown";
import NavBar from "../../components/NavBar";
import Hero from "./Hero";
import InfoSection from "./InfoSection";
import { sliderData } from "../../data/sliderData";
import Search from "./Search";
import About from "./About";
import Feature from "./Feature";
import Works from "./Works";
import Main from "../Report/Main";

function GuestLanding() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);

  let title = "EXPLORE THE BEYONDS";
  useEffect(() => {
    if (index < title.length) {
      setTimeout(() => {
        setText((text) => text + title[index]);
        setIndex(index + 1);
      }, 40);
    }
  }, [index, title]);

  return (
    <>
      <NavBar toggle={toggle} />
      <Dropdown isOpen={isOpen} toggle={toggle} />
      <Hero slides={sliderData} />
      <hr className="hrgradient" />
      <h1 style={{ textAlign: "center" }}>
        <strong>{text}</strong>
      </h1>
      <hr className="hrgradient" />
      <div>
        <div className="textAni">
          <Search id="hotelsearch" />
          <Main />
        </div>
      </div>
      <img
        src={`https://static.wixstatic.com/media/06fec4_1df8726e54984481ab8b580d2d5088d0.jpg`}
        alt="cover"
        width="100%"
        height="20%"
        style={{ margin: "2% 0 0 0" }}
      />
      <InfoSection />
      <Works />
      <About />
      <Feature />
    </>
  );
}

export default GuestLanding;
