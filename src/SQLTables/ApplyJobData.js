import React, { Component } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { APIData } from '../Authentication/APIData';
import Loading from "../Loading";
import { Link } from 'react-router-dom';
import './ApplyJobData.css';


toast.configure();

function Card({ item }) {
  return (
    <div className="card-job">
      <h4>{item.job_designation}</h4>
        <p> Role:{item.job_id}</p>
        <p>Department:{item.job_dept}</p>
        <p>Job Type: {item.job_type}</p>
        <p>Salary: {item.salary}</p>
        <p>Job Tenure:{item.job_tenure}</p>

      {/* <h4>Job ID: {item.job_id}</h4>
      <p>Job Type: {item.job_type}</p>
      <p>Job Sub Type: {item.job_dept}</p>
      <p>Salary: {item.salary}</p>
      <p>Job Tenure: {item.job_tenure}</p> */}
     
      <br></br>
      <Link to={{ pathname: `/job_id/${item.job_id}`, state: { item } }}>Know More </Link>
    </div>
  );
}


class ApplyJobData extends Component {
  state = {
    loading: false,
  }

  componentDidMount() {
  }

  render() {
    const { loading } = this.state;
    const { data } = this.props;

    return (
      <div className="applyjobdata_root">
        <div className="card-container-job">
          {loading ? (
            <Loading />
          ) : (
            <React.Fragment>
              {Array.isArray(data) && data.map((item) => (
                <Card key={item.job_id} item={item} />
              ))}
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }

}

export default ApplyJobData;
