import React from 'react'
import * as HiIcons from "react-icons/hi";
import { Link } from 'react-router-dom';
import * as AiIcons from "react-icons/ai";

function AboutUser() {
    return (
        <div className="about">
            
            <div className = "Aboutstyle">
            <div className="carrybox">
            <Link to="/">
              <AiIcons.AiFillCloseCircle  />
              </Link>
            <h1 className="mainheading01"><HiIcons.HiOfficeBuilding/> About Us</h1><br/>
                   <div className="carrybox">
                        <p className="heading01">Our Mission</p>
                        <p className="ptag" >
                        To unleash potential by connecting coaches with clients. Our Why is to unleash more human potential in the Bengaluru and we believe that Classes & Tuition's is one of the most effective ways to do this 
                        </p>
                        </div>
                        <div className="carrybox">
           
                        <p className="heading01">
                            Aim & Objectives
                        </p>
                <ul  className="ptag">
                    <li>As training & coaching institute we provide the quality education and make to realize the importance of science & technology.</li>
                    <li>Identify the gaps and fulfill the desire and vision of students.</li>
                    <li>Unlocking Student's potential -The purpose of coaching is to unlock people’s potential to maximize their own performance. </li>
                    <li>Provide good infrastructure to the students and ensure the students are leveraging the technology.</li>
                </ul>
                </div>
        </div>
        </div>
    </div>
        
    )
}

export default AboutUser
