import React from "react";
import "../CRUDTable.css";
import { Component } from "react";
import Loading from "../Loading";
import {APIData, org} from '../Authentication/APIData';
import UserData from '../SQLTables/UserData';
import { CSVLink, CSVDownload } from "react-csv";
import * as FaIcons from "react-icons/fa";
class SuperAdminUser extends Component {
   state={
    loading: true,
    user:null
};
async componentDidMount(){
  const url = APIData.api+`users/unregistered?org=${org}`;
  const response = await fetch(url,{headers:APIData.headers});
    const daata = await response.json();
    this.setState({user: daata,loading:false});
} 


  render() { 
    return ( 
      <div className="superAdminNonRegUser">
      {this.state.loading || !this.state.user? <Loading />: 
        <p>
<div className="carrybox">
<UserData data={this.state.user}/>
</div>
<CSVLink data={this.state.user} filename={'Non-RegisteredUsers'}>
        <button className="Downloadbutton"> <FaIcons.FaDownload /> Download Report </button></CSVLink>

        </p>}
        </div>
    );
  }
}
 
export default SuperAdminUser;