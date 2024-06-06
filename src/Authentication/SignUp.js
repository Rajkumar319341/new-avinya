import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { APIData, org } from "./APIData";
// import validator from "validator";
import Tooltip from "@material-ui/core/Tooltip";
import ImageLogo from "./imagelogo";
var passwordValidator = require("password-validator");

// Create a schema
var schema = new passwordValidator();

// Add properties to it
schema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(32) // Maximum length 100
  .has()
  .uppercase(1) // Must have uppercase letters
  .has()
  .lowercase(1) // Must have lowercase letters
  .has()
  .digits(1)
  .has()
  .symbols(1) // Must have at least 2 digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]); // Blacklist these values
// var response = null;
toast.configure();
const initialState = {};

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_name: "",
      user_email: "",
      userEmailError: "",
      userNameError: "",
      user_password: "",
      userPasswordError: "",
      user_phone_number: "",
      user_phone_number_error: "",
      confirm_password: "",
      confirmPasswordError: "",
      otp: "",
      get_otp_error: "",
      hidden: true,
      TandC: false,
    };
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }

  componentDidMount() {
    if (this.props.password) {
      this.setState({ password: this.props.password });
    }
  }

  validation = () => {
    let userEmailError = "";
    let userNameError = "";
    let user_phone_number_error = "";
    let get_otp_error = "";
    let userPasswordError = "";
    let confirmPasswordError = "";

    if (!this.state.user_name) {
      userNameError = "Invalid Name";
    }

    if (
      !this.state.user_email.includes("@") &&
      !this.state.user_email.includes(".")
    ) {
      userEmailError = "Invalid Email!";
    }
    if (this.state.user_phone_number.length !== 10) {
      user_phone_number_error = "Invalid Phone Number";
    }
    if (!this.state.otp) {
      get_otp_error = "Invalid OTP";
    }
    if (schema.validate(this.state.user_password)) {
      userPasswordError = "";
    } else {
      userPasswordError = "Invalid";
      toast(
        "Enter a strong Password That Includes Atleast 1 Lowercase, 1 Uppercase, 1 Numeric & 1 Special Character & The Length Must Be Atleast 8 Characters or Longer"
      );
    }

    if (this.state.user_password !== this.state.confirm_password) {
      confirmPasswordError = "mismatch";
    }

    if (
      userEmailError ||
      userNameError ||
      user_phone_number_error ||
      get_otp_error ||
      userPasswordError ||
      confirmPasswordError ||
      confirmPasswordError
    ) {
      this.setState({
        userEmailError,
        userNameError,
        user_phone_number_error,
        get_otp_error,
        userPasswordError,
        confirmPasswordError,
      });
      return false;
    }
    return true;
  };
  getOtp() {
    let userEmailError = "";

    if (
      !this.state.user_email.includes("@") &&
      !this.state.user_email.includes(".")
    ) {
      userEmailError = "Invalid Email!";
    }
    if (userEmailError) {
      this.setState({ userEmailError });
      return false;
    }
    toast("Please Wait For The Otp");
    console.log(this.state.user_email)
    axios
      .get(APIData.api + "users/otp/detail?emailId=" + this.state.user_email+`&org=${org}`, {
        headers: APIData.headers,
      })
      .then((response) => {
        if (response.data.status.toString().toLowerCase() === "success") {
          toast(response.data.description);
          // const url = new URL(APIData.url);
          //window.location.href = url;
        } else {
          toast(response.data.errorDesc);
        }
      })
      .catch((error) => {
        toast("Please Check Your Email");
      });
    return true;
  }

  handleChange = (event) => {
    const isCheckbox = event.target.type === "checkbox";
    this.setState({
      [event.target.userEmailError]: isCheckbox
        ? event.target.checked
        : event.target.value,
    });
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
        !this.state.user_name ||
        !this.state.user_email ||
        !this.state.user_password ||
        !this.state.user_phone_number ||
        !this.state.otp
      )
        toast("Please Enter Valid Details");

      if (this.state.user_password !== this.state.confirm_password)
        toast(
          "Please Check Password and Confirm Passowrd if they are matching",
          { position: toast.POSITION.TOP_RIGHT }
        );
    } else {
      var sendstate = {
        org:org,
        user_name: this.state.user_name,
        user_email: this.state.user_email,
        user_password: this.state.user_password,
        user_phone_number: this.state.user_phone_number,
        otp: this.state.otp,
      };
      setTimeout(toast("Please Wait!"), 5000);
      axios
        .post(APIData.api + "users/", sendstate, { headers: APIData.headers })
        .then((response) => {
          if (response.data.status.toString().toLowerCase() === "success") {
            toast(response.data.description);
            const url = new URL(APIData.url + "signin");
            window.location.href = url;
          } else {
            toast(response.data.errorDesc);
          }
        })
        .catch((error) => {
          toast("It's Time To Grab A Coffee");
          console.log(error);
        });
    }
  };
  render() {
    return (
      <form className="signup" onSubmit={this.submitHandler}>
        <div className="carrybox">
          {/* <a href={APIData.website}> */}
          <Link to="/">
            <AiIcons.AiFillCloseCircle />
          </Link>
          {/* </a> */}
          <div className="card-header">
            <h3 className="heading01">Sign Up</h3>
            <div className="bringitcenter">
              {/* <img
                className="profile_img"
                src="https://i.ibb.co/ZXr11VC/smart.png"
                alt="Profile"
              /> */}<ImageLogo/>
            </div>
          </div>
          <div className="floatleft">
            <div className="">
              <label className="heading02" htmlFor="Name">
                Name:{" "}
                <FaIcons.FaAsterisk
                  color="red"
                  fontSize=".4em"
                  style={{ marginBottom: "10px" }}
                />
              </label>
              <br />
              <input
                placeholder="Name"
                className="inputfield"
                type="text"
                name="user_name"
                value={this.state.user_name}
                onChange={this.changeHandler}
              />
              {this.state.userNameError ? (
                <div style={{ color: "red" }}>{this.state.userNameError}</div>
              ) : null}
            </div>

            <div className="">
              <label className="heading02" htmlFor="Email">
                Email:{" "}
                <FaIcons.FaAsterisk
                  color="red"
                  fontSize=".4em"
                  style={{ marginBottom: "10px" }}
                />
              </label>
              <br />

              <input
                placeholder="Email"
                className="inputfield"
                type="email"
                name="user_email"
                value={this.state.user_email}
                onChange={this.changeHandler}
              />
              {this.state.userEmailError ? (
                <div style={{ color: "red" }}>{this.state.userEmailError}</div>
              ) : null}
            </div>

            <div className="">
              <label className="heading02" htmlFor="OTP">
                OTP{" "}
                <FaIcons.FaAsterisk
                  color="red"
                  fontSize=".4em"
                  style={{ marginBottom: "10px" }}
                />
              </label>
              <br />
              <input
                placeholder="Enter OTP"
                className="inputfield"
                type="number"
                name="otp"
                value={this.state.otp}
                onChange={this.changeHandler}
              />
              {this.state.get_otp_error ? (
                <div style={{ color: "red" }}>{this.state.get_otp_error}</div>
              ) : null}
              <div className="Upload" onClick={(e) => this.getOtp()}>
                Get OTP{" "}
                {/* <FaIcons.FaAsterisk
                  color="red"
                  fontSize=".4em"
                  style={{ marginBottom: "10px" }}
                /> */}
              </div>
            </div>
          </div>

          <div className="floatright">
            <div className="">
              <label className="heading02" htmlFor="Phone Number">
                Phone Number:{" "}
                <FaIcons.FaAsterisk
                  color="red"
                  fontSize=".4em"
                  style={{ marginBottom: "10px" }}
                />
              </label>
              <br />

              <input
                placeholder="Phone Number"
                className="inputfield"
                type="number"
                name="user_phone_number"
                value={this.state.user_phone_number}
                onChange={this.changeHandler}
              />
              {this.state.user_phone_number_error ? (
                <div style={{ color: "red" }}>
                  {this.state.user_phone_number_error}
                </div>
              ) : null}
            </div>

            <div className="">
              <pre>
                <label className="heading02" htmlFor="Password">
                  Password:{" "}
                  <FaIcons.FaAsterisk
                    color="red"
                    fontSize=".4em"
                    style={{ marginBottom: "10px" }}
                  />
                </label>
                <Tooltip
                  title="Enter a strong Password That Includes Atleast 1 Lowercase, 1 Uppercase, 1 Numeric & 1 Special Character & The Length Must Be Atleast 8 Characters or Longer."
                  placement="top"
                >
                  <span variant="contained">?</span>
                </Tooltip>
              </pre>
              <div className="Passwordfield">
                <input
                  placeholder="Password"
                  className="enter_field"
                  id="Password"
                  name="user_password"
                  type={this.state.hidden ? "password" : "text"}
                  value={this.state.user_password}
                  onChange={this.changeHandler}
                  onClick={this.handlePasswordChange}
                />
                <div className="holdeye" onClick={this.toggleShow}>
                  <div className="EyeMark">
                    <div className="Eyecenter">
                      <AiIcons.AiFillEye />
                    </div>
                  </div>
                </div>
              </div>
              {this.state.userPasswordError ? (
                <div style={{ color: "red" }}>
                  {this.state.userPasswordError}
                </div>
              ) : null}
            </div>

            <div className="">
              <label className="heading02" htmlFor="Confirm Password">
                Confirm Password{" "}
                <FaIcons.FaAsterisk
                  color="red"
                  fontSize=".4em"
                  style={{ marginBottom: "10px" }}
                />
              </label>
              <br />
              <input
                placeholder="Confirm Password"
                className="inputfield"
                type={this.state.hidden ? "password" : "text"}
                name="confirm_password"
                value={this.state.confirm_password}
                onChange={this.changeHandler}
                onClick={this.handlePasswordChange}
              />
            </div>

            <div className="">{this.handleSubmit}</div>
          </div>
          <div className="submitcarry">
            <input
              className="heading01"
              type="checkbox"
              defaultChecked={this.state.TandC}
              onChange={
                (this.toggleChange = () => {
                  this.setState({
                    TandC: !this.state.TandC,
                  });
                })
              }
            />
            <Link to="termsAndCondition" target={"_blanks"}>
              <label className="ptag">
                I agree to the <mark>Terms and Conditions</mark>
              </label>
            </Link>
          </div>
          {this.state.TandC ? (
            <div className="submitcarry">
              <button className="Submitbutton" type="submit">
                Sign Up
              </button>
            </div>
          ) : (
            <div></div>
          )}

          {/* <div className="floatleft">
         <Link to="/forgotpassword"><p className="forgotpasstest">Forgot Password?</p></Link>
        </div> */}
          <div className="floatright">
            <Link to="/user-signin">
              <p className="donthaveanaccount">Already Have An Account?</p>
            </Link>
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
    );
  }
}

export default SignUp;