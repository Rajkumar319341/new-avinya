import React, { useState, useEffect } from "react";
import { APIData, org } from '../Authentication/APIData';
import axios from 'axios';
import Loading from "../Loading";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { InputLabel,Select,MenuItem,FormControl } from "@mui/material";
import './Jobstatus.css';
import { toast, ToastContainer } from "react-toastify";

const Jobstatus = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    const [formData, setFormData] = useState({});
    const [selectedValid, setSelectedValid] = useState("YES");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `${APIData.api}jobs?org=${org}`;
                const response = await fetch(url, { headers: APIData.headers });
                const data = await response.json();
                setUser(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching job data:", error);
            }
        };
        fetchData();
    }, []);

    const openDialog = (formData) => {
        setFormData(formData);
        setShowDialog(true);
    };

    const closeDialog = () => {
        setShowDialog(false);
    };

    const handleValidChange = (e) => {
        setSelectedValid(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { id, org } = formData;
        const url = `${APIData.api}jobs/?id=${id}`;
        const updatedFormData = new FormData();
        updatedFormData.append('job_type', formData.job_type);
        updatedFormData.append('job_id', formData.job_id);
        updatedFormData.append('job_designation', formData.job_designation);
        updatedFormData.append('job_dept', formData.job_dept);
        updatedFormData.append('description', formData.description);
        updatedFormData.append('location', formData.location);
        updatedFormData.append('branch', formData.branch);
        updatedFormData.append('job_tenure', formData.job_tenure);
        updatedFormData.append('salary', formData.salary);
        updatedFormData.append('role', formData.role);
        updatedFormData.append('roles_and_resp', formData.roles_and_resp);
        updatedFormData.append('valid', selectedValid);
        updatedFormData.append('org', org);

        axios.put(url, updatedFormData, {
            headers: { ...APIData.headers, 'Content-Type': 'multipart/form-data' }
        })
            .then(response => {
                console.log("Url inside put:", url)
                if (response.status === 201 || response.status === "success") {
                    toast.success("Updated Successfully")
                    console.log("Response:", response.data)
                    console.log("Updated successfully");
                    closeDialog();
                    //   window.location.reload(); 
                } else {
                    console.log("Check with the admin");
                }
            })
            .catch(error => {
                console.error("Error updating job:", error);
            });
    };

    return (
        <div>
            <Grid xs={12} sm={6} md={4} lg={3} style={{ padding: "5px" }}>
                {loading || !user ? <Loading /> :
                    <Grid container spacing={3}>
                        {user.map(item => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={item.job_id}>
                                <Paper  elevation={3} sx={{
                                    ':hover': {
                                        boxShadow: 20,
                                    },
                                }} style={{ padding: "10px"}}>
                                    <h4>{item.job_designation}</h4>

                                    <p> Role:{item.job_id}</p>
                                    <p>Department:{item.job_dept}</p>
                                    <p>Job Type: {item.job_type}</p>
                                    <p>Salary: {item.salary}</p>
                                    <p>Job Tenure:{item.job_tenure}</p>
                                    <br></br>
                                    <Button sx={{
                                        ':hover': {
                                            bgcolor: 'primary.main',
                                            color: 'white',
                                        },
                                    }} variant="outlined" onClick={() => openDialog(item)}>Edit status</Button>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                }
            </Grid>

            <Dialog open={showDialog} onClose={closeDialog} sx={{
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        width: "100%",
                        maxWidth: "400px",
                    },
                },
            }} >
                <DialogTitle style={{ textAlign: "center" }}>Edit Job Status</DialogTitle>
                <br></br>
                <DialogContent sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "300px",
                        },
                    },
                }}>
                    {/* <label style={{ textAlign: "center" }} sx={{
                        "& .MuiDialog-container": {
                            "& .MuiPaper-root": {
                                width: "100%",
                                maxWidth: "300px",

                            },
                        },
                    }}>
                        Valid:
                        <select value={selectedValid} onChange={handleValidChange}>
                            <option value="YES">Yes</option>
                            <option value="NO">No</option>
                        </select>
                    </label> */}
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Valid </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedValid}
                            label="Valid"
                            onChange={handleValidChange}
                                                    >
                            <MenuItem value="YES">YES</MenuItem>
                            <MenuItem value="NO">NO</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>Cancel</Button>
                    <Button type="submit" onClick={handleSubmit} variant="contained" color="primary">Update</Button>
                </DialogActions>
            </Dialog>
            <ToastContainer/>
        </div>
    );
};

export default Jobstatus;
