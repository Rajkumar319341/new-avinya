import React, { useEffect, useState } from 'react';
import { APIData, org } from '../Authentication/APIData';
import { Container, Typography, Box, Grid, TextField, useMediaQuery, Button, FormControl, InputLabel, Select, MenuItem, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TableHead } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'; 
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Table, TableRow, TableCell, TableBody, TableContainer, useTheme } from '@mui/material'


export const ViewQuestions = () => {
  const [data, setData] = useState(null);
  const [data1, setData1] = useState(null)
  const [grades, setGrades] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [updatedQuestion, setUpdatedQuestion] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);


  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchData = async () => {
      const url = APIData.api + `questions/?org=${org}`;
      console.log("get all:", url);
      try {
        const response = await fetch(url, { headers: APIData.headers });
        const jsonData = await response.json();
        console.log("Complete Data:", jsonData);
        setData(jsonData);

        const uniqueGrades = [...new Set(jsonData.map(item => item.grade))];
        setGrades(uniqueGrades);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedGrade) {
      const filteredSubjects = [...new Set(data.filter(item => item.grade === selectedGrade).map(item => item.subject))];
      setSubjects(filteredSubjects);
    }
  }, [selectedGrade, data]);

  useEffect(() => {
    if (selectedGrade && selectedSubject) {
      const filteredChapters = [...new Set(data.filter(item => item.grade === selectedGrade && item.subject === selectedSubject).map(item => item.chapter))];
      setChapters(filteredChapters);
    }
  }, [selectedGrade, selectedSubject, data]);

  useEffect(() => {
    if (data) {
      const uniqueTypes = [...new Set(data.map(item => item.question_type))];
      setTypes(uniqueTypes);
    }
  }, [data]);

 
  const handleEdit = (item) => {
    setUpdatedQuestion(item.question);
    console.log("Item question:", item.question);
    setEditDialogOpen(true);
    if (Array.isArray(item)) {
      setData1(item);
    } else {
      console.error("Item is not an array:", item);
    }
    console.log("data1:", data1);
  };

  const handleDelete = (itemId) => {
    const url = `${APIData.api}questions/?id=${itemId}`;
    axios.delete(url, {
      headers: APIData.headers
    })
    .then(response => {
      if (response.status === 200 || response.status === "success") {
        console.log("deleted successfully");
        toast('Deleted successfully');
        window.location.reload();
      } else {
        console.log("Check with the admin");
      }
    })
    .catch(error => {
      console.error(error);
      toast("It's time to grab a coffee");
    });
  };
  
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setUploadedImage(file);
  };
  
  
  const handleUpdateQuestion = () => {
    const url = `${APIData.api}questions/?id=${data1[0].id}`;
    const formData = new FormData();
    formData.append('question', updatedQuestion);
    formData.append('grade', data1[0].grade);
    formData.append('question_type', data1[0].question_type);
    formData.append('imp_question', data1[0].imp_question);
    formData.append('subject', data1[0].subject);
    formData.append('chapter', data1[0].chapter);
    formData.append('org',org);
  
    if (uploadedImage) {
      formData.append('image', uploadedImage);
    }
  
    axios.put(url, formData, {
      headers: { ...APIData.headers, 'Content-Type': 'multipart/form-data' }
    })
      .then(response => {
        if (response.status === 201 || response.status === "success") {
          console.log("updated successfully");
          console.log("URl", url)
          toast('Updated successfully');
          window.location.reload();
        } else {
          console.log("Check with the admin");
        }
      })
      .catch(error => {
        console.error(error);
        toast("It's time to grab a coffee");
      });
  };
  


  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  const handleSubmit = () => {
    let url = `${APIData.api}questions/grade-subject-chapter?grade=${selectedGrade}&subject=${selectedSubject}&chapter=${selectedChapter}&org=${org}`;
    console.log('API URL for get to update:', url);

    fetch(url, {
      method: 'GET',
      headers: APIData.headers
    })
      .then(response => response.json())
      .then(jsonData => {
        console.log("Data loaded successfully:", jsonData);
        console.log("Url inside get call:", url);
        setData1(jsonData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <Container>
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" style={{ color: "red" }}>
          Question Paper Editor
        </Typography>
      </Box>

      <Grid container spacing={3} style={{ alignContent: "center", alignItems: "center", justifyContent: "space-around" }}>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel id="grade-label"   >Grade</InputLabel>
            <Select
              labelId="grade-label"
              id="grade"
              variant='standard'
              value={selectedGrade}

              onChange={(e) => setSelectedGrade(e.target.value)}
            >
              <MenuItem value="">
                <em>Select Grade</em>
              </MenuItem>
              {grades.map((grade, index) => (
                <MenuItem key={index} value={grade}>{grade}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel id="subject-label">Subject</InputLabel>
            <Select
              labelId="subject-label"
              id="subject"
              variant='standard'

              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              disabled={!selectedGrade}
            >
              <MenuItem value="">
                <em>Select Subject</em>
              </MenuItem>
              {subjects.map((subject, index) => (
                <MenuItem key={index} value={subject}>{subject}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel id="chapter-label">Chapter</InputLabel>
            <Select
              labelId="chapter-label"
              id="chapter"
              variant='standard'

              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              disabled={!selectedSubject}
            >
              <MenuItem value="">
                <em>Select Chapter</em>
              </MenuItem>
              {chapters.map((chapter, index) => (
                <MenuItem key={index} value={chapter}>{chapter}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
      </Box>
      <Box sx={{ mt: 2 }}>
        {data1 ? (
          <TableContainer >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontFamily: "Roboto Slab", fontWeight: "bold" }}>Question</TableCell>
                  <TableCell align="center" style={{ fontFamily: "Roboto Slab", fontWeight: "bold" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data1.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      {item.question}
                      {item.image_url && (
                        <div style={{ marginTop: "1rem" }}>
                          <img
                            src={item.image_url}
                            alt="Question"
                            style={{ maxWidth: "100%", height: "auto" }}
                          />
                        </div>
                      )}
                    </TableCell>
                    <TableCell align={isSmallScreen ? "left" : "center"}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: isSmallScreen ? "column" : "row",
                          alignItems: "center",
                          justifyContent: isSmallScreen ? "flex-start" : "center",
                        }}
                      >
                        <IconButton aria-label="edit" onClick={() => handleEdit(item)}>
                          <EditIcon style={{ color: "blue", marginBottom: isSmallScreen ? "1rem" : "0px" }} />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={() => handleDelete(item.id)}>
                          <DeleteIcon style={{ color: "red", marginLeft: isSmallScreen ? "0px" : "1rem" }} />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>
          </TableContainer>
        ) : (

          <Typography style={{ textAlign: "center" }}>Edit your Question here !!</Typography>
        )}
      </Box>

      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog} maxWidth="md" fullWidth>
        <DialogTitle>Edit Question</DialogTitle>
        <br></br>
        <DialogContent>
          <TextField
            label="Updated Question"
            value={updatedQuestion}
            onChange={(e) => setUpdatedQuestion(e.target.value)}
            fullWidth
          />
          {/* {data1.image_url && (
      <Box mt={2}>
        <Typography variant="subtitle1">Current Image:</Typography>
        <img src={data1.image_url} alt="Current Question Image" style={{ maxWidth: "100%", height: "auto" }} />
      </Box>
    )} */}
          <Box mt={2}>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleUpdateQuestion} variant="contained" color="primary">Submit</Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </Container>
  );
};

export default ViewQuestions;

