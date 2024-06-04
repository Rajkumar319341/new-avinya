import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import * as HiIcons from "react-icons/hi";
import * as CgIcons from "react-icons/cg";

import MainLogo from "./Images/logo.jpg";

let data = [];
var a = [];

function getTask(taskData) {
  data = taskData;
  a = data.policy_data.split('.')
}
var policydownload;
var des = [];
// data.map((item, index) => {
//   return (a=item.Description.split('.'))})
class Policy extends Component {
  state = {};
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
    getTask(this.props.d);
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
                  <h3 className="heading01">CARE 4 EDU SOLUTIONS PVT LTD</h3>
                </div>
                <div className="bringitcenter">
                  <h4>                                  Teaching & Coaching Institute</h4>
                  <br />
                </div>

              <hr style={{
                color: '#004bac',
                backgroundColor: '#004bac',
                height: 5,
                borderColor: '#004bac'
              }} />

              <h3 className="heading01">{data.policy_name}</h3>

              <p className="ptag1"><p className="ptag2"><b>Dear {data.policy_audience},</b></p> 
                {data.policy_description == "null" ? null :
                  <p className="ptag1">
                    {data.policy_description}</p>}

                <p className="ptag1"><b>Below are {data.policy_name} as dated on {data.policy_date}.</b></p>
                
                {a.slice(0, a.length - 1).map((i) => {
                  return (
                    <p className="ptag_points"><BsIcons.BsDot />{i}.</p>
                  );
                })}

                <br></br>
                {data.policy_note == "null" ? null :
                  <p className="ptag1"><b>Note:</b> {data.policy_note}</p>}
              </p>
              <hr style={{
              // color: 'rgb(255, 136, 25)',
              backgroundColor: '#004bac',
              height: 10,
              // borderColor: 'rgb(255, 136, 25)'
            }} />
            <br/>
            <div className="bringitcenter" >
              <div className="ptag3">
                <HiIcons.HiLocationMarker color="#004bac" /> 228, Krishna, Temple Rd, Doddabommasandra, Vidyaranyapura,
                Bengaluru, Karnataka 560097
              </div>
              <div className="ptag3">
                <HiIcons.HiPhone color="#004bac"/> +91 95353 52376 / +91 74115 26951  / +91 91102 67095
              </div>
              <div className="ptag3">
                <HiIcons.HiMail color="#004bac"/>info@smarterlearning.in
              </div>
            </div>
            </div>
          </div>


          <button className="Downloadbutton" onClick={this.printPage}>Download</button>
        </div>
      </div>
    );
  }
}

export default Policy;
