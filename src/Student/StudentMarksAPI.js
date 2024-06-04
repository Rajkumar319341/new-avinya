import React from "react";
import { Component } from "react";
import '../CRUDTable.css'
import Loading from "../Loading";
import { APIData } from "../Authentication/APIData";
import MarksData from "../SQLTables/MarksData";
import axios from "axios";
import { CSVLink, CSVDownload } from "react-csv";
import * as FaIcons from "react-icons/fa";


const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
var months = [{ month: "All Months", value: "all" }, { month: "January", value: "JAN" }, { month: "February", value: "FEB" }, { month: "March", value: "MAR" }, { month: "April", value: "APR" }, { month: "May", value: "MAY" }, { month: "June", value: "JUN" }, { month: "July", value: "JUL" }, { month: "August", value: "AUG" }, { month: "September", value: "SEP" }, { month: "October", value: "OCT" }, { month: "November", value: "NOV" }, { month: "December", value: "DEC" }]

class StudentMarksAPI extends Component {
  state = {
    loading: true,
    marks: null
  };
 
  async componentDidMount() {
    const url = APIData.api + 'marks/student/' + sessiondetails.user;
    console.log(url);
    const response = await fetch(url, { headers: APIData.headers });
    console.log(response);
    const daata = await response.json();
    console.log(daata);
    this.setState({ marks: daata, loading: false });
  }
  
  filterMonths = (e) => {
    if (e.target.value !== "all") {
      this.setState({ loading: true })
      const url = APIData.api + "marks/" + sessiondetails.user + "?month=" + e.target.value;
      console.log(url)
      axios.get(url, { headers: APIData.headers })
        .then((response) => {
          this.setState({ marks: response.data, loading: false });
        })
    }
    else {
      this.setState({ loading: true })
      const url = APIData.api + 'marks/student/' + sessiondetails.user;
      axios.get(url, { headers: APIData.headers })
        .then((response) => {
          this.setState({ marks: response.data, loading: false });
        })
    }


  }
  render() {
    return (
      <div className="marks">
        {this.state.loading || !this.state.marks ? <Loading /> :
          <p>
            <div className="carrybox">
              <div className="Filter">

                <select name="selectList" id="selectList" onChange={this.filterMonths}>

                  <option value="all" selected>Select Months</option>

                  {months.map((item, index) => {
                    return (
                      <option value={item.value} >{item.month}</option>
                    );
                  })}

                </select>
              </div>
              <MarksData data={this.state.marks} />
            </div>
            <CSVLink data={this.state.marks} filename={'Marks'}>
        <button className="Downloadbutton"> <FaIcons.FaDownload /> Download Report </button>
        </CSVLink>
          </p>}
      </div>
    );
  }
}

export default StudentMarksAPI;