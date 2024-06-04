import React, { useState } from 'react';
import { TextField, Button, Container, Grid, Box, Typography } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { APIData, org } from '../Authentication/APIData';

const FestivalForm = () => {
  toast.configure();

  const [festivalName, setFestivalName] = useState('');
  const [description, setDescription] = useState('');
  const [festivalDate, setFestivalDate] = useState('');
  const [festivalImage, setFestivalImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const festivaldata=new FormData();
    festivaldata.append("image",festivalImage)
    festivaldata.append("fest_name ",festivalName)
    festivaldata.append("fest_date",festivalDate)
    festivaldata.append("des ",description)
    festivaldata.append("org ",org)
    console.log(festivalImage,festivalName,festivalDate,description,org);

    try {
      const url = `${APIData.api}festivals/`;

      const response = await axios.post(url, festivaldata, {headers:APIData.headers});

      if (response.status === 201 || response.status === 'success') {
        toast('Updated successfully');
        window.location.reload();
      } else {
        toast('Check with the Admin, failed');
      }
    } catch (error) {      
      console.error(error);
      toast("It's time to grab a coffee");
    }
  };

  return (
    <Container maxWidth="sm">
      <div style={{ display: 'flex', margin: '2rem', backgroundColor: '#e6ffff' }}>
        <Box border={1} p={3} borderRadius={4}>
          <Typography variant="h4" textAlign="center" margin="0.5rem">
            Festival
          </Typography>
          <form style={{ margin: '0.5rem' }} onSubmit={handleSubmit}>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  label="Festival Name"
                  name="festival_name"
                  value={festivalName}
                  onChange={(e) => setFestivalName(e.target.value)}
                  style={{ width: '75%' }}
                />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ width: '75%' }}
                />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  label="Festival Date"
                  type="date"
                  name="festival_date"
                  value={festivalDate}
                  onChange={(e) => setFestivalDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  style={{ width: '75%' }}
                />
              </Grid>
              <Grid item xs={10}>
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                 
                  onChange={(e) => setFestivalImage(e.target.files[0])}
                  style={{ display: 'none' }}
                  id="image-input"
                />
                <label htmlFor="image-input">
                  <Button variant="contained" component="span">
                    Choose Image
                  </Button>
                </label>
              </Grid>
              <Grid item xs={10}>
                <Button type="submit" variant="contained" color="primary">
                  Add
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </div>
    </Container>
  );
};

export default FestivalForm;
