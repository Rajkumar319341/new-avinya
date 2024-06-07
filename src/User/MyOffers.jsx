import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Button, CardActions, Box } from '@mui/material';
import axios from 'axios';
import { APIData, org } from '../Authentication/APIData';
import { toast } from 'react-toastify';

const selectedJob = JSON.parse(localStorage.getItem("selectedItem"));
console.log("Selected Job:", selectedJob);

const SessionDetails =  JSON.parse(localStorage.getItem("sessiondetails"));
const userEmail=SessionDetails?SessionDetails.email:null;
console.log("User email:", userEmail);


export const MyOffers = () => {
    const [isVisible, setIsVisible] = useState(true);
    const baseUrl = `${APIData.api}enrollments/employee-acceptance-status?User_email=${userEmail}&org=${org}&employee_acceptance_status=`;
    console.log("base url:", baseUrl);

    const clearJobFromStorage = () => {
        localStorage.removeItem("selectedItem");
    };

    const handleAccept = async () => {
        try {
            const response = await axios.put(`${baseUrl}ACCEPTED`, {}, { headers: APIData.headers });
            console.log('Response:', response.data);
            toast.success('Job accepted successfully');
            clearJobFromStorage();
            setIsVisible(false);
        } catch (error) {
            console.error('Error accepting job:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            } else if (error.request) {
                console.error('Request data:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
            toast.error('Failed to accept job');
        }
    };

    const handleReject = async () => {
        try {
            const response = await axios.put(`${baseUrl}REJECTED`, {}, { headers: APIData.headers });
            console.log('Response:', response.data);
            toast.success('Job rejected successfully');
            clearJobFromStorage();
            setIsVisible(false);
        } catch (error) {
            console.error('Error rejecting job:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            } else if (error.request) {
                console.error('Request data:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
            toast.error('Failed to reject job');
        }
    };

    if (!isVisible || !selectedJob) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" >
                <Typography variant="h6" color="textSecondary">
                    No Job Offers Available. Kindly go to the portal and apply for jobs.
                </Typography>
            </Box>
        );
    }

    return (
        <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card>
                    <CardMedia
                        component="img"
                        alt={selectedJob.job_id}
                        height="140"
                        image={selectedJob.image_url}
                        title={selectedJob.job_id}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {selectedJob.job_id}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <strong>Designation:</strong> {selectedJob.job_designation}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <strong>Department:</strong> {selectedJob.job_dept}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <strong>Location:</strong> {selectedJob.location}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <strong>Branch:</strong> {selectedJob.branch}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <strong>Role:</strong> {selectedJob.role}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Grid container justifyContent="space-between">
                            <Button size="small" variant="contained" color="primary" onClick={handleAccept}>
                                Accept
                            </Button>
                            <Button size="small" variant="contained" color="secondary" onClick={handleReject}>
                                Reject
                            </Button>
                        </Grid>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    );
};
