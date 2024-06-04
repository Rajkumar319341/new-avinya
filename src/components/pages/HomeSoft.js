import React from 'react';
import Cards from '../Cards';
import HeroSection from '../HeroSection';
import Footer from '../Footer';
import About from './About';
import Contact from './Contact';
// import * as BsIcons from "react-icons/bs";
// import * as TfiIcons from "react-icons/tfi";
// import * as GrIcons from "react-icons/gr";
// import '../Home.css';
import Services from './Services';
import Navbar from '../Navbar';

function HomeSoft() {
  return (
    <>
    <Navbar />
      <HeroSection />
      <About/>   
      {/* <h1 className="card-services">Our Services</h1>

      <Cards /> */}
      <Services />
      <Contact />
      <Footer />
    </>
  );
}

export default HomeSoft;
