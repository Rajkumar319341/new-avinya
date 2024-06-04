import React, { Component } from 'react';
import Loading from '../Loading';
import {APIData} from '../Authentication/APIData';
import AssetsData from '../SQLTables/AssetsData';
import { CSVLink, CSVDownload } from "react-csv";
import * as FaIcons from "react-icons/fa";
class Assets extends Component {
  state={
      loading: true,
      Assets: null
  };
 async componentDidMount(){
  const url = APIData.api+"assets/";
  const response = await fetch(url,{headers:APIData.headers});
      const daata = await response.json();
      this.setState({Assets: daata, loading: false});
  }       
  render() {
  return (
      
    <div className="assets">

              {this.state.loading || !this.state.Assets ? <Loading />: 
              <p>
    <div className="carrybox">
     <AssetsData data={this.state.Assets}/> 
    </div>
    <CSVLink data={this.state.Assets} filename={'Assets'}>
  <button className="Downloadbutton"> <FaIcons.FaDownload /> Download Report </button></CSVLink>
              </p>}
         
  </div>
  );
  }
 }
export default Assets;