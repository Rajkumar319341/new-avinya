import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
// import { Typography, Paper } from '@mui/material';
import './CourseDetailsPage.css';
import { Typography } from '@mui/material';
import { useEffect } from 'react';

const CourseDetailsPage = () => {
  const location = useLocation();
  // const selectedItem = location.state?.item || {};

  const selectedItem = location.state?.item || JSON.parse(localStorage.getItem('selectedItem'));
 
  useEffect(() => {
    if (location.state?.item) {
      localStorage.setItem('selectedItem', JSON.stringify(location.state.item));
    }
  }, [location.state]);
  return (
    <div className="courseDetailsContainer">
      {/* <Typography variant='h5' style={{ fontFamily: "Roboto Slab" }} className="courseTitle">{selectedItem.course_id}</Typography> */}
      <div className='course_details_upper'>


      <h4>{selectedItem.job_designation}</h4>
        <p> Role:{selectedItem.job_id}</p>
        <p>Department:{selectedItem.job_dept}</p>
        <p>Job Type: {selectedItem.job_type}</p>
        <p>Salary: {selectedItem.salary}</p>
        <p>Job Tenure:{selectedItem.job_tenure}</p>
        {/* <p>Role:{selectedItem.role}</p> */}
       


        <hr className='line' style={{
          color: '#CDC9CA',
          backgroundColor: '#CDC9CA',
          width: "100%",
          height: .5,
          borderColor: '#CDC9CA'
        }} />
        <Link to={{ pathname: "/job-apply-page", state: { jobId: selectedItem.job_id, Role:selectedItem.role,designation:selectedItem.job_designation,branch:selectedItem.branch,department:selectedItem.job_dept} }}>

          <Button variant="contained" color="primary" className="applyButton">Apply</Button>
        </Link>


      </div>
      <br></br>

      <div className='course_details_page'>
        <center>  <Typography variant='h6'> Job Description</Typography></center>
        <ul style={{ fontWeight: '400', fontSize: '15px' }}>
          {selectedItem.description && selectedItem.description.split('.').map((sentence, index) => (
            <li key={index}>{sentence.trim()}</li>
          ))}
        </ul>
      </div>

      <br></br>

      {/* <div className='course_details_page'>
        <center>  <Typography variant='h6'> Roles and Responsibilities</Typography></center>
        <ul style={{ fontWeight: '400', fontSize: '15px' }}>
          {selectedItem.roles_and_resp && selectedItem.roles_and_resp.split('.').map((sentence, index) => (
            <li key={index}>{sentence.trim()}</li>
          ))}
        </ul>
      </div> */}
      {selectedItem.roles_and_resp && (
        <div className='course_details_page'>
          <center><Typography variant='h6'>Roles and Responsibilities</Typography></center>
          <ul style={{ fontWeight: '400', fontSize: '15px' }}>
            {selectedItem.roles_and_resp.split('.').map((sentence, index) => (
              <li key={index}>{sentence.trim()}</li>
            ))}
          </ul>
        </div>
      )}


    </div>
  );
};

export default CourseDetailsPage;
