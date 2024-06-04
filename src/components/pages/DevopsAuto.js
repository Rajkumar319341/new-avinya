import React, {Component} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Footer from '../Footer';
import DevopsAuto_pic from '../../Images/img-8.jpg';
import Navbar from "../Navbar";


function DevopsAuto() {
    return (
      <div className="insideCard">
      <Navbar/><br/><br/><br/>
      <div className="container-for-cards">

      <h1 className="insideCard-headings">Devops Automation</h1>
      <hr></hr><br/><br/>

      {/* <Container> */}
      {/* <Row md={4}> */}
        {/* <Col></Col> */}


        {/* <Col xs={6}> */}
        <div className="insideCard-image" >
            <img src={DevopsAuto_pic} class="responsive-cards"/>
          </div>
        {/* </Col> */}


        <Col><div className="mulesoft">
        
        <div className="insideCard-container" >
          
          <div   className="text-inside-cards" >
            <p>
              
            DevOps leverages collaboration, monitoring, tool-chain pipelines, and automation. More than a trend, Automation has become the norm for many organisations across the globe. DevOps automation eradicates manual errors and dependency on individuals to improve accuracy and consistency.

Our DevOps solutions help organizations to reach their goals, rapidly and reliably, producing high-quality products and services. Reach your business goals by developing applications at the pace of business with Care 4 Edu DevOps services.

Continuous improvement and enhancement is what keeps business in the game.
              
            </p>
          </div>
        </div>
        
  
        
      </div>
      </Col>
      {/* </Row> */}
    {/* </Container> */}
    </div>
    <Footer/>
    </div>
    );
  }
  
  export default DevopsAuto;