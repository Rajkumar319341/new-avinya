import React from "react";
import "../CRUDTable.css";
import { Component } from "react";
import Loading from "../Loading";
import { APIData } from "../Authentication/APIData";
import TimeTableData from "../SQLTables/TimeTableData";
import { CSVLink, CSVDownload } from "react-csv";
import * as FaIcons from "react-icons/fa";

const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
class StudentTimeTableAPI extends Component {
   state={
    loading: true,
    Timetable:null
};
async componentDidMount(){
  const email  = (sessiondetails.email);
  //console.log(email)
  const url = APIData.api+"timetable/student/course-details?emailId="+email;
  console.log(url)
  const response = await fetch(url,{headers:APIData.headers});
    const daata = await response.json();
    this.setState({Timetable: daata,loading:false});
} 


  render() { 
    return ( 
      <div className="studentTimeTableAPI">
      {this.state.loading || !this.state.Timetable? <Loading />: 
        <p>
<div className="carrybox">
<TimeTableData data={this.state.Timetable}/>
</div>
<CSVLink data={this.state.Timetable} filename={'Timetable'}>
        <button className="Downloadbutton"> <FaIcons.FaDownload /> Download Report </button></CSVLink>
        </p>}
        </div>
    );
  }
}
 
export default StudentTimeTableAPI;