import React from "react";
import "../CRUDTable.css";
import { Component } from "react";
import Loading from "../Loading";
import * as AiIcons from "react-icons/ai";
import { toast } from "react-toastify";
import { APIData, org } from "../Authentication/APIData";
import TimeTableData from "../SQLTables/TimeTableData";
import { CSVLink, CSVDownload } from "react-csv";
import * as FaIcons from "react-icons/fa";
import axios from "axios";


const initialState = {};
const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));

var a = [];

class SuperAdminTimeTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: null,
      mainData: null,
      UploadFile: false, 
      selectedFile: null,
      selectedFile_error: null,
      type: null,
      type_error: null,
      hint: false,
    };

    this.filterCourse = this.filterCourse.bind(this);
  }
  responseloading() {
    this.setState({ loading: !this.state.loading });
  }

  async componentDidMount() {
    const url = APIData.api + `timetable?org=${org}`;
    const response = await fetch(url, { headers: APIData.headers });
    const daata = await response.json();
    // console.log("ApiMain",daata)

    this.setState({ user: daata, loading: false, mainData: daata });

    // var courseFilter = []
    // for (var key in this.state.user) {
    //   console.log(this.state.user[key].time.split(",")[1]);
    //   var courseinstance = {
    //     id: this.state.user[key].id,
    //     day: String(this.state.user[key].day),
    //     facultyname: String(this.state.user[key].facultyname),
    //     course: this.state.user[key].course,
    //     subject: String(this.state.user[key].subject),
    //     time: String(this.state.user[key].time),
    //     createdDate: new Date(this.state.user[key].time.split(",")[0]),

    //   };
    //   courseFilter.push(courseinstance);
    //   {console.log(courseFilter)}
    // }
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
  filterCourse = (e) => {

    this.responseloading()
    if (e.target.value != "all") {
      var courseFilter = [];
      for (var key in this.state.mainData) {
        if (e.target.value == this.state.mainData[key].course) {
          var courseinstance = {
            id: this.state.mainData[key].id,
            day: String(this.state.mainData[key].day),
            subject: String(this.state.mainData[key].subject),
            facultyname: String(this.state.mainData[key].facultyname),
            course: this.state.mainData[key].course,
            createdDate: new Date(this.state.mainData[key].createdDate),
            time: (this.state.mainData[key].time),
          };
          // console.log(this.state.mainData[key].time.toString(),courseinstance)
          courseFilter.push(courseinstance);
        }
        // console.log(this.state.mainData[key].time)
        
      }
      // console.log(courseFilter);
      
      this.setState({ user: courseFilter});
      setTimeout(function() { //Start the timer
        this.setState({loading: false}) //After 1 second, set render to true
    }.bind(this), 1000)


    } else {
      const url = APIData.api + "timetable/";
      axios.get(url, { headers: APIData.headers }).then((response) => {
        this.setState({ user: response.data, loading: false });
      });
    }
  };
  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };
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
  printPage = () => {
    var printContents = document.getElementById("policy2").innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;

  }
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
      <div className="superAdminTimeTable">
        {this.state.loading || !this.state.user ? (
          <Loading />
        ) : (
          <p>
            <div className="carrybox">
              
              <div className="Filter">
              
                <select
                  name="selectList"
                  id="selonClickctList"
                  onChange={this.filterCourse}
                >
                  <option value="" selected>
                    Select Course
                  </option>
                  <option value="all">All Courses</option>

                  {
                    (a = [
                      ...new Set(
                        this.state.mainData.map((item) => item.course)
                      ),
                    ])
                  }

                  {a.map((item, index) => {
                    return <option value={item}>{item}</option>;
                  })}
                </select>
              </div>
                <TimeTableData data={this.state.user} />
              
 


            </div>
           
            <CSVLink data={this.state.user} filename={"Timetable"}>
              <button className="Downloadbutton">
                {" "}
                <FaIcons.FaDownload /> Download Report{" "}
              </button>
            </CSVLink>
            
            <div className="">
                  <button className="Downloadbutton" onClick={this.Upload}>
                    Upload TimeTable
                  </button>
                
                </div>
              {/* {console.log(this.state.UploadFile)} */}
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
                      1.Please make sure the time entered is in 24 hour format. <br></br>
                      2.Please ensure the Faculty Usernames are entered correctly. <br></br>
                      3.The allowed actions are Update and Delete.<br></br>
                      4.Refer the timetable template for sample.<br></br>


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
                {/* {console.log(this.state.selectedFile)} */}

                <div className="bringitcenter">
                  <button className="Upload" onClick={this.onFileUpload}>
                    Upload
                  </button>
                </div> 
                </div>) : null }
          </p>
        )}
      </div>
    );
  }
}

export default SuperAdminTimeTable;