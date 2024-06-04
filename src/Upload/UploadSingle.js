import React, { Component } from "react";
import axios from "axios";
import { APIData, org } from "../Authentication/APIData";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Loading from "../Loading";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";

const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
function GetSortOrder(prop) {
  return function (a, b) {
    if (a[prop] > b[prop]) {
      return 1;
    } else if (a[prop] < b[prop]) {
      return -1;
    }
    return 0;
  };
}

toast.configure();
const initialState = {};

class UploadSingle extends Component {
  state = {
    course: null,
    loading: true,
    // Initially, no file is selected
    selectedFile: null,
    selectedFile_error: null,
    type: null,
    type_error: null,
  };
  async componentDidMount() {
    const url = APIData.api + `courses/course?org=${org}`;
    const response = await fetch(url, { headers: APIData.headers });
    const data = await response.json();
    this.setState({ course: data, loading: false });
  }
  validation = () => {
    let selectedFile_error = "";
    let type_error = "";

    if (!this.state.selectedFile) {
      selectedFile_error = "Invalid File";
    }

    if (!this.state.type) {
      type_error = "Invalid  File Type";
    }

    if (type_error || selectedFile_error) {
      this.setState({ type_error, selectedFile_error });
      return false;
    }
    return true;
  };

  // On file select (from the pop up)
  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // On file upload (click the upload button)
  onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append("file", this.state.selectedFile);

    formData.append("course", this.state.type);
    formData.append("uploaded_by", sessiondetails.user);
    formData.append("org", org);
    // Details of the uploaded file
    // console.log(this.state.selectedFile);
    const isValide = this.validation();

    if (!isValide) {
      this.setState(initialState);
      if (!this.state.selectedFile_error || !this.state.type) {
        toast("Please, Enter Valid Details!");
      }
    } else {
      toast("Please Wait!");
      // Request made to the backend api
      // Send formData object
      axios
        .post(APIData.api + "file/", formData, { headers: APIData.headers })
        .then((response) => {
          if (response.status == 200) {
            toast(response.data.fileName + " uplaoded");

            if (sessiondetails.userType == "superadmin") {
              window.location.assign(APIData.url + "superadminDocumentsAPI");
            }
            if (sessiondetails.userType == "admin") {
              window.location.assign(APIData.url + "adminDocumentsAPI");
            }
          }
          if (sessiondetails.userType == "employee") {
            console.log(sessiondetails.userType);
            window.location.assign(APIData.url + "facultydocuments");
          }
        })
        .catch((error) => {
          toast("It's Time To Grab A");
          console.log(error);
        });
    }
  };

  // File content to be displayed after
  // file upload is complete
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
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="uploadsingle">
        {this.state.loading || !this.state.course ? (
          <Loading />
        ) : (

             <div
                className="carrybox"
                onLoad={this.state.course.sort(GetSortOrder("course_id"))}
              >
                <Link
                  to={
                    sessiondetails.userType === "superadmin"
                      ? "superAdminDocumentsAPI"
                      : "adminDocumentsAPI"
                  }
                >
                  <AiIcons.AiOutlineCloseCircle />
                </Link>
                <h3 className="heading01">Documents Uploads</h3>
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
                <div className="bringitcenter">
                  <select
                    placeholder="TYPE"
                    className="inputfield"
                    onChange={this.changeHandler}
                    type="text"
                    name="type"
                  >
                    <option value="" selected disabled hidden>
                      Select An Option
                    </option>
                    {this.state.course.map((item, index) => {
                      return (
                        <option key={index} value={item.course_id}>
                          {item.course_id}
                        </option>
                      );
                    })}
                  </select>
                  {this.state.type_error ? (
                    <div style={{ color: "red" }}>{this.state.type_error}</div>
                  ) : null}
                  {this.fileData()}
                </div>

                <div className="bringitcenter">
                  <button className="Upload" onClick={this.onFileUpload}>
                    Upload
                  </button>
                </div>
              </div>
        )}
      </div>
    );
  }
}

export default UploadSingle;
