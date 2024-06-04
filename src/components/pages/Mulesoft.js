import React, {Component} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Footer from '../Footer';
import Mulesoft_pic from '../../Images/img-9.jpg';
import Navbar from "../Navbar";


function Mulesoft() {
    return (
      <div className="insideCard">
        <Navbar/><br/><br/><br/>

        

<div className="container-for-cards">
      <h1 className="insideCard-headings">Mulesoft</h1>
      <hr></hr><br/><br/>
      {/* <Container> */}
      {/* <div className="container"> */}
      
          <div className="insideCard-image" >
            <img src={Mulesoft_pic} class="responsive-cards"/>
          </div>


        <div className="mulesoft">
        
        <div className="insideCard-container" >
          
          <div   className="text-inside-cards" >
       
            <p>
              
            Users want seamless experiences across platforms and departments, 
            and don’t want to see the seams of your software. 
            Mulesoft  is a data integration platform which is a middleware for a variety of data sources and applications.

            Care 4 Edu helps you build a strategy, and achieve a result-driven solution for the full range of MuleSoft development services, 
            we will also focus on how we can integrate with MuleSoft products and services, at a price that offers value for money. 
              
            </p>
          </div>
          </div>
        </div>
        
  
        
      </div>
      {/* </div> */}
    {/* </Container> */}
    <>
    <Footer/>
    </>
    </div>
    );
  }
  
  export default Mulesoft;