import React, { Component } from "react";
import { APIData, org } from "../../Authentication/APIData";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import Loading from "../../Loading";

var monthData = [ { month: "January", value: "JAN" }, { month: "February", value: "FEB" }, { month: "March", value: "MAR" }, { month: "April", value: "APR" }, { month: "May", value: "MAY" }, { month: "June", value: "JUN" }, { month: "July", value: "JUL" }, { month: "August", value: "AUG" }, { month: "September", value: "SEP" }, { month: "October", value: "OCT" }, { month: "November", value: "NOV" }, { month: "December", value: "DEC" }]

toast.configure();
const initialState = {};

const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));

class CreateMarks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      
      coursesData: "",
      studentData: "",

      Student_ID: "",
      Student_ID_error: "",

      Grade: "",
      Grade_error: "",

      Name: "",
      Name_error: "",

      Test_Type: "",
      Test_Type_error: "",

      Science: "",
      Science_error: "",

      Social: "",
      Social_error: "",

      Maths: "",
      Maths_error: "",

      First_Language: "",
      First_Language_error: "",

      Second_Language: "",
      Second_Language_error: "",

      Third_Language: "",
      Third_Language_error: "",

      Max_Score: 1,
      Max_Score_error: "",

      Total: "",
      Total_error: "",

      Date: "",
      Date_error: "",

      Percentage: "",
      Percentage_error: "",

      Email: "",
      Email_error: "",

      Months: "",
      Months_error: "",

    };
  }
  async componentDidMount() {
    const courseUrl = APIData.api + `courses/course?org=${org}`;
    const courseReply = await fetch(courseUrl, { headers: APIData.headers });
    const courseData = await courseReply.json();
    const Url = APIData.api + `students?org=${org}`;
    const Reply = await fetch(Url, { headers: APIData.headers });
    const Data = await Reply.json();
    this.setState({
      studentData: Data,
      coursesData: courseData,
      loading: false,
    });
  }
  validation = () => {
    let Student_ID_error = "";
    let Grade_error = "";
    let Name_error = "";
    let Test_Type_error = "";
    let Science_error = "";
    let Social_error = "";
    let Maths_error = "";
    let First_Language_error = "";
    let Second_Language_error = "";
    let Third_Language_error = "";
    let Max_Score_error = "";
    let Date_error = "";
    let Email_error = "";
    let Months_error = "";

    if (!this.state.Student_ID) {
      Student_ID_error = "Invalid Student ID";
      toast("Please, Enter Valid Student ID");
    }
    if (!this.state.Name) {
      Name_error = "Invalid Name";
      toast("Please, Enter Valid Name");
    }
    if (!this.state.Test_Type) {
      Test_Type_error = "Invalid Test Type";
      toast("Please, Enter Valid Test Type");
    }
    if (!this.state.Grade) {
      Grade_error = "Invalid Grade";
      toast("Please, Enter Valid Grade");
    }
    if (!this.state.Science) {
      Science_error = "Invalid Science Marks";
      toast("Please, Enter Valid Science Marks");
    }
    if (!this.state.Social) {
      Social_error = "Invalid Social Marks";
      toast("Please, Enter Valid Social Marks");
    }
    if (!this.state.Maths) {
      Maths_error = "Invalid Maths Marks";
      toast("Please, Enter Valid Maths Marks");
    }
    if (!this.state.First_Language) {
      First_Language_error = "Invalid First Language Marks";
      toast("Please, Enter Valid First Language Marks");
    }
    if (!this.state.Second_Language) {
      Second_Language_error = "Invalid Second Language Marks";
      toast("Please, Enter Valid Second Language Marks");
    }
    if (!this.state.Third_Language) {
      Third_Language_error = "Invalid Third Language Marks";
      toast("Please, Enter Valid Third Language Marks");
    }
    if (!this.state.Max_Score) {
      Max_Score_error = "Invalid Max Score";
      toast("Please, Enter Max Score Greater Than 0");
    }
    if (!this.state.Date) {
      Date_error = "Invalid Date";
      toast("Please, Enter Valid Date");
    }
    if (!this.state.Email) {
      Email_error = "Invalid Email";
      toast("Please, Enter Valid Email");
    }
    if (!this.state.Months) {
      Months_error = "Invalid Month";
      toast("Please, Enter Valid Month");
    }

    if (
      Student_ID_error ||
      Grade_error ||
      Name_error ||
      Science_error ||
      Social_error ||
      Test_Type_error ||
      Maths_error ||
      First_Language_error ||
      Second_Language_error ||
      Third_Language_error ||
      Max_Score_error ||
      Date_error ||
      Email_error ||
      Months_error
    ) {
      this.setState({
        Student_ID_error,
        Grade_error,
        Name_error,
        Science_error,
        Social_error,
        Test_Type_error,
        Maths_error,
        First_Language_error,
        Second_Language_error,
        Third_Language_error,
        Max_Score_error,
        Date_error,
        Email_error,
        Months_error
      });
      return false;
    }
    return true;
  };
  responseloading() {
    this.setState({ loading: !this.state.loading });
  }
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submitHandler = (e) => {
    e.preventDefault();
    const isValid = this.validation();
    if (!isValid) {
      this.setState(initialState);
      if (
        !this.state.student_id ||
        !this.state.course_type ||
        !this.state.course_fees ||
        !this.state.course_duration ||
        !this.state.course_description ||
        !this.state.course_sub_type
      ) {
        toast("Please Enter Valid Details");
      }
    } else {
      if (
        isNaN(
          parseFloat(
            ((parseFloat(this.state.Science) +
              parseFloat(this.state.Social) +
              parseFloat(this.state.Maths) +
              parseFloat(this.state.First_Language) +
              parseFloat(this.state.Second_Language) +
              parseFloat(this.state.Third_Language)) /
              parseFloat(this.state.Max_Score)) *
              100
          ).toFixed(2)
        ) ||
        this.state.Max_Score <= 0
      ) {
        toast("Please, Enter Max Score Greater Than 0");
      } else {
        var marksData = {
          org:org,
          student_id: this.state.Student_ID,
          name: this.state.Name,
          grade: this.state.Grade,
          months: this.state.Months,
          test_type: this.state.Test_Type,
          science: parseFloat(this.state.Science)
            ? parseFloat(this.state.Science)
            : 0,
          social: parseFloat(this.state.Social)
            ? parseFloat(this.state.Social)
            : 0,
          mathematics: parseFloat(this.state.Maths)
            ? parseFloat(this.state.Maths)
            : 0,
          first_language: parseFloat(this.state.First_Language)
            ? parseFloat(this.state.First_Language)
            : 0,
          second_language: parseFloat(this.state.Second_Language)
            ? parseFloat(this.state.Second_Language)
            : 0,
          third_language: parseFloat(this.state.Third_Language)
            ? parseFloat(this.state.Third_Language)
            : 0,
          max_score: parseFloat(this.state.Max_Score)
            ? parseFloat(this.state.Max_Score)
            : 1,
          total:
            parseFloat(this.state.Science) +
            parseFloat(this.state.Social) +
            parseFloat(this.state.Maths) +
            parseFloat(this.state.First_Language) +
            parseFloat(this.state.Second_Language) +
            parseFloat(this.state.Third_Language),
          email_id: this.state.Email,
          test_date: this.state.Date,
          percentage: parseFloat(
            ((parseFloat(this.state.Science) +
            parseFloat(this.state.Social) +
            parseFloat(this.state.Maths) +
            parseFloat(this.state.First_Language) +
            parseFloat(this.state.Second_Language) +
            parseFloat(this.state.Third_Language)))/
              (parseFloat(this.state.Max_Score)) *
              100
          ).toFixed(2),
        };
        toast("Please Wait!!");
        this.responseloading();
        axios
          .post(APIData.api + "marks/", marksData, { headers: APIData.headers })
          .then((response) => {
            var url;
            if (response.data.status.toLowerCase() === "success") {
              toast(response.data.description);
              if (sessiondetails.userType == "superadmin")
                url = new URL(APIData.url + "superAdminMarks");
              else if (sessiondetails.userType == "admin")
                url = new URL(APIData.url + "marks");
              else if (sessiondetails.userType == "employee")
                url = new URL(APIData.url + "facultyMarks");
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
    }
  };

  render() {
    return (
      <div>
        {this.state.loading ? (
          <Loading />
        ) : (
          <form className="createMarks" onSubmit={this.submitHandler}>
            <div className="carrybox">
              <Link
                to={
                  sessiondetails.userType === "superadmin"
                    ? "superAdminMarks"
                    : sessiondetails.userType === "admin"
                    ? "marks"
                    : "facultyMarks"
                }
              >
                <AiIcons.AiOutlineCloseCircle />
              </Link>
              <div>
                <h2 className="mainheading01">ADD Marks</h2>
              </div>
              <div className="floatleft">
                <label className="heading02" htmlFor="Student ID">
                  Student ID:{" "}
                </label>
                <br />
                <select
                  className="inputfield"
                  placeholder="Student ID"
                  onChange={this.changeHandler}
                  type="text"
                  name="Student_ID"
                >
                  <option value="" selected disabled hidden>
                    Select An Option
                  </option>
                  {this.state.studentData.map((item, index) => {
                    return (
                      <option key={index} value={item.student_id}>
                        {item.student_id}
                      </option>
                    );
                  })}
                 
                </select>

                {this.state.Student_ID_error ? (
                  <div style={{ color: "red" }}>
                    {this.state.Student_ID_error}
                  </div>
                ) : null}

                <label className="heading02" htmlFor="GRADE">
                  Grade:{" "}
                </label>
                <select
                  className="inputfield"
                  placeholder="GRADE"
                  onChange={this.changeHandler}
                  type="text"
                  name="Grade"
                >
                  <option value="" selected disabled hidden>
                    Select An Option
                  </option>
                  {this.state.coursesData.map((item, index) => {
                    if (item.course_type == "course-academics") {
                      return (
                        <option key={index} value={item.course_id}>
                          {item.course_id}
                        </option>
                      );
                    }
                  })}
                  <option value="others">Others</option>
                </select>

                {this.state.Grade_error ? (
                  <div style={{ color: "red" }}>{this.state.Grade_error}</div>
                ) : null}

                <div>
                  <label className="heading02" htmlFor="Name">
                    Test Name:
                  </label>
                  <br />
                  <input
                    placeholder="Test Name"
                    className="inputfield"
                    type="text"
                    name="Name"
                    value={this.state.Name}
                    onChange={this.changeHandler}
                  />
                  {this.state.Name_error ? (
                    <div style={{ color: "red" }}>{this.state.Name_error}</div>
                  ) : null}
                </div>

                <div>
                  <label className="heading02" htmlFor="Test Type">
                    Test Type:
                  </label>
                  <br />
                  <input
                    placeholder="Test Type"
                    className="inputfield"
                    type="text"
                    name="Test_Type"
                    value={this.state.Test_Type}
                    onChange={this.changeHandler}
                  />
                  {this.state.Test_Type_error ? (
                    <div style={{ color: "red" }}>
                      {this.state.Test_Type_error}
                    </div>
                  ) : null}
                </div>

                <div>
                  <label className="heading02" htmlFor="Science">
                    Science:
                  </label>
                  <br />
                  <input
                    placeholder="Science"
                    className="inputfield"
                    type="number"
                    name="Science"
                    value={this.state.Science}
                    onChange={this.changeHandler}
                  />
                  {this.state.Science_error ? (
                    <div style={{ color: "red" }}>
                      {this.state.Science_error}
                    </div>
                  ) : null}
                </div>

                <div>
                  <label className="heading02" htmlFor="Social">
                    Social:
                  </label>
                  <br />
                  <input
                    placeholder="Social"
                    className="inputfield"
                    type="number"
                    name="Social"
                    value={this.state.Social}
                    onChange={this.changeHandler}
                  />
                  {this.state.Social_error ? (
                    <div style={{ color: "red" }}>
                      {this.state.Social_error}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="floatright">
                <div>
                  <label className="heading02" htmlFor="Maths">
                    Maths:
                  </label>
                  <br />
                  <input
                    placeholder="Maths"
                    className="inputfield"
                    type="number"
                    name="Maths"
                    value={this.state.Maths}
                    onChange={this.changeHandler}
                  />
                  {this.state.Maths_error ? (
                    <div style={{ color: "red" }}>{this.state.Maths_error}</div>
                  ) : null}
                </div>
                <div>
                  <label className="heading02" htmlFor="First_Language">
                    First Language:
                  </label>
                  <br />
                  <input
                    placeholder="First Language"
                    className="inputfield"
                    type="number"
                    name="First_Language"
                    value={this.state.First_Language}
                    onChange={this.changeHandler}
                  />
                  {this.state.First_Language_error ? (
                    <div style={{ color: "red" }}>
                      {this.state.First_Language_error}
                    </div>
                  ) : null}
                </div>

                <div>
                  <label className="heading02" htmlFor="Second_Language">
                    Second Language:
                  </label>
                  <br />
                  <input
                    placeholder="Second Language"
                    className="inputfield"
                    type="number"
                    name="Second_Language"
                    value={this.state.Second_Language}
                    onChange={this.changeHandler}
                  />
                  {this.state.Second_Language_error ? (
                    <div style={{ color: "red" }}>
                      {this.state.Second_Language_error}
                    </div>
                  ) : null}
                </div>

                <div>
                  <label className="heading02" htmlFor="Third_Language">
                    Third Language:
                  </label>
                  <br />
                  <input
                    placeholder="Third Language"
                    className="inputfield"
                    type="number"
                    name="Third_Language"
                    value={this.state.Third_Language}
                    onChange={this.changeHandler}
                  />
                  {this.state.Third_Language_error ? (
                    <div style={{ color: "red" }}>
                      {this.state.Third_Language_error}
                    </div>
                  ) : null}
                </div>

                <div>
                  <label className="heading02" htmlFor="Max_Score">
                    Max Score
                  </label>
                  <br />
                  <input
                    placeholder="Max Score"
                    className="inputfield"
                    type="number"
                    name="Max_Score"
                    value={this.state.Max_Score}
                    onChange={this.changeHandler}
                  />
                  {this.state.Max_Score_error ? (
                    <div style={{ color: "red" }}>
                      {this.state.Max_Score_error}
                    </div>
                  ) : null}
                </div>

                {/* <div>
                  <label className="heading02" htmlFor="Total">
                    Total
                  </label>
                  <br />
                  <input
                    placeholder="Total"
                    className="inputfield"
                    type="number"
                    name="Total"
                    value={this.state.Total}
                    onChange={this.changeHandler}
                  />
                  {this.state.Total_error ? (
                    <div style={{ color: "red" }}>{this.state.Total_error}</div>
                  ) : null}
                </div> */}

                <div>
                  <label className="heading02" htmlFor="Date">
                    Date
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
                </div>

                {/* <div>
                  <label className="heading02" htmlFor="Percentage">
                    Percentage
                  </label>
                  <br />
                  <input
                    placeholder="Percentage"
                    className="inputfield"
                    type="number"
                    name="Percentage"
                    value={this.state.Percentage}
                    onChange={this.changeHandler}
                  />
                  {this.state.Percentage_error ? (
                    <div style={{ color: "red" }}>
                      {this.state.Percentage_error}
                    </div>
                  ) : null}
                </div> */}
              </div>


              <div className="floatleft">
              <label className="heading02" htmlFor="Month">
              Months:{" "}
                </label>
                <select
                  className="inputfield"
                  placeholder="Months"
                  onChange={this.changeHandler}
                  type="text"
                  name="Months"
                >
                  <option value="" selected disabled hidden>
                    Select An Option
                  </option>
                  {monthData.map((item, index) => {
                      return (
                        <option key={item.value} value={item.value}>
                          {item.month}
                        </option>
                      );               
                  })}
                </select>

                {this.state.Months_error ? (
                  <div style={{ color: "red" }}>{this.state.Months_error}</div>
                ) : null}

              </div>


              <div className="floatright">
                <label className="heading02" htmlFor="Email">
                  Email
                </label>
                <br />
                <input
                  placeholder="Email"
                  list="email"
                  className="inputfield"
                  type="Email"
                  name="Email"
                  value={this.state.Email}
                  onChange={this.changeHandler}
                />
                <datalist id="email">
                {this.state.studentData.map((item, index) => {
                    return (
                      <option key={index} value={item.email}>
                        {item.student_id}
                      </option>
                    );
                  })}
                  </datalist>
                {this.state.Email_error ? (
                  <div style={{ color: "red" }}>{this.state.Email_error}</div>
                ) : null}
              </div>

              <div className="submitcarry">
                <button className="Submitbutton" type="submit">
                  Create
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    );
  }
}
export default CreateMarks;
