import React from "react";
import "../CRUDTable.css";
import { Component } from "react";
import * as AiIcons from "react-icons/ai";
import Loading from "../Loading";
import { APIData, org } from '../Authentication/APIData';
import DocumentsData from "../SQLTables/DocumentsData";
import { Link } from "react-router-dom";


class SuperAdminDocumentsAPI extends Component {
  state = {
    loading: true,
    user: null
  };
  async componentDidMount() {
    const url = APIData.api + `file?org=${org}`;
    const response = await fetch(url, { headers: APIData.headers });
    const daata = await response.json();
    this.setState({ user: daata, loading: false });
  }


  render() {
    return (
      <div className="superAdminDocumentsAPI">
        {this.state.loading || !this.state.user ? <Loading /> :
          <p>
            <div className="carrybox">

              <DocumentsData data={this.state.user} />
            </div>
          </p>}
      </div>
    );
  }
}

export default SuperAdminDocumentsAPI;
