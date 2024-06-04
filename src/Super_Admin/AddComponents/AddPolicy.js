import React, { Component } from "react";
import { APIData } from "../../Authentication/APIData";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import Loading from "../../Loading";
import Tooltip from "@material-ui/core/Tooltip";

// for current date time
import moment from "moment";

toast.configure();
const initialState = {};

const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
var current_time = moment().format("DD-MM-YYYY");

class AddPolicy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      policy_id: " ",

      policy_name: "",
      policy_name_error: "",

      policy_audience: "",
      policy_audience_error: "",

      policy_description: "",
      policy_description_error: "",

      policy_date: "",
      policy_date_error: "",

      policy_data: "",
      policy_data_error: "",

      policy_note: "",
      policy_note_error: "",

      policy_type: "",
      policy_type_error: "",

      admin_id: sessiondetails.user,
      admin_id__error: "",
    };
  }
  responseloading() {
    this.setState({ loading: !this.state.loading });
  }
  validation = () => {
    let policy_type_error = "";
    let policy_name_error = "";
    let policy_audience_error = "";
    let policy_date_error = "";
    let admin_id__error = "";
    let policy_data_error = "";

    if (!this.state.policy_type) {
      policy_type_error = "Please provide Policy Type";
    }
    if (!this.state.policy_name) {
      policy_name_error = "Please provide Policy Name";
    }
    if (!this.state.policy_description) {
      this.state.policy_description = "null";
    }

    if (!this.state.policy_date) {
      policy_date_error = "Please provide Policy Date";
    }
    if (!this.state.policy_audience) {
      policy_audience_error = "Plase provide Policy Audience";
    }
    if (!this.state.admin_id_) {
      admin_id__error = "Invalid Admin ID";
    }
    if (!this.state.policy_data) {
      policy_data_error = "Please provide Policy Data";
    }
    if (!this.state.policy_note) {
      this.state.policy_note = "null";
    }

    if (
      policy_name_error ||
      policy_audience_error ||
      policy_date_error ||
      admin_id__error ||
      policy_data_error ||
      policy_type_error
    ) {
      this.setState({
        policy_name_error,
        policy_audience_error,
        policy_date_error,
        admin_id__error,
        policy_data_error,
        policy_type_error,
      });
      return false;
    }
    return true;
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    const isValide = this.validation();
    if (!isValide) {
      this.setState(initialState);
      if (
        !this.state.policy_name ||
        !this.state.policy_audience ||
        !this.state.policy_description ||
        !this.state.policy_date ||
        !this.state.policy_data ||
        !this.state.policy_note ||
        !this.state.policy_type
      ) {
        toast("Please Enter Valid Details");
      } else {
        var sendstate = {
          policy_id: " ",
          admin_id: sessiondetails.user,
          policy_audience: this.state.policy_audience,
          policy_name: this.state.policy_name,
          policy_type: this.state.policy_type,
          policy_description: this.state.policy_description,
          policy_data: this.state.policy_data,
          policy_note: this.state.policy_note,
          policy_date: this.state.policy_date,
          created_by: sessiondetails.user,
          created_date_time: current_time,
          updated_by: sessiondetails.user,
          updated_date_time: current_time,
        };
        var url = APIData.url;
        this.responseloading();
        axios
          .post(APIData.api + "policies/", sendstate, {
            headers: APIData.headers,
          })
          .then((response) => {
            console.log(response);
            toast("Policy Creation Successful");
            sessiondetails.userType == "superadmin"
              ? window.location.assign("superAdminPolicy")
              : window.location.assign("/adminPolicy");
            this.responseloading();
          })
          .catch((error) => {
            toast("Policy Creation Failed");
            console.log(error);
            this.responseloading();
          });
      }
    }
  };
  render() {
    const {
      policy_name,
      policy_audience,
      policy_type,
      policy_description,
      policy_date,
      admin_id_,
      policy_data,
      policy_note,
    } = this.state;
    return (
      <div>
        {this.state.loading ? (
          <Loading />
        ) : (
          <form className="superaddcourses" onSubmit={this.submitHandler}>
            <Link
              to={
                sessiondetails.userType == "superadmin"
                  ? "superAdminPolicy"
                  : "adminPolicy"
              }
            >
              <AiIcons.AiFillCloseCircle />
            </Link>
            <div className="carrybox">
              <div>
                <h2 className="mainheading01">ADD POLICY</h2>
              </div>
              <div className="floatleft">
                <div className="">
                  <label className="heading02" htmlFor="POLICY NAME">
                    <pre>
                      POLICY NAME :{" "}
                      <FaIcons.FaAsterisk
                        color="red"
                        fontSize=".4em"
                        style={{ marginBottom: "10px" }}
                      />
                    </pre>
                  </label>
                  <br />
                  <input
                    placeholder="POLICY NAME"
                    className="inputfield"
                    type="text"
                    name="policy_name"
                    value={policy_name}
                    onChange={this.changeHandler}
                  />
                  {this.state.policy_name_error ? (
                    <div style={{ color: "red" }}>
                      {this.state.policy_name_error}
                    </div>
                  ) : null}
                </div>
                <div className="">
                  <label className="heading02" htmlFor="POLICY AUDIENCE">
                    <pre>
                      POLICY AUDIENCE :{" "}
                      <FaIcons.FaAsterisk
                        color="red"
                        fontSize=".4em"
                        style={{ marginBottom: "10px" }}
                      />
                    </pre>
                  </label>
                  <br />
                  <textarea
                    placeholder="POLICY AUDIENCE"
                    className="inputfield"
                    type="text"
                    name="policy_audience"
                    value={policy_audience}
                    onChange={this.changeHandler}
                  />

                  {this.state.policy_audience_error ? (
                    <div style={{ color: "red" }}>
                      {this.state.policy_audience_error}
                    </div>
                  ) : null}
                </div>
                <div className="">
                  <label className="heading02" htmlFor="POLICY DATA">
                    <div className="anim">
                      <pre>
                        POLICY :{" "}
                        <FaIcons.FaAsterisk
                          color="red"
                          fontSize=".4em"
                          style={{ marginBottom: "10px" }}
                        />
                        <Tooltip
                          title="Please use fullstops to only denote the end of a sentence."
                          placement="top"
                        >
                          <span variant="contained">?</span>
                        </Tooltip>
                      </pre>
                    </div>
                  </label>
                  <p className="ptag" style={{ paddingTop: "0px" }}>
                    {" "}
                  </p>
                  <textarea
                    placeholder="POLICY"
                    className="inputfield"
                    type="text"
                    name="policy_data"
                    value={policy_data}
                    onChange={this.changeHandler}
                    title="lol"
                  />
                  {this.state.policy_data_error ? (
                    <div style={{ color: "red" }}>
                      {this.state.policy_data_error}
                    </div>
                  ) : null}
                </div>

                <div className="">
                  <label className="heading02" htmlFor="POLICY TYPE">
                    <pre>
                      POLICY TYPE :{" "}
                      <FaIcons.FaAsterisk
                        color="red"
                        fontSize=".4em"
                        style={{ marginBottom: "10px" }}
                      />
                    </pre>
                  </label>
                  <br />

                  <select
                    placeholder="POLICY TYPE"
                    className="inputfield"
                    value={policy_type}
                    onChange={this.changeHandler}
                    type="text"
                    name="policy_type"
                  >
                    <option value="" selected disabled hidden>
                      Select An Option
                    </option>
                    <option>Student-policy</option>
                    <option>Employee-policy</option>
                    <option>Admin-policy</option>
                    <option>Superadmin-policy</option>
                    <option>Organization-policy</option>
                  </select>

                  {this.state.policy_type_error ? (
                    <div style={{ color: "red" }}>
                      {this.state.policy_type_error}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="floatright">
                <div className="">
                  <label className="heading02" htmlFor="POLICY DATE">
                    <pre>
                      POLICY DATE :{" "}
                      <FaIcons.FaAsterisk
                        color="red"
                        fontSize=".4em"
                        style={{ marginBottom: "10px" }}
                      />
                    </pre>
                  </label>
                  <br />

                  <input
                    placeholder="POLICY DATE"
                    className="inputfield"
                    type="date"
                    name="policy_date"
                    value={policy_date}
                    onChange={this.changeHandler}
                  />

                  {this.state.policy_date_error ? (
                    <div style={{ color: "red" }}>
                      {this.state.policy_date_error}
                    </div>
                  ) : null}
                </div>
                <div className="">
                  <label className="heading02" htmlFor="POLICY DESCRIPTION">
                    POLICY DESCRIPTION :
                  </label>
                  <br />

                  <input
                    placeholder="POLICY DESCRIPTION"
                    className="inputfield"
                    type="test"
                    name="policy_description"
                    value={policy_description}
                    onChange={this.changeHandler}
                  />
                  {this.state.policy_description_error ? (
                    <div style={{ color: "red" }}>
                      {this.state.policy_description_error}
                    </div>
                  ) : null}
                </div>

                <div className="">
                  <label className="heading02" htmlFor="POLICY NOTE">
                    POLICY NOTE :
                  </label>
                  <br />

                  <input
                    placeholder="POLICY NOTE"
                    className="inputfield"
                    type="test"
                    name="policy_note"
                    value={policy_note}
                    onChange={this.changeHandler}
                  />
                  {this.state.policy_note_error ? (
                    <div style={{ color: "red" }}>
                      {this.state.policy_note_error}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="submitcarry">
                <button className="Submitbutton" type="submit">
                  ADD +
                </button>
              </div>
              <p className="ptag">
                <pre>
                  <FaIcons.FaAsterisk
                    color="red"
                    fontSize=".4em"
                    style={{ marginBottom: "10px" }}
                  />{" "}
                  Mandatory fields
                </pre>
              </p>
            </div>
          </form>
        )}
      </div>
    );
  }
}

export default AddPolicy;