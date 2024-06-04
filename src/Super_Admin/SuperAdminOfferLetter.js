import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import * as HiIcons from "react-icons/hi";
import * as CgIcons from "react-icons/cg";
import MainLogo from "../Images/logo.jpg";
import axios from 'axios';
import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { APIData } from "../Authentication/APIData";

const sessiondetails=JSON.parse(localStorage.getItem("sessiondetails"));

let data = [];
var a = [];

var policydownload;
var des = [];
// data.map((item, index) => {
//   return (a=item.Description.split('.'))})
class OfferLetter extends Component {
    state = {
        name: "",
        address: "",
        designation: "",
        date: "",
        email: "",
        faculty_id:""
    };


    printPage = () => {
        var printContents = document.getElementById("policy2").innerHTML;
        var originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;

    }
    constructor(props) {
        super(props);
        window.responseload = this;
    }
    async componentDidMount() {
        const email = btoa(sessiondetails.email);
        const url = APIData.api + "employee/" + email;
        console.log(url)
        axios.get(url, { headers: APIData.headers })
            .then(response => {
                if (response.status == 200) {
                    this.setState({
                        address: response.data.address,
                        email: response.data.email,
                        faculty_id: sessiondetails.user,
                        name: response.data.name,
                        date: response.data.year_of_appointment
                    });}
    
                })
                .catch(error => {
                  toast('Its Time to grab a coffee')
                })

                const urlenrollmentStatus = APIData.api + "enrollments/data?emailId=" + email;
                axios.get(urlenrollmentStatus, { headers: APIData.headers })
                .then(response => {
                    if (response.status == 200) {
                        this.setState({
                            designation:response.data.course_id
                        });}
        
                    })
                    .catch(error => {
                      toast('Its Time to grab a coffee')
                    })
              
          }

                render() {
                    return (

                        <div id="policy">
                            <div className="termsAndCondition">
                                <div className="carrybox">
                                    <div id="policy2">
                                        <div className="bringitcenter">
                                            {" "}
                                            <img className="invoiceimg" src={MainLogo} alt="Invoice" />
                                        </div>
                                        <div className="">
                                            <h3 className="heading01">SMARTER LEARNING'S</h3>
                                        </div>
                                        <div className="bringitcenter">
                                            <h4>                                  Teaching & Coaching Institute</h4>
                                            <br />
                                        </div>

                                        <hr style={{
                                            color: 'rgb(255, 136, 25)',
                                            backgroundColor: 'rgb(255, 136, 25)',
                                            height: 5,
                                            borderColor: 'rgb(255, 136, 25)'
                                        }} />

                                        <h3 className="heading01">Offer Letter</h3>
                                        <b>{this.state.name}</b><br/>
                                        {this.state.address}<br/>

                                        Date: {this.state.date}<br/>
                                        <b>Subject:</b> Offer letter for the role of {this.state.designation}<br/><br/>
                                        <p><b>Dear {this.state.name },</b></p>
                                        <br/>
                                        We are pleased to inform you that you have been selected to join the <b>APIDREAMZ SOLUTIONS PVT LTD </b>
                                        as an {this.state.designation}. The joining date we have decided for you is {this.state.date}.
                                        <br />
                                        We are confident you will be able to make a significant contribution to the success of <b>APIDREAMZ SOLUTIONS PVT LTD </b> and look forward to working with you.
                                        <br /><br/>
                                        Your employment will be governed by the following terms and policies:
                                        <br /><br/>
                                        <b>Date of Appointment</b><br />
                                        Your date of appointment as per company records is {this.state.date}.<br /><br/>
                                        <b>Working Hours</b><br />
                                        Your working hours will be 5:00 pm to 8:00 pm as per the current company policy.<br /><br/>
                                        <b>Leave</b><br />
                                        You will be governed by the current Leave Policy of the company for permanent employees<br /><br/>
                                        <b>Notice Period</b><br />
                                        While on probation, this appointment may be terminated by either side by giving 30 days notice, or 30
                                        days salary in lieu of the notice period.<br />
                                        On confirmation, this appointment may be terminated by either side by giving one months’ notice or
                                        one months’ salary in lieu of the notice period. Should you resign after confirmation, the Company will
                                        have the option to accept your resignation either with immediate effect, and pay you three months’
                                        salary in lieu of notice period or accept it effective any day up to the end of the notice period and pay
                                        you salary for the remaining period from the acceptance of resignation till the end of the notice period.<br/><br />
                                        <b>Confidential Information</b><br />
                                        You will not, at any time, without the consent of the Company disclose or divulge or make public except
                                        under legal obligation, any information regarding Company’s affairs of administration or research carried
                                        out, whether the same may be confided to you or become known to you, in the course of your service or
                                        otherwise.<br />
                                        For further queries or clarification, you can call the superiors and they will be glad to assist you.
                                        We believe that we have a strong lasting professional relationship with you.<br /><br/>
                                        Best Regards,<br />
                                        Charanya V<br />
                                        Director


                                        <br/><br/>
                                        {/* <footer> */}
                                        <hr style={{
              // color: 'rgb(255, 136, 25)',
              backgroundColor: 'rgb(255, 136, 25)',
              height: 10,
              // borderColor: 'rgb(255, 136, 25)'
            }} />
            <br/>
            <div className="bringitcenter" >
              <div className="ptag3">
                <HiIcons.HiLocationMarker color="rgb(255, 136, 25)" /> 228, Krishna, Temple Rd, Doddabommasandra, Vidyaranyapura,
                Bengaluru, Karnataka 560097
              </div>
              <div className="ptag3">
                <HiIcons.HiPhone color="rgb(255, 136, 25)"/> +91 95353 52376 / +91 74115 26951  / +91 91102 67095
              </div>
              <div className="ptag3">
                <HiIcons.HiMail color="rgb(255, 136, 25)"/>info@smarterlearning.in
              </div>
            </div>
            {/* </footer> */}
            </div>
          </div>


          <button onClick={this.printPage}>Download</button>
        </div>
      </div>
                    )
                }
            }

export default OfferLetter
