import React from "react";
import "../CRUDTable.css";
import { Component } from "react";
import Loading from "../Loading";
import { APIData, org } from "../Authentication/APIData";
import StudentData from "../SQLTables/StudentData";
import { CSVLink, CSVDownload } from "react-csv";
import * as FaIcons from "react-icons/fa";
let tasks = null;
class FacultyStudentAPI extends Component {
  state = {
    loading: true,
    user: null,
  };
  async componentDidMount() {
    const url = APIData.api + `students?org=${org}`;
    const response = await fetch(url, { headers: APIData.headers });
    const daata = await response.json();
    this.setState({ user: daata, loading: false });
  }

  render() {
    return (
      <div className="facultyStudentAPI">
        {this.state.loading || !this.state.user ? (
          <Loading />
        ) : (
          <p>
            <div className="carrybox">
              <StudentData data={this.state.user} />
            </div>
            <CSVLink data={this.state.user} filename={'StudentData'}>
        <button className="Downloadbutton"> <FaIcons.FaDownload /> Download Report </button></CSVLink>
          </p>
        )}
      </div>
    );
  }
}

export default FacultyStudentAPI;
