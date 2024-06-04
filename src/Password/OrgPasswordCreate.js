import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import React, { Component } from "react";
import { APIData } from "../Authentication/APIData";
import { toast } from "react-toastify";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import axios from "axios";
import Loading from "../Loading";

let a = [];

const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
class OrgPasswordCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            username: "",
            password: "",
            url: "",
            description: "",
            created_date: "",
            created_by: "",
            updated_by: "",
            updated_date: "",
            supervisor_emailid: "",
            supervisor_id: "",
            empdata: [],
            loading: false,
            showPass: false,
        };
    }

    async componentDidMount() {
        this.setState({ loading: true })
        try {
            const url = APIData.api + "employee/details";
            const response = await fetch(url, { headers: APIData.headers });
            const daata = await response.json();

            this.setState({ empdata: daata });
        } catch (err) {
            toast(err);
        }
        this.setState({ loading: false })
    }

    updateSupervisor = (supervisor_id) => {
        if (supervisor_id === "c4eadmin") {
            this.setState({ supervisor_id: supervisor_id, supervisor_emailid: "info@care4edu.com" })
        }
        else {
            const data = this.state.empdata.filter(
                (item) => item.faculty_id === supervisor_id
            );

            this.setState({ supervisor_id: supervisor_id, supervisor_emailid: data[0].email });
        }
    }

    handlesubmit = (e) => {
        e.preventDefault();
        this.setState({ loading: true })
        let today = new Date().toISOString().slice(0, 10);

        const orgPasswordManage = {
            title: this.state.title,
            username: this.state.username,
            password: this.state.password,
            url: this.state.url,
            description: this.state.description,
            created_by: sessiondetails.user,
            supervisor_id: this.state.supervisor_id,
            updated_by: this.state.updated_by,
            supervisor_email: this.state.supervisor_emailid,
            created_date: today,
            updated_date: "",
        };

        // console.log(orgPasswordManage)

        if (!this.state.urlError) {
            const url = APIData.api + "orgpasswords/";

            axios
                .post(url, orgPasswordManage, { headers: APIData.headers })
                .then((response) => {
                    toast("Password Added Successfully!");
                    this.props.history.push("/orgPasswordManage");
                });
        } else {
            toast("Enter valid credentials and try again");
        }
        this.setState({ loading: false })

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
                                        <Link to="/OrgPasswordManage">
                                            <AiIcons.AiOutlineCloseCircle />
                                        </Link>
                                        <div>
                                            <h2 className="mainheading01">Org Password Manage</h2>
                                        </div>
                                        <label className="heading02">Title</label>
                                        <input
                                            required
                                            className="inputfield"
                                            type="text"
                                            placeholder="Enter Title"
                                            onChange={(e) => this.setState({ title: e.target.value })}
                                        />

                                        <label className="heading02">Username</label>
                                        <input
                                            required
                                            className="inputfield"
                                            type="text"
                                            placeholder="Enter Username"
                                            onChange={(e) => this.setState({ username: e.target.value })}
                                        />

                                        <label className="heading02">Password</label>
                                        <div className="password-input-container">
                                            <input
                                                required
                                                className="inputfield"
                                                type={this.state.showPass ? "text" : "password"}
                                                placeholder="Enter Password"
                                                onChange={(e) => this.setState({ password: e.target.value })}
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
                                            onChange={(e) => {
                                                if (/^(ftp|http|https):\/\/[^ "]+$/.test(e.target.value)) {
                                                    this.setState({ url: e.target.value, urlError: false });
                                                }
                                                else if (e.target.value === "") {
                                                    this.setState({ url: e.target.value, urlError: false });
                                                }
                                                else {
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
                                            placeholder="Enter Description"
                                            onChange={(e) => this.setState({ description: e.target.value })}
                                        />

                                        <label className="heading02">Supervisor id</label>
                                        <div>
                                            <select
                                                name="selectList"
                                                id="selonClickctList"
                                                onChange={(e) => {
                                                    this.updateSupervisor(e.target.value)
                                                }}
                                            >
                                                <option value="" selected>
                                                    Select Supervisor ID
                                                </option>
                                                {
                                                    (a = [
                                                        "c4eadmin",
                                                        ...new Set(this.state.empdata.map((item) => item.faculty_id)),
                                                    ])
                                                }
                                                {a.map((item, index) => {
                                                    return (
                                                        <option name="selectedID" value={item}>
                                                            {item}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>

                                        <label className="heading02">Supervisor email</label>

                                        <input
                                            required
                                            readOnly
                                            className="inputfield"
                                            type="text"
                                            value={this.state.supervisor_emailid}
                                        />
                                    </div>
                                    <button className="Submitbutton" type="submit">
                                        Submit
                                    </button>
                                </form>
                            </div>
                        )
                }
            </div>
        );
    }
}

export default OrgPasswordCreate;
