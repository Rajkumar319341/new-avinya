import React from "react";
import "../../CRUDTable.css";
import { Component } from "react";
import Loading from "../../Loading";
import { APIData, org } from "../../Authentication/APIData";
import TimeTable from "react-timetable-events";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";




const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
var today = new Date(),
  date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
class ViewTimeTable extends Component {
  state = {
    loading: true,
    events: null,
    timeTableData: null,
    courses: null,
    filterEvents: null,
  };
  downloadTimeTable() {
    var printContents = document.getElementById("timetablePrint").innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  }
  filterTimeTable = (e) => {
    if (e.target.value != "all") {
      var timetable = {
        Mon: [],
        Tue: [],
        Wed: [],
        Thu: [],
        Fri: [],
        Sat: [],
        Sun: [],
      };
      for (var key in this.state.timeTableData) {
        if (e.target.value == this.state.timeTableData[key].course) {
          var timetableinstance = {
            id: this.state.timeTableData[key].id,
            name: String(this.state.timeTableData[key].subject),
            type: "default",
            course: this.state.timeTableData[key].course,
            startTime: new Date(
              this.state.timeTableData[key].time.split(",")[0]
            ),
            endTime: new Date(this.state.timeTableData[key].time.split(",")[1]),
          };
          timetable[this.state.timeTableData[key].day].push(timetableinstance);
        }
      }
      this.setState({
        events: timetable,
        loading: false,
      });
    } else {
      this.setState({ events: this.state.filterEvents });
    }
  };
  async componentDidMount() {
    const courseUrl = APIData.api +`courses/course?org=${org}`;
    const courseReply = await fetch(courseUrl, { headers: APIData.headers });
    const courseData = await courseReply.json();
    var url = APIData.api + "timetable";
    if (sessiondetails.userType == "student") {
       const email = (sessiondetails.email);
      url = APIData.api + "timetable/student/course-details?emailId="+email;
    }
    // if (sessiondetails.userType == "employee") {
    //   const email = btoa(sessiondetails.email);
    //   url = APIData.api + "timetable/emp/" + email;
    // }
    const response = await fetch(url, { headers: APIData.headers });
    const timeTableData = await response.json();
    var timetable = {
      Mon: [],
      Tue: [],
      Wed: [],
      Thu: [],
      Fri: [],
      Sat: [],
      Sun: [],
    };
    for (var key in timeTableData) {
      // console.log(timeTableData[key].time.split(",")[1]);
      var timetableinstance = {
        id: timeTableData[key].id,
        name: String(timeTableData[key].course),
        type: "default",
        course: timeTableData[key].course,
        startTime: new Date(timeTableData[key].time.split(",")[0]),
        endTime: new Date(timeTableData[key].time.split(",")[1]),
      };
      timetable[timeTableData[key].day].push(timetableinstance);
    }
    this.setState({
      events: timetable,
      filterEvents: timetable,
      timeTableData: timeTableData,
      courses: courseData,
      loading: false,
    });
  }

  render() {
    return (
      <div className="viewTimeTable">
        <Link
          to={
            sessiondetails.userType === "superadmin"
              ? "superAdminTimeTable"
              : sessiondetails.userType === "admin"
              ? "TimeTable" 
              : sessiondetails.userType === "student"
              ? "studentTimetable"
              : "facultyTimeTable"
          }
        >
          {sessiondetails.userType == "admin" ||
          sessiondetails.userType == "superadmin" || sessiondetails.userType == "student" || sessiondetails.userType == "employee" ? (
            <AiIcons.AiFillCloseCircle />
          ) : (
            <div></div>
          )}
        </Link>
        {this.state.loading || !this.state.events ? (
          <Loading />
        ) : (
          <div>
            <div className="carrybox">
              <div className="FilterMenu">
                {sessiondetails.userType != "student" ? (
                  // sessiondetails.userType == "superadmin" ? (

                  <select
                    className="inputfieldfilter"
                    placeholder="Course"
                    onChange={this.filterTimeTable}
                  >
                    <option value="all" selected>
                      ALL
                    </option>
                    {this.state.courses.map((item, index) => {
                      return (
                        <option key={index} value={item.course_id}>
                          {item.course_id}
                        </option>
                      );
                    })}
                  </select>
                ) : (
                  <div></div>
                )}

                {/* <div className="Upload01">Today: {date}</div> */}
              </div>
             
              <div id="timetablePrint">
                <TimeTable events={this.state.events}
                />
          
              </div>
              <button
                className="Upload01"
                type="button"
                onClick={this.downloadTimeTable}
              >
                Download
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ViewTimeTable;
