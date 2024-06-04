import React from "react";
import "../CRUDTable.css";
import { Component } from "react";
import Loading from "../Loading";
import {APIData, org} from '../Authentication/APIData';
import TimeTableData from "../SQLTables/TimeTableData";
import { CSVLink, CSVDownload } from "react-csv";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";


let tasks = null;
const initialState = {};
const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
class TimeTable extends Component {
   state={
    loading: true,
    user: null,
    UploadFile: false,
      selectedFile: null,
      selectedFile_error: null,
      type: null,
      type_error: null,
      hint: false,
};
async componentDidMount(){
  const url = APIData.api+`timetable?org=${org}`;
  const response = await fetch(url,{headers:APIData.headers});
    const daata = await response.json();
    this.setState({user: daata,loading:false});
} 
Upload = (e) => {
  // console.log(this.state.UploadFile);
  if(this.state.UploadFile===false)
    this.setState({UploadFile: true})
   else
     this.setState({UploadFile: false})

}
Hint = (e) => {
  // console.log(this.state.hint);
  if(this.state.hint===false)
    this.setState({hint: true})
   else
    this.setState({hint: false})

}
validation = () => {
  let selectedFile_error = "";
  let type_error = "";

  if (!this.state.selectedFile) {
    selectedFile_error = "Invalid File";
  }

  if (!this.state.type) {
    type_error = "Invalid  File Type";
  }

  if (type_error || selectedFile_error) {
    this.setState({ type_error, selectedFile_error });
    return false;
  }
  return true;
};
onFileUpload = () => {
  // Create an object of formData
  const formData = new FormData();

  // Update the formData object
  formData.append("file", this.state.selectedFile);

  // formData.append("course", this.state.type);
  formData.append("uploaded_by", sessiondetails.user);

  // Details of the uploaded file
  // console.log(this.state.selectedFile);
  const isValide = this.validation();

  if (!isValide) {
    this.setState(initialState);
    if (!this.state.selectedFile_error || !this.state.type) {
      toast("Please, Enter Valid Details!");
    }
  } else {
    toast("Please Wait!");
    // Request made to the backend api
    // Send formData object
    axios
      .post(APIData.api + "timetable/upload-timetables", formData, { headers: APIData.headers })
      .then((response) => {
        if (response.status == 200) {
          toast(response.data.fileName + " uploaded");

          if (sessiondetails.userType == "superadmin") {
            window.location.assign(APIData.url + "superAdminTimeTable");
          }
          if (sessiondetails.userType == "admin") {
            window.location.assign(APIData.url + "timetable");
          }
        }
        // if (sessiondetails.userType == "employee") {
        //   console.log(sessiondetails.userType);
        //   window.location.assign(APIData.url + "facultydocuments");
        // }
      })
      .catch((error) => {
        toast("It's Time To Grab A");
        console.log(error);
      });
  }
};
  render() { 
    return ( 
      <div className="timetable">
      {this.state.loading || !this.state.user? <Loading /> : 
        <p>
<div className="carrybox">
<TimeTableData data={this.state.user}/>
</div>
<CSVLink data={this.state.user} filename={'TimeTable'}>
  <button className="Downloadbutton"> <FaIcons.FaDownload /> Download Report </button></CSVLink>
  <div className="">
                  <button className="Downloadbutton" onClick={this.Upload}>
                    Upload TimeTable
                  </button>
                
                </div>
              {console.log(this.state.UploadFile)}
              {this.state.UploadFile ? (

                <div className="carrybox">
                  {/* <button className="Downloadbutton" onClick={this.printPage}>
                    Download Timetable 
                  </button> */}
                <div classname="carrybox"style={{display:'flex',alignItems: 'center',justifyContent: 'center',}}>
                <pre>
                <a style={{alignItems: 'center',justifyContent: 'center',textDecorationLine: 'underline'}}
                 href={require("../SQLTables/TimetableTemplate.csv")} download="TimetableTemplate.csv">Click to Download Timetable Template</a>
                
                {" "}
                 
                {" "}
                <AiIcons.AiFillQuestionCircle size={"25px"} onClick={this.Hint} color="darkorange"/>

                {this.state.hint ? (
     
                <p style={{alignItems: 'center',justifyContent: 'center',backgroundColor: "lightgrey", padding:"10px", borderRadius: "5px"}}> Note: <br></br>
                      1.Please make sure the time entered is in 24 hour format <br></br>
                      2.Please ensure the the Faculty Usernames are entered correctly <br></br>
                      3.The allowed actions are Update and Delete <br></br>
                      4.Refer the timetable template for sample<br></br>


                </p>) :null}
                </pre>
                </div>
                <div className="bringitcenter">
                  <input
                    className="Upload"
                    type="file"
                      onChange={this.onFileChange}
                  />
                  {this.state.selectedFile_error ? (
                    <div style={{ color: "red" }}>
                      {this.state.selectedFile_error}
                    </div>
                  ) : null}
                  
                </div>
                {console.log(this.state.selectedFile)}

                <div className="bringitcenter">
                  <button className="Upload" onClick={this.onFileUpload}>
                    Upload
                  </button>
                </div> 
                </div>) : null }
        </p>}
        </div>
    );
  }
}
 
export default TimeTable;
