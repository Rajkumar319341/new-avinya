import React from "react";
import "../CRUDTable.css";
import { Component } from "react";
import Loading from "../Loading";
import ExpenseData from "../SQLTables/ExpenseData";
import { CSVLink, CSVDownload } from "react-csv";
import * as FaIcons from "react-icons/fa";
import { APIData,org } from "../Authentication/APIData";
import { Link } from "react-router-dom";

class SuperAdminExpenseAPI extends Component {
  state = {
    loading: true, 
    expense: null,
  };
  async componentDidMount() {
    const url = APIData.api + `expenses?org=${org}`;
    const response = await fetch(url, { headers: APIData.headers });
    const expense = await response.json();
    this.setState({ expense: expense, loading: false });
  }
  togglePop = () => {
    this.setState({
      seen: !this.state.seen,
    });
  };
  render() {
    return (
      <div className="superAdminExpenseAPI">
        {this.state.loading || !this.state.expense ? (
          <Loading />
        ) : (
          <p>
            <div className="carrybox">
              <ExpenseData data={this.state.expense} />
              {/* <div style={{ float: "right", display: "inline-block" }}>
                <Link to="updateExpense">
                  <div className="Upload">
                    <FaIcons.FaEdit /> Do You Want To Update?
                  </div>
                </Link>
              </div> */}
            </div>
            <CSVLink data={this.state.expense} filename={'Expenses'}>
        <button className="Downloadbutton"> <FaIcons.FaDownload /> Download Report </button></CSVLink>
          </p>
        )}
      </div>
    );
  }
}

export default SuperAdminExpenseAPI;
