import React, {Component} from "react";
// import "../services.css";
import About from "./About";
import Footer from '../Footer';


function AboutWithoutFooter()
{
    return (
      <>
     
        <About/>
        <Footer/>
      </>
    );
}

export default AboutWithoutFooter;