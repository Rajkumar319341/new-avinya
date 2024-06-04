import React from "react";
import "../CRUDTable.css";
import {APIData, org} from '../Authentication/APIData';
import { Component } from "react";
import AdminData from "../SQLTables/AdminData";
import Loading from "../Loading";
import { CSVLink, CSVDownload } from "react-csv";
import * as FaIcons from "react-icons/fa";

let tasks = null;
class Admin extends Component {
   state={
    loading: true,
    admins:null
};
async componentDidMount(){
    const url = APIData.api+`admins?org=${org}`;
    const response = await fetch(url,{headers:APIData.headers});
    const daata = await response.json();
    this.setState({admins: daata,loading:false});
} 


  render() { 
    return ( 
  
    
      <div className="admins">
     
                {this.state.loading || !this.state.admins ? <Loading /> : 
                <p>
      <div className="carrybox">
      <AdminData data={this.state.admins} />
      </div>
      <CSVLink data={this.state.admins} filename={'Admins'}>
        <button className="Downloadbutton"> <FaIcons.FaDownload /> Download Report </button></CSVLink>
                </p>}
            
    </div>
    );
    }
   }
        
export default Admin;