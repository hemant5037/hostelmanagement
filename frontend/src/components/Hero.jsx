import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>{title}</h1>
          <p>
          Nivora Care Hospital is a modern, state-of-the-art healthcare facility committed to delivering
           exceptional medical services with compassion, precision, and personalized attention. Our team of 
           highly skilled professionals is dedicated to understanding and addressing each patient's unique 
           needs with utmost care. At Nivora, your well-being is our top priority. We strive to create a warm, 
           supportive environment that fosters healing and promotes a balanced journey towards complete health and wellness.
          </p>
        </div>
        <div className="banner">
          <img src={imageUrl} alt="hero" className="animated-image" />
          <span>
            <img src="/vector-1.jpg" alt="vector" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Hero;