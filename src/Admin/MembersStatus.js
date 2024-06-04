import React from "react";
import "../CRUDTable.css";
import { Component } from "react";
import StatusPage from "../SQLTables/StatusPage";
import Loading from "../Loading";
import {APIData, org} from '../Authentication/APIData';
import { CSVLink, CSVDownload } from "react-csv";
import * as FaIcons from "react-icons/fa";
let tasks = null;
class MembersStatus extends Component {
   state={
    loading: true,
    admins:null
};
async componentDidMount(){
  const url = APIData.api+`login-type/users?org=${org}`;
  const response = await fetch(url,{headers:APIData.headers});
    const daata = await response.json();
    this.setState({admins: daata,loading:false});
} 


  render() { 
    return ( 
  
      <div className = "membersStatus">
    {this.state.loading || !this.state.admins ? <Loading /> : 
              <p>
    <div className="carrybox">
    <StatusPage data={this.state.admins} />
    </div>
    <CSVLink data={this.state.admins} filename={'MemberStatus'}>
  <button className="Downloadbutton"> <FaIcons.FaDownload /> Download Report </button></CSVLink>
              </p>}
              
    </div>
    );
    }
   }
        
export default MembersStatus;