import React, { Component } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { APIData } from "../Authentication/APIData";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";

const redirect = () => (window.location.href = "/camera");

toast.configure();
const initialState = {};
const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
class StudentProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student_id: "",
      student_id_error: "",
      name: "",
      name_error: "",
      email: "",
      email_error: "",
      phone_number: "",
      phone_number_error: "",
      fathers_name: "",
      fathers_name_error: "",
      mother_name: "",
      mother_name_error: "",
      address: "",
      address_error: "",
      gender: "",
      gender_error: "",
      alt_number: "",
      alt_number_error: "",
      institution: "",
      institution_error: "",
      educational_qualification: "",
      educational_qualification_error: "",
      professional_exp: "",
      professional_exp_error: "",
      dob: "",
      dob_error: "",
      photo: "",
      photo_error: "",
      image_default: "",
      details_read: true,
      branch:""
    };
  }

  async componentDidMount() {
    const email = (sessiondetails.email);
    const url = APIData.api + "students/data?emailId=" + email;
    axios
      .get(url, { headers: APIData.headers })
      .then((response) => {
        if (response.status == 200) {
          this.setState({
            student_id: response.data.student_id,
            name: response.data.name,
            email: response.data.email,
            phone_number: response.data.phone_number,
            mother_name: response.data.mother_name,
            address: response.data.address,
            gender: response.data.gender,
            alt_number: response.data.alt_number,
            institution: response.data.institution,
            educational_qualification: response.data.educational_qualification,
            professional_exp: response.data.professional_exp,
            fathers_name: response.data.fathers_name,
            dob: response.data.dob,
            photo: response.data.photo,
            photo_error: "",
            branch:response.data.branch,
            image_default:
              "data:image/png;base64,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",
          });
        }
      })
      .catch((error) => {
        toast("Its Time to grab a coffee");
      });

    const url1 =
      APIData.api + "courses-enrolled/" + APIData.sessiondetails.user;
    axios.get(url1, { headers: APIData.headers }).then((response) => {
      this.setState({ course_enrolled: response.data.course_id });
    });
  }

  validation = () => {
    let dob_error = "";
    let name_error = "";
    let email_error = "";
    let phone_number_error = "";
    let fathers_name_error = "";
    let mother_name_error = "";
    let address_error = "";
    let gender_error = "";
    let alt_number_error = "";
    let institution_error = "";
    let educational_qualification_error = "";
    let professional_exp_error = "";

    if (!this.state.name) {
      name_error = "Invalid Name";
    }

    if (!this.state.email.includes("@")) {
      email_error = "Invalid Email!";
    }
    if (!this.state.phone_number) {
      phone_number_error = "Invalid Phone Number";
    }
    if (!this.state.fathers_name) {
      fathers_name_error = "Invalid Phone Number";
    }
    if (!this.state.mother_name) {
      mother_name_error = "Invalid Phone Number";
    }
    if (!this.state.address) {
      address_error = "Invalid Phone Number";
    }
    if (!this.state.gender) {
      gender_error = "Invalid Phone Number";
    }
    if (!this.state.alt_number) {
      alt_number_error = "Invalid Phone Number";
    }
    if (!this.state.institution) {
      institution_error = "Invalid Phone Number";
    }
    if (!this.state.educational_qualification) {
      educational_qualification_error = "Invalid Phone Number";
    }
    if (!this.state.professional_exp) {
      professional_exp_error = "Invalid Phone Number";
    }
    if (!this.state.dob) {
      dob_error = "Invalid Phone Number";
    }
    if (
      name_error ||
      email_error ||
      phone_number_error ||
      fathers_name_error ||
      mother_name_error ||
      address_error ||
      gender_error ||
      alt_number_error ||
      institution_error ||
      educational_qualification_error ||
      professional_exp_error ||
      dob_error
    ) {
      this.setState({
        name_error,
        email_error,
        phone_number_error,
        fathers_name_error,
        mother_name_error,
        address_error,
        gender_error,
        alt_number_error,
        institution_error,
        educational_qualification_error,
        professional_exp_error,
        dob_error,
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
  base64code = "";
  EditDetails = (e) => {
    if (this.state.details_read === true)
      this.setState({ details_read: false });
  };

  onChange = (e) => {
    const files = e.target.files;
    const file = files[0];
    this.getBase64(file);
  };

  onLoad = (fileString) => {
    console.log(fileString);
    this.base64code = fileString;
    this.setState({ photo: fileString });
  };

  getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.onLoad(reader.result);
    };
  };
  RemoveImage = (e) => {
    this.setState({ photo: this.state.image_default });
  };
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();

    var sendstate = {
      student_id: sessiondetails.user,
      name: this.state.name,
      email: this.state.email,
      phone_number: this.state.phone_number,
      fathers_name: this.state.fathers_name,
      mother_name: this.state.mother_name,
      address: this.state.address,
      gender: this.state.gender,
      alt_number: this.state.alt_number,
      institution: this.state.institution,
      educational_qualification: this.state.educational_qualification,
      professional_exp: this.state.professional_exp,
      dob: this.state.dob,
      photo: this.state.photo,
      branch:this.state.branch
    };
    //console.log(sendstate)
    axios
      .post(APIData.api + "students/", sendstate, { headers: APIData.headers })
      .then((response) => {
        toast(response);
        toast("Successfully Updated");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        window.location.reload();
        console.log(error);
      });

    const isValide = this.validation();

    if (isValide) {
      this.setState(initialState);
    }
    if (
      this.state.phone_number.length != 10 &&
      this.state.phone_number.length != 12
    ) {
      toast("Please enter a valid phone number", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  render() {
    return (
      <div className="studentprofile">
        {console.log(sessiondetails.email)}
        <form onSubmit={this.submitHandler}>
          <div className="carrybox">
            <div className="student-part2">
              <div className="card-header">
                <h3 className="heading01"> Student Profile</h3>
                <div className="bringitcenter">
                  {this.state.admin_photo == "null" ? (
                    <img
                      className="profile_img"
                      src={this.state.image_default}
                      alt="Profile"
                    />
                  ) : (
                    <img
                      className="profile_img"
                      src={this.state.photo}
                      alt="Profile"
                    />
                  )}
                </div>
                {/* {console.log(this.state.photo)} */}
                {/* <input type="file" onChange={this.onChange} />
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
                      onChange={this.onChange}
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
                    STUDENT ID :
                    <strong className="ptag">{sessiondetails.user}</strong>
                  </p>
                  <p className="ptag">
                    Course Enrolled :
                    <strong className="ptag">
                      {this.state.course_enrolled}
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
                      <label className="heading02" htmlFor="fathername">
                        Father's Name :
                      </label>
                    </div>
                    <div className="col-25">
                      <input
                        className="inputfield"
                        type="text"
                        id="fathername"
                        name="fathers_name"
                        placeholder="Enter Father's Name"
                        value={this.state.fathers_name}
                        onChange={this.changeHandler}
                      />
                      {this.state.fathers_name_error ? (
                        <div style={{ color: "red" }}>
                          {this.state.fathers_name_error}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-25">
                      <label className="heading02" htmlFor="mothersname">
                        Mother's Name :
                      </label>
                    </div>
                    <div className="col-25">
                      <input
                        className="inputfield"
                        type="text"
                        id="mothersname"
                        name="mother_name"
                        placeholder="Enter Mother's Name"
                        value={this.state.mother_name}
                        onChange={this.changeHandler}
                      />
                      {this.state.mother_name_error ? (
                        <div style={{ color: "red" }}>
                          {this.state.mother_name_error}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {/* <div className="row">
      <div className="col-25">
      <label 
      className="heading02" 
      htmlFor="dob">Date Of Birth :</label>
      </div>
      <div className="col-25">
      <input 
      className="inputfield" 
      type="date" 
      id="dob" 
      name="dob" 
      placeholder="Enter Date Of Birth" 
      value={this.state.dob}
      onChange={this.changeHandler}
      />
{this.state.dob_error ? (<div style={{color:'red' }}>
{this.state.dob_error}
</div>)  : null}
      </div>
      </div> */}

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
                        {this.state.gender_error ? (
                          <div style={{ color: "red" }}>
                            {this.state.gender_error}
                          </div>
                        ) : null}
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                      </select>
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
                </div>

                {/* ============================================== */}
                <div className="floatright">
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
                        // onChange={this.changeHandler}
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
                        id="phone_number"
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
                      <label className="heading02" htmlFor="altphno">
                        Residential Number :
                      </label>
                    </div>
                    <div className="col-25">
                      <input
                        className="inputfield"
                        type="number"
                        id="alt_number"
                        name="alt_number"
                        placeholder="Enter Residential Number"
                        value={this.state.alt_number}
                        onChange={this.changeHandler}
                      />
                      {this.state.alt_number_error ? (
                        <div style={{ color: "red" }}>
                          {this.state.alt_number_error}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-25">
                      <label className="heading02" htmlFor="address">
                        Address :
                      </label>
                    </div>
                    <div className="col-25">
                      <textarea
                        className="inputfield"
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
                </div>
              </form>
            </div>
            <div className="row">
              <button
                className="Submitbutton"
                type="submit"
                defaultValue="Update"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default StudentProfile;