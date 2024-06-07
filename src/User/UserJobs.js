import React from "react";
import "../CRUDTable.css";
import { Component } from "react";
import Loading from "../Loading";
import { APIData, org } from '../Authentication/APIData';
import ApplyJobData from "../SQLTables/ApplyJobData";


const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
const fetchedDept = localStorage.getItem("Depart Details");
console.log("Fetched department:", fetchedDept);



class UserJobs extends Component {
  state = {
    loading: true,
    user: null
  };
  async componentDidMount() {
    const url = APIData.api + `jobs/?org=${org}`;
    const response = await fetch(url, { headers: APIData.headers });
    const daata = await response.json();
    console.log("job related data:",daata);
    this.setState({ user: daata, loading: false });
  }


  render() {
    return (
      <div className="userjob">
        <div>
          {this.state.loading || !this.state.user ? <Loading /> :
            <p>
              <div className="carrybox">
                <ApplyJobData data={this.state.user} />
              </div>
            </p>}
        </div>
      </div>
    );
  }
}

export default UserJobs;