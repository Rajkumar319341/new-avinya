import React, { useEffect, useState } from 'react';
import { Button, TextField, Paper, Grid, FormControl, InputLabel, FilledInput, Typography, Dialog, DialogContent, DialogTitle, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { APIData, org } from '../Authentication/APIData';
import Unsplash from '../Unsplash/Unsplash';

const UpdateDashboardImg = ({ data }) => {
    const [values, setValues] = useState({
        image_Type: '',
        placeholderTitle: '',
        placeholderDesc: '',
        placeholderName: '',
        placeholderImage: '',
    });
    const [imageData, setImageData] = useState(null);
    const [imageTypes, setImageTypes] = useState([]);
    const [image, setImage] = useState(null);
    const [open, setOpen] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState('');

    console.log("Data:", data)

    const fetchImageData = async () => {
        try {
            const response = await axios.get(`${APIData.api}org-placeholder/details/image?placeHolderName=${data}&org=${org}`, { headers: APIData.headers });
            const imageData = response.data;
            setImageData(imageData);
            setValues({
                image_Type: imageData.image_Type,
                placeholderTitle: imageData.placeholderTitle,
                placeholderDesc: imageData.placeholderDesc,
                placeholderName: imageData.placeholderName,
                placeholderImage: imageData.placeholderImage,
            });
            setImage(imageData.placeholderImage);
        } catch (error) {
            console.error('Error fetching image data:', error);
        }
    };

    useEffect(() => {
        fetchImageData();
    }, []);

    useEffect(() => {
        fetchImageTypes();
    }, []);

    const fetchImageTypes = async () => {
        try {
            const response = await axios.get(`${APIData.api}org-placeholder/details/all-imagetpes?org=${org}`, { headers: APIData.headers });
            setImageTypes(response.data);
        } catch (error) {
            console.error('Error fetching image types:', error);
        }
    };

    const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
    const updatedBy = sessiondetails.userName;

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    // const handleImageChange = (event) => {
    //     setImage(event.target.files[0]);
    //     setValues({ ...values, image: event.target.files[0] });
    // };
    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
        const file = event.target.files[0];
        setValues({ ...values, image: file });
        setSelectedFileName(file.name);
    };

    const fetchImageAsFile = async (imageUrl) => {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const fileName = imageUrl.split('/').pop();
        return new File([blob], fileName, { type: blob.type });
    };

    const handleImageSelect = async (selectedImageUrl) => {
        const imageFile = await fetchImageAsFile(selectedImageUrl);
        setValues({ ...values, image: imageFile });
        setSelectedFileName(imageFile.name);
        handleClose();
    };

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('updated_by', updatedBy);
        formData.append('image_Type', values.image_Type);
        formData.append('org', org);
        formData.append('placeholderDesc', values.placeholderDesc);
        formData.append('placeholderImage', values.image);
        formData.append('placeholderName', values.placeholderName);
        formData.append('placeholderTitle', values.placeholderName);

        console.log(formData);
        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        const url = `${APIData.api}org-placeholder/details/?`;

        axios.put(url, formData, { headers: APIData.headers })
            .then((resp) => {
                console.log(resp.data);
                toast.success("Updated Successfully");
                // window.location.reload();
            })
            .catch((err) => {
                console.log(err);
                toast.error(err);
            });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
        <Paper elevation={3} sx={{ padding: 2, maxWidth: 600, margin: 'auto' }}>
            <Typography variant='h5' style={{ textAlign: "center", fontFamily: "Roboto slab" }}> UPDATE HOME PAGE CARD</Typography>
            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Image Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="image_Type"
                            value={values.image_Type}
                            label="Image Type"
                            onChange={handleChange('image_Type')}
                        >
                            {imageTypes.map((type) => (
                                <MenuItem key={type} value={type}>{type}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        label="Image Title"
                        value={values.placeholderTitle}
                        onChange={handleChange('placeholderTitle')}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        label="Image Description"
                        value={values.placeholderDesc}
                        onChange={handleChange('placeholderDesc')}
                        fullWidth
                        multiline
                        rows={6}
                    />
                </Grid>

                {/* <Grid item xs={12}>
                    <img src={image} alt="Image" style={{ width: 200, height: 200, objectFit:"contain" }} /> 
                    <FormControl variant="standard">
                        <InputLabel shrink={true}>Image</InputLabel>
                        <FilledInput
                            id="image"
                            type='file'
                            onChange={handleImageChange}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={12} >
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Update
                    </Button>
                </Grid>

            </Grid>
        </Paper> */}
        <Grid item xs={12}>
                    <img src={image} alt="Image" style={{ width: 200, height: 200, objectFit:"contain" }} /> 
                    <FormControl variant="standard">
                        <InputLabel shrink={true}>Image</InputLabel>
                        <FilledInput
                            id="image"
                            type='file'
                            onChange={handleImageChange}
                        />
                    </FormControl>
                </Grid>
         <Grid item xs={12}>
                        <FormControl variant="standard">
                            <p>You Can Select images from our Website</p>
                            <Button onClick={handleClickOpen}>Images</Button>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: "center", marginTop: 10 }}>
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Upload Image</DialogTitle>
                <DialogContent>
                    <Unsplash onSelectImage={handleImageSelect} />
                </DialogContent>
            </Dialog>
        
       </>
    );
};

export default UpdateDashboardImg;