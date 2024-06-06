import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import { Typography } from '@mui/material';
import { useEffect } from 'react';
import "../SQLTables/CourseDetailsPage.css"

export const InternalJobDetails = () => {
    const location = useLocation();
    // const selectedJob = location.state?.job || JSON.parse(localStorage.getItem('selectedJob'));
    const selectedJob = location.state?.job || JSON.parse(localStorage.getItem('selectedJob'));
    console.log("Selected Job:",selectedJob)

    useEffect(() => {
        if (location.state?.job) {
          localStorage.setItem('selectedJob', JSON.stringify(location.state.job));
        }
      }, [location.state]);
  return (

        <div className="courseDetailsContainer">
          {/* <Typography variant='h5' style={{ fontFamily: "Roboto Slab" }} className="courseTitle">{selectedItem.course_id}</Typography> */}
          <div className='course_details_upper'>
    
    
          <h4>{selectedJob.job_designation}</h4>
            <p> Role:{selectedJob.job_id}</p>
            <p>Department:{selectedJob.job_dept}</p>
            <p>Job Type: {selectedJob.job_type}</p>
            <p>Salary: {selectedJob.salary}</p>
            <p>Job Tenure:{selectedJob.job_tenure}</p>
            {/* <p>Role:{selectedItem.role}</p> */}
           
    
    
            <hr className='line' style={{
              color: '#CDC9CA',
              backgroundColor: '#CDC9CA',
              width: "100%",
              height: .5,
              borderColor: '#CDC9CA'
            }} />
            <Link to={{ pathname: "/internal-job-apply", state: { jobId: selectedJob.job_id, Role:selectedJob.role,designation:selectedJob.job_designation,branch:selectedJob.branch,department:selectedJob.job_dept} }}>
    
              <Button variant="contained" color="primary" className="applyButton">Apply</Button>
            </Link>
    
    
          </div>
          <br></br>
    
          <div className='course_details_page'>
            <center>  <Typography variant='h6'> Job Description</Typography></center>
            <ul style={{ fontWeight: '400', fontSize: '15px' }}>
              {selectedJob.description && selectedJob.description.split('.').map((sentence, index) => (
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
          {selectedJob.roles_and_resp && (
            <div className='course_details_page'>
              <center><Typography variant='h6'>Roles and Responsibilities</Typography></center>
              <ul style={{ fontWeight: '400', fontSize: '15px' }}>
                {selectedJob.roles_and_resp.split('.').map((sentence, index) => (
                  <li key={index}>{sentence.trim()}</li>
                ))}
              </ul>
            </div>
          )}
    
    
        </div>
      );
    };
 