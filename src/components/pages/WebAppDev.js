import React, {Component} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Footer from '../Footer';
import WebAppDev_pic from '../../Images/img-3.jpg';
import Navbar from "../Navbar";

function WebAppDev() {
    return (
      <div className="insideCard">
      <Navbar/><br/><br/><br/>
      <div className="container-for-cards">

      <h1 className="insideCard-headings">Web Application Development</h1>
      <hr></hr><br/><br/>
      {/* <Container> */}
      {/* <Row md={4}> */}
        {/* <Col></Col> */}


        {/* <Col xs={6}> */}
        <div className="insideCard-image" >
            <img src={WebAppDev_pic} class="responsive-cards"/>
          </div>
        {/* </Col> */}


        <Col><div className="mulesoft">
        
        <div className="insideCard-container" >
          
          <div   className="text-inside-cards" >
            <p>
              
            A website is a business’s online presence. Having a strong online presence, can help your business grow, and can be more promising to your customers, and can help you generate more revenue

Partner with Care 4 Edu to create a versatile website, built on a foundation of quality code. We make sure the websites developed are client-focused, customer-centric, creating strategic web-based solutions that deliver tangible business results

Whether you want to add a small functionality to your existing website, or create one from scratch, Care 4 Edu is the team to rely upon
              
            </p>
          </div>
        </div>
        
        
  
        
      </div>
      
      </Col>
      </div>
      {/* </Row> */}
    {/* </Container> */}
    <Footer/>
    </div>
    );
  }
  
  export default WebAppDev;