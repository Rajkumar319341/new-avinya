import React, { Component } from 'react';
import Loading from '../Loading';
import { APIData, org } from '../Authentication/APIData';
import EnrollmentsData from '../SQLTables/EnrollmentsData';
import { CSVLink, CSVDownload } from "react-csv";
import * as FaIcons from "react-icons/fa";

const dept = localStorage.getItem("Depart Details")

class SuperAdminEnrollmentsCompleted extends Component {
    state = {
        loading: true,
        enrolldata: null
    };
    async componentDidMount() {
        const url = APIData.api + `enrollments/status/dept?status=completed&department=${dept}&org=${org}`;
        const response = await fetch(url, { headers: APIData.headers });
        const daata = await response.json();
        this.setState({ enrolldata: daata, loading: false });
    }
    render() {
        return (

            <div className="superAdminEnrollmentsCompleted">


                {this.state.loading || !this.state.enrolldata ? <Loading /> :
                    <p>
                        <div className="carrybox">
                            <EnrollmentsData data={this.state.enrolldata} />
                        </div>
                        <CSVLink data={this.state.enrolldata} filename={'CompletedEnrollments'}>
                            <button className="Downloadbutton"> <FaIcons.FaDownload /> Download Report </button></CSVLink>
                    </p>}

            </div>
        );
    }
}
export default SuperAdminEnrollmentsCompleted;