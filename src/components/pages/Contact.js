import React, { Component } from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { BsFillTelephoneFill } from "react-icons/bs";
import { TfiEmail } from "react-icons/tfi";
import { GrLocation } from "react-icons/gr";

function Contact() {
  return (
    <>
      <Navbar />
      <div className="About-wrap">
        <h1 className="contacts-heading">Contact Us</h1>
        <hr />
        <div className="footer-subscription">
          <p className="footer-subscription-text">
            Better yet, See us in person!
          </p>
          <p className="footer-subscription-text">
            We love our customers, so feel free to visit during normal business
            hours.
            <br />
            <br />
          </p>

          <p className="footer-name-text">
            <b>CARE 4 EDU Solutions PVT LTD</b>
          </p>
          <p className="footer-subscription-text">
            <span className="contacts-office">Head Office (Teaching Training & Software Solutions)</span><br />
            Doddabommasandra Post, Vidyaranyapura<br />
            Bengaluru – 5600097
          </p>
          <p className="footer-subscription-text">
            <span className="contacts-office">Branch Office</span><br />
            Abbigere <br/>
            

          </p>


          <div class="contacts-container">
            <div class="contacts-box">
              <div>
                <BsFillTelephoneFill />
              </div>
              <a href="#">+91 95353 52376</a>
            </div>
            <div class="contacts-box">
              <div>
                <TfiEmail />
              </div>
              <a href={`mailto:${"info@care4edu.com"}`}>info@care4edu.com</a>
            </div>
            <div class="contacts-box">
              <div>
                <GrLocation />
              </div>
              <a href="https://www.google.com/maps?q=13.059230794323861,77.56238402713825" target="_blank">
                Vidyaranyapura Office
              </a>
            </div>
            <div class="contacts-box">
              <div>
                <GrLocation />
              </div>
              <a href="https://www.google.com/maps?q=13.0715410,77.5257940" target="_blank">
                Abbigere Office
              </a>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Contact;
