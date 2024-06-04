import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Grid, Paper } from '@material-ui/core';
import axios from 'axios';
import { Button} from 'react-bootstrap';
import { APIData, org } from '../Authentication/APIData';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PhoneIcon from '@material-ui/icons/Phone';
import './JobApplyPage.css';
// import { useHistory } from 'react-router-dom';

const JobApplyPage = (props) => {
  // const history = useHistory(); 

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const { jobId, Role,branch,designation,department} = props.location.state;
  console.log(jobId, Role);

  useEffect(() => {
    const sessionDetails = JSON.parse(localStorage.getItem('sessiondetails'));
    
    if (sessionDetails && sessionDetails.userType === 'user') {
      setEmail(sessionDetails.email);
      setName(sessionDetails.user);
      setPhone(sessionDetails.phoneNumber);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sessionDetails = JSON.parse(localStorage.getItem('sessiondetails'));
    const enrollmentType = sessionDetails && sessionDetails.userType === "employee" ? "admin" : "employee";

    if (!email || !name || !phone) {
      toast('All fields are required');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast('Please enter a valid email address');
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      toast('Please enter a valid 10-digit phone number');
      return;
    }

    const today = new Date();
    const datetime = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

    const JobApplicationData = {
      admin_id: APIData.admin,
      branch:branch,
      course_id: '',
      designation:designation,
      job_id:jobId,
      enrolled_date:datetime,
      enrollment_status: "applied",
      enrollment_type: enrollmentType,
      followup_datetime: datetime,
      office_email:'',
      org:org,
      role:jobId,
      dept:department,
      supervisor:'',
      user_email: email,
      user_name: name,
      user_phone_number: phone,
    };
    console.log(JobApplicationData);

    try {
      const response = await axios.post(APIData.api + `enrollments/?orgId=${org}`, JobApplicationData, { headers: APIData.headers });
      if (response.data.status.toString().toLowerCase() === "success") {
        console.log("Response job apply:",response.data)
        toast(response.data.description);

        localStorage.setItem('status', 'success');
        localStorage.setItem('email', email);
        localStorage.setItem('name', name);
        localStorage.setItem('phone', phone);
        // history.push('/ApplyJobData');
        // window.location.reload();

      } else {
        toast(response.data.errorDesc);
      }
    } catch (error) {
      console.error(error);
      toast('It\'s time to grab a coffee');
    }
  };

  return (<div  className='job_apply_container'>

  
    <Container >
      <Typography variant="h6" align="center" gutterBottom style={{ fontFamily: "Roboto Slab", marginTop: "20px" }}>
        Apply for the Job
      </Typography>
      <Typography variant="body1" align="center" gutterBottom style={{ marginBottom: "20px", fontFamily: "Roboto Slab" }}>
        Please fill out the form below to apply for the job.
      </Typography>
      <Paper elevation={3} className="paper-container-jobapply">
        <Typography variant="h6" align="center" gutterBottom style={{ fontFamily: "Roboto Slab" }}>
          Apply Now !
        </Typography>

        <form className="form" onSubmit={handleSubmit}>
          <Grid container spacing={3} justify="center">
            <Grid item xs={12}>
              <TextField
                id='email'
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  endAdornment: <MailOutlineIcon />,
                }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='name'
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputProps={{
                  endAdornment: <AccountCircleIcon />,
                }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='phone'
                label="Phone Number"
                variant="outlined"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                InputProps={{
                  endAdornment: <PhoneIcon />,
                }}
                required
              />
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="submit_Button"
                fullWidth
              >
                Submit
             </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Typography variant="body1" align="center" gutterBottom style={{ marginTop: "20px", fontFamily: "Roboto Slab" }}>
        Thank you for your interest in our job opportunity. We will get back to you soon!
      </Typography>
    </Container>
    </div>
  );
};

export default JobApplyPage;
