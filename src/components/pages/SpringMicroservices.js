

import React, {Component} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Footer from '../Footer';
import SpringMicroservices_pic from '../../Images/img-2.jpg';
import Navbar from "../Navbar";


function SpringMicroservices() {
    return (
      <div className="insideCard">
      <Navbar/><br/><br/><br/>
      <div className="container-for-cards">

      <h1 className="insideCard-headings">Spring Microservices</h1>
      <hr></hr><br/><br/>

      {/* <Container> */}
      {/* <div className="container"> */}
      {/* <Row md={4}> */}
        {/* <Col></Col> */}


        {/* <Col xs={6}> */}
        <div className="insideCard-image" >
            <img src={SpringMicroservices_pic} class="responsive-cards"/>
          </div>
        {/* </Col> */}


        {/* <Col> */}
        <div className="mulesoft">
        
        <div className="insideCard-container" >
          
          <div   className="text-inside-cards" >
            <p>
              
            Microservice architecture is a 'normal new feature'. Creating small, standalone applications that are user-friendly can bring great flexibility and added stability to your code. Many purpose-built Spring Boot features make it easy to build and use your microservices in scale production. And don’t forget, there is no perfect microservice structure other than Spring Cloud  to easily manage and improve your tolerance of bugs.
              
            </p>
          </div>
        </div>
        </div>

        
  
        
      {/* </div> */}
      {/* </Col> */}
      {/* </Row> */}
    {/* </Container> */}
    <Footer/>
    </div>
    </div>
    );
  }
  
  export default SpringMicroservices;