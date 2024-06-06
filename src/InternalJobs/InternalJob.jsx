import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { APIData, org } from '../Authentication/APIData';
import { Grid, Card, CardContent, CardMedia, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';

export const InternalJob = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchInternalJobs();
    }, []);

    const fetchInternalJobs = async () => {
        const url = APIData.api + `jobs/valid-and-opening-type?valid=YES&openingType=INTERNAL&org=${org}`;
        const response = await axios.get(url, { headers: APIData.headers });
        setData(response.data);
        console.log("Internal Jobs data", response.data);
    };

    return (
        <Container>
            <Grid container spacing={3}>
                {data.map((job, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Card>
                            <CardMedia
                                component="img"
                                alt={job.job_id}
                                height="140"
                                image={job.image_url}
                                title={job.job_id}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {job.job_designation}

                                </Typography>
                                <Typography variant="body2" color="black" style={{ fontFamily: "Roboto Slab" }}>
                                    Department:  {job.job_dept}
                                </Typography>
                                <Typography variant="body2" color="black" style={{ fontFamily: "Roboto Slab" }}>
                                    Role:  {job.job_id}
                                </Typography>
                                <Typography variant="body2" color="black" style={{ fontFamily: "Roboto Slab" }}>
                                    Location:  {job.location}
                                </Typography>
                                <Typography variant="body2" color="black" style={{ fontFamily: "Roboto Slab" }}>
                                    Job Tenure: {job.job_tenure}
                                </Typography>
                                <Typography variant="body2" color="black" style={{ fontFamily: "Roboto Slab" }}>
                                    Salary: {job.salary}
                                </Typography>
                                {/* <Typography variant="body2" color="text.secondary">
                  {job.description}
                </Typography> */}
                                <br></br>
                                <Link to={{ pathname: `/job_id/${job.job_id}`, state: { job } }}>Know More </Link>

                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};
