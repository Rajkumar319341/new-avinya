import React, { Component } from "react";
import { APIData } from "../../Authentication/APIData";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as ImIcons from "react-icons/im";
import Loading from "../../Loading";
import { QrReader } from "react-qr-reader";
// import "./QrStyle.css";

toast.configure();
const initialState = {};

const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
var today = new Date();
var datetime =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
// console.log(datetime);
var time = today.getHours() + ":" + today.getMinutes();

// console.log(time);

class CreateAttendance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      placeholder_courseid: "",
      placeholder_courseid_error: "",

      placeholder_userid: "",
      placeholder_userid_error: "",

      attendance: 0,
      totalAttendance: "",

      created_date_time: "",
      created_date_time_error: "",

      created_by: "",

      updated_by: "",
      updated_by_error: "",

      updated_date_time: "",
      updated_date_time_error: "",

      start_time: "",
      start_time_error: "",

      end_time: "",
      end_time_error: "",

      //   qr code
      scanData: "",
      scanData_error: "",

      selected: "environment",
      startScan: false,
      loadingScan: false,
      data: " ",
      scanned: false,

      qr_hide: true,
    };
  }
  responseloading() {
    this.setState({ loading: !this.state.loading });
  }
  validation = () => {
    let created_date_time = "";
    let scanData = "";
    let scanData_error = "";
    let start_time = "";
    let start_time_error = "";
    let end_time = "";
    let end_time_error = "";

    let created_date_time_error = "";

    if (!this.state.scanData) {
      scanData_error = "Please scan the QR for attendance.";
    }
    if (!this.state.start_time) {
      start_time_error = "Please enter the start time.";
    }
    if (!this.state.end_time) {
      end_time_error = "Please enter the end time.";
    }

    if (
      created_date_time_error ||
      scanData_error ||
      start_time_error ||
      end_time_error
    ) {
      this.setState({
        created_date_time_error,
        scanData_error,
        start_time_error,
        end_time_error,
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
  datee = (e) => {
    // console.log(datetime);
  };

  onLoad = (fileString) => {
    // console.log(fileString);
    this.base64code = fileString;
    this.state.placeholder_img = fileString;
  };

  getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.onLoad(reader.result);
    };
  };
  //

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  manual = (e) => {
    this.setState({ [this.state.totalAttendance]: this.state.attendance + 1 });
    // console.log(this.state.attendance);
    // this.setState({ [e.target.courseid]: e.target.value });
    // console.log(this.state.courseid);
    this.setState({ [this.state.created_date_time]: datetime });
    // console.log(datetime);
  };

  submitHandler = (e) => {
    // console.log(sessiondetails);
    e.preventDefault();

    const isValide = this.validation();
    if (!isValide) {
      this.setState(initialState);
      //   console.log(datetime);
      this.setState({ [this.state.attendance]: this.state.attendance + 1 });
      //   console.log(this.state.attendance);
      // this.setState({ [e.target.courseid]: e.target.value });
      //   console.log(this.state.placeholder_courseid);
      //   console.log(this.state.scanData);
      this.setState({ [this.state.created_date_time]: datetime });
      //   console.log(datetime);
      if (
        !this.state.created_date_time ||
        !this.state.scanData ||
        !this.state.start_time ||
        !this.state.end_time
      ) {
        toast("Please Enter Valid Details");
      } else {
        var sendstate = {
          //   created_by: sessiondetails.user,
          //   updated_by: sessiondetails.user,
          created_date_time: datetime,
          updated_date_time: datetime,
          //   placeholderName: this.state.placeholder_name,
          //   placeholderDesc: this.state.placeholder_desc,
          //   placeholderImage: this.state.placeholder_img,
          scanData: this.state.scanData,
          start_time: this.state.start_time,
          end_time: this.state.end_time,
        };
        {
            console.log(sendstate);
          //   console.log(datetime);
          //   console.log(this.state.scanData);
        }
        this.responseloading();
        axios
          .post(APIData.api + "", sendstate, {
            headers: APIData.headers,
          })
          .then((response) => {
            toast("Card Added Successfully!");
            var url;
            // if (sessiondetails.userType == "superadmin")
            //   url = new URL(APIData.url + "superAdminCourses");
            // else if (sessiondetails.userType == "admin")
            //   url = new URL(APIData.url + "courses");

            // window.location.assign(url);
            // this.responseloading();
          })
          .catch((error) => {
            this.responseloading();
            console.log(error);
          });
      }
    }
  };

  //   function to check if the qr scanning should be hidden or not based on time
  called = () => {
    // console.log("called");
    // console.log(today.getHours());
    // console.log(time);
    switch (true) {
      case time <= this.state.end_time && time >= this.state.start_time:
        this.setState({ qr_hide: false });
        // console.log("attendance");
        // console.log(this.state.qr_hide);
        break;
      case time > this.state.end_time:
        this.setState({ qr_hide: true });
        // console.log("attendance closed!");
        // console.log(this.state.qr_hide);
        break;
    }
    // working
    // check if time is between 8am - 10am
    // if (today.getHours() >= 12 && today.getHours() <= 15) {
    //   this.setState({ qr_hide: true });
    //   console.log("attendance time");
    //   console.log(this.state.qr_hide);
    // } else {
    //   this.setState({ qr_hide: false });
    //   console.log("Sorry!! attendance closed");
    //   console.log(this.state.qr_hide);
    // }
  };
  hide_qr = () => {
    if (today.getHours() > 10 && today.getHours() < 8) {
      this.setState({ qr_hide: true });
      //   console.log("called");
    } else if (today.getHours() >= 8 && today.getHours() < 10) {
      this.setState({ qr_hide: false });
      //   console.log("called");
    }
  };
  render() {
    // for qr
    const handleScan = async (scanData) => {
      this.setState({ loadingScan: true });
      //   console.log(`loaded data data`, scanData);
      if (scanData && scanData !== "") {
        this.setState({ data: this.state.scanData });
        this.setState({ startScan: false });
        // this.setState({ loadingScan: false });
        // console.log(scanData);
        this.setState({ scanData: scanData });
        // console.log(`loaded >>>`, scanData);
        console.log(this.state.scanData.text);
        

        // setData(scanData);
        // setStartScan(false);
        // setLoadingScan(false);
        // setPrecScan(scanData);
      }
    };

    const handleError = (err) => {
      console.error(err);
    };

    const onSuccess = (success) => {
      console.log(success);
    };

    // end of qr
    const {
      placeholder_courseid,
      placeholder_desc,
      scanData,
      placeholder_userid,
      placeholder_img,
      start_time,
      end_time,
    } = this.state;
    return (
      <div>
        {this.state.loading ? (
          <Loading />
        ) : (
          <form className="superaddcourses" onSubmit={this.submitHandler}>
            <Link
              to={
                sessiondetails.userType == "superadmin"
                  ? "/"
                  : "/"
              }
            >
              <AiIcons.AiFillCloseCircle />
            </Link>
            <div className="carrybox">
              <div>
                <h2 className="mainheading01">Attendance</h2>
              </div>

              {this.state.qr_hide ? (
                <div className="">
                  <div className="floatleft">
                    <label className="heading02" htmlFor="START">
                      START TIME:
                    </label>
                    <br />
                    <input
                      placeholder="START TIME"
                      className="inputfield"
                      value={start_time}
                      type="time"
                      name="start_time"
                      onChange={this.changeHandler}
                    ></input>
                    {this.state.start_time_error ? (
                      <div style={{ color: "red" }}>
                        {this.state.start_time_error}
                      </div>
                    ) : null}
                  </div>
                  <div className="floatright">
                    <label className="heading02" htmlFor="END">
                      END TIME:
                    </label>

                    <br />

                    <input
                      placeholder="END TIME"
                      className="inputfield"
                      value={end_time}
                      onChange={this.changeHandler}
                      type="time"
                      name="end_time"
                    ></input>
                    {this.state.end_time_error ? (
                      <div style={{ color: "red" }}>
                        {this.state.end_time_error}
                      </div>
                    ) : null}
                  </div>
                  <div className="carrybox" type="submit">
                    <button className="Submitbutton" onClick={this.called}>
                      Click to scan ID
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="floatleft">
                    <Link
                      onClick={() => {
                        this.setState({ qr_hide: true });
                      }}
                    >
                      <BiIcons.BiArrowBack size={28} />
                    </Link>
                    <br />
                    <label className="heading02" htmlFor="Attendance">
                      STUDENT ID:
                    </label>
                    <div
                      onClick={() => {
                        this.setState({ startScan: !this.state.startScan });
                        // this.hide_qr();
                      }}
                      className="Submitbutton"
                    >
                      {this.state.startScan ? "Stop Scan" : "Start Scan"}
                    </div>
                    {this.state.startScan && (
                      <>
                        <select
                          onChange={(e) =>
                            this.setState({ selected: e.target.value })
                          }
                        >
                          <option value={"environment"}>Back Camera</option>
                          <option value={"user"}>Front Camera</option>
                        </select>
                        <QrReader
                          delay={1000}
                          onError={handleError}
                          containerStyle={{ width: "80%" }}
                          onResult={handleScan}
                        />
                        {/* validation */}
                        {/* {this.state.scanData_error ? (
                          <div style={{ color: "red" }}>
                            {this.state.scanData_error}
                          </div>
                        ) : null} */}
                      </>
                    )}

                    {this.state.loadingScan && (
                      <div>
                        <p>{JSON.stringify(this.state.scanData.text)}</p>
                      </div>
                    )}
                    {this.state.data !== "" && <p>{this.state.data}</p>}
                    {this.state.scanData_error ? (
                      <div style={{ color: "red" }}>
                        {this.state.scanData_error}
                      </div>
                    ) : null}
                  </div>
                  <div className="submitcarry">
                    <button className="Submitbutton" type="submit">
                      MARK ATTENDANCE <ImIcons.ImCheckmark2 />
                    </button>
                  </div>
                </div>
              )}

              {/* end of qr code scanner */}
              {/* <div className="submitcarry">
                <button className="Submitbutton" type="submit">
                  MARK ATTENDANCE <ImIcons.ImCheckmark2 />
                </button>
              </div> */}
            </div>
          </form>
        )}
      </div>
    );
  }
}

export default CreateAttendance;

