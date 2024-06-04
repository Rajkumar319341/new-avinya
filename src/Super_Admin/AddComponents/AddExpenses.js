import React, { Component } from "react";
import { APIData, org } from "../../Authentication/APIData";
import axios from "axios";
import { toast } from "react-toastify";
import SuperAdminDocumentsAPI from "../SuperAdminDocumentsAPI";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import Loading from "../../Loading";

toast.configure();
const initialState = {};

const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));

class AddExpenses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,

      selectedFile: null,
      selectedFile_error: null,

      cost: "",
      cost_error: "",

      exp_date: "",
      exp_date_error: "",

      exp_name: "",
      exp_name_error: "",

      exp_type: "",
      exp_type_error: "",

      item_count: "",
      item_count_error: "",

      month: "",
      month_error: "",

      reason: "",
      reason_error: "",

      created_by: "",
    };
  }
  handleClick = () => {
    this.props.toggle();
  };
  linking = () => {
    return <SuperAdminDocumentsAPI />;
  };

  responseloading() {
    this.setState({ loading: !this.state.loading });
  }

  validation = () => {
    let cost_error = "";
    let exp_date_error = "";
    let exp_name_error = "";
    let exp_type_error = "";
    let item_count_error = "";
    let reason_error = "";
    let month_error = "";
    let selectedFile_error = "";

    if (!this.state.exp_date) {
      exp_date_error = "Invalid Date";
    }

    if (!this.state.exp_name) {
      exp_name_error = "Invalid Name";
    }
    if (!this.state.cost) {
      cost_error = "Invalid Cost";
    }
    if (!this.state.exp_type) {
      exp_type_error = "Invalid Type";
    }
    if (!this.state.item_count) {
      item_count_error = "Invalid Count";
    }
    if (!this.state.month) {
      month_error = "Invalid Month";
    }
    if (!this.state.selectedFile) {
      selectedFile_error = "Invalid File";
    }
    if (!this.state.reason) {
      reason_error = "Invalid Description:";
    }

    if (
      reason_error ||
      selectedFile_error ||
      cost_error ||
      exp_date_error ||
      exp_name_error ||
      exp_type_error ||
      item_count_error ||
      month_error
    ) {
      this.setState({
        reason_error,
        selectedFile_error,
        cost_error,
        exp_date_error,
        exp_name_error,
        exp_type_error,
        item_count_error,
        month_error,
      });
      return false;
    }
    return true;
  };
  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
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
        !this.state.selectedFile_error ||
        !this.state.cost ||
        !this.state.exp_date ||
        !this.state.exp_name ||
        !this.state.exp_type ||
        !this.state.item_count ||
        !this.state.month ||
        this.state.reason
      ) {
        toast("Please, Enter Valid Details");
      }
    } else {
      var sendstate = {
        cost: this.state.cost,
        exp_date: this.state.exp_date,
        exp_name: this.state.exp_name,
        exp_type: this.state.exp_type,
        item_count: this.state.item_count,
        month: this.state.month,
        org:org,
        status: "pending",
        reason: this.state.reason,
        created_by: sessiondetails.user,
      };

      const formData = new FormData();

      // Update the formData object
      formData.append("file", this.state.selectedFile);

      formData.append("expense", JSON.stringify(sendstate));
      toast("Please Wait!!");
      this.responseloading();

      axios
        .post(APIData.api + "expenses/", formData, { headers: APIData.headers })
        .then((response) => {
          var url;
          if (response.data.status.toLowerCase() === "success") {
            toast(response.data.description);
            if (sessiondetails.userType == "superadmin")
              url = new URL(APIData.url + "superAdminExpenseAPI");
            else if (sessiondetails.userType == "admin")
              url = new URL(APIData.url + "adminExpenseAPI");
            else if (sessiondetails.userType == "employee")
              url = new URL(APIData.url + "facultyExpenseAPI");
            window.location.assign(url);
          } else if (response.data.status.toLowerCase() == "failure") {
            toast(response.data.errorDesc);
            window.location.reload();
            this.responseloading();
          }
        })
        .catch((error) => {
          toast("It's Time To Grab A Coffee");
          console.log(error);
          window.location.reload();
          this.responseloading();
        });
    }
  };

  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>

          <p>File Name: {this.state.selectedFile.name}</p>

          <p>File Type: {this.state.selectedFile.type}</p>
          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  render() {
    return (
      <div>
        {this.state.loading ? (
          <Loading />
        ) : (
          <form className="addExpenses" onSubmit={this.submitHandler}>
            {/* <div className="modal">
       <div className="modal_content"> */}
            <Link
              to={
                sessiondetails.userType === "superadmin"
                  ? "superAdminExpenseAPI"
                  : sessiondetails.userType === "admin"
                  ? "adminExpenseAPI"
                  : "facultyExpenseAPI"
              }
            >
              <AiIcons.AiOutlineCloseCircle />
            </Link>
            <div className="carrybox">
              <div>
                <h2 className="mainheading01">Add Expenses</h2>
              </div>
              <div className="floatleft">
                <div className="">
                  <label className="heading02" htmlFor="Name">
                    Name:
                  </label>
                  <br />

                  <input
                    placeholder="Name"
                    className="inputfield"
                    type="text"
                    name="exp_name"
                    value={this.state.exp_name}
                    onChange={this.changeHandler}
                  />

                  {this.state.exp_name_error ? (
                    <div style={{ color: "red" }}>
                      {this.state.exp_name_error}
                    </div>
                  ) : null}
                </div>

                <div className="">
                  <label className="heading02" htmlFor="Expense Type">
                    Expense Type:
                  </label>
                  <br />

                  <select
                    placeholder="Expense Type"
                    className="inputfield"
                    type="text"
                    name="exp_type"
                    value={this.state.exp_type}
                    onChange={this.changeHandler}
                  >
                    <option value="" selected disabled hidden>
                      Select An Option
                    </option>
                    <option value="miscellaneous">miscellaneous</option>
                    <option value="office">office</option>
                    <option value="travel">travel</option>
                    <option value="personal">personal</option>
                  </select>

                  {this.state.exp_type_error ? (
                    <div style={{ color: "red" }}>
                      {this.state.exp_type_error}
                    </div>
                  ) : null}
                </div>

                {/* 
                </select> */}

                {/* <div className="">
            <label className="heading02" htmlFor="Expense ID">Expense ID:</label><br/>
            <input
            className="inputfield"
            placeholder="Expense ID"
            type="text" 
            name="id"
            value={id}
            onChange={this.changeHandler}
            />
{this.state.id_error ? (<div style={{color:'red' }}>
    {this.state.id_error}
</div>) : null}

           </div> */}
                <div className="">
                  <label className="heading02" htmlFor="Cost">
                    Cost:
                  </label>
                  <br />

                  <input
                    placeholder="Cost"
                    className="inputfield"
                    value={this.state.cost}
                    onChange={this.changeHandler}
                    type="number"
                    name="cost"
                  />

                  {this.state.cost_error ? (
                    <div style={{ color: "red" }}>{this.state.cost_error}</div>
                  ) : null}
                </div>
                <div className="">
                  <label className="heading02" htmlFor="Date">
                    Date:
                  </label>
                  <br />

                  <input
                    placeholder="Date"
                    className="inputfield"
                    type="date"
                    name="exp_date"
                    value={this.state.exp_date}
                    onChange={this.changeHandler}
                  />
                  {this.state.exp_date_error ? (
                    <div style={{ color: "red" }}>
                      {this.state.exp_date_error}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="floatright">
                <div className="">
                  <label className="heading02" htmlFor="Item Count">
                    Item Count:
                  </label>
                  <br />

                  <input
                    placeholder="Item Count"
                    className="inputfield"
                    type="number"
                    name="item_count"
                    value={this.state.item_count}
                    onChange={this.changeHandler}
                  />

                  {this.state.item_count_error ? (
                    <div style={{ color: "red" }}>
                      {this.state.item_count_error}
                    </div>
                  ) : null}
                </div>

                <div className="">
                  <label className="heading02" htmlFor="Month">
                    Month:
                  </label>
                  <br />

                  <input
                    placeholder="Month"
                    className="inputfield"
                    type="month"
                    name="month"
                    value={this.state.month}
                    onChange={this.changeHandler}
                  />
                  {this.state.month_error ? (
                    <div style={{ color: "red" }}>{this.state.month_error}</div>
                  ) : null}
                </div>

                {/* <option value="" selected disabled hidden>
          Select an Option
      </option>
                <option
                >
                course-professional
                </option>
                <option
                            >
                course-academics
                </option>
                </select> */}

                <div className="">
                  <label className="heading02" htmlFor="Description">
                    Description:
                  </label>
                  <br />

                  <textarea
                    placeholder="Description"
                    className="inputfield"
                    type="text"
                    name="reason"
                    value={this.state.reason}
                    onChange={this.changeHandler}
                  />
                  {this.state.reason_error ? (
                    <div style={{ color: "red" }}>
                      {this.state.reason_error}
                    </div>
                  ) : null}
                </div>

                {/* <div className="">
            <label className="heading02" htmlFor="Created By">Created By:</label><br/>

            <input 
            placeholder="Created By" 
            className="inputfield" 

            type="text"
            name="sessiondetails.user"
            value={sessiondetails.user}
            onChange={this.changeHandler} 
            />
{/* {this.state.created_by_error ? (<div style={{color:'red' }}>
    {this.state.created_by_error}
</div>) : null} 
            </div> */}
              </div>
            </div>

            {/* --------------------------------------- */}
            <div className="uploadsingle">
              <div className="carrybox">
                <h5 className="heading01">Upload Reciept</h5>
                <div className="bringitcenter">
                  <input
                    className="Upload"
                    type="file"
                    onChange={this.onFileChange}
                  />
                  {this.state.selectedFile_error ? (
                    <div style={{ color: "red" }}>
                      {this.state.selectedFile_error}
                    </div>
                  ) : null}
                </div>

                <div className="bringitcenter">{this.fileData()}</div>

                {/*          
          <div className="bringitcenter">
          <button className="Upload" onClick={this.onFileUpload}>

                  Upload!
                </button>
                  
        </div> */}
              </div>
            </div>

            <div className="submitcarry">
              <button className="Submitbutton" type="submit">
                ADD +
              </button>
            </div>

            {/* </div>
            </div> */}
          </form>
        )}
      </div>
    );
  }
}

export default AddExpenses;
