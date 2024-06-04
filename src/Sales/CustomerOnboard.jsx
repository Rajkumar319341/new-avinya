import React, { useState } from 'react';
import { Grid, TextField, Button, Box, Select, InputLabel, FormControl, MenuItem, Typography, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { Link } from 'react-router-dom';
import './CustomeronBoard.css';
// import { APIData } from './Authentication/APIData';
import { APIData, org } from '../Authentication/APIData';
import { toast, ToastContainer } from 'react-toastify';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'
import { useEffect } from 'react';


export const CustomerOnboard = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [usersData, setUserData] = useState('');
  const [customerSalesData, setCustomerSalesData] = useState("");

  useEffect(() => {
    const userData_Local = JSON.parse(localStorage.getItem("sessiondetails"));
    setUserData(userData_Local);
  }, [])


  // console.log("UserData from local storage:",usersData)
  const customer_Email = localStorage.getItem("customerEmail");
  const customer_phno = localStorage.getItem("customer Mobile");
  const company_name = localStorage.getItem("companyname:");
  console.log("customer_companyname:", company_name)

  console.log("customer_phonenumber:", customer_phno)
  // console.log("Customer Email address:",customer_Email)

  const username = usersData.userName;

  // console.log("UserName is:",username)


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };



  const defaultTheme = createTheme();
  // console.log("Headers:",APIData.headers)

  const getCurrentDateTimeString = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const date = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    // const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    // return `${year}-${month}-${date}T${hours}:${minutes}:${seconds}`;
    return `${year}-${month}-${date}T${hours}:${minutes}`;

  };

  useEffect(() => {
    if (username) {
      setFormData(prevState => ({
        ...prevState,
        createdBy: username,
        email: customer_Email,
        phone: customer_phno,
        companyName: company_name


      }));
    }
  }, [username]);

  const phone_num = customerSalesData.customerMobileNum;
  console.log("ph......:", phone_num);
  const email_id = customerSalesData.customerEmail;
  console.log("emailid.......:", email_id)

  const [formData, setFormData] = useState({
    customerId: '',
    // email: email_id,
    password: '',
    // phone: phone_num,
    productKey: '',
    productName: '',
    software: '',
    // createdBy: '',
    createdDate: getCurrentDateTimeString(),
    // companyName: '',
    amcStartDate: '',
    amcEndDate: '',
    org: org
  });

  console.log("Before Submitting:", formData)

  useEffect(() => {
    const fetchCustomerSalesData = async () => {
      try {
        const response = await fetch(`${APIData.api}customer-sales/emailId?emailId=${customer_Email}`, {
          method: 'GET',
          headers: {
            ...APIData.headers,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch customer sales data');
        }
        const data = await response.json();
        console.log("Data from backend:", data)
        setCustomerSalesData(data);
      } catch (error) {
        console.error('Error fetching customer sales data:', error.message);
      }
    };

    if (customer_Email) {
      fetchCustomerSalesData();
    }
  }, [formData.email]);

  console.log("Data from get call:", customerSalesData)
  // console.log("Customer Email:",customerSalesData.customerEmail);
  // console.log("Customer phone no:",customerSalesData.customerMobileNum)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if(!emailPattern.test(formData.email)){
    //   toast.error("Invalid Email");
    //   return;
    // }  

    // const phonePattern = /^\d{10}$/;
    // if (!phonePattern.test(formData.phone)) {
    //   toast.error("Invalid Phone Number");
    //   return;
    // }

    try {
      const url = APIData.api + 'customer-onboard';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          ...APIData.headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      // console.log("Headers:",response.headers)
      // console.log("Response:",response)
      console.log("Response Data:", formData)


      if (!response.ok) {
        toast.error("Failed to submit form data")
        throw new Error('Failed to submit form data');
      }

      toast.success('Form data submitted successfully');
      window.location.reload();
      console.log('Form data submitted successfully:', formData);
    } catch (error) {
      console.error('Error submitting form data:', error.message);
    }
  };

  return (
    <div className='workshop_root'>
      <center>
        <Paper elevation={3} style={{ width: "fit-content", alignContent: "center", alignItems: "center",border:"1px solid black"}}>
          <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="md">
              <CssBaseline />
              <Box sx={{ marginTop: 8 }}>
                <center>
                  <Typography variant='h6'> CUSTOMER ON BOARD</Typography>
                </center>
                <br />
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Customer Id" required fullWidth name='customerId' onChange={handleChange} value={formData.customerId} InputLabelProps={{
                        shrink: true,
                      }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Email" fullWidth name='email' value={customerSalesData.customerEmail} InputLabelProps={{
                        shrink: true,
                      }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Password"
                        required
                        fullWidth
                        name='password'
                        type={showPassword ? 'text' : 'password'}
                        onChange={handleChange}
                        value={formData.password}
                        InputProps={{
                          endAdornment: (
                            <Icon
                              icon={showPassword ? eyeOff : eye}
                              onClick={togglePasswordVisibility}
                              style={{ cursor: 'pointer' }}
                            />
                          )
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Phone No" fullWidth name='phone' value={customerSalesData.customerMobileNum} InputLabelProps={{
                        shrink: true,
                      }} />
                    </Grid>
                    {/* <Grid item xs={12} sm={6}>
                      <TextField label="Product Key" required fullWidth name='productKey' onChange={handleChange} value={formData.productKey} />
                    </Grid> */}
                    <Grid item xs={12} sm={6}>
                      <TextField label="Product Name" required name='productName' onChange={handleChange} value={formData.productName} fullWidth />

                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="SoftWare" required name='software' onChange={handleChange} value={formData.software}
                        fullWidth />
                    </Grid>
                    {/* <Grid item xs={12} sm={6}>
              <TextField label="Created By" required name='createdBy' onChange={handleChange} value={formData.createdBy}  fullWidth />
            </Grid> */}

                    {/* <Grid item xs={12} sm={6}>
              <TextField label="Created Date" fullWidth name='createdDate' onChange={handleChange} value={formData.createdDate}   />
            </Grid> */}
                    <Grid item xs={12} sm={6}>
                      <TextField label="Company Name" required fullWidth name='companyName' onChange={handleChange} value={formData.companyName}
                        InputLabelProps={{
                          shrink: true,
                        }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Amc Start Date" required type='date' fullWidth name='amcStartDate' onChange={handleChange} value={formData.amcStartDate} InputLabelProps={{
                        shrink: true,
                      }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Amc End Date" required type='date' fullWidth name='amcEndDate' onChange={handleChange} value={formData.amcEndDate} InputLabelProps={{
                        shrink: true,
                      }} />
                    </Grid>
                  </Grid>
                  <br />
                  <Grid item>
                    <Button type='submit' variant='contained' style={{ width: "10rem" }}>Submit</Button>
                  </Grid>
                </form>
                <ToastContainer />
              </Box>
              <Box mt={5}>
                <Typography variant="body2" color="textSecondary" align="center">
                  {'Copyright © '}
                  <Link color="inherit" href="https://mui.com/">
                    care4edu.com
                  </Link>{' '}
                  {new Date().getFullYear()}
                  {'.'}
                </Typography>
              </Box>
            </Container>
          </ThemeProvider>
        </Paper>
      </center>
    </div>
  );
};
 
export default CustomerOnboard;