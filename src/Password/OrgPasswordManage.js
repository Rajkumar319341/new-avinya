import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../CRUDTable.css";
import { APIData, org } from "../Authentication/APIData";
import Loading from "../Loading";
import { toast } from "react-toastify";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import * as TiIcons from "react-icons/ti";
import axios from "axios";

const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));

class OrgPasswordEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      username: "",
      password: "",
      url: "",
      description: "",
      created_date: "",
      updated_date: "",
      created_by: "",
      updated_by: "",
      supervisor_email: "",
      supervisor_id: "",
      loading: false,
      showPass: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    const fetchData = async () => {
      try {
        const urll =
          APIData.api + "orgpasswords/orgpassword?title=" + this.props.value;
        const response = await fetch(urll, { headers: APIData.headers });
        const data = await response.json();

        // console.log(data)

        this.setState({
          title: data.title,
          username: data.username,
          password: data.password,
          url: data.url,
          description: data.description,
          created_date: data.created_date,
          updated_date: data.updated_date,
          created_by: data.created_by,
          updated_by: data.updated_by,
          supervisor_email: data.supervisor_email,
          supervisor_id: data.supervisor_id,
          loading: false,
        });
      } catch (err) {
        toast(err);
      }
    };
    fetchData();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    let today = new Date().toISOString().slice(0, 10);

    const OrgPasswordManage = {
      active: 1,
      id: 0,
      title: this.state.title,
      username: this.state.username,
      password: this.state.password,
      url: this.state.url,
      description: this.state.description,
      updated_date: today,
      created_by: this.state.created_by,
      updated_by: sessiondetails.user,
      updated_date: today,
      // created_date: this.state.created_date,
      supervisor_email: this.state.supervisor_email,
      supervisor_id: this.state.supervisor_id,
    };

    // console.log(OrgPasswordManage)
    const url = APIData.api + "orgpasswords/update?title=" + this.props.value;

    axios
      .put(url, OrgPasswordManage, { headers: APIData.headers })
      .then((response) => {
        toast("Updation Successful!");
        window.location.reload();
        this.props.changeListing(true);
      });
    this.setState({ loading: false });
  };

  render() {
    return (
      <div>
        {this.state.loading ? (
          <Loading />
        ) : (
          <div>
            <form className="createMarks" onSubmit={this.handleSubmit}>
              <div className="carrybox">
                <a
                  onClick={() => {
                    this.props.changeListing(true);
                  }}
                >
                  <AiIcons.AiOutlineCloseCircle />
                </a>

                <div>
                  <h2 className="mainheading01">UPDATE ORG PASSWORD</h2>
                </div>

                <label className="heading02">Title</label>
                <input
                  required
                  readOnly
                  className="inputfield"
                  type="text"
                  value={this.state.title}
                  placeholder="Enter Title"
                  onChange={(e) => this.setState({ title: e.target.value })}
                />

                <label className="heading02">Username</label>
                <input
                  required
                  className="inputfield"
                  type="text"
                  value={this.state.username}
                  placeholder="Enter Title"
                  onChange={(e) => this.setState({ username: e.target.value })}
                />

                <label className="heading02">Password</label>
                <div className="password-input-container">
                  <input
                    required
                    className="inputfield"
                    type={this.state.showPass ? "text" : "password"}
                    value={this.state.password}
                    placeholder="Enter Password"
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                  />
                  <a
                    className="password-input-button"
                    onClick={() => {
                      this.setState({ showPass: !this.state.showPass });
                    }}
                  >
                    {this.state.showPass ? (
                      <FaIcons.FaEye />
                    ) : (
                      <FaIcons.FaEyeSlash />
                    )}
                  </a>
                </div>

                <label className="heading02">URL</label>
                <input
                  className="inputfield"
                  type="text"
                  value={this.state.url}
                  placeholder="Enter URL"
                  onChange={(e) => {
                    if (/^(ftp|http|https):\/\/[^ "]+$/.test(e.target.value)) {
                      this.setState({ url: e.target.value, urlError: false });
                    } else if (e.target.value === "") {
                      this.setState({ url: e.target.value, urlError: false });
                    } else {
                      this.setState({ url: e.target.value, urlError: true });
                    }
                  }}
                />
                {this.state.urlError && this.state.url.length !== 0 && (
                  <div style={{ color: "red" }}>Enter a valid url</div>
                )}

                <label className="heading02">Description</label>
                <input
                  required
                  className="inputfield"
                  type="text"
                  value={this.state.description}
                  placeholder="Enter Description"
                  onChange={(e) =>
                    this.setState({ description: e.target.value })
                  }
                />
              </div>
              <button className="Submitbutton" type="submit">
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

class ApplyPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskdata: null,
      a: [],
      showPassword: false,
      title: "",
      reason: "",
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const url =
      APIData.api + "orgpasswords/orgpassword?title=" + this.props.value;
    const response = await fetch(url, { headers: APIData.headers });
    const daata = await response.json();

    this.setState({ taskdata: daata, loading: false });
    // console.log(daata)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    let today = new Date().toISOString().slice(0, 10);

    const OrgAccessRequest = {
      authorised_at: "",
      authorised_by: "",
      id: 0,
      reason: this.state.reason,
      reject_reason: "",
      requested_by: sessiondetails.user,
      requested_email: sessiondetails.email,
      requested_at: today,
      status: "",
      supervisor_email: this.state.taskdata.supervisor_email,
      supervisor_id: this.state.taskdata.supervisor_id,
      title: this.props.value,
    };

    const url = APIData.api + "passwordaccess/";
    axios
      .post(url, OrgAccessRequest, { headers: APIData.headers })
      .then((response) => {
        toast("Application Submitted");
        this.props.changeReason(false);
      });

    this.setState({ loading: false });
  };

  render() {
    return (
      <div>
        {this.state.loading ? (
          <Loading />
        ) : (
          <div>
            <form className="createMarks" onSubmit={this.handleSubmit}>
              <div className="carrybox">
                <a
                  onClick={() => {
                    this.props.changeReason(false);
                  }}
                >
                  <AiIcons.AiOutlineCloseCircle />
                </a>

                <div>
                  <h2 className="mainheading01">REASON</h2>
                </div>

                <label className="heading02">Title</label>
                <input
                  required
                  readOnly
                  className="inputfield"
                  type="text"
                  value={this.props.value}
                  placeholder="Enter Title"
                  onChange={(e) => this.setState({ title: e.target.value })}
                />

                <label className="heading02">Reason</label>
                <input
                  required
                  className="inputfield"
                  type="text"
                  value={this.state.reason}
                  placeholder="Enter Reason"
                  onChange={(e) => this.setState({ reason: e.target.value })}
                />
              </div>
              <button className="Submitbutton" onClick={this.submitReason}>
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

class OrgPasswordManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskdata: null,
      currentPage: 1,
      totalItems: 0,
      itemsPerPage: 5,
      a: [],
      showPassword: false,
      title: "",
      showListing: true,
      orgTitle: "",
      showReason: false,
      reason: "",
      loading: false,
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(pageNumber) {
    this.setState({ currentPage: pageNumber });
  }

  Removefunction = (title) => {
    this.setState({ loading: true });

    const url =
      APIData.api + "orgpasswords/delete?title=" + title.split(" ").join(" ");
    axios
      .delete(url, { headers: APIData.headers })
      .then((response) => {
        toast("Title Deleted Successfully!");
        window.location.reload();
      })
      .catch((error) => {
        toast("Remove all associated requests and try again");
      });

    this.setState({ loading: false });
  };
  async componentDidMount() {
    this.setState({ loading: true });
    const url = APIData.api + `orgpasswords/orgpassword/details?org=${org}`;
    const response = await fetch(url, { headers: APIData.headers });
    const daata = await response.json();
    this.setState({
      taskdata: daata,
      totalItems: daata.length,
      loading: false,
    });
  }

  handleReasonSubmit = () => {
    let today = new Date().toISOString().slice(0, 10);
    this.setState({ loading: true });

    const orgPasswordReason = {
      title: this.state.title,
      requested_by: sessiondetails.user,
      supervisor_id: this.state.supervisor_id,
      authorised_by: "",
      supervisor_email: this.state.supervisor_emailid,
      reuested_at: today,
      authorised_at: "",
    };

    if (!this.state.urlError) {
      const url = APIData.api + "orgpasswords/";

      axios
        .post(url, orgPasswordReason, { headers: APIData.headers })
        .then((response) => {
          toast("Password Added Successfully!");
          this.props.history.push("/orgPasswordListing");
        });
    } else {
      toast("Enter valid credentials and try again");
    }

    this.setState({ loading: false });
  };

  changeListing = (value) => {
    this.setState({ showListing: value });
  };

  changeReason = (value) => {
    this.setState({ showReason: value });
  };

  render() {
    const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
    const { taskdata } = this.state;
    const posts = this.state.taskdata;
    const currentPage = this.state.currentPage;
    const totalItems = this.state.totalItems;
    const itemsPerPage = this.state.itemsPerPage;

    const indexOfLastPost = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    let currentPosts;
    {
      posts && (currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost));
    }

    return (
      <div className="adminJobs">
        {this.state.showListing && !this.state.showReason ? (
          <div className="carrybox">
            {this.state.loading ? (
              <Loading />
            ) : (
              <div>
                {sessiondetails.userType === "employee" ? (
                  ""
                ) : (
                  <Link to="/orgPasswordCreate" className="btn btn-success">
                    <div className="Upload">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 512 512"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"></path>
                      </svg>
                    </div>
                  </Link>
                )}
                <div class="crud-table__caption">ORG PASSWORD VAULT</div>
                <div className="table-container">

                <table className="crud-table">
                    
                  <thead className="crud-table__header">
                    <tr className="crud-table__row crud-table__row--fields">
                      <th className="crud-table__header-cell">Title</th>
                      <th className="crud-table__header-cell">URL</th>
                      <th className="crud-table__header-cell">Description</th>
                      <th className="crud-table__header-cell">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPosts &&
                      currentPosts.map((item) => (
                        <tr key={item.id}>
                          <td className="crud-table__cell">{item.title} </td>
                          <td className="crud-table__cell">{item.url}</td>
                          <td className="crud-table__cell">
                            {item.description}
                          </td>
                          <td>
                            {
                              // sessiondetails.userType === "employee" ? "" :
                              sessiondetails.userType === "superadmin" ||
                              item.supervisor_id === sessiondetails.user ||
                              item.created_by === sessiondetails.user ? (
                                <span>
                                  <a
                                    onClick={() => {
                                      this.setState({
                                        showListing: false,
                                        orgTitle: item.title,
                                      });
                                    }}
                                  >
                                    <button class="crud-button crud-button--primary">
                                      <FaIcons.FaEdit />
                                    </button>
                                  </a>
                                  {sessiondetails.userType === "superadmin" ||
                                  item.created_by === sessiondetails.user ? (
                                    <a
                                      onClick={() => {
                                        this.Removefunction(item.title);
                                      }}
                                      className="btn btn-danger"
                                    >
                                      <button class="crud-button crud-button--negative">
                                        <AiIcons.AiFillDelete />
                                      </button>
                                    </a>
                                  ) : (
                                    ""
                                  )}
                                </span>
                              ) : (
                                ""
                              )
                            }
                            <a
                              onClick={() => {
                                this.setState({
                                  showReason: true,
                                  orgTitle: item.title,
                                });
                              }}
                            >
                              <button className="crud-button crud-button--primary">
                                <FaIcons.FaLock />
                              </button>
                            </a>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                </div>
                <Pagination
                  current={currentPage}
                  total={totalItems}
                  itemsPerPage={itemsPerPage}
                  onChange={this.handlePageChange}
                />
              </div>
            )}
          </div>
        ) : !this.state.showListing && !this.state.showReason ? (
          <OrgPasswordEdit
            changeListing={this.changeListing}
            value={this.state.orgTitle}
          />
        ) : this.state.showReason ? (
          <ApplyPassword
            changeReason={this.changeReason}
            value={this.state.orgTitle}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

const Pagination = ({ current, total, itemsPerPage, onChange }) => {
  const totalPages = Math.ceil(total / itemsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination">
      {pageNumbers.map((number) => (
        <span
          key={number}
          className={`page-item${number === current ? " active" : ""}`}
        >
          <button
            onClick={() => onChange(number)}
            className={`crud-table-pagination__link--${
              number === current ? "active" : "inactive"
            } crud-table-pagination__link margin-pagination`}
          >
            {number}
          </button>
        </span>
      ))}
    </ul>
  );
};

export default OrgPasswordManage;
