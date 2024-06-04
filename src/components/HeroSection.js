import React from 'react';
// import Navbar2 from '../Navigation/Navbar2';
// import '../App.css';
import { Button } from './Button';
// import './HeroSection.css';
// import Navbar from './Navbar';

function HeroSection() {
  return (
    <div className='hero-container'>
      {/* <video src='/videos/video-1.mp4' autoPlay loop muted /> */}
      {/* <Navbar /> */}
      <h1>CARE 4 EDU<div className='hero-section-subtitle'>Solutions Private Limited</div></h1>
      {/* <p>.</p> */}
      <br/>
      <br/>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          CONTACT US
        </Button>
        
      </div>
    </div>
  );
}

export default HeroSection;
