import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from 'react-component-export-image';
import React , {Component} from 'react';
import '../IdCard.css';
import axios from 'axios';
import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { APIData } from "../Authentication/APIData";
import logo from "../Images/smart.png";
import logoname from '../Images/C4E_LogoName.png'; 
import add from '../Images/AddDir.png'; 

const sessiondetails=JSON.parse(localStorage.getItem("sessiondetails"));

class ComponentToPrint extends Component {
    state = {
        name: "",
        faculty_id: "",
        dob: "",
        bloodgroup: "",
        phone_number:"",
        facultyemail:"",
        address:"",
        photo:"",
        c4u_address: "# 228 1st floor near Krishna Temple,Krishna Temple Road , Doddabommasandra,Vidyaranyapura post.Bangalore -560097"
    }
    async componentDidMount() {
        const email = btoa(sessiondetails.email);
        const url = APIData.api + "employee/" + email;
        axios
          .get(url, { headers: APIData.headers })
          .then((response) => {
            if (response.status == 200) {
              this.setState({
                dob: response.data.dob,
                address: response.data.address,
                facultyemail: response.data.email,
                faculty_id: sessiondetails.user,
                name: response.data.name,
                phone_number: response.data.phone_number,
                photo: response.data.photo,
              });
            }
          })
          .catch((error) => {
            toast("Its Time to grab a coffee");
          });
      }
   
 render() {
   return (
                <div className="idcard_font">
                    <div className="idcard_top">

                    {/* <img className="logo" src={logo} style={{height:'75px', width:'75px'}} alt="logo" border="0"/> */}
                    <img className="logo" src={logoname} style={{height:'225px', width:'240px'}} alt="logo" border="0"/>

                
                        <img src={this.state.photo} className='idcard_top_img'></img> 
                    </div>
                    <div className="idcard_bottom">
                        <p>{this.state.name}</p>
                        <p className="idcard_desi">{this.state.faculty_id}</p>
                        {/* <p className="idcard_no"><b>Blood Group:</b>{this.state.bloodgroup}</p> */}
                        <p className="idcard_no"><b>Phone No:</b>{this.state.phone_number}</p>
                        {/* <p className="idcard_no"><b>Email Id:</b>{this.state.facultyemail}</p> */}
                        <p className="idcard_no"><b>Date of Birth:</b>{this.state.dob}</p>
                        {/* <p className="idcard_no"><b>Address:</b>{this.state.address}</p> */}
                        <div >
                          <br></br><br></br><br></br><br></br>
                          <p style={{fontSize:'7px'}}> {this.state.c4u_address}</p>
                        </div>
                    </div>
    </div>)
 }
}
export default class FacultyIdentityCard extends React.Component {
 constructor(props) {
   super(props);
   this.componentRef = React.createRef();
 }

 render() {
   return (
     <React.Fragment>
       <ComponentToPrint ref={this.componentRef} />
       <button onClick={() => exportComponentAsJPEG(this.componentRef)}>
         Export As JPEG
       </button>
       {/* <button onClick={() => exportComponentAsPDF(this.componentRef)}>
         Export As PDF
       </button> */}
       <button onClick={() => exportComponentAsPNG(this.componentRef)}>
         Export As PNG
       </button>
     </React.Fragment>
   );
 }
}