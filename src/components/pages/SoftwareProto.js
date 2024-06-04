import React, {Component} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Footer from '../Footer';
import SoftwareProto_pic from '../../Images/img-12.jpg';
import Navbar from "../Navbar";


function SoftwareProto() {
    return (
      <div className="insideCard">
      <Navbar/><br/><br/><br/>
      <div className="container-for-cards">
      <h1 className="insideCard-headings">Software Prototyping</h1>
      <hr></hr><br/><br/>

      {/* <Container> */}
      {/* <Row md={4}> */}
        {/* <Col></Col> */}


        {/* <Col xs={6}> */}
        <div className="insideCard-image" >
            <img src={SoftwareProto_pic} class="responsive-cards"/>
          </div>
        {/* </Col> */}


        <Col><div className="mulesoft">
        
        <div className="insideCard-container" >
          
          <div   className="text-inside-cards" >
            <p>
              
            Software prototyping plays an important role in design and development which may display the functionality of the product under development, but may not actually show the exact logic. We like to encourage you to embrace prototyping as early as possible as it can save so much time, cost, and misunderstandings from ever occurring.

Care 4 Edu creates a functional and refined product, by first analyzing your project idea from both the technical and business side and then we decide on how to go about your project.

You will receive well thought out recommendations on how to proceed with your project  and guidance through the design of your software using prototyping.
              
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
  
  export default SoftwareProto;