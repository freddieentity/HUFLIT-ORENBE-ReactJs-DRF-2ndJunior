import React, { useState } from "react";
import Dropdown from "../../components/Dropdown";
import NavBar from "../../components/NavBar";
import Hero from "./Hero";
import InfoSection from "./InfoSection";
import { sliderData } from "../../data/sliderData";
import Search from "./Search";
import About from "./About";
import Feature from "./Feature";
import Works from "./Works";

function GuestLanding() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <NavBar toggle={toggle} />
      <Dropdown isOpen={isOpen} toggle={toggle} />
      <Hero slides={sliderData} />
      <hr className="hrgradient" />
      <h1 style={{ textAlign: "center" }}>
        <strong>EXPLORE THE BEYONDS</strong>
      </h1>
      <hr className="hrgradient" />
      <Search id="hotelsearch" />
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
