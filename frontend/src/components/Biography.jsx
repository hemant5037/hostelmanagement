import React from "react";

const Biography = ({imageUrl}) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <p>Biography</p>
          <h3>Who We Are</h3>
          <p>
          At Nivora Care Hospital, we are more than just a medical facility — we are a dedicated
           community of healthcare professionals driven by compassion, innovation, and a commitment to excellence.
           Founded with the vision of providing holistic and accessible healthcare to all,Nivora Care brings together advanced medical 
           technologies, world-class infrastructure, and a team of experienced doctors, nurses, and specialists who care deeply about your health journey.
          </p>
          <p>Our mission is to deliver personalized treatment with empathy, transparency, and integrity.</p>
          <p>At Nivora Care Hospital, your health is our purpose, and your trust is our greatest reward.</p>
         
        </div>
      </div>
    </>
  );
};

export default Biography;