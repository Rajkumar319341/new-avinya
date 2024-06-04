import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import { Select, MenuItem } from '@mui/material';
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
        height: '55vh',
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
    select: {
        height: '50px',

    },
    button: {
        marginTop: theme.spacing(2),
        display: 'block',
        margin: '0 auto',
    },
}));

export default function Addquestions() {
    const classes = useStyles();
    const [values, setValues] = useState({
        image: '',
        questions: '',
        grade: '',
        question_type: '',
        imp_question: '',
        subject: '',
        chapter: '',
        org: org
    });
    const [errors, setErrors] = useState({});


    const handleChange = (prop) => (event) => {
        if (prop === 'image') {
            const file = event.target.files[0];
            if (file) {
                setValues({ ...values, [prop]: file });
            }
        } else {
            setValues({ ...values, [prop]: event.target.value });
        }
        setErrors({ ...errors, [prop]: '' });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const errors = {};
        if (!values.grade.trim()) {
            errors.grade = ' Grade is required';
        }
        if (!values.questions.trim()) {
            errors.questions = ' Write a question ';
        }
        if (!values.chapter.trim()) {
            errors.chapter = ' Chapter is required';
        }
        if (!values.question_type.trim()) {
            errors.question_type = ' Question type is required';
        }
        if (!values.imp_question.trim()) {
            errors.imp_question = 'Isn*t  question is importent';
        }
        if (!values.subject.trim()) {
            errors.subject = 'Subject is required';
        }
        if (Object.keys(errors).length === 0) {
            console.log('Form submitted:', values);

            const formData = new FormData();
            Object.keys(values).forEach((key) => {
                // Append all form data except for image
                if (key !== 'image') {
                    formData.append(key, values[key]);
                }
            });

            // Append the image directly
            formData.append('image', values.image);

            console.log(formData);
            for (const [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }
            const url = `${APIData.api}questions/`;
            console.log("Url :", url)
            const combined = `${url}${JSON.stringify(formData)}`;
            console.log("Combined URL + FormData:", combined);


            axios.post(APIData.api + 'questions/', formData, { headers: APIData.headers })
                .then((resp) => {
                    console.log(resp.data);
                    toast.success("Updated Successfully")
                    // window.location.reload();
                })
                .catch((err) => {
                    console.log(err);
                    toast.error(err)
                })
        } else {
            setErrors(errors);
        }
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                <h4 style={{ color: "red" }}>Add Questions</h4>
                <form onSubmit={handleSubmit}>


                    <FormControl className={clsx(classes.margin, classes.textField)} variant="standard">
                        <InputLabel htmlFor="Description" shrink={true}>Grade</InputLabel>
                        <FilledInput
                            id="grade"
                            value={values.grade}
                            onChange={handleChange('grade')}
                            aria-describedby="filled-weight-helper-text"
                            error={!!errors.grade}
                        />
                        {errors.grade && <span style={{ color: 'red' }}>{errors.grade}</span>}
                    </FormControl>

                    <FormControl className={clsx(classes.margin, classes.textField)} variant="standard">
                        <InputLabel htmlFor="Description" shrink={true}>Subject</InputLabel>
                        <FilledInput
                            id="subject"
                            value={values.subject}
                            onChange={handleChange('subject')}
                            aria-describedby="filled-weight-helper-text"
                            error={!!errors.subject}
                        />
                        {errors.subject && <span style={{ color: 'red' }}>{errors.subject}</span>}
                    </FormControl>

                    <FormControl className={clsx(classes.margin, classes.textField)} variant="standard">
                        <InputLabel htmlFor="Description" shrink={true}>Chapter Name</InputLabel>
                        <FilledInput
                            id="chapter"
                            value={values.chapter}
                            onChange={handleChange('chapter')}
                            aria-describedby="filled-weight-helper-text"
                            error={!!errors.chapter}

                        />
                        {errors.chapter && <span style={{ color: 'red' }}>{errors.chapter}</span>}
                    </FormControl>
                    <FormControl className={clsx(classes.margin,)} variant="standard">
                        <InputLabel htmlFor="image" shrink={true} >Image</InputLabel>
                        <FilledInput
                            // accept="image/*"
                            id="image"
                            type='file'

                            onChange={handleChange('image')}

                        />
                    </FormControl>

                    <FormControl className={clsx(classes.margin, classes.textField1)} variant="standard">
                        <InputLabel htmlFor="Question" shrink={true}>Question</InputLabel>
                        <FilledInput
                            id="Question"
                            value={values.questions}
                            onChange={handleChange('questions')}
                            error={!!errors.questions}
                        />
                        {errors.questions && <span style={{ color: 'red' }}>{errors.questions}</span>}
                    </FormControl>
                    <FormControl className={clsx(classes.margin, classes.textField)} variant="standard">
                        <InputLabel htmlFor='question-type' shrink={true}>Question Type</InputLabel>
                        <Select
                            className={classes.select}
                            id="question-type"
                            value={values.question_type}
                            aria-describedby="filled-weight-helper-text"
                            onChange={handleChange('question_type')}
                            error={!!errors.question_type}
                            variant='standard'

                        >
                            <MenuItem value={'ONE_MARK'}>1 mark,</MenuItem>
                            <MenuItem value={'TWO_MARKS'}>2 mark,</MenuItem>
                            <MenuItem value={'THREE_MARKS'}>3 mark,</MenuItem>
                            <MenuItem value={'FIVE_MARKS'}>5 mark,</MenuItem>

                        </Select>
                        {errors.question_type && <span style={{ color: 'red' }}>{errors.question_type}</span>}
                    </FormControl>
                    <FormControl className={clsx(classes.margin, classes.textField)} variant="standard">
                        <InputLabel htmlFor="imp_question" shrink={true}>Importent</InputLabel>
                        <Select
                            className={classes.select}
                            id="imp_question"
                            value={values.imp_question}
                            aria-describedby="filled-weight-helper-text"
                            onChange={handleChange('imp_question')}
                            error={!!errors.question_type}
                            variant='standard'
                        >
                            <MenuItem value={'YES'}>Yes</MenuItem>
                            <MenuItem value={'NO'}>No</MenuItem>
                        </Select>
                        {errors.imp_question && <span style={{ color: 'red' }}>{errors.imp_question}</span>}
                    </FormControl>

                    <Button type="submit" variant="contained" color="primary" className={classes.button}>
                        Submit
                    </Button>
                </form>
            </Paper>
        </div>
    );
}
