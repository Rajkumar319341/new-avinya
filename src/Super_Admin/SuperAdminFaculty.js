import React, { Component } from 'react';
import Loading from '../Loading';
import {APIData,org} from '../Authentication/APIData';
import FacultyData from '../SQLTables/FacultyData';
import { CSVLink, CSVDownload } from "react-csv";
import * as FaIcons from "react-icons/fa";
class SuperAdminFaculty extends Component {
  state={
      loading: true,
      person: null
  };
 async componentDidMount(){
  const url = APIData.api+`employee/details?org=${org}`;
  const response = await fetch(url,{headers:APIData.headers});
      const daata = await response.json();
      console.log("Faculty data:",daata)
      this.setState({person: daata, loading: false});
  }       
  render() {
  return (
      
    <div className="superAdminFaculty">
      {this.state.loading || !this.state.person ? <Loading />: 
    <p>
    <div className="carrybox">
    <FacultyData data={this.state.person}/>
    </div>
    <CSVLink data={this.state.person} filename={'Faculties'}>
        <button className="Downloadbutton"> <FaIcons.FaDownload /> Download Report </button></CSVLink>
    </p>} 
    </div>
  );
  }
 }
export default SuperAdminFaculty;