import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const navigateTo = useNavigate();

  const goToLogin = () => {
    navigateTo("/login");
  };

  return (
    <>
      <nav className={"container"}>
        <div className="logo">
          <img src="/logo2.png" alt="logo" className="logo-img" />
        </div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="links">
            <Link to={"/"} onClick={() => setShow(!show)}>
              Home
            </Link>
            <Link to={"/appointment"} onClick={() => setShow(!show)}>
              Appointment
            </Link>
            <Link to={"/about"} onClick={() => setShow(!show)}>
              About Us
            </Link>
            <a 
              href="https://hostelmanagement-7p1h.vercel.app/login" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => setShow(!show)}
            >
              Dashboard
            </a>
          </div>
          {user ? (
            <button className="logoutBtn btn" onClick={handleLogout}>
              LOGOUT
            </button>
          ) : (
            <button className="loginBtn btn" onClick={goToLogin}>
              LOGIN 
            </button> 
          )}
        </div> 
        <div className="hamburger" onClick={() => setShow(!show)}>
          <GiHamburgerMenu /> 
        </div> 
      </nav>
    </>
  );
};

export default Navbar;