import React, { useContext } from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import MessageForm from "../components/MessageForm";
import Departments from "../components/Departments";

const Home = () => {
  return (
    <>
      <Hero
        title={
          "Welcome to Nivora Care Hospital –  Your Partner in Health and Healing"
        }
        imageUrl={"/hero.jpg"}
      />
      <Biography imageUrl={"/aboutus.jpg"} />
      <Departments />
      <MessageForm />
    </>
  );
};

export default Home;