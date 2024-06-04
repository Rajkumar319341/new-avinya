import React, {Component} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Footer from '../Footer';
import Quality_pic from '../../Images/img-13.jpg';
import Navbar from "../Navbar";


function Quality() {
    return (
      <div className="insideCard">
      <Navbar/><br/><br/><br/>
      <div className="container-for-cards">

      <h1 className="insideCard-headings">Quality Assurance</h1>
      <hr></hr><br/><br/>

      {/* <Container> */}
      {/* <Row md={4}> */}
        {/* <Col></Col> */}


        {/* <Col xs={6}> */}
        <div className="insideCard-image" >
            <img src={Quality_pic} class="responsive-cards"/>
          </div>
        {/* </Col> */}


        <Col><div className="mulesoft">
        
        <div className="insideCard-container" >
          
          <div   className="text-inside-cards" >
            <p>
              
            Quality Assurance  is any systematic process of determining whether a product or service meets certain requirements.

We have a responsibility to ensure that products and services meet the standards set by the client. This includes maintaining strict quality control in line with customer loyalty, performance and expectations.
              
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
  
  export default Quality;