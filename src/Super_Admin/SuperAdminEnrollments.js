import React, { Component } from 'react';
import Loading from '../Loading';
import { APIData, org } from '../Authentication/APIData';
import EnrollmentsData from '../SQLTables/EnrollmentsData';
import axios from "axios";
import { CSVLink, CSVDownload } from "react-csv";
import * as FaIcons from "react-icons/fa";

const dept= localStorage.getItem("Depart Details")
class SuperAdminEnrollments extends Component {
  state = {
    loading: true,
    enrolldata: null,
    current: "All Enrollments"
  };
  async componentDidMount() {
    const url = APIData.api + `enrollments?org=${org}`;
    const response = await fetch(url, { headers: APIData.headers });
    const daata = await response.json();
    this.setState({ enrolldata: daata, loading: false });
  }
  filterEnrollments = (e) => {
    e.preventDefault()
    if (e.target.value === 'all') {
      this.setState({ loading: true })
      const url = APIData.api + `enrollments?org=${org}`;
      axios.get(url, { headers: APIData.headers })
        .then((response) => {
          this.setState({ enrolldata: response.data, loading: false, current: "All Enrollments" });
        })
    }
    else if (e.target.value === 'applied') {
      this.setState({ loading: true })
      const url = APIData.api + `enrollments/status/dept?status=applied&department=${dept}&org=${org}`;
      axios.get(url, { headers: APIData.headers })
        .then((response) => {
          this.setState({ enrolldata: response.data, loading: false, current: "Applied Enrollments" });
        })
    }
    else if (e.target.value === 'accepted') {
      this.setState({ loading: true })
      const url = APIData.api + `enrollments/status/dept?status=accepted&department=${dept}&org=${org}`;
      axios.get(url, { headers: APIData.headers })
        .then((response) => {
          this.setState({ enrolldata: response.data, loading: false, current: "Accepted Enrollments" });
        })
    }
    else if (e.target.value === 'completed') {
      this.setState({ loading: true })
      const url = APIData.api + `enrollments/status/dept?status=completed&department=${dept}&org=${org}`;
      axios.get(url, { headers: APIData.headers })
        .then((response) => {
          this.setState({ enrolldata: response.data, loading: false, current: "Completed Enrollments" });
        })
    }
  }
  render() {
    return (

      <div className="adminenrollments">

        {this.state.loading || !this.state.enrolldata ? <Loading /> :
          <p>
            <div className="carrybox">
              <div className='Filter'>
                <select name="selectList" id="selectList" onChange={this.filterEnrollments}>
                  <option value="" selected>{this.state.current}</option>
                  <option value="all" >All Types</option>
                  <option value="applied" >Applied</option>
                  <option value="accepted" >Accepted</option>
                  <option value="completed" >Completed</option>
                </select>
              </div>
              <EnrollmentsData data={this.state.enrolldata} />
            </div>
            <CSVLink data={this.state.enrolldata} filename={'Enrollments'}>
              <button className="Downloadbutton"> <FaIcons.FaDownload /> Download Report </button></CSVLink>
          </p>}

      </div>
    );
  }
}
export default SuperAdminEnrollments;