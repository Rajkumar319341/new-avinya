import React, { Component } from 'react'
import { APIData, org } from '../Authentication/APIData';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import * as AiIcons from "react-icons/ai";
import Loading from '../Loading';

toast.configure();
const initialState = {}


const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));

class Rolesalocate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,

            roles: '',
            roles_error: '',

           designated_person: '',
           designated_person_error: '',

            email_id: '',
            email_id_error: '',

          


        }
    }

    componentDidMount() {
        this.fetchroles();
        this.fetchempdetails();
    }

    responseloading() {
        this.setState({ loading: !this.state.loading });
    }

    validation = () => {
        let  roles_error = '';
        let  email_id_error = '';
        let designated_person_error = '';
       

        if (!this.state.roles) {
            roles_error = "Invalid Role";
        }
        if (!this.state.email_id) {
            email_id_error = "Invalid Email";
        }

        if (!this.state.designated_person) {
            designated_person_error = "Invalid Name";
        }

        if (roles_error || designated_person_error || email_id_error ) {
            this.setState({ roles_error, designated_person_error, email_id_error,});
            return false;
        }
        return true;
    }


    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    fetchroles = e => {
        axios.get(APIData.api + `org-designation?org=${org}`, { headers: APIData.headers })
            .then((resp) => {
                console.log(resp.data);
                this.setState({ rolesOptions: resp.data });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    fetchempdetails = e => {
        axios.get(APIData.api + `login-type/users?org=${org}`, { headers: APIData.headers })
            .then((resp) => {
                console.log(resp.data);
                this.setState({ Empdetails: resp.data });
            })
            .catch((err) => {
                console.log(err);
            })

    }


    submitHandler = e => {
        e.preventDefault()
        const isValide = this.validation();
        if (!isValide) {
            this.setState(initialState)
            if (!this.state.job_id || !this.state.job_type || !this.state.salary || !this.state.job_tenure || !this.state.location || !this.state.description || !this.state.designated_person) {
                toast("Please Enter Valid Details");
            }

        }
        else {
            var sendstate = {

                // branch: this.state.branch,
                // description: this.state.description,
                // id: 0,
                designated_person: this.state.designated_person,
                email_id: this.state.email_id,
                id: 0,
                org: org,
                roles: this.state.roles
            }
            // this.responseloading();
            console.log(sendstate);

            axios.post(APIData.api + 'org-roles-head/', sendstate, { headers: APIData.headers })
                .then(response => {
                    // console.log(response);

                    toast("Job Added Successfully!")
                    window.location.reload();

                })
                .catch(error => {
                    // console.log(error)
                    toast.error("Please contact adminstartor")
                    this.responseloading();

                })
        }
    }

    render() {
        const { designated_person,roles,email_id } = this.state
        return (
            <div>
                {this.state.loading ? <Loading /> :
                    <form className="addjobs" onSubmit={this.submitHandler} >
                        <div className="carrybox">
                            <Link to={sessiondetails.userType == "superadmin" ? "deatiled roles" : "deatiled roles"}>
                                <AiIcons.AiFillCloseCircle />
                            </Link>
                            <div>
                                <h2 className="mainheading01">Allocate Role</h2>
                            </div>

                            <label className="heading02" htmlFor="Role">Role</label><br />
                            <select
                                className="inputfield"
                                name="roles"
                                type="text"
                                id="roles"
                                onChange={this.changeHandler}
                            >
                                <option value="" selected disabled hidden>
                                    SELECT AN OPTION
                                </option>

                                {this.state.rolesOptions && this.state.rolesOptions.length > 0 && this.state.rolesOptions.map((role) => (
                                    <option key={role.id} value={role.role}>
                                        {role.role}
                                    </option>
                                ))}
                            </select>

                            {this.state.roles_error ? (
                                <div style={{ color: 'red' }}>{this.state.roles_error}</div>
                            ) : null}

                            <label className="heading02" htmlFor="designated_person">Designated Person:</label><br />

                            <select
                                className="inputfield"
                                name="designated_person"
                                type="text"
                                id="designated_person"
                                onChange={this.changeHandler}

                            >
                                <option value="" selected disabled hidden>
                                    SELECT AN OPTION
                                </option>
                                {this.state.Empdetails && this.state.Empdetails.length > 0 && this.state.Empdetails.map((email) => (
                                    <option key={email.email_id} value={email.username}>
                                        {email.username}
                                    </option>
                                ))}

                            </select>
                            {this.state.designated_person_error ? (<div style={{ color: 'red' }}>
                                {this.state.designated_person_error}
                            </div>) : null}

                            <label className="heading02" htmlFor="JOB TYPE">Email:</label><br />

                            <select
                                className="inputfield"
                                name="email_id"
                                type="text"
                                id="email_id"
                                onChange={this.changeHandler}

                            >
                                <option value="" selected disabled hidden>
                                    SELECT AN OPTION
                                </option>
                                {this.state.Empdetails && this.state.Empdetails.length > 0 && this.state.Empdetails.map((email) => (
                                    <option key={email.email_id} value={email.email_id}>
                                        {email.email_id}
                                    </option>
                                ))}

                            </select>
                            {this.state.email_id_error ? (<div style={{ color: 'red' }}>
                                {this.state.email_id_error}
                            </div>) : null}
                            <div className="submitcarry">
                                <button className="Submitbutton" type="submit" >ADD +</button>
                            </div>
                        </div>
                    </form>}
            </div>
        );
    }
}

export default Rolesalocate;