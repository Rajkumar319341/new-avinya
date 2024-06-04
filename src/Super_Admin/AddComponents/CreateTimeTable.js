import React, { Component } from "react";
import { APIData, org } from "../../Authentication/APIData";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import Loading from "../../Loading";


Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  return this;
};
toast.configure();
const initialState = {};
var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var today = new Date(),
  date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
function addHoursToDate(date, hours) {
  return new Date(new Date(date).setHours(date.getHours() + hours));
}
class CreateTimeTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coursesData: null,
      employeeData: null,
      loading: true,
      Date: "",
      Date_error: "",

      Subject: "",
      Subject_error: "",

      Faculty_Name: "",
      Faculty_Name_error: "",

      Start_Time: "",
      Start_Time_error: "",

      End_time: "",
      End_time_error: "",

      Course: "",
      Course_error: "",
    };
  }

  validation = () => {
    let Date_error = "";
    let Subject_error = "";
    let Start_Time_error = "";
    let End_time_error = "";
    let Course_error = "";
    let Faculty_Name_error = "";

    if (!this.state.Date) {
      Date_error = "Invalid Date Format";
    }
    if (!this.state.Subject) {
      Subject_error = "Invalid Subject";
    }
    if (!this.state.Start_Time) {
      Start_Time_error = "Invalid Start_Time";
    }
    if (!this.state.End_time) {
      End_time_error = "Invalid End_time";
    }
    if (!this.state.Course) {
      Course_error = "Invalid Course";
    }
    if (!this.state.Faculty_Name) {
      Faculty_Name_error = "Invalid Faculty Name";
    }

    if (
      Date_error ||
      Subject_error ||
      Start_Time_error ||
      End_time_error ||
      Course_error ||
      Faculty_Name_error
    ) {
      this.setState({
        Date_error,
        Subject_error,
        Course_error,
        Start_Time_error,
        End_time_error,
        Faculty_Name_error,
      });
      return false;
    }
    return true;
  };

  submitHandler = (e) => {
    e.preventDefault();

    const isValide = this.validation();
    if (!isValide) {
      this.setState(initialState);
      if (
        !this.state.Date ||
        !this.state.Subject ||
        !this.state.Faculty_Name ||
        !this.state.Start_Time ||
        !this.state.End_time ||
        !this.state.Course
      ) {
        toast("Please Enter Valid Details");
      }
    } else {
      var TimeTableData = {
        org:org,
        course: this.state.Course,
        createdDate: date,
        day: days[new Date(this.state.Date).getDay()],
        facultyname: this.state.Faculty_Name,
        subject: this.state.Subject,
        time:
          String(this.state.Date) +
          "T" +
          String(this.state.Start_Time) +
          "," +
          String(this.state.Date) +
          "T" +
          String(this.state.End_time),
      };

      toast("Please Wait!!");
      this.responseloading();
      axios
        .post(APIData.api + "timetable/", TimeTableData, {
          headers: APIData.headers,
        })
        .then((response) => {
          var url;
          if (response.data.status.toLowerCase() === "success") {
            toast(response.data.description);
            if (sessiondetails.userType == "superadmin")
              url = new URL(APIData.url + "superAdminTimeTable");
            else if (sessiondetails.userType == "admin")
              url = new URL(APIData.url + "timetable");
            window.location.assign(url);
          } else if (response.data.status.toLowerCase() == "failure") {
            toast(response.data.errorDesc);
            //window.location.reload();
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
  responseloading() {
    this.setState({ loading: !this.state.loading });
  }
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  async componentDidMount() {
    const courseUrl = APIData.api + `courses/course?org=${org}`;
    const courseReply = await fetch(courseUrl, { headers: APIData.headers });
    const courseData = await courseReply.json();
    const Url = APIData.api + `employee/details?org=${org}`;
    const Reply = await fetch(Url, { headers: APIData.headers });
    const Data = await Reply.json();
    this.setState({
      coursesData: courseData,
      employeeData: Data,
      loading: false,
    });
  }

  render() {
    return (
      <div>
        {this.state.loading ? (
          <Loading />
        ) : (
          <form className="createTimeTable" onSubmit={this.submitHandler}>
            <div className="carrybox">
              <Link
                to={
                  sessiondetails.userType === "superadmin"
                    ? "superAdminTimeTable"
                    : "timetable"
                }
              >
                <AiIcons.AiOutlineCloseCircle />
              </Link>
              <div>
                <h2 className="mainheading01">ADD Time Table</h2>
              </div>
              <div className="floatleft">
                <label className="heading02" htmlFor="Date">
                  Date:{" "}
                  <FaIcons.FaAsterisk
                    color="red"
                    fontSize=".4em"
                    style={{ marginBottom: "10px" }}
                  />
                </label>
                <br />
                <input
                  placeholder="Date"
                  className="inputfield"
                  type="date"
                  name="Date"
                  value={this.state.Date}
                  onChange={this.changeHandler}
                />
                {this.state.Date_error ? (
                  <div style={{ color: "red" }}>{this.state.Date_error}</div>
                ) : null}

                <div>
                  <label className="heading02" htmlFor="Subject">
                    Subject:{" "}
                    <FaIcons.FaAsterisk
                      color="red"
                      fontSize=".4em"
                      style={{ marginBottom: "10px" }}
                    />
                  </label>
                  <br />
                  <input
                    list="subject"
                    placeholder="Subject"
                    className="inputfield"
                    type="text"
                    name="Subject"
                    value={this.state.Subject}
                    onChange={this.changeHandler}
                  />
                  <datalist id="subject">
                    <option value="Mathematics">Mathematics</option>
                    <option value="Social Science">Social Science</option>
                    <option value="Science">Science</option>
                  </datalist>
                  {this.state.Subject_error ? (
                    <div style={{ color: "red" }}>
                      {this.state.Subject_error}
                    </div>
                  ) : null}
                </div>
                <label className="heading02" htmlFor="Faculty_Name">
                  Faculty_Name:{" "}
                  <FaIcons.FaAsterisk
                    color="red"
                    fontSize=".4em"
                    style={{ marginBottom: "10px" }}
                  />
                </label>
                <br />
                <input
                  list="employee"
                  placeholder="Faculty Name"
                  className="inputfield"
                  type="text"
                  name="Faculty_Name"
                  value={this.state.Faculty_Name}
                  onChange={this.changeHandler}
                />
              </div>

              <div className="floatright">
                <div>
                  <pre>
                    <label className="heading02" htmlFor="Start_Time">
                      Start Time:{" "}
                      <FaIcons.FaAsterisk
                        color="red"
                        fontSize=".4em"
                        style={{ marginBottom: "10px" }}
                      />
                    </label>
                    <span
                      class="tooltip"
                      data-tooltip="Please enter the time in 24 hour clock format."
                    >
                      ?
                    </span>
                  </pre>
                  <input
                    placeholder="Start_Time"
                    className="inputfield"
                    type="time"
                    name="Start_Time"
                    value={this.state.Start_Time}
                    onChange={this.changeHandler}
                  />

                  {this.state.Start_Time_error ? (
                    <div style={{ color: "red" }}>
                      {this.state.Start_Time_error}
                    </div>
                  ) : null}
                </div>

                <div>
                  <pre>
                    <label className="heading02" htmlFor="End_time">
                      End Time:{" "}
                      <FaIcons.FaAsterisk
                        color="red"
                        fontSize=".4em"
                        style={{ marginBottom: "10px" }}
                      />
                    </label>
                    <span
                      class="tooltip"
                      data-tooltip="Please enter the time in 24 hour clock format."
                    >
                      ?
                    </span>
                  </pre>
                  <input
                    placeholder="End_time"
                    className="inputfield"
                    type="time"
                    name="End_time"
                    value={this.state.End_time}
                    onChange={this.changeHandler}
                  />
                  {this.state.End_time_error ? (
                    <div style={{ color: "red" }}>
                      {this.state.End_time_error}
                    </div>
                  ) : null}
                </div>

                <div>
                  <label className="heading02" htmlFor="Course">
                    Course:{" "}
                    <FaIcons.FaAsterisk
                      color="red"
                      fontSize=".4em"
                      style={{ marginBottom: "10px" }}
                    />
                  </label>
                  <br />
                  <select
                    className="inputfield"
                    placeholder="Course"
                    onChange={this.changeHandler}
                    type="text"
                    name="Course"
                  >
                    <option value="" selected disabled hidden>
                      Select An Option
                    </option>
                    {this.state.coursesData.map((item, index) => {
                      return (
                        <option key={index} value={item.course_id}>
                          {item.course_id}
                        </option>
                      );
                    })}
                  </select>
                  {this.state.Course_error ? (
                    <div style={{ color: "red" }}>
                      {this.state.Course_error}
                    </div>
                  ) : null}
                </div>
              </div>
              <div>
                <datalist id="employee">
                  {this.state.employeeData.map((item, index) => {
                    return (
                      <option key={index} value={item.faculty_id}>
                        {item.faculty_Name}
                      </option>
                    );
                  })}
                </datalist>
                {this.state.Faculty_Name_error ? (
                  <div style={{ color: "red" }}>
                    {this.state.Faculty_Name_error}
                  </div>
                ) : null}
              </div>
              <div className="submitcarry">
                <button className="Submitbutton" type="submit">
                  Create
                </button>
              </div>
            </div>
            <pre style={{ paddingLeft: "20px", color: "red" }}>
              <FaIcons.FaAsterisk
                color="red"
                fontSize=".4em"
                style={{ marginBottom: "10px" }}
              />{" "}
              Mandatory fields
            </pre>
          </form>
        )}
      </div>
    );
  }
}

export default CreateTimeTable;
