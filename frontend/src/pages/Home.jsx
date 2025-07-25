import React, { useContext, useEffect } from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import MessageForm from "../components/MessageForm";
import Departments from "../components/Departments";
useEffect(() => {
  if (!window.chatbase || window.chatbase("getState") !== "initialized") {
    window.chatbase = (...args) => {
      if (!window.chatbase.q) window.chatbase.q = [];
      window.chatbase.q.push(args);
    };
    window.chatbase = new Proxy(window.chatbase, {
      get(target, prop) {
        if (prop === "q") return target.q;
        return (...args) => target(prop, ...args);
      },
    });
  }
  const onLoad = function () {
    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.id = "YrRQDi7spmrKeFtLR6WEB";
    script.domain = "www.chatbase.co";
    document.body.appendChild(script);
  };
  if (document.readyState === "complete") {
    onLoad();
  } else {
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }
}, []);
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