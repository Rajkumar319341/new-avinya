import React, { useEffect, useState } from 'react';
import { APIData, org } from '../Authentication/APIData';
import { Container, Typography, Box, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import QuestionPaperTemplate from './QuestionPaperTemplate';

export const QuestionPaperByAll = () => {
  const [data, setData] = useState(null);
  const [data1, setData1] = useState(null)
  const [grades, setGrades] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedOption, setSelectedOption] = useState('chapter');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [counts, setCounts] = useState({});


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

  const handleTypeChange = (type) => {
    setSelectedTypes([...selectedTypes, type]);
  };

  const handleCountChange = (type, count) => {
    setCounts({ ...counts, [type]: count });
  };

  const handleSubmit = () => {
    let url = `${APIData.api}questions/grade-subject`;
    url += selectedOption === 'chapter'
      ? `-chapter-type?org=${org}&grade=${selectedGrade}&subject=${selectedSubject}&chapter=${selectedChapter}`
      : `-type?org=${org}&grade=${selectedGrade}&subject=${selectedSubject}`;

    for (let i = 0; i < selectedTypes.length; i++) {
      const type = selectedTypes[i];
      const count = counts[type];
      url += `&type${i === 0 ? '' : i + 1}=${type}&count${i === 0 ? '' : i + 1}=${count}`;
    }

    console.log('API URL:', url);

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
        <Typography variant="h6" style={{color:"red"}}>
          Question Paper Generator
        </Typography>
      </Box>
      <FormControl fullWidth>
        <InputLabel id="option-label">Generate Question Paper By</InputLabel>
        <Select
          labelId="option-label"
          id="option"
          variant='standard'

          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <MenuItem value="chapter">Chapter</MenuItem>
          <MenuItem value="subject">Whole Subject</MenuItem>
        </Select>
      </FormControl>
      <br></br>
      <br></br>
      {selectedOption === 'chapter' ? (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel id="grade-label"   >Grade</InputLabel>
              <Select
                labelId="grade-label"
                id="grade"
                value={selectedGrade}
                variant='standard'

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
                variant='standard'

                id="chapter"
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
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel id="type-label">Type</InputLabel>
              <Select
                labelId="type-label"
                variant='standard'

                id="type"
                value={selectedType}
                onChange={(e) => {
                  setSelectedType(e.target.value);
                  handleTypeChange(e.target.value);
                }}
              >
                <MenuItem value="">
                  <em>Select Type</em>
                </MenuItem>
                {types.map((type, index) => (
                  <MenuItem key={index} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel id="grade-label">Grade</InputLabel>
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
              <InputLabel id="type-label">Type</InputLabel>
              <Select
                labelId="type-label"
                id="type"
                variant='standard'

                value={selectedType}
                onChange={(e) => {
                  setSelectedType(e.target.value);
                  handleTypeChange(e.target.value);
                }}
              >
                <MenuItem value="">
                  <em>Select Type</em>
                </MenuItem>
                {types.map((type, index) => (
                  <MenuItem key={index} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {selectedTypes.map((type, index) => (
          <div key={index}>
            <TextField
              label={`${type} Count`}
              value={counts[type] || ''}
              onChange={(e) => handleCountChange(type, e.target.value)}
              type="number"
              sx={{ mt: 2 }}
            />
          </div>
        ))}
      </div>

      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
      </Box>
      {data ? (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <QuestionPaperTemplate data={data1} />
        </Box>
      ) : (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography>Loading...</Typography>
        </Box>
      )}
    </Container>
  );
};

export default QuestionPaperByAll;
