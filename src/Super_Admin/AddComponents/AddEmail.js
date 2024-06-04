import React, { Component } from 'react'
import { APIData, org } from '../../Authentication/APIData';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import * as AiIcons from "react-icons/ai";
import Loading from '../../Loading'

toast.configure();
const initialState = {}


const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));

class AddEmail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            id: '',
            id_error: '',

            emailId: '',
            email_error: '',

            client: '',
            client_error: '',

            password: '',
            password_error: '',

            purpose: '',
            purpose_error: '',

            // course_description: '',
            // course_description_error: '',

            // course_sub_type: '',
            // course_sub_type_error: ''

        }
    }

    responseloading() {
        this.setState({ loading: !this.state.loading });
    }

    validation = () => {
        let id_error = '';
        let email_error = '';
        let client_error = '';
        let password_error = '';
        let purpose_error = '';
        // let course_description_error = '';
        // let course_sub_type_error = '';


        if (!this.state.id) {
            id_error = "Invalid ID";
        }
        if (!this.state.emailId) {
            email_error = "Invalid  Email Id";
        }
        if (!this.state.client) {
            client_error = "Invalid Course Client";
        }
        if (!this.state.password) {
            password_error = "Invalid  Password";
        }
        if (!this.state.purpose) {
            purpose_error = "Invalid Purpose";
        }
        // if (!this.state.course_description) {
        //     course_description_error = "Invalid Course Description";
        // }
        // if (!this.state.course_sub_type) {
        //     course_sub_type_error = "Invalid Course Subtype";
        // }
        if (id_error || email_error || client_error || password_error || purpose_error) {
            this.setState({ id_error, email_error, client_error, password_error, purpose_error });
            return false;
        }
        return true;
    }


    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = e => {
        e.preventDefault()
        const isValide = this.validation();
        if (!isValide) {
            this.setState(initialState)
            if (!this.state.id || !this.state.emailId || !this.state.client || !this.state.password || !this.state.purpose) {
                toast("Please Enter Valid Details");
            }

        }
        else {
            var sendstate = {
                org:org,
                id: this.state.id,
                emailId: this.state.emailId,
                client: this.state.client,
                password: this.state.password,
                purpose: this.state.purpose,
                createdDate: '',
                updatedBy: '',
                updatedDate: '',
              
            }
            console.log(sendstate);
            this.responseloading();

            axios.post(APIData.api + 'asset-email/create/', sendstate, { headers: APIData.headers })
                .then(response => {
              
                    toast("Email Added Successfully!")
                   
                    this.responseloading();
                })
                .catch(error => {
                    console.log(error)
                    this.responseloading();

                })
        }


    }

    render() {
        const { id, email, password, purpose, emailId, client } = this.state
        return (
            <div>
                {this.state.loading ? <Loading /> :
                    <form className="addemails" onSubmit={this.submitHandler} >
                        <div className="carrybox">
                            <Link to={sessiondetails.userType == "superadmin" ? "emails" : "emails"}>
                                <AiIcons.AiFillCloseCircle />
                            </Link>
                            <div>
                                <h2 className="mainheading01">ADD EMAILS</h2>
                            </div>
                            <div className="floatleft">

                                <label className="heading02" htmlFor="ID"> ID:</label><br />
                                <input
                                    placeholder="ID"
                                    className="inputfield"

                                    type="text"
                                    name="id"
                                    value={id}
                                    onChange={this.changeHandler}
                                />
                                {this.state.id_error ? (<div style={{ color: 'red' }}>
                                    {this.state.course_id_error}
                                </div>) : null}
                                <label className="heading02" htmlFor="Email ID">Email ID:</label><br />
                                <input
                                    placeholder="Email ID"
                                    className="inputfield"

                                    type="text"
                                    name="emailId"
                                    value={emailId}
                                    onChange={this.changeHandler}
                                />
                                {this.state.email_error ? (<div style={{ color: 'red' }}>
                                    {this.state.email_error}
                                </div>) : null}





                                <label className="heading02" htmlFor="Password">PASSWORD:</label><br />

                                <input
                                    placeholder="PASSWORD"
                                    className="inputfield"

                                    type="text"
                                    name="password"
                                    value={password}
                                    onChange={this.changeHandler}

                                />
                                {this.state.password_error ? (<div style={{ color: 'red' }}>
                                    {this.state.password_error}
                                </div>) : null}

                            </div>
                            <div className="floatright">

                                <label className="heading02" htmlFor="client">CLIENT:</label><br />

                                <input
                                    placeholder="CLIENT"
                                    className="inputfield"

                                    type="text"
                                    name="client"
                                    value={client}
                                    onChange={this.changeHandler}

                                />
                                {this.state.client_error ? (<div style={{ color: 'red' }}>
                                    {this.state.client_error}
                                </div>) : null}

                                <label className="heading02" htmlFor="Purpose">PURPOSE:</label><br />

                                <input
                                    placeholder="PURPOSE"
                                    className="inputfield"

                                    type="text"
                                    name="purpose"
                                    value={purpose}
                                    onChange={this.changeHandler}

                                />

                                {this.state.purpose_error ? (<div style={{ color: 'red' }}>
                                    {this.state.purpose_error}
                                </div>) : null}
                             
                            </div>

                            <div className="submitcarry">
                                <button className="Submitbutton" type="submit" >ADD +</button>


                            </div>
                        </div>
                    </form>}
            </div>
        );
    }
}

export default AddEmail;