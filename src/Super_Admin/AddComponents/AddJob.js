import React, { useState } from 'react';
import axios from 'axios';
import { Grid, Paper, Typography, TextField, Button } from '@mui/material';
import { org } from '../../Authentication/APIData';
import { APIData } from '../../Authentication/APIData';
import { useEffect } from 'react';
import { FormControl, Select, MenuItem } from '@mui/material';
import { toast } from 'react-toastify';

const AddJob = () => {
    const [formData, setFormData] = useState({
        branch: '',
        description: '',
        id: 0,
        image_url: '',
        job_dept: '',
        job_designation: '',
        org: org,
        job_tenure: '',
        job_type: '',
        job_opening_type:'',
        location: '',
        role: '',
        roles_and_resp: '',
        salary: '',
        valid: ''
    });

    const [selectedImage, setSelectedImage] = useState(null);
    const [departments, setDepartments] = useState([]);
    const [designations, setDesignations] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const departmentsUrl = APIData.api + `org-designation/all-dept?org=${org}`;
                const departmentsResponse = await axios.get(departmentsUrl, { headers: APIData.headers });
                setDepartments(departmentsResponse.data);
                // toast.success("")
                // console.log("Department response:", departmentsResponse.data)
                setLoading(false);
            } catch (error) {
                // console.error('Error fetching departments:', error);
                toast.error("Error fetching departments")
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (formData.job_dept !== '') {
            const fetchDesignations = async () => {
                try {
                    const designationsUrl = APIData.api + `org-designation/all-designation?department=${formData.job_dept}&org=${org}`;
                    const designationsResponse = await axios.get(designationsUrl, { headers: APIData.headers });
                    setDesignations(designationsResponse.data);
                    // console.log("Designation response:", designationsResponse.data)
                } catch (error) {
                    // console.error('Error fetching designations:', error);
                    toast.error("Error fetching designations")
                }
            };

            fetchDesignations();
        }
    }, [formData.job_dept]);


    useEffect(() => {
        if (formData.job_dept !== '' && formData.job_designation !== '') {
            const fetchRoles = async () => {
                try {
                    const rolesUrl = APIData.api + `org-designation/all-roles?department=${formData.job_dept}&designation=${formData.job_designation}&org=${org}`;
                    const rolesResponse = await axios.get(rolesUrl, { headers: APIData.headers });
                    setRoles(rolesResponse.data);
                    // console.log("Role Response:", rolesResponse.data)
                } catch (error) {
                    // console.error('Error fetching roles:', error);
                    toast.error("Error fetching roles")
                }
            };

            fetchRoles();
        }
    }, [formData.job_designation]);


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            const imageData = reader.result.split(',')[1];
            setFormData(prevState => ({
                ...prevState,
                image_url: imageData,
            }));
            setSelectedImage(reader.result);
        };
        reader.readAsDataURL(file);
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        if (name === "role") {
            setFormData(prevState => ({
                ...prevState,
                job_id: value
            }));
        }
    };

    const handleSubmit = async () => {
        const url = APIData.api + 'jobs/';
        const headers = APIData.headers;

        try {
            const response = await axios.post(url, formData, { headers });

            if (response.status === 201) {
                // console.log('Job designation created successfully');
                toast.success("Job designation created successfully")
                setFormData({
                    branch: '',
                    description: '',
                    id: 0,
                    image_url: '',
                    job_dept: '',
                    job_designation: '',
                    org: org,
                    job_tenure: '',
                    job_type: '',
                    job_opening_type:'',
                    location: '',
                    role: '',
                    roles_and_resp: '',
                    salary: '',
                    valid: ''
                });
                setSelectedImage(null);
            } else {
                // console.error('Failed to create job designation');
                toast.error("Failed to create job designation")
            }
        } catch (error) {
            // console.error('Error:', error);
            toast.error(error)
        }
    };
    return (
        <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12} sm={8} md={6}>
                <Paper elevation={4} style={{ padding: 20 }}>
                    <Typography variant="h6" gutterBottom align="center">
                        Create Job
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="branch"
                                label="Branch"
                                value={formData.branch}
                                onChange={handleChange}
                                variant="outlined"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="description"
                                label="Description"
                                value={formData.description}
                                onChange={handleChange}
                                variant="outlined"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="outlined">
                                <Select
                                    name="job_dept"
                                    value={formData.job_dept}
                                    onChange={handleChange}
                                    displayEmpty
                                    required
                                    disabled={loading}
                                >
                                    <MenuItem value="" disabled>
                                        Department
                                    </MenuItem>
                                    {departments.map(dept => (
                                        <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>


                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="outlined">
                                <Select
                                    name="job_designation"
                                    value={formData.job_designation}
                                    onChange={handleChange}
                                    displayEmpty
                                    required
                                    disabled={loading || !formData.job_dept}
                                >
                                    <MenuItem value="" disabled>
                                        Designation
                                    </MenuItem>
                                    {designations.map((designation) => (
                                        <MenuItem key={designation} value={designation}>
                                            {designation}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="outlined">
                                <Select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    displayEmpty
                                    required
                                    disabled={loading || !formData.job_designation}
                                >
                                    <MenuItem value="" disabled>
                                        Role
                                    </MenuItem>
                                    {roles.map(role => (
                                        <MenuItem key={role} value={role}>{role}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="job_tenure"
                                label="Job Tenure"
                                value={formData.job_tenure}
                                onChange={handleChange}
                                variant="outlined"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="outlined">
                                <Select
                                    name="job_type"
                                    value={formData.job_type}
                                    onChange={handleChange}
                                    displayEmpty
                                    required
                                >
                                    <MenuItem value="" disabled>
                                        Job Type
                                    </MenuItem>
                                    <MenuItem value="PERMANENT">PERMANENT</MenuItem>
                                    <MenuItem value="CONTRACTOR">CONTRACTOR</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="outlined">
                                <Select
                                    name="job_opening_type"
                                    value={formData.job_opening_type}
                                    onChange={handleChange}
                                    displayEmpty
                                    required
                                >
                                    <MenuItem value="" disabled>
                                        Job Opening Type
                                    </MenuItem>
                                    <MenuItem value="INTERNAL">INTERNAL</MenuItem>
                                    <MenuItem value="EXTERNAL ">EXTERNAL </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="location"
                                label="Location"
                                value={formData.location}
                                onChange={handleChange}
                                variant="outlined"
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="roles_and_resp"
                                label="Roles and Responsibilities"
                                value={formData.roles_and_resp}
                                onChange={handleChange}
                                variant="outlined"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="salary"
                                label="Salary"
                                value={formData.salary}
                                onChange={handleChange}
                                variant="outlined"
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="outlined">
                                <Select
                                    name="valid"
                                    value={formData.valid}
                                    onChange={handleChange}
                                    displayEmpty
                                    required
                                >
                                    <MenuItem value="" disabled>
                                        Valid
                                    </MenuItem>
                                    <MenuItem value="YES">YES</MenuItem>
                                    <MenuItem value="NO">NO</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: 'center' }}>
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="upload-image"
                                type="file"
                                onChange={handleImageChange}
                            />
                            <label htmlFor="upload-image">
                                <Button variant="outlined" component="span">
                                    Upload Image
                                </Button>
                            </label>
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: 'center' }}>
                            {selectedImage && <img src={selectedImage} alt="Selected" style={{ maxWidth: '50%', maxHeight: '50%' }} />}
                        </Grid>


                        <Grid item xs={12} container justifyContent="center">
                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default AddJob;


