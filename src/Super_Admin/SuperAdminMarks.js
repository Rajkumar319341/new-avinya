import React from "react";
import "../CRUDTable.css";
import { Component } from "react";
import Loading from "../Loading";
import { APIData,org } from '../Authentication/APIData';
import MarksData from "../SQLTables/MarksData";
import axios from "axios";
import { toast } from "react-toastify";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import PerformanceGraph from '../PerformanceGraph'
import { CSVLink, CSVDownload } from "react-csv";
import * as FaIcons from "react-icons/fa";




toast.configure();
var months = [{ month: "All Months", value: "all" }, { month: "January", value: "JAN" }, { month: "February", value: "FEB" }, { month: "March", value: "MAR" }, { month: "April", value: "APR" }, { month: "May", value: "MAY" }, { month: "June", value: "JUN" }, { month: "July", value: "JUL" }, { month: "August", value: "AUG" }, { month: "September", value: "SEP" }, { month: "October", value: "OCT" }, { month: "November", value: "NOV" }, { month: "December", value: "DEC" },]
var a = []
class SuperAdminMarks extends Component {

  state = { 
    loading: true,
    user: null,
    mainData: null,
    currentMonth: "Select Months",
    displayGraphButon:false,
    studentId:null,
    displayData:false
  };
  async componentDidMount() {
    try {
      const url = APIData.api +  `marks?org=${org}`;
      const response = await fetch(url, { headers: APIData.headers });
      const daata = await response.json();
      this.setState({ user: daata, loading: false, mainData: daata });

    }
    catch (err) {
      toast(err)
    }
  }

  filterMonths = (e) => {
    if (e.target.value !== "all") {
      this.setState({ loading: true })
      const url = APIData.api + "marks/month?month=" + e.target.value;
      const curMon = e.target.value;
      axios.get(url, { headers: APIData.headers })
        .then((response) => {
          this.setState({ user: response.data, loading: false, currentMonth: curMon ,displayGraphButon:false,displayData:false });
        })
    }
    else {
      this.setState({ loading: true })
      const url = APIData.api + "marks/";
      axios.get(url, { headers: APIData.headers })
        .then((response) => {
          this.setState({ user: response.data, loading: false, currentMonth: "Select Months",displayGraphButon:false,displayData:false  });
        })
    }


  }

  filterGrade = (e) => {
    if (e.target.value !== "all") {
      this.setState({ loading: true })
      const url = APIData.api + "marks/grade?grade=" + e.target.value;
      axios.get(url, { headers: APIData.headers })
        .then((response) => {
          this.setState({ user: response.data, loading: false,displayGraphButon:false,displayData:false });
        })
    }
    else {
      this.setState({ loading: true })
      const url = APIData.api + "marks/";
      axios.get(url, { headers: APIData.headers })
        .then((response) => {
          this.setState({ user: response.data, loading: false ,displayGraphButon:false,displayData:false});
        })
    }
  }

  filterType = (e) => {
    if (e.target.value !== "all") {
      this.setState({ loading: true })
      const url = APIData.api + "marks/assesment?type=" + e.target.value;
      axios.get(url, { headers: APIData.headers })
        .then((response) => {
          this.setState({ user: response.data, loading: false ,displayGraphButon:false,displayData:false});
        })
    }
    else {
      this.setState({ loading: true })
      const url = APIData.api + "marks/";
      axios.get(url, { headers: APIData.headers })
        .then((response) => {
          this.setState({ user: response.data, loading: false,displayGraphButon:false,displayData:false });
        })
    }
  }

  filterStudents = (e) => {
    if (e.target.value !== "all") {
      this.setState({ loading: true })
      const url = APIData.api + "marks/student/" + e.target.value;
      axios.get(url, { headers: APIData.headers })
        .then((response) => {
          this.setState({ user: response.data, loading: false });
        })
        this.setState({displayGraphButon:true,studentId:e.target.value})
    }
    else {
      this.setState({ loading: true })
      const url = APIData.api + "marks/";
      axios.get(url, { headers: APIData.headers })
        .then((response) => {
          this.setState({ user: response.data, loading: false });
        })
        this.setState({displayGraphButon:false,studentId:null,displayData:false})

    }
  }
  goToPerformanceGraph = (e) => {

    this.setState({displayData:!this.state.displayData})
  }



  render() {
    return (
      <div className="marks">
        {this.state.loading || !this.state.user ? <Loading /> :
          <p>
            <div className="carrybox">
              {/* Filtering By Months */}
              <div className="Filter">


                <select name="selectList" id="selectList" onChange={this.filterMonths}>

                  <option value="all" selected>{this.state.currentMonth}</option>

                  {months.map((item, index) => {
                    return (
                      <option value={item.value} name={item.month} >{item.month}</option>
                    );
                  })}

                </select>

                <select name="selectList" id="selectList" onChange={this.filterType}>

                  <option value="" selected>Select Test Type</option>
                  <option value="all" >All Types</option>
                  {a = [...new Set(this.state.mainData.map(item => item.test_type))]}
                  {a.map((item, index) => {
                    return (
                      <option value={item}>{item}</option>
                    );
                  })}

                </select>


                <select name="selectList" id="selectList" onChange={this.filterGrade} >

                  <option value="" selected>Select Grade</option>
                  <option value="all" >All Grades</option>
                  {a = [...new Set(this.state.mainData.map(item => item.grade))]}
                  {a.map((item, index) => {
                    return (
                      <option value={item}>{item}</option>
                    );
                  })}

                </select>


                <select name="selectList" id="selonClickctList" onChange={this.filterStudents} >

                  <option value="" selected>Select student</option>
                  <option value="all"  >All Students</option>
                  {a = [...new Set(this.state.mainData.map(item => item.student_id))]}
                  {a.map((item, index) => {
                    return (
                      <option value={item}>{item}</option>
                    );
                  })}
                </select>
              </div>

              {this.state.displayGraphButon ?
              <div className="Filter" onClick={this.goToPerformanceGraph}>
                        <div className="Upload" >
                           {this.state.displayData?"Close Performance Graph":"Performance Graph"} 
                        </div>
                    </div>:null}
              <MarksData data={this.state.user} />
              {this.state.displayData?<div className=""><PerformanceGraph data={this.state.studentId} /></div>:null}

            </div>
            <CSVLink data={this.state.user} filename={'Marks'}>
        <button className="Downloadbutton"> <FaIcons.FaDownload /> Download Report </button></CSVLink>
          </p>}
      </div>
    );
  }
}

export default SuperAdminMarks;
