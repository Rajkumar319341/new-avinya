import React from "react";
import "../CRUDTable.css";
import { Component } from "react";
import Loading from "../Loading";
import { APIData, org } from "../Authentication/APIData";
import TimeTableData from "../SQLTables/TimeTableData";
import { CSVLink, CSVDownload } from "react-csv";
import * as FaIcons from "react-icons/fa";
let tasks = null;
class FacultyTimeTable extends Component {
   state={
    loading: true,
    user:null
};
async componentDidMount(){
  const url = APIData.api+`timetable?org=${org}`;
  const response = await fetch(url,{headers:APIData.headers});
    const daata = await response.json();
    this.setState({user: daata,loading:false});
} 


  render() { 
    return ( 
      <div className="facultyTimeTable">
      {this.state.loading || !this.state.user? <Loading />: 
        <p>
<div className="carrybox">
<TimeTableData data={this.state.user}/>
</div>
<CSVLink data={this.state.user} filename={'Timetable'}>
        <button className="Downloadbutton"> <FaIcons.FaDownload /> Download Report </button></CSVLink>
        </p>}
        </div>
    );
  }
}
 
export default FacultyTimeTable;