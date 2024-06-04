import React from 'react';
import { Grid, TextField, Button, Box, Select, InputLabel, FormControl, MenuItem, Typography, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { Link } from 'react-router-dom';
// import './MdmForm.css'
import { useState } from 'react';
import { APIData } from '../Authentication/APIData';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import axios from 'axios';


export const MdmForm = () => {
    const [usersData, setUserData] = useState('');
    const [orgid, setOrgid] = useState('');
    const [orgname, setOrgname] = useState('');
    const [orgshortname, setShortname] = useState('');
    const [empcode, setEmpcode] = useState('');
    const [emailid, setEmailid] = useState('');
    const [mobilenum, setMobilenum] = useState('');
    const [spocname, setSpocnmae] = useState('');
    const [spocemail, setSpocemail] = useState('');
    const [spocmobile, setSpocmobile] = useState('');
    const [status, setStatus] = useState('');
    const [Address, setAddress] = useState('');
    const [orgurl, setOrgurl] = useState('');
    const [accountnumber, setAccountnumber] = useState('');
    const [gst, setGst] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);



    const getCurrentDateTimeString = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const date = String(currentDate.getDate()).padStart(2, '0');
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${date}T${hours}:${minutes}:${seconds}`;

    };

    const getsalesdetail=()=>{
         axios.get(APIData.api)
    }

    useEffect(() => {
        const userData_Local = JSON.parse(localStorage.getItem("sessiondetails"));
        setUserData(userData_Local);
    }, [])


    // console.log("UserData from local storage in mdmform:", usersData);

    const username = usersData.userName;


    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    };

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('org_id', orgid);
    formData.append('org_name', orgname);
    formData.append('org_short_name', orgshortname);
    formData.append('org_emp_code', empcode);
    formData.append('org_email_id', emailid);
    formData.append('org_mob', mobilenum);
    formData.append('created_by', username);
    formData.append('org_spoc_name', spocname);
    formData.append('org_spoc_email_id', spocemail);
    formData.append('org_spoc_mob ', spocmobile);
    formData.append('org_status', status);
    formData.append('org_address', Address);
    formData.append('orgurl', orgurl);
    formData.append('org_account_number', accountnumber);
    formData.append('orggst', gst);


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData);
        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailid)) {
            toast.error("Invalid Organization Email");
            return;
        }
        if (!emailPattern.test(spocemail)) {
            toast.error("Invalid Org Spoc Email");
            return;
        }

        const phonePattern = /^\d{10}$/;
        if (!phonePattern.test(spocmobile)) {
            toast.error("Invalid Org Spoc Phone Number");
            return;
        }
        if (!phonePattern.test(mobilenum)) {
            toast.error("Invalid Organization Phone Number");
            return;
        }

        const url = (APIData.api + 'org-mdm/')
        const combined = `${url}${JSON.stringify(formData)}`;
        console.log(combined);
        try {
            axios.post(url, formData, {
                headers: { ...APIData.headers, 'Content-Type': 'multipart/form-data' }

            })
            toast.success('Successfully Customer OnBoarded');
            window.location.reload();
        } catch (error) {
            alert('Error submitting form data:', error);
        }
    };



    function Copyright() {
        return (
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://mui.com/">
                    care4edu.com
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }

    return (
        <div style={{display:"flex",justifyContent:"center", alignItems:"center",padding:"1rem",}} >
            <center>
                <Paper elevation={3} style={{ width: "fit-content", alignContent: "center", alignItems: "center", border: "1px solid black", }}>

                    {/* <ThemeProvider theme={defaultTheme}> */}
                    <Container component="main" maxWidth="md">
                        <CssBaseline />
                        <Box sx={{ marginTop: 2, }}>
                            <center>
                                <Typography variant='h6'><u > CUSTOMER ON BOARD IN SMARTER PORTAL</u></Typography>

                            </center>
                            <br></br>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField label="Organization Id"
                                            required
                                            fullWidth name='orgId'
                                            onChange={(e) => setOrgid(e.target.value)}
                                            value={orgid}
                                            helperText="Org name to get data, Exmaple= for Care4edu we giving c4e" />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField label="Organization Name" required fullWidth name='orgName' onChange={(e) => setOrgname(e.target.value)} value={orgname} helperText="Organization Full Name,Ex= Care4edu Solution pvt ltd.." />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField label="Org Spoc Email Id" required fullWidth name='orgSpocEmailId' onChange={(e) => setSpocemail(e.target.value)} value={spocemail} helperText="Email of Customer to contact" />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField label="Org Spoc Ph No" required fullWidth name='orgSpocMob' onChange={(e) => setSpocmobile(e.target.value)} value={spocmobile} helperText='Mobile Number of orgnaization t contact' />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField label="Org Spoc Name" required fullWidth name='orgSpocName' onChange={(e) => setSpocnmae(e.target.value)} value={spocname} helperText='Name of Person who we are in touch with that orgnaization' />

                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="orgStatus">Org Status</InputLabel>
                                            <Select
                                                labelId="orgStatus"
                                                id="orgStatus"
                                                name='orgStatus'
                                                value={status}
                                                required
                                                label="OrgStatus"
                                                onChange={(e) => setStatus(e.target.value)}
                                                helperText='Pass the Status so website can be active or Inactive.'
                                            >
                                                <MenuItem value='ACTIVE'>ACTIVE</MenuItem>
                                                <MenuItem value='INACTIVE'>INACTIVE</MenuItem>
                                                <MenuItem value='REVOKED'>REVOKED</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField label="Org Email Id" required fullWidth name='orgEmailId' onChange={(e) => setEmailid(e.target.value)} value={emailid} helperText="Organization Email from which all mails are sent" />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField label="Org Employee Code" required fullWidth name='orgEmpCode' onChange={(e) => setEmpcode(e.target.value)} value={empcode} helperText="Code for adding before employee name for Id, example=C4e,so employe Id is c4esuresh " />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField label="Org Mobile Num" required fullWidth name='orgAccountNuber' onChange={(e) => setMobilenum(e.target.value)} value={mobilenum} helperText="Orgnaization Mobile Number" />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField label="Short Name" required fullWidth name='orgshortname' onChange={(e) => setShortname(e.target.value)} value={orgshortname} helperText="Example= Care4edu Solution pvt ltd == Care4Edu " />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField label="Org Address" required fullWidth name='orgAddress' onChange={(e) => setAddress(e.target.value)} value={Address} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField label="Org Url" required fullWidth name='orgURL' onChange={(e) => setOrgurl(e.target.value)} value={orgurl} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField label="Org Acc No" required fullWidth name='orgAccountNuber' onChange={(e) => setAccountnumber(e.target.value)} value={accountnumber} />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField label="Org GST" required fullWidth name='orgGST' onChange={(e) => setGst(e.target.value)} value={gst} />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <InputLabel id="uploadImage">Upload Image</InputLabel>
                                        <input type="file" id="uploadImage" onChange={handleFileChange} />
                                        {imagePreview && (
                                            <img src={imagePreview} alt="Selected" style={{ width: '20%',display: 'block', margin: '0 auto', marginTop: 10}} />
                                        )}
                                    </Grid>
                                    
                                </Grid>
                                <br></br>
                                <Grid item >
                                    <Button type='submit' variant='contained' style={{ width: "10rem" }}  >Submit</Button>
                                </Grid>
                                <ToastContainer />
                            </form>
                        </Box>
                        <Box mt={5}>
                            <Typography variant="body2" color="textSecondary" align="center">
                                <Copyright />
                            </Typography>
                        </Box>
                    </Container>
                    {/* </ThemeProvider> */}
                </Paper>
            </center>
        </div>
    );
};
export default MdmForm
