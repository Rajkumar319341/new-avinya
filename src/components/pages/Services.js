import React, {Component} from "react";
import Cards from "../Cards";
import Footer from '../Footer';
import Navbar from "../Navbar";


function Services()
{
    return (
        <>
    <Navbar />
    <div className="servicesdiv">
            <h1 className="services-heading">Services</h1>
            <hr />
            <Cards/>
            <Footer />
        </div>
    </>
       
    );
}

export default Services;