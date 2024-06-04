import { APIData } from "../../Authentication/APIData";
import React, { Component } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../Loading";
import axios from "axios";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";

toast.configure();
const initialState = {};
class UpdateExpenses extends Component {
  state = {
    loading: true,
    id: "",
    id_error: "",
    status: "",
    status_error: "",
    reason: "",
    reason_error: "",
    seen: false,
    expense: null
  };

  responseloading() {
    this.setState({ loading: !this.state.loading });
  }

  async componentDidMount() {
    const url = APIData.api + "expenses";
    const response = await fetch(url, { headers: APIData.headers });
    const expense = await response.json();
    this.setState({ expense: expense, loading: false });
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  validation = () => {
    let id_error = "";
    let status_error = "";
    let reason_error = "";

    if (!this.state.id) {
      id_error = "Invalid Admin ID!";
    }
    if (!this.state.status) {
      status_error = "Invalid Admin ID!";
    }
    if (!this.state.reason) {
      reason_error = "Invalid Admin ID!";
    }

    if (id_error || status_error || reason_error) {
      this.setState({ id_error, status_error, reason_error });
      return false;
    }
    return true;
  };

  submitHandler = (e) => {
    e.preventDefault();
    const isValide = this.validation();
    if (!isValide) {
      this.setState(initialState);
      if (!this.state.status || !this.state.id || !this.state.reason) {
        toast("Please Enter Valid Details");
      }
    } else {
      var expense = {
        id: parseInt(this.state.id),
        status: this.state.status,
        reason: this.state.reason,
      };
      this.responseloading();

      axios
        .put(APIData.api + "expenses/", expense, { headers: APIData.headers })
        .then((response) => {
          if (response.data.status.toLowerCase() == "success") {
            toast(response.data.description);
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            toast(response.data.errorDesc);
            this.responseloading();
          }
        })
        .catch((error) => {
          toast("It's Time To Grab A Coffee");
          this.responseloading();
        });
    }
  };

  render() {
    return (

          <div className="updateExpense">
{this.state.loading || !this.state.expense ? (
          <Loading />
        ) : ( 
            <form className="carrybox" onSubmit={this.submitHandler}>
            <Link to="superAdminExpenseAPI">
              <AiIcons.AiFillCloseCircle   />
            </Link>
            <h1 className="heading01">Update Expense</h1>
              <div className="floatleft">
                <label className="heading02" htmlFor="Expense ID">
                  Expense ID:
                </label>
                <input
                list="expenseid"
                  className="inputfield"
                  placeholder="Expense ID"
                  value={this.state.id}
                  name="id"
                  type="number"
                  onChange={this.changeHandler}
                />
                <datalist id = "expenseid">
                {this.state.expense.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.exp_name}
                      </option>
                    );
                  })}
                </datalist>
                {this.state.id_error ? (
                  <div style={{ color: "red" }}>{this.state.id_error}</div>
                ) : null}

                <label className="heading02" htmlFor="address">
                  Status:
                </label>
                <select
                  className="inputfield"
                  value={this.state.status}
                  name="status"
                  onChange={this.changeHandler}
                >
                  <option value="" selected disabled hidden>
                    Select An Option
                  </option>
                  <option value="completed">Completed</option>
                  <option value="rejected">Rejected</option>
                </select>
                {this.state.status_error ? (
                  <div style={{ color: "red" }}>{this.state.status_error}</div>
                ) : null}
              </div>
              <div className="floatright">
                <label className="heading02" htmlFor="Description">
                  Description:
                </label>
                <textarea
                  className="inputtestarea"
                  value={this.state.reason}
                  name="reason"
                  placeholder="Description"
                  onChange={this.changeHandler}
                />
                {this.state.reason_error ? (
                  <div style={{ color: "red" }}>{this.state.reason_error}</div>
                ) : null}
              </div>
              <input className="Submitbutton" type="submit" />
            </form>
        )}</div>

    );
  }
}

export default UpdateExpenses;
