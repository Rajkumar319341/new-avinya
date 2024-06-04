import React, {Component} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Footer from '../Footer';
import CloudCon_pic from '../../Images/img-4.jpg';
import Navbar from "../Navbar";



function CloudCon() {
    return (
      <div className="insideCard">
      <Navbar/><br/><br/><br/>
      <div className="container-for-cards">
      <h1 className="insideCard-headings">Cloud Computing</h1>
      <hr></hr><br/><br/>
      {/* <Container> */}
      {/* <Row md={4}> */}
        {/* <Col></Col> */}


        {/* <Col xs={6}> */}
        <div className="insideCard-image" >
            <img src={CloudCon_pic} class="responsive-cards"/>
          </div>
        {/* </Col> */}


        <Col><div className="mulesoft">
        
        <div className="insideCard-container" >
          
          <div   className="text-inside-cards" >
            <p>
              
            As legacy architectures can no longer subsist with the rapid growth of data, organizations need an environment with flexibility and scalability and performance to cope up with these demands. Cloud computing can help meet these demands, but it also has brought its own set of challenges,like, large number of cloud solutions on the market, along with ambiguity in their actual performance for the business needs

We at Care 4 Edu help solve all of that by helping you select the right cloud solutions that integrate smoothly, based on your needs. We start by fully understanding the client’s side so that the solutions can be designed to help the client achieve growth.


              
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
  
  export default CloudCon;