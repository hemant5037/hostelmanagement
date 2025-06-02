import React from "react";
import Hero from "../components/Hero";
import AppointmentForm from "../components/AppointmentForm";

const Appointment = () => {
  return (
    <>
      <Hero
        title={"Schedule Your Appointment | Nivora Care Hospital "}
        imageUrl={"/signin.jpg"}
      />
      <AppointmentForm/>
    </>
  );
};

export default Appointment;