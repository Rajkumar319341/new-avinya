import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../Images/smart.png";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="software-navbar">
        <div className="software-navbar-container">
          <Link to="/" className="software-navbar-logo" onClick={closeMobileMenu}>
            <img className="software-navbar-img" src={logo} width={10} height={10} />
          </Link>
          <div className="software-menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <Link to="/" onClick={closeMobileMenu}>
            <div className="software-navbar-logo-text">CARE 4 EDU Solutions Private Limited</div>
          </Link>
          <ul className={click ? "software-nav-menu active" : "software-nav-menu"}>
            <li className="software-nav-item">
              <Link to="/software-solutions" className="software-nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="software-nav-item">
              <Link
                to="/about-us"
                className="software-nav-links"
                onClick={closeMobileMenu}
              >
                About
              </Link>
            </li>
            <li className="software-nav-item">
              <Link
                to="/services"
                className="software-nav-links"
                onClick={closeMobileMenu}
              >
                Services
              </Link>
            </li>

            <li className="software-nav-item">
              <Link
                to="/contact-us"
                className="software-nav-links"
                onClick={closeMobileMenu}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
