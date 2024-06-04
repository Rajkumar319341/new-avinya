import React, { Component } from 'react';
import Loading from '../Loading';
// import Table from '../Table/table';
import { APIData, org } from '../Authentication/APIData';
import StudentData from '../SQLTables/StudentData';
import { CSVLink, CSVDownload } from "react-csv";
import * as FaIcons from "react-icons/fa";
class SuperAdminStudents extends Component {
  state = {
    loading: true,
    Student: null
  };
  async componentDidMount() {
    const url = APIData.api + `students?org=${org}`;
    const response = await fetch(url, { headers: APIData.headers });
    const daata = await response.json();
    this.setState({ Student: daata, loading: false });
  }
  render() {
    return (
      <div>
        {this.state.loading || !this.state.Student ? <Loading /> :
          <p>
            <div className="carrybox">
              <StudentData data={this.state.Student} />
            </div>
            <CSVLink data={this.state.Student} filename={'Students'}>
              <button className="Downloadbutton"> <FaIcons.FaDownload /> Download Report </button></CSVLink>
          </p>}
      </div>
    );
  }
}
export default SuperAdminStudents;