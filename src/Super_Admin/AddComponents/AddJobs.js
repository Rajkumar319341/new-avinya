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

class AddJobs extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            job_id: '',
            job_id_error: '',

            job_type: '',
            job_type_error: '',

            salary: '',
            salary_error: '',

            job_tenure: '',
            job_tenure_error: '',

            location: "",
            location_error: '',

            description: '',
            description_error: '',

            roles: '',
            roles_error: '',

            valid: '',
            valid_error: '',

            job_dept: '',
            job_dept_error: '',



        }
    }

    componentDidMount() {
        this.fetchroles();
    }

    responseloading() {
        this.setState({ loading: !this.state.loading });
    }

    validation = () => {
        let job_id_error = '';
        let job_type_error = '';
        let salary_error = '';
        let job_tenure_error = '';
        let description_error = '';
        let job_dept_error = '';
        let location_error = '';
        let roles_error = '';
        let valid_error = "";


        if (!this.state.job_id) {
            job_id_error = "Invalid job ID";
        }
        if (!this.state.salary) {
            salary_error = "Invalid job Salary";
        }

        if (!this.state.job_tenure) {
            job_tenure_error = "Invalid job Duration";
        }

        if (!this.state.job_dept) {
            job_dept_error = "Invalid job Department";
        }

        if (!this.state.job_type) {
            job_type_error = "Invalid job Type";
        }
        if (!this.state.location) {
            location_error = "Invalid location";
        }
        if (!this.state.description) {
            description_error = "Invalid job Description";
        }

        if (!this.state.valid) {
            valid_error = "Invalid valid type";
        }



        if (!this.state.roles) {
            roles_error = "Invalid job role";
        }
        if (job_id_error || job_type_error || salary_error || job_tenure_error || location_error || description_error || job_type_error || job_dept_error || roles_error || valid_error) {
            this.setState({ job_id_error, job_type_error, salary_error, job_tenure_error, location_error, description_error, job_type_error, job_dept_error, roles_error, valid_error });
            return false;
        }
        return true;
    }


    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    fetchroles = e => {
        axios.get(APIData.api + `org-designation/all-dept?org=${org}`, { headers: APIData.headers })
            .then((resp) => {
                // console.log(resp.data);
                this.setState({ rolesOptions: resp.data });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    onFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                const imageUrl = reader.result.split(',')[1];
                this.setState({ selectedFile: file, image_url: imageUrl });
            };
        }
    };

    submitHandler = e => {
        e.preventDefault()
        const isValide = this.validation();
        if (!isValide) {
            this.setState(initialState)
            if (!this.state.job_id || !this.state.job_type || !this.state.salary || !this.state.job_tenure || !this.state.location || !this.state.description || !this.state.job_dept) {
                toast("Please Enter Valid Details");
            }

        }
        else {
            var sendstate = {

                branch: this.state.branch,
                description: this.state.description,
                id: 0,
                job_dept: this.state.job_dept,
                job_id: this.state.job_id,
                job_tenure: this.state.job_tenure,
                job_type: this.state.job_type,
                location: this.state.location,
                image_url: this.state.image_url || "",
                org: org,
                role: this.state.roles,
                salary: this.state.salary,
                valid: this.state.valid,
                roles_and_resp: this.state.roles_and_resp,
            }
            // this.responseloading();
            console.log(sendstate);

            axios.post(APIData.api + 'jobs/', sendstate, { headers: APIData.headers })
                .then(response => {
                    console.log(response);

                    toast("Job Added Successfully!")

                })
                .catch(error => {
                    console.log(error)
                    this.responseloading();

                })
        }
    }

    render() {
        const { job_id, salary, job_tenure, description, branch, location, roles_and_resp } = this.state
        return (
            <div>
                {this.state.loading ? <Loading /> :
                    <form className="addjobs" onSubmit={this.submitHandler} >
                        <div className="carrybox">
                            <Link to={sessiondetails.userType == "superadmin" ? "superAdminJob" : "adminJobs"}>
                                <AiIcons.AiFillCloseCircle />
                            </Link>
                            <div>
                                <h2 className="mainheading01">ADD JOBS</h2>
                            </div>
                            <div className="floatleft">

                                {/* <label className="heading02" htmlFor="JOB ID">JOB ID:</label><br />
                                <input
                                    placeholder="JOB ID"
                                    className="inputfield"
                                    required
                                    type="text"
                                    name="job_id"
                                    value={job_id}
                                    onChange={this.changeHandler}

                                />
                                {this.state.job_id_error ? (<div style={{ color: 'red' }}>
                                    {this.state.job_id_error}
                                </div>) : null} */}

                                <label className="heading02" htmlFor="Role">JOB ID:</label><br />
                                <select
                                    className="inputfield"
                                    name="job_id"
                                    type="text"
                                    id="job_id"
                                    onChange={this.changeHandler}
                                >
                                    <option value="" selected disabled hidden>
                                        SELECT AN OPTION
                                    </option>

                                    {this.state.rolesOptions && this.state.rolesOptions.length > 0 && this.state.rolesOptions.map((role) => (
                                        <option key={role.id} value={role.profile}>
                                            {role.profile}
                                        </option>
                                    ))}
                                </select>

                                {this.state.job_id_error ? (
                                    <div style={{ color: 'red' }}>{this.state.job_id_error}</div>
                                ) : null}

                                <label className="heading02" htmlFor="JOB TYPE">Department:</label><br />

                                <select
                                    className="inputfield"
                                    name="job_dept"
                                    type="text"
                                    id="job_dept"
                                    onChange={this.changeHandler}

                                >
                                    <option value="" selected disabled hidden>
                                        SELECT AN OPTION
                                    </option>
                                    <option value="admin">
                                        Admin
                                    </option>
                                    <option value="job" >
                                        job
                                    </option>
                                </select>
                                {this.state.job_dept_error ? (<div style={{ color: 'red' }}>
                                    {this.state.job_dept_error}
                                </div>) : null}

                                <label className="heading02" htmlFor="Salary">SALARY:</label><br />

                                <input
                                    placeholder="SALARY"
                                    className="inputfield"

                                    type="number"
                                    name="salary"
                                    value={salary}
                                    onChange={this.changeHandler}

                                />
                                {this.state.salary_error ? (<div style={{ color: 'red' }}>
                                    {this.state.salary_error}
                                </div>) : null}


                                <label className="heading02" htmlFor="Salary">Branch:</label><br />

                                <input
                                    placeholder="Branch"
                                    className="inputfield"

                                    type="text"
                                    name="branch"
                                    value={branch}
                                    onChange={this.changeHandler}

                                />
                                {this.state.branch_error ? (<div style={{ color: 'red' }}>
                                    {this.state.branch_error}
                                </div>) : null}

                                <label className="heading02" htmlFor="Image">Image:</label><br />

                                <input
                                    placeholder="Image"
                                    className="inputfield"
                                    type="file"
                                    name="image"
                                    accept="image/*"

                                    onChange={this.onFileChange}

                                />

                                <label className="heading02" htmlFor="JOB ID">Roles and responsibles:</label><br />
                                <input
                                    placeholder="Roles and Responsibilty"
                                    className="inputfield"
                                    required
                                    type="text"
                                    name="roles_and_resp"
                                    value={roles_and_resp}
                                    onChange={this.changeHandler}

                                />


                            </div>

                            <div className="floatright">

                                <label className="heading02" htmlFor="Tenure">TENURE:</label><br />

                                <input
                                    placeholder="TENURE"
                                    className="inputfield"

                                    type="text"
                                    name="job_tenure"
                                    value={job_tenure}
                                    onChange={this.changeHandler}
                                />
                                {this.state.job_tenure_error ? (<div style={{ color: 'red' }}>
                                    {this.state.job_tenure_error}
                                </div>) : null}

                                <label className="heading02" htmlFor="Tenure">Location:</label><br />

                                <input
                                    placeholder="Location"
                                    className="inputfield"

                                    type="text"
                                    name="location"
                                    value={location}
                                    onChange={this.changeHandler}
                                />
                                {this.state.location_error ? (<div style={{ color: 'red' }}>
                                    {this.state.location_error}
                                </div>) : null}

                                {/* <label className="heading02" htmlFor="Role">Role:</label><br />

                                <input
                                    placeholder="Role"
                                    className="inputfield"

                                    type="text"
                                    name="roles"
                                    value={roles}
                                    onChange={this.changeHandler}
                                />
                                {this.state.roles_error ? (<div style={{ color: 'red' }}>
                                    {this.state.roles_error}
                                </div>) : null} */}

                                <label className="heading02" htmlFor="Role">Role:</label><br />
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
                                            {role.roles}
                                        </option>
                                    ))}
                                </select>

                                {this.state.roles_error ? (
                                    <div style={{ color: 'red' }}>{this.state.roles_error}</div>
                                ) : null}


                                <label className="heading02" htmlFor="DESCRIPTION"> DESCRIPTION:</label><br />

                                <textarea
                                    placeholder="DESCRIPTION"
                                    className="inputfield"

                                    type="text"
                                    name="description"
                                    value={description}
                                    onChange={this.changeHandler}
                                />

                                {this.state.description_error ? (<div style={{ color: 'red' }}>
                                    {this.state.description_error}
                                </div>) : null}

                                <label className="heading02" htmlFor="Active"> Active:</label><br />

                                <select
                                    className="inputfield"

                                    type="text"
                                    name="valid"
                                    id="valid"
                                    onChange={this.changeHandler}
                                >
                                    <option value="" selected disabled hidden>
                                        SELECT AN OPTION      </option>
                                    <option value="YES"  >
                                        Yes
                                    </option>
                                    <option value="NO" >
                                        No
                                    </option>
                                </select>
                                {this.state.valid_error ? (<div style={{ color: 'red' }}>
                                    {this.state.valid_error}
                                </div>) : null}



                                <label className="heading02" htmlFor="SUB TYPE"> Job TYPE:</label><br />

                                <select
                                    className="inputfield"

                                    type="text"
                                    name="job_type"
                                    id="job_type"
                                    onChange={this.changeHandler}
                                >
                                    <option value="" selected disabled hidden>
                                        SELECT AN OPTION      </option>
                                    <option value="PERMANENT"  >
                                        Permanent
                                    </option>
                                    <option value="CONTRACTOR" >
                                        Contractor
                                    </option>
                                </select>
                                {this.state.job_type_error ? (<div style={{ color: 'red' }}>
                                    {this.state.job_type_error}
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

export default AddJobs;