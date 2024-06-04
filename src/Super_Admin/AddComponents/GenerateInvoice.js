import React, { Component } from "react";
import MainLogo from "../../Images/logo.jpg";
import { toast } from "react-toastify";
import axios from "axios";
import { APIData } from "../../Authentication/APIData";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import Loading from "../../Loading";
const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));

function printPage() {
  var printContents = document.getElementById("invoicePrint").innerHTML;
  console.log(printContents);
  var originalContents = document.body.innerHTML;
  console.log(originalContents);
  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
}
const initialState = {};

toast.configure();

class CreateInvoice extends Component {
  state = {
    student_id: "",
    student_id_error: "",

    email_id: "",
    email_id_error: "",

    paid: "",
    paid_error: "",

    date: "",
    date_error: "",

    due_date: "",
    due_date_error: "",

    course: null,
    course_error: "",

    coursesData: null,
    studentData: null,

    balance: "",
    balance_error: "",

    invoice_id_error: "",
    invoice_id: "",

    loading: true,
  };
  async componentDidMount() {
    const courseUrl = APIData.api + "courses/course";
    console.log(courseUrl);
    const courseReply = await fetch(courseUrl, { headers: APIData.headers });
    console.log(courseReply);
    const courseData = await courseReply.json();
    console.log(courseData);
    const Url = APIData.api + "students";
    const Reply = await fetch(Url, { headers: APIData.headers });
    const Data = await Reply.json();
    this.setState({
      studentData: Data,
      coursesData: courseData,
      loading: false,
    });
  }

  validation = () => {
    let student_id_error = "";
    let email_id_error = "";
    let paid_error = "";
    let due_date_error = "";
    let date_error = "";
    let course_error = "";
    let balance_error = "";
    let invoice_id_error = "";

    if (!this.state.student_id) {
      student_id_error = "Invalid Student ID";
    }
    if (!this.state.paid) {
      paid_error = "Invalid Paid Details";
    }

    if (!this.state.date) {
      date_error = "Invalid Date ";
    }
    if (!this.state.due_date) {
      due_date_error = "Invalid Date ";
    }
    if (!this.state.email_id) {
      email_id_error = "Invalid Email ID";
    }
    if (!this.state.course) {
      course_error = "Invalid Course";
    }
    if (!this.state.balance) {
      balance_error = "Invalid Balance Details";
    }
    if (!this.state.invoice_id) {
      invoice_id_error = "Invalid Invoice ID";
    }

    if (
      invoice_id_error ||
      due_date_error ||
      student_id_error ||
      email_id_error ||
      paid_error ||
      date_error ||
      course_error ||
      balance_error
    ) {
      this.setState({
        invoice_id_error,
        due_date_error,
        student_id_error,
        email_id_error,
        paid_error,
        date_error,
        course_error,
        balance_error,
      });
      return false;
    }
    return true;
  };
  
  handleClick = () => {
    this.props.toggle();
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submitHandler = (e) => {
    e.preventDefault();
    const isValide = this.validation();
    if (!isValide) {
      this.setState(initialState);
      if (!this.state.invoice_id) {
        toast("Please Enter Valid Invoice Id");
      }
      if (!this.state.balance) {
        toast("Please Enter Balance Amount");
      }

      if (!this.state.course) {
        toast("Please Enter Valid Course");
      }
      if (!this.state.due_date) {
        toast("Please Enter Valid Due Date");
      }
      if (!this.state.date) {
        toast("Please Enter Valid Date");
      }
      if (!this.state.paid) {
        toast("Please Enter Valid Paid Amount");
      }
      if (!this.state.email_id) {
        toast("Please Enter Valid Email ID");
      }
      if (!this.state.student_id) {
        toast("Please Enter Valid Student ID");
      }
    } else {
      var sendstate = {
        balance: this.state.balance,
        course: this.state.course,
        date: this.state.date,
        due_date: this.state.due_date,
        email_id: this.state.email_id,
        idinvoices: " ",
        paid: this.state.paid.toString(),
        student_id: this.state.student_id,
      };
      console.log(sendstate);
      axios
        .post(APIData.api + "invoices/", sendstate, {
          headers: APIData.headers,
        })

        .then((response) => {
          if (response.data.status.toString().toLowerCase() == "success") {
            printPage();
            toast(response.data.description);
            var url;
            if (sessiondetails.userType == "superadmin")
              url = new URL(APIData.url + "superAdminInvoice");
            else if (sessiondetails.userType == "admin")
              url = new URL(APIData.url + "invoice");
            setTimeout(() => {
              window.location.assign(url);
            }, 2000);
          } else {
            toast(response.data.errorDesc);
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        })
        .catch((error) => {
          toast("Generation failed");
          console.log(error);
        });
    }
  };

  render() {
    return (
      <div className="createInvoive">
        {this.state.loading || !this.state.coursesData ? (
          <Loading />
        ) : (
          <div>
            <div id="invoice" className="carrybox">
              <Link
                to={
                  sessiondetails.userType === "superadmin"
                    ? "superAdminInvoice"
                    : "invoice"
                }
              >
                <AiIcons.AiFillCloseCircle />
              </Link>
              <form className="invoice" onSubmit={this.submitHandler}>
                <div className=""></div>
                <div id="invoicePrint">
                  <div className="bringitcenter">
                    {" "}
                    <img className="invoiceimg" src={MainLogo} alt="Invoice" />
                    </div>
                    <div className="carrybox">
                    <h3 className="heading01">
                      CARE 4 EDU
                    {/* {APIData.orgName} */}
                      {/* AVINYA ACADEMY */}
                      </h3>
                    </div>
                    <div className="bringitcenter">
                    <div className="ptag">
                      228, Krishna, Temple Rd, Doddabommasandra, Vidyaranyapura,
                      Bengaluru, Karnataka 560097
                    </div>
                  </div>

                  <div className="floatleft">
                    <table>
                      <tr>
                        <td>
                          <label className="invoicelable"> INVOICE ID</label>
                          <input
                            className="invoiceinput"
                            name="invoice_id"
                            value={this.state.invoice_id}
                            placeholder="INVOICE ID"
                            type="number"
                            onChange={this.changeHandler}
                          ></input>
                          {/* {this.state.invoice_id_error ? (<div style={{color:'red' }}>
                             {this.state.invoice_id_error}
                            </div>)  : null} */}
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <label className="invoicelable"> STUDENT ID</label>
                          <input
                            className="invoiceinput"
                            name="student_id"
                            value={this.state.student_id}
                            placeholder="STUDENT ID"
                            type="text"
                            list="student_id"
                            onChange={this.changeHandler}
                          ></input>
                          <datalist id="student_id" className="invoiceinput">
                            {this.state.studentData.map((item, index) => {
                              return (
                                <option key={index} value={item.student_id}>
                                  {item.student_id}
                                </option>
                              );
                            })}
                            <option value="others">Others</option>
                          </datalist>
                          {/* {this.state.student_id_error ? (<div style={{color:'red' }}>
                             {this.state.student_id_error}
                            </div>)  : null} */}
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <label className="invoicelable">EMAIL</label>
                          <input
                            className="invoiceinput"
                            name="email_id"
                            value={this.state.email_id}
                            placeholder="EMAIL"
                            type="email"
                            onChange={this.changeHandler}
                          ></input>
                          {/* {this.state.email_id_error ? (<div style={{color:'red' }}>
                             {this.state.email_id_error}
                            </div>)  : null} */}
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <label className="invoicelable">DATE</label>
                          <input
                            className="invoiceinput"
                            name="date"
                            value={this.state.date}
                            placeholder="DATE"
                            type="DATE"
                            onChange={this.changeHandler}
                          ></input>
                          {/* {this.state.date_error ? (<div style={{color:'red' }}>
                             {this.state.date_error}
                            </div>)  : null} */}
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                      </tr>
                    </table>
                  </div>
                  <div className="floatright">
                    <table>
                      <tr>
                        <td>
                          <label className="invoicelable">Due Date</label>
                          <input
                            className="invoiceinput"
                            name="due_date"
                            value={this.state.due_date}
                            placeholder="Due Date"
                            type="date"
                            onChange={this.changeHandler}
                          ></input>
                          {/* {this.state.due_date_error ? (<div style={{color:'red' }}>
                             {this.state.due_date_error}
                            </div>)  : null} */}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label className="invoicelable">COURSE</label>
                          <select
                            className="invoiceinput"
                            placeholder="COURSE"
                            onChange={this.changeHandler}
                            type="text"
                            name="course"
                          >
                            <option value="" selected disabled hidden>
                              Select An Option
                            </option>
                            {this.state.coursesData.map((item, index) => {
                              return (
                                <option key={index} value={item.course_id}>
                                  {item.course_id}
                                </option>
                              );
                            })}
                            <option value="others">Others</option>
                          </select>

                          {/* <label className="invoicelable">COURSE</label>
                          <input
                            className="invoiceinput"
                            name="course"
                            value={this.state.course}
                            placeholder="COURSE"
                            onChange={this.changeHandler}
                          ></input> */}
                          {/* {this.state.course_error ? (<div style={{color:'red' }}>
                             {this.state.course_error}
                            </div>)  : null} */}
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <label className="invoicelable">PAID</label>
                          <input
                            className="invoiceinput"
                            name="paid"
                            value={this.state.paid}
                            placeholder="PAID"
                            type="number"
                            onChange={this.changeHandler}
                          ></input>
                          {/* {this.state.paid_error ? (<div style={{color:'red' }}>
                             {this.state.paid_error}
                            </div>)  : null} */}
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <label className="invoicelable">BALANCE</label>
                          <input
                            type="number"
                            className="invoiceinput"
                            name="balance"
                            value={this.state.balance}
                            placeholder="BALANCE"
                            onChange={this.changeHandler}
                          ></input>
                          {/* {this.state.balance_error ? (<div style={{color:'red' }}>
                             {this.state.balance_error}
                            </div>)  : null} */}
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                      </tr>
                    </table>
                  </div>
                  <div>
                    <div className="floatleft">
                      <br />
                      <br />
                      <br />
                      <div className="bringitcenter">Candidate's Signature</div>
                    </div>
                    <div className="floatright">
                      <br />
                      <br />
                      <br />
                      <div className="bringitcenter">
                        Organization Signature/Seal
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <button id="print" type="submit">
                    {" "}
                    PRINT INVOICE
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default CreateInvoice;
