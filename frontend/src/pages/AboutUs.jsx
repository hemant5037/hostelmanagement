import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
const AboutUs = () => {
  return (
    <div className="about-us-page">
      <Hero
      
        title={   "Learn More About Us |  Nivora Care Hospital"}
        imageUrl={"/aboutus.jpg"}
      />
      <Biography imageUrl={"/whoweare.png"} />
    </div>
  );
};

export default AboutUs;