
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../CRUDTable.css";
import { APIData, org } from "../Authentication/APIData";
import Loading from "../Loading";
import { toast } from "react-toastify";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import axios from 'axios';

const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));


class UserPasswordEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      passData: [],
      userPasswordid: "",
      title: "",
      username: "",
      password: "",
      user_id: sessiondetails.user,
      url: "",
      description: "",
      created_date: "",
      updated_date: "",
      showPass: false,
      loading: false,
    };
  }


  componentDidMount() {
    this.setState({ loading: true })
    const fetchData = async () => {
      try {
        const urll = APIData.api + "userpasswords/user/?id=" + sessiondetails.user;

        const response = await fetch(urll, { headers: APIData.headers });
        const daata = await response.json();
        const data = daata.filter(item => item.id === parseInt(this.props.value));

          // console.log(data)
        this.setState({
          title: data[0].title,
          username: data[0].username,
          password: data[0].password,
          url: data[0].url,
          description: data[0].description,
          created_date: data[0].created_date,
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

    this.setState({ loading: true })

    let today = new Date().toISOString().slice(0, 10);

    const userPasswordManage = {
      active: 1,
      id: 0,
      created_date: this.state.created_date,
      description: this.state.description,
      title: this.state.title,
      username: this.state.username,
      password: this.state.password,
      url: this.state.url,
      updated_date: today,
      user_id: this.state.user_id,
    };
    const url = APIData.api + "userpasswords/update?id=" + this.props.value;

    axios.put(url, userPasswordManage, { headers: APIData.headers })
      .then(response => {
        toast("Updation Successful!");
        this.setState({ loading: false })
        window.location.reload();
        this.props.changeListing(true);
      })

  };


  render() {
    return (
      <div>
        {
          this.state.loading ? <Loading />
            :
            (
              <div>
                <form className="createMarks" onSubmit={this.handleSubmit}>
                  <div className="carrybox">

                    <a onClick={() => { this.props.changeListing(true) }}>
                      <AiIcons.AiOutlineCloseCircle />
                    </a>

                    <div>
                      <h2 className="mainheading01">UPDATE USER PASSWORD</h2>
                    </div>
                    <label className="heading02">User ID</label>
                    <input
                      required
                      readOnly
                      className="inputfield"
                      type="text"
                      value={this.state.user_id}
                    />

                    <label className="heading02">Title</label>
                    <input
                      required
                      className="inputfield"
                      type="text"
                      value={this.state.title}
                      placeholder="Enter Title"
                      onChange={e => this.setState({ title: e.target.value })}
                    />

                    <label className="heading02">Username</label>
                    <input
                      required
                      className="inputfield"
                      type="text"
                      value={this.state.username}
                      placeholder="Enter Title"
                      onChange={e => this.setState({ username: e.target.value })}
                    />
                    <label className="heading02">Password</label>
                    <div className='password-input-container'>

                      <input
                        required
                        className="inputfield"
                        type={this.state.showPass ? "text" : "password"}
                        value={this.state.password}
                        placeholder="Enter Password"
                        onChange={e => this.setState({ password: e.target.value })}
                      />
                      <a className="password-input-button" onClick={() => { this.setState({ showPass: !this.state.showPass }) }}>
                        {this.state.showPass ? <FaIcons.FaEye /> : <FaIcons.FaEyeSlash />}
                      </a>
                    </div>

                    <label className="heading02">URL</label>
                    <input
                      className="inputfield"
                      type="text"
                      value={this.state.url}
                      placeholder="Enter URL"
                      onChange={e => {
                        if (/^(ftp|http|https):\/\/[^ "]+$/.test(e.target.value)) {
                          this.setState({ url: e.target.value, urlError: false })
                        } 
                        else if (e.target.value === "") {
                            this.setState({ url: e.target.value, urlError: false });
                        }
                        else {
                          this.setState({ url: e.target.value, urlError: true })
                        }
                      }}
                    />
                    {
                      this.state.urlError && this.state.url.length !== 0 && (
                        <div style={{ color: "red" }}>
                          Enter a valid url
                        </div>
                      )
                    }

                    <label className="heading02">Description</label>
                    <input
                      required
                      className="inputfield"
                      type="text"
                      value={this.state.description}
                      placeholder="Enter Description"
                      onChange={e => this.setState({ description: e.target.value })}
                    />
                  </div>
                  <button className="Submitbutton" type="submit">Submit</button>
                </form >
              </div>
            )
        }
      </div >
    );
  }
}


class UserPasswordManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskdata: null,
      currentPage: 1,
      totalItems: 0,
      itemsPerPage: 5,
      a: [],
      showPassword: false,
      id: 0,
      showListing: true,
      loading: true,
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(pageNumber) {
    this.setState({ currentPage: pageNumber });
  }

  Removefunction = (id) => {
    this.setState({ loading: true })
    // if (window.confirm('Do you want to remove?')) {
      const url = APIData.api + "userpasswords/delete/?id=" + id;

      axios.delete(url, { headers: APIData.headers })
        .then(response => {
          this.setState({ loading: false });
          toast("Password Deleted Successfully!");
          window.location.reload();
        })
    // }
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const url = APIData.api + `userpasswords/user/?id= ${sessiondetails.user}&org=${org}`;
   
    const response = await fetch(url, { headers: APIData.headers });
    const daata = await response.json();
    this.setState({ taskdata: daata, totalItems: daata.length, loading: false });
  }

  changeShowListing = (value) => {
    this.setState({ showListing: value })
  }

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
      posts &&
        (currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost))
    }

    return (

      <div className="adminJobs" >

        {this.state.loading ? <Loading />
          :
          this.state.showListing ?
            (
              <div className="carrybox">
                <Link to="/userPasswordCreate" className="btn btn-success">
                  <div className="Upload">
                    <AiIcons.AiOutlinePlusCircle />
                  </div>
                </Link>
                <div class="crud-table__caption">USER PASSWORD VAULT</div>
                <div className="table-container">

                <table className="crud-table">
                  <thead className="crud-table__header">
                    <tr className="crud-table__row crud-table__row--fields">
                     <th className="crud-table__header-cell">Title</th>
                      <th className="crud-table__header-cell">Username</th>
                      <th className="crud-table__header-cell">Password</th>
                      <th className="crud-table__header-cell">URL</th>
                      <th className="crud-table__header-cell">Description</th>
                      <th className="crud-table__header-cell">Action</th>
                    </tr>
                  </thead>
                  <tbody>

                    {currentPosts &&
                      currentPosts
                        .map(item => (
                          <tr key={item.id}>
                            <td className="crud-table__cell">{item.title}</td>
                            <td className="crud-table__cell">{item.username}</td>

                            {
                              (this.state.showPassword === true && this.state.id === item.id)
                                ?
                                (<td className="crud-table__cell">{item.password}</td>)
                                :
                                (<td className="crud-table__cell">********</td>)
                            }

                            <td className="crud-table__cell">{item.url}</td>
                            <td className="crud-table__cell">{item.description}</td>

                            <td className="crud-table__cell">
                              <a onClick={() => { this.setState({ showListing: false, userPasswordid: item.id }) }}>
                                <button className="crud-button crud-button--primary">
                                  <FaIcons.FaEdit />
                                </button>
                              </a>

                              <a onClick={() => { this.Removefunction(item.id) }} className="btn btn-danger">
                                <button class="crud-button crud-button--negative">
                                  <AiIcons.AiFillDelete />
                                </button>
                              </a>

                              <a onClick={() => { this.setState({ showPassword: !this.state.showPassword, id: item.id }) }} className="btn btn-danger">
                                <button className="crud-button crud-button--primary">
                                  {this.state.showPassword && this.state.id === item.id ? <FaIcons.FaEye /> : <FaIcons.FaEyeSlash />}
                                </button>
                              </a>

                            </td>
                          </tr>
                        ))
                    }
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
            )

            :
            (<UserPasswordEdit changeListing={this.changeShowListing} value={this.state.userPasswordid} />)
        }
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
    <ul className='pagination'>
      {pageNumbers.map(number => (
        <span key={number} className={`page-item${number === current ? ' active' : ''}`}>
          <button onClick={() => onChange(number)} className={`crud-table-pagination__link--${number === current ? 'active' : 'inactive'} crud-table-pagination__link margin-pagination`}>
            {number}
          </button>
        </span>
      ))}
    </ul>
  );
};

export default UserPasswordManage;
