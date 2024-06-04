import React, { useEffect, useState } from 'react';
import { Grid, TextField, Button, Box, Select, InputLabel, FormControl, MenuItem, Typography, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import './CustSalesonboard.css';
// import { APIData, org } from '../Authentication/APIData';
import { APIData, org } from '../Authentication/APIData';


export const CustomerSalesonBoard = () => {
  const [usersData, setUserData] = useState('');
  const defaultTheme = createTheme();
  // const navigate = useNavigate();
  // console.log("Headers:", APIData.headers)

  useEffect(() => {
    const userData_Local = JSON.parse(localStorage.getItem("sessiondetails"));
    setUserData(userData_Local);
  }, [])


  console.log("UserData from local storage:", usersData)

  const username = usersData.userName;
  console.log("UserName is:", username)


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
        created_by: username,
        updated_by: username
      }));
    }
  }, [username]);


  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    org_name: '',
    customerMobileNum: '',
    customerAddress: '',
    customerGST: '',
    month: '',
    org: org,
    salesType: '',
    salesYear: getCurrentDateTimeString(),
    // created_by: username,
    created_date_time: getCurrentDateTimeString(),
    // updated_by: username,
    updated_date_time: getCurrentDateTimeString(),
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.customerEmail)) {
      toast.error("Invalid Email");
      return;
    }
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(formData.customerMobileNum)) {
      toast.error("Invalid Phone Number");
      return;
    }

    try {
      const url = APIData.api + 'customer-sales';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          ...APIData.headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      console.log("Headers:", response.headers)
      console.log("Response:", response)
      console.log("Response Data:", formData)


      if (!response.ok) {
        throw new Error('Failed to submit form data');
      }
      localStorage.setItem("customerEmail", formData.customerEmail);
      localStorage.setItem("customerMobile", formData.customerMobileNum);
      localStorage.setItem("companyname:", formData.org_name)

      toast.success("Form data submitted successfully")
      // navigate('/mdmform')
      console.log('Form data submitted successfully:', formData);
    } catch (error) {
      console.error('Error submitting form data:', error.message);
    }
  };

  return (
    <div className='workshop_root'>
      <center>
        <Paper elevation={3} style={{ width: "fit-content", alignContent: "center", alignItems: "center",border:"1px solid black" }}>
          <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="md">
              <CssBaseline />
              <Box sx={{ marginTop: 8 }}>
                <center>
                  <Typography variant='h6'> CUSTOMER SALES ON BOARD</Typography>
                </center>
                <br />
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Customer Name" required fullWidth name='customerName' onChange={handleChange} value={formData.customerName} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Customer Email" required fullWidth name='customerEmail' onChange={handleChange} value={formData.customerEmail} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Org Name" required fullWidth name='org_name' onChange={handleChange} value={formData.org_name} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Customer Ph no" required fullWidth name='customerMobileNum' onChange={handleChange} value={formData.customerMobileNum} inputProps={{
                        maxLength: 10,
                        pattern: "[0-9]*"
                      }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Customer Address" required fullWidth name='customerAddress' onChange={handleChange} value={formData.customerAddress} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Customer GST" required fullWidth name='customerGST' onChange={handleChange} value={formData.customerGST} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id="month">Month</InputLabel>
                        <Select
                          labelId="month"
                          id="month"
                          required
                          name='month'
                          value={formData.month}
                          label="Month"
                          onChange={handleChange}
                        >
                          <MenuItem value="JAN">JAN</MenuItem>
                          <MenuItem value="FEB">FEB</MenuItem>
                          <MenuItem value="MARCH">MARCH</MenuItem>
                          <MenuItem value="APR">APR</MenuItem>
                          <MenuItem value="MAY">MAY</MenuItem>
                          <MenuItem value="JUN">JUN</MenuItem>
                          <MenuItem value="JUL">JUL</MenuItem>
                          <MenuItem value="AUG">AUG</MenuItem>
                          <MenuItem value="SEP">SEP</MenuItem>
                          <MenuItem value="OCT">OCT</MenuItem>
                          <MenuItem value="NOV">NOV</MenuItem>
                          <MenuItem value="DEC">DEC</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    {/* <Grid item xs={12} sm={6}>
              <TextField  label="Org" name='org' onChange={handleChange} value={formData.org}  fullWidth/>
               
            </Grid> */}
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id="salesType">Sales Type</InputLabel>
                        <Select
                          labelId="salesType"
                          required
                          id="salesType"
                          name='salesType'
                          value={formData.salesType}
                          label="Sales Type"
                          onChange={handleChange}
                        >
                          <MenuItem value="PROSPECT">PROSPECT</MenuItem>
                          <MenuItem value="LEAD">LEAD</MenuItem>
                          <MenuItem value="OPPORTUNITY">OPPORTUNITY</MenuItem>

                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Sales Year" required name='salesYear' onChange={handleChange} value={formData.salesYear.substring(0, 4)} InputLabelProps={{
                        shrink: true,
                      }} fullWidth />
                    </Grid>
                    {/* <Grid item xs={12} sm={6}>
                      <TextField label="Created By" required name='created_by' onChange={handleChange} value={formData.username} fullWidth />
                    </Grid> */}
                    {/* <Grid item xs={12} sm={6}>
              <TextField label="Created Date"  name='created_date_time' onChange={handleChange} value={formData.created_date_time}   InputLabelProps={{
            shrink: true,
          }}  fullWidth />
            </Grid> */}
                    {/* <Grid item xs={12} sm={6}>
                      <TextField label="Updated By" required fullWidth name='updated_by' value={formData.username} onChange={handleChange}  />
                    </Grid> */}
                    {/* <Grid item xs={12} sm={6}>
              <TextField label="Updated Date"  name='updated_date_time' onChange={handleChange} value={formData.updated_date_time}    InputLabelProps={{
            shrink: true,
          }} fullWidth />
            </Grid> */}
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
