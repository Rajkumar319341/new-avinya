import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Paper } from '@mui/material';
import axios from 'axios';
import { APIData, org } from '../Authentication/APIData'
import { toast } from 'react-toastify';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
    },
    paper: {
        width: '60%',
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            width: '90%',
        },
    },
    margin: {
        margin: theme.spacing(1),
    },
    textField: {
        width: '20ch',
    },
    textField1: {
        width: '90%',
        [theme.breakpoints.down('sm')]: {
            width: '90%',
        },
    },
    button: {
        marginTop: theme.spacing(2),
    },
}));

export default function HolidayForm() {
    const classes = useStyles();
    const [values, setValues] = useState({
        id: 0,
        description: '',
        holiday_date: '',
        holiday_name: '',
        org:org
    });
    const [errors, setErrors] = useState({});

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        setErrors({ ...errors, [prop]: '' });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const errors = {};
        if (!values.holiday_name.trim()) {
            errors.holiday_name = ' Name is required';
        }
        if (!values.holiday_date) {
            errors.holiday_date = 'Date is required';
        }
        if (!values.description.trim()) {
            errors.description = 'Description is required';
        }
        if (Object.keys(errors).length === 0) {
            console.log('Form submitted:', values);
            axios.post(APIData.api + 'holidays/', values, { headers: APIData.headers })
                .then((resp) => { 
                    // console.log(resp); 
                    toast.success("Updated Successfully")
                    window.location.reload();
                })
                .catch((err) => {
                    // console.log(err);
                    toast.error(err)
                })
        } else {
            setErrors(errors);
        }
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                <h5 style={{ color: "red" }}>Add Holiday Details</h5>
                <form onSubmit={handleSubmit}>
                    <FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
                        <InputLabel htmlFor="Description">Holiday Name</InputLabel>
                        <FilledInput
                            id="holiday_name"
                            value={values.holiday_name}
                            onChange={handleChange('holiday_name')}
                            aria-describedby="filled-weight-helper-text"
                            error={!!errors.holiday_name}
                        />
                        {errors.holiday_name && <span style={{ color: 'red' }}>{errors.holiday_name}</span>}
                    </FormControl>
                    <TextField
                        label="Holiday Date"
                        type='date'
                        id="holiday_date"
                        className={clsx(classes.margin, classes.textField)}
                        value={values.holiday_date}
                        onChange={handleChange('holiday_date')}
                        error={!!errors.holiday_date}
                        variant="filled"
                        InputProps={{
                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                        }}
                    />
                    {errors.holiday_date && <span style={{ color: 'red' }}>{errors.holiday_date}</span>}
                    <FormControl className={clsx(classes.margin, classes.textField1)} variant="filled">
                        <InputLabel htmlFor="Description">Description</InputLabel>
                        <FilledInput
                            id="Description"
                            value={values.description}
                            onChange={handleChange('description')}
                            error={!!errors.description}
                        />
                        {errors.description && <span style={{ color: 'red' }}>{errors.description}</span>}
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary" className={classes.button}>
                        Submit
                    </Button>
                </form>
            </Paper>
        </div>
    );
}
