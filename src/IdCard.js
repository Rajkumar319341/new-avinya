import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from 'react-component-export-image';
import React, { Component } from 'react';
import './IdCard.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { APIData } from "./Authentication/APIData";
import logoname from './Images/C4E_LogoName.png';
import directorSign from './Images/DirectorSign.png'
import add from './Images/AddDir.png';
import QRCode from "react-qr-code";


const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));

class ComponentToPrint extends Component {

  constructor(props) {
    super(props);
    this.getTask(this.props.details);
    console.log(this.props)

  }
  state = {
    name: "",
    faculty_id: "",
    dob: "",
    phone_number: "",
    photo: "",
    c4e_address: "# 228 1st floor near Krishna Temple,Krishna Temple Road , Doddabommasandra,Vidyaranyapura post.Bangalore -560097"
  }
  getTask = (testTask) => {
    console.log(testTask)
    console.log('inside second')
    console.log(testTask);
    this.state.name = testTask.name
    this.state.faculty_id = testTask.id
    this.state.phone_number = testTask.phone
    this.state.photo = testTask.photo
    this.state.dob = testTask.dob
    
  }

  render() {
    return (
      <div className="idcard_font">
        <div className="idcard_top">
          {/* <img className="logo" src={logo} style={{height:'75px', width:'75px'}} alt="logo" border="0"/> */}
          <img className="logo" src={logoname} style={{ height: '225px', width: '240px' }} alt="logo" border="0" />
          <img
            className='idcard_top_img'
            src={this.state.photo} />
        </div>
        <div className="idcard_bottom">
          <p>{this.state.name}</p>
          <p className="idcard_desi"><b>{this.state.faculty_id}</b></p>
          {/* <p className="idcard_no"><b>Blood Group:</b>{this.state.bloodgroup}</p> */}
          <p className="idcard_desi"><b>{this.state.phone_number}</b></p>
          {/* <p className="idcard_no"><b>Email Id:</b>{this.state.facultyemail}</p> */}
          <p className="idcard_desi"><b>{this.state.dob}</b></p>
          {/* <p className="idcard_no"><b>Address:</b>{this.state.address}</p> */}
          {/* <br></br><br></br> */}
          {/* <img className="idcard_directorImage" src={directorSign} style={{ height: '30px', width: '60px', position: 'bottom' }} alt="logo" border="0" /> */}
        </div>

        {/* <div className='idcard_directorImage'>
            </div> */}
        {/* <div className='idcard_directorImage'>
              </div> */}
        {/* <div className='idcard_Address'>
              </div> */}
  
          <div className='id_footer'>
          <div className='director_Sign'>
            <span className='qrDisplay'>
            <QRCode value={this.state.faculty_id} bgColor="#fff" fgColor='#004bac' level="L" size='60' />
            </span>
            <img className="" src={directorSign} style={{ height: '30px', width: '60px' }} alt="logo" border="0" />
            <div style={{ fontSize: 'x-small', color: '#008037' }}>
              <b style={{}}>
                Director &nbsp; &nbsp;
              </b>

            </div>
          </div>

          <div className='idcard_Address'>

            <p style={{ fontSize: '8px', fontWeight: 'bolder', color: '#fff' }}> <b> Email: </b>info@care4edu.com</p>
            <p style={{ fontSize: '8px', color: '#fff' }}> {this.state.c4e_address}</p>
          </div>
        </div>
      </div>
    )
  }
}
export default class IdCard extends React.Component {
  constructor(props) {
    super(props);
    this.getTask(this.props.data);

    this.componentRef = React.createRef();
  }
  state = {
    values: "",
    idCardValues: null
  }
  getTask = (testTask) => {
    const task = testTask;
    console.log('inside first')
    console.log(task)
    // this.setState({values: task , idCardValues: testTask})
    this.state.idCardValues = testTask
  }

  render() {
    console.log('Inside render first component')
    return (
      //  <React.Fragment>
      //    <ComponentToPrint ref={this.componentRef} />
      //    {console.log('values inside first')}
      //    {console.log(this.state.idCardValues)}
      //    <button onClick={() => exportComponentAsJPEG(this.componentRef)}>
      //      Export As JPEG
      //    </button>
      //    {/* <button onClick={() => exportComponentAsPDF(this.componentRef)}>
      //      Export As PDF
      //    </button> */}
      //    <button onClick={() => exportComponentAsPNG(this.componentRef)}>
      //      Export As PNG
      //    </button>
      //  </React.Fragment>
      <div >
        <div style={{ backgroundColor: '#f9f9f9'}}>
        <ComponentToPrint ref={this.componentRef} details={this.state.idCardValues} />
        </div>
        <button className='ImageDownloadbutton' onClick={() => exportComponentAsJPEG(this.componentRef)}>
          Export As JPEG
        </button>
        <br></br>
        <button className='ImageDownloadbutton' onClick={() => exportComponentAsPNG(this.componentRef)}>
          Export As PNG
        </button>
      </div>
    );
  }
}