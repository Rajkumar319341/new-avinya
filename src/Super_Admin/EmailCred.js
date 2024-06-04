// src/components/MyForm.js
import React, { useState } from 'react';
import { TextField, Button, Container, Grid, Box } from '@mui/material';

import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import * as AiIcons from "react-icons/ai";
import Loading from '../Loading';
import { APIData } from '../Authentication/APIData';

const EmailCred = () => {
  const [formData, setFormData] = useState({
    id: '',
    email: '',
    client: '',
    password: '',
    purpose: '',
    created_date: '',
    updated_date: '',
    updated_by: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
//https://api.care4edu.com/c4e/asset-email/create
  const handleSubmit = (e) => {
    // e.preventDefault();
    // Here you can handle form submission, for example, sending data to the server
    console.log(formData);
    // Reset form after submission if needed
    setFormData({
      id: '',
      email: formData.email,
      client: formData.client,
      password: formData.password,
      purpose: formData.purpose,
      created_date: '',
      updated_date: '',
      updated_by: ''
    });
    console.log(formData);
    const url = APIData.api + 'asset-email/create/'
    axios.post(APIData.api + 'asset-email/create/', formData, { headers: APIData.headers })
    .then(response =>{
      toast("Email added successfully")
      console.log(url);
    })
    .catch(err =>{
      console.error(err)
    })
  };
  return (
    <Container maxWidth="sm">
      <Box
        //width="30%"
        sx={{ mt: 4, p: 2, border: 2, borderColor: 'primary.main', borderRadius: 1 }}>
        <h2 style={{ display: "flex", margin: "0.25rem", padding: "20px", justifyContent: 'center' }}>Email Service</h2>
        <form >
          <Grid
            style={{ display: 'flex', justifyItems: "center" }}
            container spacing={2}>
            <Grid item xs={12}>
              {/* <TextField
                label="ID"
                name="id"
                value={formData.id}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              /> */}
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Client"
                name="client"
                value={formData.client}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Purpose"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            {/*
             <Grid item xs={12}>
              <TextField
                label="Created Date"
                name="created_date"
                type="date"
                value={formData.created_date}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
              />
            </Grid> 
            */}
            {/* <Grid item xs={12}>
            <TextField label="Updated Date" type="date" fullWidth 
            InputLabelProps={{
                shrink: true,
              }}/>
          </Grid> */}
            {/* <Grid item xs={12}>
            <TextField label="Updated By" fullWidth />
          </Grid> */}
            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth
              onClick={()=>handleSubmit()}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

export default EmailCred;
