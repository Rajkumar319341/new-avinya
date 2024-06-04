import React, { Component } from 'react'
import { APIData, org } from '../../Authentication/APIData';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import * as AiIcons from "react-icons/ai";
import Loading from '../../Loading';

toast.configure();
const initialState = {

}

const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));

class AddCourses extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            course_id: '',
            course_id_error: '',

            course_type: '',
            course_type_error: '',

            course_fees: '',
            course_fees_error: '',

            course_duration: '',
            course_duration_error: '',

            admin_id: sessiondetails.user,
            admin_id__error: '',

            course_description: '',
            course_description_error: '',

            course_sub_type: '',
            course_sub_type_error: ''

        }
    }
    responseloading() {
        this.setState({ loading: !this.state.loading });
    }
    validation = () => {
        let course_id_error = '';
        let course_type_error = '';
        let course_fees_error = '';
        let course_duration_error = '';
        let admin_id__error = '';
        let course_description_error = '';
        let course_sub_type_error = '';


        if (!this.state.course_id) {
            course_id_error = "Invalid Course ID";
        }
        if (!this.state.course_fees) {
            course_fees_error = "Invalid Course Fees";
        }

        if (!this.state.course_duration) {
            course_duration_error = "Invalid Course Duration";
        }
        if (!this.state.course_type) {
            course_type_error = "Invalid Course Duration";
        }
        if (!this.state.admin_id_) {
            admin_id__error = "Invalid Admin ID";
        }
        if (!this.state.course_description) {
            course_description_error = "Invalid Course Description";
        }
        if (!this.state.course_sub_type) {
            course_sub_type_error = "Invalid Course Sub Type";
        }



        if (course_id_error || course_type_error || course_fees_error || course_duration_error || admin_id__error || course_description_error || course_sub_type_error) {
            this.setState({ course_id_error, course_type_error, course_fees_error, course_duration_error, admin_id__error, course_description_error, course_sub_type_error });
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
            if (!this.state.course_id || !this.state.course_type || !this.state.course_fees || !this.state.course_duration || !this.state.admin_id || !this.state.course_description || !this.state.course_sub_type) {
                toast("Please Enter Valid Details");

            }


            else {
                var sendstate = {
                    org:org,
                    course_id: this.state.course_id,
                    course_type: this.state.course_type,
                    course_fees: this.state.course_fees,
                    course_duration: this.state.course_duration,
                    admin_id: sessiondetails.user,
                    course_description: this.state.course_description,
                    course_sub_type: this.state.course_sub_type,

                }
                this.responseloading();
                axios.post(APIData.api + 'courses/', sendstate, { headers: APIData.headers })
                    .then(response => {
                        var url;
                        toast("Course Added Successfully!")
                        if (sessiondetails.userType == "superadmin")
                            url = new URL(APIData.url + "superAdminCourses")
                        else if (sessiondetails.userType == "admin")
                            url = new URL(APIData.url + "courses")


                        window.location.assign(url)
                        this.responseloading();
                    })
                    .catch(error => {
                        this.responseloading();
                        console.log(error)
                    })
            }

        }
    }
    render() {
        const { course_id, course_type, course_fees, course_duration, course_description, course_sub_type } = this.state
        return (
            <div>
                {this.state.loading ? <Loading /> :
                    <form className="superaddcourses" onSubmit={this.submitHandler}>
                        <Link to={sessiondetails.userType == "superadmin" ? "superAdminCourses" : "courses"}>
                            <AiIcons.AiFillCloseCircle />
                        </Link>
                        <div className="carrybox">
                            <div>
                                <h2 className="mainheading01">ADD COURSE</h2>
                            </div>
                            <div className="floatleft">
                                <div className="">
                                    <label className="heading02" htmlFor="COURSE ID">COURSE ID:</label><br />
                                    <input
                                        placeholder="COURSE ID"
                                        className="inputfield"

                                        type="text"
                                        name="course_id"
                                        value={course_id}
                                        onChange={this.changeHandler}



                                    />
                                    {this.state.course_id_error ? (<div style={{ color: 'red' }}>
                                        {this.state.course_id_error}
                                    </div>) : null}

                                </div>
                                <div className="">
                                    <label className="heading02" htmlFor="COURSE TYPE">COURSE TYPE:</label><br />

                                    <select
                                        placeholder="COURSE TYPE"
                                        className="inputfield"
                                        value={course_type}
                                        onChange={this.changeHandler}
                                        type="text"
                                        name="course_type"
                                    >
                                        <option value="" selected disabled hidden>
                                            Select An Option
                                        </option>
                                        <option
                                        >
                                            course-professional
                                        </option>
                                        <option
                                        >
                                            course-academics
                                        </option>
                                    </select>
                                    {this.state.course_type_error ? (<div style={{ color: 'red' }}>
                                        {this.state.course_type_error}
                                    </div>) : null}
                                </div>


                                <div className="">
                                    <label className="heading02" htmlFor="COURSE FEES">COURSE FEES:</label><br />

                                    <input
                                        placeholder="COURSE FEES"
                                        className="inputfield"

                                        type="number"
                                        name="course_fees"
                                        value={course_fees}
                                        onChange={this.changeHandler}

                                    />
                                    {this.state.course_fees_error ? (<div style={{ color: 'red' }}>
                                        {this.state.course_fees_error}
                                    </div>) : null}
                                </div>
                            </div>
                            <div className="floatright">
                                <div className="">


                                    <label className="heading02" htmlFor="COURSE DURATION">COURSE DURATION:</label><br />

                                    <input
                                        placeholder="COURSE DURATION"
                                        className="inputfield"

                                        type="text"
                                        name="course_duration"
                                        value={course_duration}
                                        onChange={this.changeHandler}

                                    />

                                    {this.state.course_duration_error ? (<div style={{ color: 'red' }}>
                                        {this.state.course_duration_error}
                                    </div>) : null}
                                </div>
                                <div className="">
                                    <label className="heading02" htmlFor="COURSE DESCRIPTION">COURSE DESCRIPTION:</label><br />

                                    <textarea
                                        placeholder="COURSE DESCRIPTION"
                                        className="inputfield"

                                        type="text"
                                        name="course_description"
                                        value={course_description}
                                        onChange={this.changeHandler}
                                    />

                                    {this.state.course_description_error ? (<div style={{ color: 'red' }}>
                                        {this.state.course_description_error}
                                    </div>) : null}
                                </div>
                                <div className="">
                                    <label className="heading02" htmlFor="COURSE SUB TYPE">COURSE SUB TYPE:</label><br />

                                    <textarea
                                        placeholder="COURSE SUB TYPE"
                                        className="inputfield"

                                        type="text"
                                        name="course_sub_type"
                                        value={course_sub_type}
                                        onChange={this.changeHandler}
                                    />
                                    {this.state.course_sub_type_error ? (<div style={{ color: 'red' }}>
                                        {this.state.course_sub_type_error}
                                    </div>) : null}
                                </div>
                            </div>
                            <div className="submitcarry">
                                <button className="Submitbutton" type="submit"  >ADD +</button>


                            </div>
                        </div>
                    </form>}
            </div>
        );
    }
}

export default AddCourses;