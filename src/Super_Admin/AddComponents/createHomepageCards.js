import React, { Component } from "react";
import { APIData, org } from "../../Authentication/APIData";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import Loading from "../../Loading";

toast.configure();
const initialState = {};

const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
var today = new Date();
var datetime =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
class createHomepageCards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      placeholder_name: "",
      placeholder_name_error: "",

      placeholder_desc: "",
      placeholder_desc_error: "",

      placeholder_img: "",
      placeholder_img_error: "",

      created_date_time: "",
      created_date_time_error: "",

      created_by: "",

      updated_by: "",
      updated_by_error: "",

      placeholder_title: "",
      placeholder_title_error: "",

      updated_date_time: "",
      updated_date_time_error: "",
    };
  }
  responseloading() {
    this.setState({ loading: !this.state.loading });
  }
  validation = () => {
    let placeholder_name_error = "";
    let placeholder_desc_error = "";
    let created_date_time_error = "";
    let placeholder_img_error = "";
    let updated_by_error = "";
    let updated_date_time_error = "";
    let placeholder_title_error = "";

    if (!this.state.placeholder_name) {
      placeholder_name_error = "Invalid Name";
    }
    if (!this.state.placeholder_title) {
      placeholder_title_error = "Invalid Title";
    }
    if (!this.state.created_date_time) {
      created_date_time_error = "Invalid date";
    }

    if (!this.state.placeholder_img) {
      placeholder_img_error = "Please upload an appropriate image";
    }
    if (!this.state.placeholder_desc) {
      placeholder_desc_error = "Invalid Placeholder Description";
    }
    if (!this.state.updated_by) {
      updated_by_error = "Invalid Updated By";
    }
    if (!this.state.updated_date_time) {
      updated_date_time_error = "Invalid Date Time";
    }

    if (
      placeholder_name_error ||
      placeholder_desc_error ||
      created_date_time_error ||
      placeholder_img_error ||
      updated_by_error ||
      updated_date_time_error ||
      placeholder_title_error
    ) {
      this.setState({
        placeholder_name_error,
        placeholder_desc_error,
        created_date_time_error,
        placeholder_img_error,
        updated_by_error,
        updated_date_time_error,
        placeholder_title_error
      });
      return false;
    }
    return true;
  };
  //   base64
  base64code = "";

  onChange = (e) => {
    const files = e.target.files;
    const file = files[0];
    this.getBase64(file);
  };


  onLoad = (fileString) => {
    // Remove the prefix 'data:image/png;base64,'
    const base64Data = fileString.replace(/^data:image\/(png|jpeg);base64,/, "");
    this.base64code = base64Data;
    this.state.placeholder_img = base64Data;
  };




  getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.onLoad(reader.result);
    };
  };


  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    // console.log(sessiondetails);
    e.preventDefault();
    const isValide = this.validation();
    if (!isValide) {
      this.setState(initialState);
      if (
        !this.state.placeholder_name ||
        !this.state.placeholder_title ||
        !this.state.placeholder_desc ||
        !this.state.placeholder_img
      ) {
        toast("Please Enter Valid Details");
      } else {
        var sendstate = {
          org: org,
          created_by: sessiondetails.user,
          image_Type: this.state.image_Type,
          updated_by: sessiondetails.user,
          created_date_time: datetime,
          updated_date_time: datetime,
          placeholderName: this.state.placeholder_name,
          placeholderDesc: this.state.placeholder_desc,
          placeholderImage: this.state.placeholder_img,
          placeholderTitle: this.state.placeholder_title
        };
        {
          console.log(sendstate);
        }
        this.responseloading();
        axios
          .post(APIData.api + "org-placeholder/details/", sendstate, {
            headers: APIData.headers,
          })
          .then((response) => {
            toast("Card Added Successfully!");
            var url;
            if (sessiondetails.userType == "superadmin")
              url = new URL(APIData.url + "#/superAdminHomepageCard");
            else if (sessiondetails.userType == "admin")
              url = new URL(APIData.url + "#/HomepageCardAdmin");

            window.location.assign(url);
            this.responseloading();
          })
          .catch((error) => {
            this.responseloading();
            console.log(error);
            toast(error)
          });
      }
    }
  };
  render() {
    const { placeholder_name, placeholder_desc, placeholder_img, placeholder_title } = this.state;
    return (
      <div>
        {this.state.loading ? (
          <Loading />
        ) : (
          <form className="superaddcourses" onSubmit={this.submitHandler}>
            <Link
              to={
                sessiondetails.userType == "superadmin"
                  ? "superAdminHomepageCard"
                  : "HomepageCardAdmin"
              }
            >
              <AiIcons.AiFillCloseCircle />
            </Link>
            <div className="carrybox">
              <div>
                <h2 className="mainheading01">ADD HOMEPAGE CARD</h2>
              </div>
              <div className="floatleft">
                <div className="">
                  <label className="heading02" htmlFor="NAME">
                    NAME:
                  </label>
                  <br />
                  <input
                    placeholder="NAME"
                    className="inputfield"
                    type="text"
                    name="placeholder_name"
                    value={placeholder_name}
                    onChange={this.changeHandler}
                  />
                  {this.state.placeholder_name_error ? (
                    <div style={{ color: "red" }}>
                      {this.state.placeholder_name_error}
                    </div>
                  ) : null}
                </div>

                <div className="">
                  <label className="heading02" htmlFor="DESCRIPTION">
                    DESCRIPTION:
                  </label>
                  <br />

                  <input
                    placeholder="Description"
                    className="inputfield"
                    value={placeholder_desc}
                    onChange={this.changeHandler}
                    type="text"
                    name="placeholder_desc"
                  ></input>
                  {this.state.placeholder_desc_error ? (
                    <div style={{ color: "red" }}>
                      {this.state.placeholder_desc_error}
                    </div>
                  ) : null}
                </div>

                <div className="">
                  <label className="heading02" htmlFor="TITLE">
                    Image Type:
                  </label>
                  <br />
                  <select
                    className="inputfield"
                    name="image_Type"
                    onChange={this.changeHandler}
                  >
                    <option value="">Select Image Type</option>
                    <option value="logo">Logo</option>
                    <option value="homepage_course">Homepage course</option>
                    <option value="homepage_jobs">Homepage jobs</option>
                    <option value="static_image">Static image</option>
                  </select>
                </div>
              </div>
              <div className="floatright">
                <div className="">
                  <label className="heading02" htmlFor="IMAGE">
                    IMAGE:
                  </label>
                  <br />

                  <input
                    className="Upload"
                    type="file"
                    onChange={this.onChange}
                    accept="image/*"
                  // name="placeholder_img"
                  // placeholder="IMAGE"
                  // value={placeholder_img}
                  // onChange={this.changeHandler}
                  />
                  {console.log(this.base64code)}

                  {this.state.placeholder_img_error ? (
                    <div style={{ color: "red" }}>
                      {this.state.placeholder_img_error}
                    </div>
                  ) : null}
                </div>
                <div className="">
                  <label className="heading02" htmlFor="TITLE">
                    TITLE:
                  </label>
                  <br />
                  <input
                    placeholder="TITLE"
                    className="inputfield"
                    type="text"
                    name="placeholder_title"
                    value={placeholder_title}
                    onChange={this.changeHandler}
                  />
                  {this.state.placeholder_name_error ? (
                    <div style={{ color: "red" }}>
                      {this.state.placeholder_name_error}
                    </div>
                  ) : null}
                </div>


              </div>
              <div className="submitcarry">
                <button className="Submitbutton" type="submit">
                  ADD +
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    );
  }
}

export default createHomepageCards;
