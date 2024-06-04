import React from "react";
import "../CRUDTable.css";
import { Component } from "react";
import Loading from "../Loading";
import {APIData,org} from '../Authentication/APIData';
import StatusPage from "../SQLTables/StatusPage";
import { CSVLink, CSVDownload } from "react-csv";
import * as FaIcons from "react-icons/fa";
class SuperAdminMembersStatus extends Component {
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
  
      <div className = "superAdminMembersStatus">
    {this.state.loading || !this.state.admins ? <Loading /> : 
              <p>
    <div className="carrybox">
    <StatusPage data={this.state.admins} />
    </div>
    <CSVLink data={this.state.admins} filename={'Admins'}>
        <button className="Downloadbutton"> <FaIcons.FaDownload /> Download Report </button></CSVLink>
              </p>}
              
    </div>
    );
    }
   }
        
export default SuperAdminMembersStatus;