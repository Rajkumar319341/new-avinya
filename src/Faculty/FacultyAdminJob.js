import React from "react";
import "../CRUDTable.css";
import { Component } from "react";
import Loading from "../Loading";
import { APIData, org } from "../Authentication/APIData";
import ApplyJobData from "../SQLTables/ApplyJobData";
import { CSVLink, CSVDownload } from "react-csv";
import * as FaIcons from "react-icons/fa";
let tasks = null;
class FacultyAdminJob extends Component {
   state={
    loading: true,
    user:null
};
async componentDidMount(){
  const url = APIData.api+`courses/admin?org=${org}`;
  const response = await fetch(url,{headers:APIData.headers});
    const daata = await response.json();
    this.setState({user: daata,loading:false});
} 


  render() { 
    return ( 
      <div className="facultyadminjob">
      {this.state.loading || !this.state.user? <Loading />: 
        <p>
<div className="carrybox">
<ApplyJobData data={this.state.user}/>
</div>
<CSVLink data={this.state.user} filename={'AdminJobs'}>
        <button className="Downloadbutton"> <FaIcons.FaDownload /> Download Report </button></CSVLink>
        </p>}
        </div>
    );
  }
}
 
export default FacultyAdminJob;