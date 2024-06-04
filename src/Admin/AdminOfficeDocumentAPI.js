import React from "react";
import "../CRUDTable.css";
import { Component } from "react";
import Loading from "../Loading";
import { APIData, org } from '../Authentication/APIData';
import * as AiIcons from "react-icons/ai";

import { Link } from "react-router-dom";
import OfficeDocumentsData from "../SQLTables/OfficeDocumentsData";


let tasks = null;
class AdminOfficeDocumentAPI extends Component {
  state = {
    loading: true,
    user: null
  };
  async componentDidMount() {
    const url = APIData.api + `office-file/no-doc?org=${org}`;
    const response = await fetch(url, { headers: APIData.headers });
    const daata = await response.json();
    this.setState({ user: daata, loading: false });
  }


  render() {
    return (
      <div className="adminofficeDocumentsAPI">
        {this.state.loading || !this.state.user ? <Loading /> :
          <p>
            <div className="carrybox">
              <OfficeDocumentsData data={this.state.user} />
            </div>
          </p>}
      </div>
    );
  }
}

export default AdminOfficeDocumentAPI;
