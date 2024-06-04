import React from "react";
import "../CRUDTable.css";
import { Component } from "react";
import Loading from "../Loading";
import {APIData, org} from '../Authentication/APIData';
import ExpenseData from "../SQLTables/ExpenseData";
import { CSVLink, CSVDownload } from "react-csv";
import * as FaIcons from "react-icons/fa";
let tasks = null;
class FacultyExpenseAPI extends Component {
   state={
    loading: true,
    user:null
};
async componentDidMount(){
  const url = APIData.api+`expenses?org=${org}`;
  const response = await fetch(url,{headers:APIData.headers});
    const daata = await response.json();
    this.setState({user: daata,loading:false});
} 


  render() { 
    return ( 
      <div className="facultyExpenseAPI">
      {this.state.loading || !this.state.user? <Loading /> : 
        <p>
<div className="carrybox">
<ExpenseData data={this.state.user}/>
</div>
<CSVLink data={this.state.user} filename={'Expenses'}>
        <button className="Downloadbutton"> <FaIcons.FaDownload /> Download Report </button></CSVLink>
        </p>}
        </div>
    );
  }
}
 
export default FacultyExpenseAPI;