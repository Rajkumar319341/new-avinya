import React, { Component } from 'react';
import Loading from '../Loading';
import { CSVLink, CSVDownload } from "react-csv";
import * as FaIcons from "react-icons/fa";
import { CSVLink, CSVDownload } from "react-csv";
import * as FaIcons from "react-icons/fa";

// import enquiriestable from '../Table/table';

class SuperAdminEnquiries extends Component {
  state={
      loading: true,
      person: null
  };
 async componentDidMount(){
      const url = "http://103.142.165.146:8080/smarter-learnings/users";
      const response = await fetch(url);
      const daata = await response.json();
      this.setState({person: daata, loading: false});
  }       
  render() {
  return (
      
    <div className='superAdminEnquiries'>
              {this.state.loading || !this.state.person ? <Loading /> : 
              <p>
    <div className="carrybox">
    <enquiriestable data={this.state.person}/>
    </div>
    <CSVLink data={this.state.person} filename={'Enquiries'}>
        <button className="Downloadbutton"> <FaIcons.FaDownload /> Download Report </button></CSVLink>
              </p>}
          
  </div>
  );
  }
 }
export default SuperAdminEnquiries;