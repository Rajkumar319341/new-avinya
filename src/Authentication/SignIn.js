import React, { Component } from "react";
// import ReactDOM from "react-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserApp from "../UserApp";
import * as AiIcons from "react-icons/ai";
import { APIData, org } from "./APIData";
import GoogleLogin from './GoogleLogin'
import FacebookLogin from './FacebookLogin'
import ImageLogo from "./imagelogo";
var mergeJSON = require("merge-json");
toast.configure();

class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_email: "",
      user_password: "",
      hidden: true,
      show: false,
      hideGoogle: false,
      org:org
    };
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }
  handlePasswordChange(e) {
    this.setState({ user_password: e.target.value });
  }

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }

  componentDidMount() {
    if (this.props.password) {
      this.setState({ password: this.props.password });
    }
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  clicked = (e) => {
    this.state.show ? this.setState({ show: false }) : this.setState({ show: true })
  };

  submitHandler = (e) => {
    e.preventDefault();

    if (
      !this.state.user_email.includes("@") ||
      !this.state.user_email.includes(".") ||
      !this.state.user_password
    ) {
      toast("Please Enter Valid Credentials Or Contact Adminstrator ");
    } else {
      axios
        .post(APIData.api + "users/user/login", this.state, {
          headers: APIData.headers,
        })
        .then((response) => {
          console.log("login response",response);
          const url=APIData.api + "users/user/login";
          console.log("login url",url);

          {
            if (response.data.status.toString().toLowerCase() == "success") {
              var type = { userType: "user" };
              var storedata = mergeJSON.merge(type, response.data);
              console.log("login data",storedata);
              localStorage.setItem("sessiondetails", JSON.stringify(storedata));
              // localStorage.setItem('saved', new Date().getTime())
              window.location.reload();

            } else {
              toast(response.data.errorDesc);
            }
          }
        })
        .catch((error) => {
          toast("It's Time To Grab A Coffee");
          console.log(error);
        });
    }
  };

  render() {
    const { user_email, user_password } = this.state;
    return (
      <form className="signin" onSubmit={this.submitHandler}>
        <div className="carrybox">
          {/* <a href={APIData.website}> */}
          <Link to="/">
            <AiIcons.AiFillCloseCircle />
          </Link>
          {/* </a> */}
          <div className="card-header">
            <h3 className="heading01">User Sign In</h3>
            <div className="bringitcenter">
              {/* <img
                className="profile_img"
                src="https://i.ibb.co/ZXr11VC/smart.png"
                alt
              /> */} <ImageLogo/>
            </div>
          </div>
          {this.state.show ? null :
            <div className="bringitcenter">
              <GoogleLogin />
            </div>}

          {this.state.show ? null :
            <div className="bringitcenter">
              <button
                className="ContinueButton"
                onClick={this.clicked}
              >
                Continue with Email
              </button></div>}
        </div>
        {this.state.show ?
          <div className="carrybox">
            {
              this.state.show ?

                <div className="carrybox">
                  <Link>
                    <AiIcons.AiOutlineArrowLeft onClick={this.clicked} />
                  </Link>
                  <br></br>
                  <label className="heading02" htmlFor="name">
                    Email:
                  </label>
                  <br />
                  <input
                    placeholder="Email"
                    className="inputfield"
                    type="email"
                    name="user_email"
                    value={user_email}
                    onChange={this.changeHandler}
                  />

                  {/* <label className="heading02" htmlFor="email">Password:</label><br/>
                    <input 
                    placeholder="Password" 
                    className="inputfield" 

                    type="password"
                    name="user_password"
                    value={user_password}
                    onChange={this.changeHandler}  
                    
                    
                    /> */}

                  <label className="heading02" htmlFor="Password">
                    Password:
                  </label>
                  <br />
                  <div className="Passwordfield">
                    <input
                      placeholder="Password"
                      className="enter_field"
                      id="Password"
                      name="user_password"
                      type={this.state.hidden ? "password" : "text"}
                      value={user_password}
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
                  {this.state.password_error ? (
                    <div style={{ color: "red" }}>{this.state.password_error}</div>
                  ) : null}
                </div>

                : null
            }
            {this.state.show ?
              <Link to="/studentConsole">
                <button
                  className="Submitbutton"
                  type="submit"
                  onClick={this.submitHandler}
                >
                  Sign In
                </button>
              </Link> : null
            }
            {
              this.state.show ?
                <div className="floatleft">
                  <Link to="/forgotpassworduser">
                    <p className="forgotpasstest">Forgot Password?</p>
                  </Link>
                </div> : null
            }
            {this.state.show ?
              <div className="floatright">
                <Link to="/signup">
                  <p className="donthaveanaccount">Don't Have An Account?</p>
                </Link>
              </div> : null
            }
          </div> : null}
        {/* </div> */}
      </form>
    );
  }
}

export default Signin;
