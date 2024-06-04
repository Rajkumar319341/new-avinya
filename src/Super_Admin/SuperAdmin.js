import React from "react";
import "../CRUDTable.css";
import { APIData,org} from '../Authentication/APIData';
import { Component } from "react";
import Loading from "../Loading";
import AdminData from "../SQLTables/AdminData";
import { CSVLink, CSVDownload } from "react-csv";
import * as FaIcons from "react-icons/fa";

class SuperAdmin extends Component {
  state = {
    loading: true,
    Admin: null
  };
  async componentDidMount() {
    const url = APIData.api + `admins?org=${org}`;
    const response = await fetch(url, { headers: APIData.headers });
    const daata = await response.json();
    this.setState({ Admin: daata, loading: false });
  }


  render() {
    return (
      <div className="superAdmin">
        {this.state.loading || !this.state.Admin ? <Loading /> :
          <p>
            <div className="carrybox">
              <AdminData data={this.state.Admin} />
            </div>
            <CSVLink data={this.state.Admin} filename={'Admins'}>
              <button className="Downloadbutton"> <FaIcons.FaDownload /> Download Report </button></CSVLink>

          </p>}

      </div>
    );
  }
}

export default SuperAdmin;