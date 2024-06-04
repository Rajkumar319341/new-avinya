// FestivalForm.js
import React, { useState } from 'react';
import { TextField, Button, Container, Grid } from '@mui/material';

const FestivalForm = () => {
  const [festivalData, setFestivalData] = useState({
    festival_name: '',
    description: '',
    festival_date: '',
    image: '',
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFestivalData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFestivalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, for demonstration just log the data
    console.log('Submitted data:', festivalData);
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Festival Name"
              name="festival_name"
              value={festivalData.festival_name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={festivalData.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Festival Date"
              type="date"
              name="festival_date"
              value={festivalData.festival_date}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleImageChange}
              style={{ width: '100%', padding: '10px' }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add Festival
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default FestivalForm;
