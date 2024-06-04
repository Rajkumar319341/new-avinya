import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import { APIData, org } from "./APIData";
import ImageLogo from "./imagelogo";
import AdminApp from "../AdminApp";
import ReactDOM from 'react-dom';
 import { withRouter } from 'react-router-dom';

toast.configure();
const initialState = {};
 
class InstitutionalSignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      org:org,
      username: "",
      password: "",
      username_error: "",
      password_error: "",
      hidden: true,
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
    let username_error = "";
    let password_error = "";
 
    if (!this.state.username) {
      username_error = "Invalid Username!";
    }
 
    if (!this.state.password) {
      password_error = "Invalid Password!";
    }
 
    if (password_error || username_error) {
      this.setState({ password_error, username_error });
      return false;
    }
    return true;
  };
 
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
 
  userexits(data) {
    localStorage.setItem("sessiondetails", JSON.stringify(data));
    // ReactDOM.render(<AdminApp />, document.getElementById('root'));
    // window.location.reload();
  }
 
  usernotexits = (e) => {
    //alert("Wrong Username or Password")
    toast("Wrong Username or Password", { position: toast.POSITION.TOP_RIGHT });
  };
 
  submitHandler = (e) => {
    e.preventDefault();
    const isValide = this.validation();
 
    if (!isValide) {
      this.setState(initialState);
      if (!this.state.username || !this.state.password) {
        toast("Please, Enter Vaild Details!");
      }
    } else {
   
      axios
        .post(APIData.api + "login-type/", this.state, {
          headers: APIData.headers,
        })
        .then((response) => {
          console.log(response)
          {
            if (response.data.status.toString().toLowerCase() === "success") {
              this.userexits(response.data);
              if(response.data.userType==="superadmin"){
                window.location.reload();
              }else{
                localStorage.setItem("sessiondetails", JSON.stringify(response.data));
                this.props.history.push("/select-dept")
                

              }

              console.log(response.data);
              // localStorage.setItem('saved', new Date().getTime())
            }
            else {
              toast(response.data.errorDesc);
            }
          }
        })
        .catch((error) => {
          toast("Failed Contact Adminitrator-SmarterLearnings");
          console.log(error);
        });
    }
   
  };
  render() {
    const { username, password } = this.state;
    return (
      <form className="institutionalSignIn" onSubmit={this.submitHandler}>
        <div className="carrybox">
          {/* <a href={APIData.website}> */}
          <Link to="/">
            <AiIcons.AiFillCloseCircle />
          {/* </a> */}
          </Link>
 
          <div className="card-header">
            <h3 className="heading01">Institutional Sign In</h3>
            <div className="bringitcenter">
              {/* <img
                className="profile_img"
                src="https://i.ibb.co/ZXr11VC/smart.png"
                alt
              /> */} <ImageLogo/>
            </div>
          </div>
          <div className="carrybox">
            <label className="heading02" htmlFor="name">
              Username:
            </label>
            <br />
            <input
              placeholder="Username"
              className="inputfield"
              type="text"
              name="username"
              value={username}
              onChange={this.changeHandler}
            />
            {this.state.username_error ? (
              <div style={{ color: "red" }}>{this.state.username_error}</div>
            ) : null}
 
            <label className="heading02" htmlFor="Password">
              Password:
            </label>
            <br />
            <div className="Passwordfield">
              <input
                placeholder="Password"
                className="enter_field"
                id="Password"
                name="password"
                type={this.state.hidden ? "password" : "text"}
                value={password}
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
          <div className="submitcarry">
            <button className="Submitbutton" type="submit">
              {" "}
              Sign In
            </button>
          </div>
          <div className="floatleft">
            <Link to="/forgotpassword">
              <p className="forgotpasstest">Forgot Password?</p>
            </Link>
          </div>
          <div className="floatright">
            <Link to="/signup">
              <p className="donthaveanaccount">Don't Have An Account?</p>
            </Link>
          </div>
        </div>
      </form>
    );
  }
}
 
export default withRouter(InstitutionalSignIn);
