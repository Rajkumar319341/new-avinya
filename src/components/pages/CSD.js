import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from '../Footer';
import CSD_pic from '../../Images/img-10.jpg';
import Navbar from "../Navbar";


function CSD() {
  return (
    <div className="insideCard">
      <Navbar/><br/><br/><br/>
      <div className="container-for-cards">

     <h1 className="insideCard-headings">Custom Software development</h1>
     <hr></hr><br/><br/>

      {/* <Container> */}
      {/* <div className="container"> */}

        {/* <Row md={4}> */}
          {/* <Col></Col> */}

          {/* <Col xs={6}> */}
          <div className="insideCard-image" >
              <img src={CSD_pic} class="responsive-cards" />
            </div>
          {/* </Col> */}

          {/* <Col> */}
            <div className="mulesoft">
            <div className="insideCard-container" >
                <div className="text-inside-cards">
                  <p>
                    Developing software or applications that meet certain
                    business needs is essential to survive in today's
                    competitive world. Custom Software Development is the
                    procedure of designing, designing, building and supplying
                    software for an individual or group of people within an
                    organization or as an external company program.
                  </p>
                </div>
              </div>
            {/* </div> */}
          {/* </Col> */}
        {/* </Row> */}
      {/* </Container> */}
      <Footer/>
    </div>
    </div>

    </div>
  );
}

export default CSD;
