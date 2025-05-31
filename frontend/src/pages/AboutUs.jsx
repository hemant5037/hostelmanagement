import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
const AboutUs = () => {
  return (
    <>
      <Hero
      
        title={   "Learn More About Us |  Nivora Care Hospital"}
        imageUrl={"/aboutus.jpg"}
      />
      <Biography imageUrl={"/whoweare.png"} />
    </>
  );
};

export default AboutUs;