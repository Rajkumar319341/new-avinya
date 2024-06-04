import React, { Component } from "react";
// import "../about.css";
import Footer from "../Footer";
import General from '../../Images/img-15.png';
import Mission from '../../Images/img-16.png';
import Vission from '../../Images/img-17.png'
import Navbar from "../Navbar";


function About() {
  return (
    <>
      <Navbar />
      <div className="About-wrap">
        <h1 className="card-services">About Us</h1>
        <hr />
        <div className="software-card-container">
          <div class="software-card">
            <img className="software-card-image" src={General} alt="Image" />
            <div class="software-card-content">
              <p>
                Care4Edu Pvt. Ltd is an esteemed organization that is well known
                for transforming the business ecosystem into innovative digital
                applications by harnessing the power of emerging technologies.
                The Organization is expert in designing and developing
                technology products that can streamline business processes and
                grow revenue. We convert client requirements into custom
                software solutions with advanced technologies by focusing on
                building secure, scalable and custom-centric software products.
              </p>
            </div>
          </div>

          <div class="software-card alternate">
            <img className="software-card-image" src={Mission} alt="Image" />
            <div class="software-card-content">
              <h2 className="software-card-h2">Our Mission:</h2>
              <p>
                To help our customers bring value and make their
                businesses grow. From start to finish (and beyond) we are committed to ensuring that your business has the tools, support and knowledge it needs to sustain the driving impact.

              </p>
            </div>
          </div>

          <div class="software-card">
            <img className="software-card-image" src={Vission} alt="Image" />
            <div class="software-card-content">
              <h2 className="software-card-h2">Our Vision:</h2>
              <p>
                To be the most-preferred technology solutions provider in the world. We believe in “work with the accuracy and best quality.” We want to be known as the reliable, innovative and user friendly software service provider in IT industry.
              </p>
            </div>
          </div>
        </div>

      </div>

    </>

  );
}

export default About;
