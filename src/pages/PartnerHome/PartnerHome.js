import React from "react";
import About from "./About";
import Contact from "./Contact";
import FAQ from "./FAQ";
import Feature from "./Feature";
import Hero from "./Hero";
import Pricing from "./Pricing";
import Works from "./Works";

function PartnerHome() {
  return (
    <div style={{ width: "100%" }}>
      <Hero />
      <About />
      <Feature />
      <Works />
      <FAQ />
      <Pricing />
      <Contact />
    </div>
  );
}

export default PartnerHome;
