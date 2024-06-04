import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { APIData, org } from '../Authentication/APIData';
import { useState } from 'react';

const defaultTheme = createTheme();
export default function AvinRegister() {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      email: data.get('email'),
      designation: data.get('designation'),
      name: data.get('Name'),
      username: data.get('userName'),
      supervisorEmail: data.get('supervisorEmail'),
      entity: data.get('entity'),
      imageUrl: "",
      org: org
    };
    try {
      const response = await axios.post(APIData.api + 'avinya/organization-hierarchy', formData, { headers: APIData.headers });
      if (response.status === 200 || response.status === 201) {
        console.log(response.status);
        const imdata = new FormData();
        imdata.append("id ", email)
        imdata.append("image", file)
        console.log(imdata);
        try {
          const response = await axios.post(APIData.api + 'avinya/organization-hierarchy/image', imdata, { headers: APIData.headers });
          if (response.status === 200 || response.status === 201) {
            // console.log(response.status);
            window.location.reload();
          }
        }
        catch (error) {
          alert('Error submitting form');
          console.log(error);
        }
      }
    }
    catch (error) {
      alert('Error submitting form');
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Teacher Form
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="name"
                  name="Name"
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  type="string"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  name="userName"
                  type="string"
                  autoComplete="Username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="string"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="designation"
                  label="Designation"
                  type="string"
                  id="designation"
                  autoComplete="designation"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="supervisorEmail"
                  label="SupervisorEmail"
                  type="string"
                  id="supervisorEmail"
                  autoComplete="supervisorEmail"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="entity"
                  label="Entity"
                  type="string"
                  id="entity"
                  autoComplete="entity"
                />
              </Grid>
              <div style={{ marginLeft: "16px", marginTop: "0px" }}>
                <label style={{ textAlign: "center", marginTop: "0.8rem", fontFamily: "monospace" }}>Upload Image </label>
                <input type="file" id="file" name='file'  onChange={(event) => setFile(event.target.files[0])} required style={{ border: "2px solid ", padding: "1.5rem", borderStyle: "double", borderRadius: "10px" }} placeholder='upload' />
              </div>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              submit
            </Button>

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}