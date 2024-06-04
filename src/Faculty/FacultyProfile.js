import "../Student/Student.css";
import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { APIData, org } from "../Authentication/APIData";
import * as MdIcons from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";


const redirect = () => (window.location.href = "/camera");

const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
toast.configure();
const initialState = {};
class FacultyProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      faculty_id: "",
      faculty_id_error: "",

      name: "",
      name_error: "",

      email: "",
      email_error: "",

      phone_number: "",
      phone_number_error: "",

      dob: "",
      dob_error: "",

      address: "",
      address_error: "",

      gender: "",
      gender_error: "",

      year_of_appointment: "",
      year_of_appointment_error: "",

      salary: "",
      salary_error: "",

      exp: "",
      exp_error: "",

      qualification: "",
      qualification_error: "",

      emy_type: "",
      emy_type_error: "",
      photo: null,
      photo_error: "",
      image_default: "",
      details_read: true,
      branch: "",
      officeEmail: ""
    };
  }
  async componentDidMount() {
    const email = sessiondetails.email;
    const url = APIData.api + "employee/detail?emailId=" + email;
    axios
      .get(url, { headers: APIData.headers })
      .then((response) => {
        if (response.status == 200) {
          this.setState({
            dob: response.data.dob,
            address: response.data.address,
            created_by: APIData.admin,
            created_date_time: response.data.created_date_time,
            email: response.data.email,
            emy_type: response.data.emy_type,
            exp: response.data.exp,
            faculty_id: sessiondetails.user,
            gender: response.data.gender,
            name: response.data.name,
            phone_number: response.data.phone_number,
            photo: response.data.photo,
            qualification: response.data.qualification,
            salary: response.data.salary,
            updated_by: sessiondetails.user,
            updated_date_time: response.data.address.updated_date_time,
            year_of_appointment: response.data.year_of_appointment,
            photoUrl: response.data.photoUrl,
            branch: response.data.branch,
            officeEmail: response.data.officeEmail,
            photo_error: "",
            org: org,
          });
        }
      })
      .catch((error) => {
        toast("Its Time to grab a coffee");
      });
  }
  validation = () => {
    let email_error = "";
    let name_error = "";
    let phone_number_error = "";
    let dob_error = "";
    let address_error = "";
    let gender_error = "";
    let year_of_appointment_error = "";
    let salary_error = "";
    let exp_error = "";
    let qualification_error = "";
    let emy_type_error = "";

    if (!this.state.name) {
      name_error = "Invalid Name";
    }

    if (!this.state.email.includes("@")) {
      email_error = "Invalid Email!";
    }
    if (!this.state.phone_number) {
      phone_number_error = "Invalid Phone Number";
    }
    if (!this.state.dob) {
      dob_error = "Invalid Date Of Birth";
    }
    if (!this.state.address) {
      address_error = "Invalid Address";
    }
    if (!this.state.gender) {
      gender_error = "Please, Select Gender";
    }
    if (!this.state.year_of_appointment) {
      year_of_appointment_error = "Invalid Year";
    }
    if (!this.state.salary) {
      salary_error = "Invalid Salary";
    }
    if (!this.state.exp) {
      exp_error = "Invalid Experience";
    }
    if (!this.state.qualification) {
      qualification_error = "Invalid Qualification";
    }
    if (!this.state.emy_type) {
      emy_type_error = "Invalid Employee Type";
    }

    if (
      name_error ||
      phone_number_error ||
      dob_error ||
      email_error ||
      address_error ||
      gender_error ||
      year_of_appointment_error ||
      salary_error ||
      exp_error ||
      qualification_error ||
      emy_type_error
    ) {
      this.setState({
        name_error,
        phone_number_error,
        email_error,
        dob_error,
        address_error,
        gender_error,
        year_of_appointment_error,
        salary_error,
        exp_error,
        qualification_error,
        emy_type_error,
      });
      return false;
    }
    return true;
  };

  handleChange = (event) => {
    const isCheckbox = event.target.type === "checkbox";
    this.setState({
      [event.target.userEmailError]: isCheckbox
        ? event.target.checked
        : event.target.value,
    });
  };

  EditDetails = (e) => {
    if (this.state.details_read === true)
      this.setState({ details_read: false });
  };

  onFileChange = (event) => {
    // Update the state
    this.setState({ photo: event.target.files[0] });
  };
  onfileuplodeing = (e) => {

    const formData = new FormData();

    formData.append(
      "file",
      this.state.photo
    );
    formData.append(
      "id", this.state.email
    );
    console.log(this.state.email);
    console.log(this.state.photo);
    axios
      .post(APIData.api + `employee/${this.state.email}/image`, formData, { headers: APIData.headers })

      .then((response) => {
        toast("image success")
      })
      .catch((error) => {
        toast("error image")
        console.log(error);
      })
  }


  RemoveImage = (e) => {
    this.setState({ photo: this.state.image_default });
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    var sendstate = {
      dob: this.state.dob,
      address: this.state.address,
      created_by: APIData.admin,
      created_date_time: this.state.created_date_time,
      email: this.state.email,
      emy_type: "Employee",
      exp: this.state.exp,
      faculty_id: sessiondetails.user,
      gender: this.state.gender,
      name: this.state.name,
      phone_number: this.state.phone_number,
      qualification: this.state.qualification,
      salary: this.state.salary,
      updated_by: sessiondetails.user,
      updated_date_time: APIData.date,
      year_of_appointment: this.state.year_of_appointment,
      photoUrl: this.state.photoUrl,
      branch: this.state.branch,
      officeEmail: this.state.officeEmail,
      org: org
    };
    axios
      .post(APIData.api + "employee/", sendstate, { headers: APIData.headers })
      .then((response) => {
        if (response.data.status.toString().toLowerCase() == "success") {
          toast("Successfully Updated");
          this.onfileuplodeing()

          // setTimeout(() => {
          //   window.location.reload();
          // }, 2000);
        }
      })
      .catch((error) => {
        toast("Update failed");
        console.log(error);
      });

    const isValide = this.validation();

    if (isValide) {
      this.setState(initialState);
    }
    // if(this.state.phone_number_error.length != 10 || this.state.phone_number_error.length != 12){

    // toast('Please enter a valid phone number',{position: toast.POSITION.TOP_RIGHT});
    // }
  };
  render() {
    return (
      <div className="facultyProfile">
        <form className="signup" onSubmit={this.submitHandler}>
          <div className="carrybox">
            <div className="student-part2">
              <div className="card-header">
                <h3 className="heading01">Faculty Profile</h3>
                <div className="bringitcenter">
                  {this.state.admin_photo == "null" ? (
                    <img
                      className="profile_img"
                      src={this.state.photoUrl}
                      alt="Profile"
                    />
                  ) : (
                    <img
                      className="profile_img"
                      src={this.state.photoUrl}
                      alt="Profile"
                    />
                  )}
                </div>
                {/* {console.log(this.state.photo)}
                <input type="file" onChange={this.onChange} />
                <button onClick={this.RemoveImage}>Remove</button> */}
                {this.state.details_read ? (
                  <div onClick={this.EditDetails} className="bringitcenter">
                    <br></br>
                    <MdIcons.MdEdit
                      color="white"
                      size={28}
                      className="DashboardButton"
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                ) : (
                  <div onClick={this.EditDetails}>
                    <br></br>

                    <div className="bringitcenter">
                      <pre>
                        Take a photo : <AiIcons.AiFillCamera
                          color="white"
                          size={28}
                          className="DashboardButton"
                          style={{ cursor: "pointer" }}
                          onClick={redirect}
                        />
                      </pre>
                    </div>


                    <input
                      type="file"
                      onChange={this.onFileChange}
                      className="Upload"
                    />
                    <button
                      onClick={this.RemoveImage}
                      className="DashboardButton"
                      style={{
                        padding: "1%",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                )}
                <div className="bringitcenter">
                  <p className="ptag">
                    FACULTY ID :
                    <strong className="ptag">
                      {APIData.sessiondetails.user}
                    </strong>
                  </p>
                </div>
              </div>
            </div>
            <div className="student-carrybox">
              <form>
                <div className="floatleft">
                  <div className="row">
                    <div className="col-25">
                      <label className="heading02" htmlFor="Name">
                        Name :
                      </label>
                    </div>
                    <div className="col-25">
                      <input
                        className="inputfield"
                        type="text"
                        id="Name"
                        name="name"
                        placeholder="Name"
                        value={this.state.name}
                        onChange={this.changeHandler}
                      />
                      {this.state.name_error ? (
                        <div style={{ color: "red" }}>
                          {this.state.name_error}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-25">
                      <label className="heading02" htmlFor="dob">
                        Date Of Birth :
                      </label>
                    </div>
                    <div className="col-25">
                      <input
                        className="inputfield"
                        type="date"
                        id="dob"
                        name="dob"
                        value={this.state.dob}
                        onChange={this.changeHandler}
                      />
                      {this.state.dob_error ? (
                        <div style={{ color: "red" }}>
                          {this.state.dob_error}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-25">
                      <label className="heading02" htmlFor="gender">
                        Gender :
                      </label>
                    </div>
                    <div className="col-25">
                      <select
                        className="inputfield"
                        id="gender"
                        name="gender"
                        value={this.state.gender}
                        onChange={this.changeHandler}
                      >
                        <option value="" selected disabled hidden>
                          Select An Option
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                      {this.state.gender_error ? (
                        <div style={{ color: "red" }}>
                          {this.state.gender_error}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-25">
                      <label className="heading02" htmlFor="Email">
                        Email :
                      </label>
                    </div>
                    <div className="col-25">
                      <input
                        className="inputfield"
                        type="email"
                        id="Email"
                        name="email"
                        placeholder="Enter Email"
                        value={this.state.email}
                      />
                      {this.state.email_error ? (
                        <div style={{ color: "red" }}>
                          {this.state.email_error}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-25">
                      <label className="heading02" htmlFor="phno">
                        Phone Number :
                      </label>
                    </div>
                    <div className="col-25">
                      <input
                        className="inputfield"
                        type="number"
                        id="phno"
                        name="phone_number"
                        placeholder="Enter Phone Number"
                        value={this.state.phone_number}
                        onChange={this.changeHandler}
                      />
                      {this.state.phone_number_error ? (
                        <div style={{ color: "red" }}>
                          {this.state.phone_number_error}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-25">
                      <label className="heading02" htmlFor="phno">
                        Branch :
                      </label>
                    </div>
                    <div className="col-25">
                      <input
                        className="inputfield"
                        type="text"
                        id="branch"
                        name="branch"
                        value={this.state.branch}
                        onChange={this.changeHandler}
                        readOnly
                      />
                      {this.state.phone_number_error ? (
                        <div style={{ color: "red" }}>
                          {this.state.phone_number_error}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-25">
                      <label className="heading02" htmlFor="phno">
                        Official Email :
                      </label>
                    </div>
                    <div className="col-25">
                      <input
                        className="inputfield"
                        type="email"
                        id="officeEmail"
                        name="officeEmail"
                        value={this.state.officeEmail}
                        onChange={this.changeHandler}
                        readOnly
                      />
                      {this.state.phone_number_error ? (
                        <div style={{ color: "red" }}>
                          {this.state.phone_number_error}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* ============================================== */}
                <div className="floatright">
                  <div className="row">
                    <div className="col-25">
                      <label className="heading02" htmlFor="address">
                        Address :
                      </label>
                    </div>
                    <div className="col-25">
                      <textarea
                        className="inputtestarea"
                        type="text"
                        id="address"
                        name="address"
                        placeholder="#Door Number"
                        value={this.state.address}
                        onChange={this.changeHandler}
                      />
                      {this.state.address_error ? (
                        <div style={{ color: "red" }}>
                          {this.state.address_error}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-25">
                      <label
                        className="heading02"
                        htmlFor="year_of_appointment"
                      >
                        Year Of Appointment:
                      </label>
                    </div>
                    <div className="col-25">
                      <input
                        className="inputfield"
                        type="date"
                        id="year_of_appointment"
                        name="year_of_appointment"
                        placeholder="Year Of Appointment"
                        value={this.state.year_of_appointment}
                        onChange={this.changeHandler}
                        readOnly
                      />
                      {this.state.year_of_appointment_error ? (
                        <div style={{ color: "red" }}>
                          {this.state.year_of_appointment_error}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-25">
                      <label className="heading02" htmlFor="exp">
                        Experience:
                      </label>
                    </div>
                    <div className="col-25">
                      <input
                        className="inputfield"
                        type="text"
                        id="exp"
                        name="exp"
                        placeholder="Year Of Appointment"
                        value={this.state.exp}
                        onChange={this.changeHandler}
                      />
                      {this.state.exp_error ? (
                        <div style={{ color: "red" }}>
                          {this.state.exp_error}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-25">
                      <label className="heading02" htmlFor="qualification">
                        Qualification:
                      </label>
                    </div>
                    <div className="col-25">
                      <input
                        className="inputfield"
                        type="text"
                        name="qualification"
                        placeholder="Qualification"
                        value={this.state.qualification}
                        onChange={this.changeHandler}
                      />
                      {this.state.qualification_error ? (
                        <div style={{ color: "red" }}>
                          {this.state.qualification_error}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="row">
              <button
                className="Submitbutton"
                type="submit"
                defaultValue="Submit"
              >
                Update
              </button>

            </div>
            <div className="row">
              <Link to='/changePassword'>
                <h4 style={{backgroundColor:"blue", color:"whitesmoke"}}><RiLockPasswordFill />
                  Change Password</h4>
              </Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default FacultyProfile;
