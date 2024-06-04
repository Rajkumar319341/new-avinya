import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import React, { Component } from "react";
import { APIData } from "../Authentication/APIData";
import { toast } from "react-toastify";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import Loading from "../Loading";
import axios from 'axios';

const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));


class UserPasswordCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            username: "",
            password: "",
            user_id: sessiondetails.user,
            url: "",
            description: "",
            created_date: "",
            updated_date: "",
            empdata: [],
            showPass: false,
            loading: false,
        };
    }



    handlesubmit = (e) => {
        e.preventDefault();
        this.setState({ loadin: true })
        let today = new Date().toISOString().slice(0, 10);

        const userPasswordManage = {
            active: 1,
            id: 0,
            created_date: today,
            description: this.state.description,
            title: this.state.title,
            username: this.state.username,
            password: this.state.password,
            url: this.state.url,
            updated_date: "",
            user_id: this.state.user_id,
        };

        if (!this.state.urlError) {
            const url = APIData.api + "userpasswords/";

            axios.post(url, userPasswordManage, { headers: APIData.headers })
                .then(response => {
                    toast("Password Added Successfully!");
                    this.setState({ laoding: false })
                    this.props.history.push("/userPasswordManage");
                })
        }
        else {
            toast("Enter valid credentials and try again")
        }

    };


    render() {
        return (
            <div>
                {
                    this.state.loading ? <Loading />
                        :
                        (
                            <div>
                                <form className="createMarks" onSubmit={this.handlesubmit}>
                                    <div className="carrybox">
                                        <Link
                                            to="/userPasswordManage"
                                        >
                                            <AiIcons.AiOutlineCloseCircle />
                                        </Link>
                                        <div>
                                            <h2 className="mainheading01">User Password Manager</h2>
                                        </div>
                                        <label className="heading02">User ID</label>
                                        <input
                                            required
                                            readOnly
                                            className="inputfield"
                                            type="text"
                                            value={this.state.user_id}
                                            placeholder="Enter Title"
                                        />

                                        <label className="heading02">Title</label>
                                        <input
                                            required
                                            className="inputfield"
                                            type="text"
                                            placeholder="Enter Title"
                                            onChange={e => this.setState({ title: e.target.value })}
                                        />

                                        <label className="heading02">Username</label>
                                        <input
                                            required
                                            className="inputfield"
                                            type="text"
                                            placeholder="Enter Title"
                                            onChange={e => this.setState({ username: e.target.value })}
                                        />
                                        <label className="heading02">Password</label>
                                        <div className='password-input-container'>

                                            <input
                                                required
                                                className="inputfield"
                                                type={this.state.showPass ? "text" : "password"}
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
                                            placeholder="Enter Description"
                                            onChange={e => this.setState({ description: e.target.value })}
                                        />
                                    </div>
                                    <button className="Submitbutton" type="submit">Submit</button>
                                </form>
                            </div>
                        )
                }
            </div>
        );
    }
}

export default UserPasswordCreate;