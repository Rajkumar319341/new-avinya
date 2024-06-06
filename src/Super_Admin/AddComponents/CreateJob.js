import React, { useState } from 'react';
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { org } from '../../Authentication/APIData';
import { APIData } from '../../Authentication/APIData';
import { toast } from 'react-toastify';

const CreateJob = () => {
    const [formData, setFormData] = useState({
        dept: '',
        id: 0,
        designation: '',
        privilege: '',
        role: '',
        grade: '',
        org: org,
        access_level: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleAccessLevelChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            access_level: checked 
                ? [...prevFormData.access_level, value] 
                : prevFormData.access_level.filter((level) => level !== value),
        }));
    };

    const handleSubmit = async () => {
        console.log(formData);
        const url = APIData.api + 'org-designation/';
        const headers = APIData.headers;

        try {
            const response = await axios.post(url, formData, { headers });

            if (response.status === 201) {
                // console.log('Job designation created successfully');
                toast.success("Job designation created successfully")
                setFormData({
                    dept: '',
                    id: 0,
                    designation: '',
                    privilege: '',
                    role: '',
                    org: org,
                    grade: '',
                    access_level: [],
                });
            } else {
                // console.error('Failed to create job designation');
                toast.error("Failed to create job designation")
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleValidation = () => {
        if (!formData.dept || !formData.designation || !formData.privilege || !formData.role || formData.access_level.length === 0) {
            alert('Please fill in all fields');
            return false;
        }
        return true;
    };

    return (
        <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12} sm={8} md={6}>
                <Paper elevation={4} style={{ padding: 20 }}>
                    <Typography variant="h6" gutterBottom align="center">
                        Create Designation
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="dept"
                                label="Department"
                                value={formData.dept}
                                onChange={handleChange}
                                variant="outlined"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="designation"
                                label="Designation"
                                value={formData.designation}
                                onChange={handleChange}
                                variant="outlined"
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <Select
                                    name="privilege"
                                    value={formData.privilege}
                                    onChange={handleChange}
                                    displayEmpty
                                    required
                                >
                                    <MenuItem value="" disabled>
                                        Privilege
                                    </MenuItem>
                                    <MenuItem value={1000}>Read Only</MenuItem>
                                    <MenuItem value={1100}>Read,Write</MenuItem>
                                    <MenuItem value={1110}>Read,Write,Update</MenuItem>
                                    <MenuItem value={1111}>Read,Write,Update,Delete</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="role"
                                label="Role"
                                value={formData.role}
                                onChange={handleChange}
                                variant="outlined"
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h8" gutterBottom>
                                Access Level
                            </Typography>
                            <FormGroup>
                                <Grid container spacing={2}>
                                    <Grid item xs={6} sm={3}>
                                        <FormControlLabel
                                            control={<Checkbox name="accessLevels" value="Members" onChange={handleAccessLevelChange} />}
                                            label="Members"
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <FormControlLabel
                                            control={<Checkbox name="accessLevels" value="HR" onChange={handleAccessLevelChange} />}
                                            label="HR"
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <FormControlLabel
                                            control={<Checkbox name="accessLevels" value="Sales" onChange={handleAccessLevelChange} />}
                                            label="Sales"
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <FormControlLabel
                                            control={<Checkbox name="accessLevels" value="Finance" onChange={handleAccessLevelChange} />}
                                            label="Finance"
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <FormControlLabel
                                            control={<Checkbox name="accessLevels" value="Expense" onChange={handleAccessLevelChange} />}
                                            label="Expense" 
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <FormControlLabel
                                            control={<Checkbox name="accessLevels" value="Admin" onChange={handleAccessLevelChange} />}
                                            label="Admin"
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <FormControlLabel
                                            control={<Checkbox name="accessLevels" value="Procurement" onChange={handleAccessLevelChange} />}
                                            label="Procurement"
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <FormControlLabel
                                            control={<Checkbox name="accessLevels" value="Enrollments" onChange={handleAccessLevelChange} />}
                                            label="Enrollments"
                                        />
                                    </Grid>
                                </Grid>
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} style={{textAlign:"center"}}>
                            <Button variant="contained" color="primary" onClick={() => {
                                if (handleValidation()) {
                                    handleSubmit();
                                }
                            }}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default CreateJob;

