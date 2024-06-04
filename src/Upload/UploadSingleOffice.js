import React, { Component } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import { APIData, org } from '../Authentication/APIData';
import 'react-toastify/dist/ReactToastify.css';
const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
toast.configure();
const initialState = {
}
class UploadSingleOffice extends Component {

  state = {

    // Initially, no file is selected
    selectedFile: null,
    selectedFile_error: '',

    type: null,
    type_error: ''

  };

  // On file select (from the pop up)
  onFileChange = event => {
    //console.log(event.target.files)

    // Update the state
    this.setState({ selectedFile: event.target.files[0] });

  };

  validation = () => {
    let selectedFile_error = '';
    let type_error = '';

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


  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  // On file upload (click the upload button)
  onFileUpload = () => {

    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append(
      "file",
      this.state.selectedFile
    );


    formData.append(
      "type", this.state.type
    );
    formData.append(
      "uploaded_by", sessiondetails.user
    );
    formData.append(
      "org", org
    );

    const isValide = this.validation();

    if (!isValide) {
      this.setState(initialState)
      if (!this.state.selectedFile_error || !this.state.type) {
        toast('Please, Enter Valid Details!')
      }
    }
    else {
      toast("Please Wait!")
      // Details of the uploaded fil

      // Request made to the backend api
      // Send formData object
      axios.post(APIData.api + "office-file/", formData, { headers: APIData.headers })
        .then(response => {

          if (response.status == 200) {
            toast(response.data.fileName + "uplaoded")
            if (APIData.sessiondetails.userType == "superadmin")
              setTimeout(() => { window.location.replace(APIData.url + 'superAdminOfficeDocumentAPI') }, 2000);
            else if (APIData.sessiondetails.userType == "admin")
              setTimeout(() => { window.location.replace(APIData.url + 'adminofficeDocumentsAPI') }, 2000);

          }
        })
        .catch(error => {
          toast("It's Time To Grab A");
          console.log(error)
        })
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
      <div className="uploadsingleoffice">
        <div className="carrybox">
          <h3 className="heading01">
            Office Documents Uploads
          </h3>
          <div className="bringitcenter">
            <input className="Upload" type="file" onChange={this.onFileChange} />
            {this.state.selectedFile_error ? (<div style={{ color: 'red' }}>
              {this.state.selectedFile_error}
            </div>) : null}

          </div>

          <div className="bringitcenter">
            <input className="inputfield" placeholder="File Domain" type="text"
              name="type"
              value={this.state.type}
              onChange={this.changeHandler} />
            {this.state.type_error ? (<div style={{ color: 'red' }}>
              {this.state.type_error}
            </div>) : null}
            {this.fileData()}
          </div>
          <div className="bringitcenter">
            <button className="Upload" onClick={this.onFileUpload}>

              Upload
            </button>

          </div>

        </div>
      </div>

    );
  }
}

export default UploadSingleOffice;