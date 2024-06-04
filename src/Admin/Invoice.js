import React from "react";
import "../CRUDTable.css";
import { Component } from "react";
import Loading from "../Loading";
import { APIData, org } from '../Authentication/APIData';
import InvoiceData from "../SQLTables/InvoiceData";
import { CSVLink, CSVDownload } from "react-csv";
import * as FaIcons from "react-icons/fa";


let tasks = null;
class InvoiceAPI extends Component {
  state = {
    loading: true,
    user: null,
  };

  async componentDidMount() {
    const url = APIData.api + `invoices?org=${org}`;
    const response = await fetch(url, { headers: APIData.headers });
    const data = await response.json();
    this.setState({ user: data, loading: false });
  }


  render() {
    return (
      <div className="invoicecreate">
        {this.state.loading || !this.state.user ? <Loading /> :
          <p>
            <div className="carrybox">
              <InvoiceData data={this.state.user} />
            </div>
            <CSVLink data={this.state.user} filename={'Invoices'}>
              <button className="Downloadbutton"> <FaIcons.FaDownload /> Download Report </button></CSVLink>
          </p>}
      </div>
    );
  }
}

export default InvoiceAPI;