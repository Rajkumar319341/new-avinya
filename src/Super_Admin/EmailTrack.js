import React, { useState } from 'react';
import { TextField, Button, Box, Container, Grid } from '@mui/material';

function EmailTrack() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission, for example, sending data to the server
    console.log(formData);
    // Reset form after submission if needed
    setFormData({
      id: '',
      email: '',
      client: '',
      password: '',
      purpose: '',
      created_date: '',
      updated_date: '',
      updated_by: ''
    });
  };

  return (
    // <Container maxWidth="sm">
    <div style={{display:"flex",flexDirection:"row"}}>
      <Box 
      //width="30%"
      sx={{ mt: 4, p: 2, border: 1, borderColor: 'primary.main', borderRadius: 1 }}>
        <h1>Form</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '16px' }}>
          {/* <Grid> */}
          <Grid container spacing={2}>
          <Grid item xs={12}>
          <TextField
            label="ID"
            name="id"
            value={formData.id}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="2rem"
          />
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
          {/* <TextField
            label="Updated Date"
            name="updated_date"
            type="date"
            value={formData.updated_date}
            onChange={handleChange}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          /> */}
          {/* <TextField
            label="Updated By"
            name="updated_by"
            value={formData.updated_by}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          /> */}
          
          <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
            Submit
          </Button>
          </Grid>
        </form>
      </Box>
    {/* </Container>  */}
    </div>
  );
}

export default EmailTrack;
