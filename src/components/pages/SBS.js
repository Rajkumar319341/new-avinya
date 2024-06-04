import React, {Component} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Footer from '../Footer';
import SBS_pic from '../../Images/img-14.jpg';
import Navbar from "../Navbar";

function SBS() {
    return (
      <div className="insideCard">
      <Navbar/><br/><br/><br/>
      <div className="container-for-cards">

      <h1 className="insideCard-headings">Streamline Business Solutions</h1>
      <hr></hr><br/><br/>

      {/* <Container> */}
      {/* <Row md={4}> */}
        {/* <Col></Col> */}


        {/* <Col xs={6}> */}
        <div className="insideCard-image" >
            <img src={SBS_pic} class="responsive-cards"/>
          </div>
        {/* </Col> */}


        <Col><div className="mulesoft">
        
        <div className="insideCard-container" >
          
          <div   className="text-inside-cards" >
            <p>
              
            In planning, we know running a business is hard work. There are many vendors, services and companies you should stay connected to and many moving parts are hard to keep straight.

Our goal is to help business owners save time and money by arranging for these essential service through one main contact.

Simplification refers to improving the efficiency of a particular process within an organization. It can be done automatically, to simplify tasks, or to remove unnecessary steps using modern techniques and technologies.
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
  
  export default SBS;