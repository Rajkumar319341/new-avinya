import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import './App.css';
import shikshaklogo from '../src/Images/portalLogo_picture@2x.png';
import care4edulogo from '../src/Images/c4eLOGO1.png';
import satelliteimage from '../src/Images/paint_satellite.png';
import { APIData } from './Authentication/APIData';

function Quizathon() {

  // const schoolNames = ['1BY', '1RV', '2CR'];

  const [data, setData] = useState([]);
  const [result, setResult] = useState({});
  const [schoolResults, setSchoolResults] = useState([]);
  const [schoolNames, setSchoolNames] = useState([]);
  const [schoolName, setSchoolName] = useState('');
  const [schoolCode, setSchoolCode] = useState('');
  const [studentName, setStudentName] = useState('');
  const [message, setMessage] = useState('');
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const [isSchoolResultsVisible, setIsSchoolResultsVisible] = useState(true);
  const [isShortlistedVisible, setIsShortlistedVisible] = useState(false);
  const [isLabelVisible, setIsLabelVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  // const checkSchoolId = () => {
  //   if (!schoolName || !studentName) {
  //     setMessage('Fields cannot be left empty');

  //   } else if (schoolNames.includes(schoolName)) {
  //     setMessage('School ID exists');

  //   } else {
  //     setMessage('School with this ID does not exist');

  //   }
  // };

  // const data = [
  //   {
  //     'level': '10',
  //     'school': 'HPS',
  //     'grade': 'B+',
  //     'studentName': 'Abhi'
  //   },
  //   {
  //     'level': '1',
  //     'school': 'ASD',
  //     'grade': 'A',
  //     'studentName': 'Aadi'
  //   }
  // ];

  useEffect(() => {
    axios
      .get('https://care4edu.com:8443/schools', {
        headers: APIData.headers,
      })
      .then((response) => {
        setSchoolNames(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    if (isShortlistedVisible) {
      // Make a GET request when Shortlisted button is clicked
      axios
        .get('https://care4edu.com:8443/results', {
          headers: APIData.headers,
        })
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (selectedOption) {
      console.log("Selected option: ", selectedOption);
      // Make a GET request when a select option is clicked
      axios
        .get(`https://care4edu.com:8443/results/levelWise?Level=${selectedOption}`, {
          headers: APIData.headers,
        })
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [isShortlistedVisible, selectedOption, isResultsVisible]);

  const fetchResults = () => {
    setResult({});
    if (schoolName && studentName) {
      const url = `https://care4edu.com:8443/quizathon-results?School=${encodeURIComponent(schoolName)}&Student=${encodeURIComponent(studentName)}`;
      axios.get(url, {
        headers: APIData.headers,
      })
      .then(response => {
        if (response.data === "") {
          toast.error("No matching results found.");
        } else {
          setResult(response.data);
          console.log(response.data);
        }
      })
        .catch(error => {
          console.error(error);
          if (error.response && error.response.data && error.response.data.description) {
            toast.error(error.response.data.description);
          } else {
            toast.error('An error occurred while fetching school results.');
          }
        });
    } else {
      setMessage('Fields cannot be left empty');
    }
  };

  const fetchSchoolResults = () => {
    setSchoolResults([]);
    if (schoolName && schoolCode) {
      const url = `https://care4edu.com:8443/quizathon-results/school?School=${encodeURIComponent(schoolName)}&schoolCode=${encodeURIComponent(schoolCode)}`;
      axios.get(url, {
        headers: APIData.headers,
      })
        .then(response => {
          setSchoolResults(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
          if (error.response && error.response.data && error.response.data.description) {
            toast.error(error.response.data.description);
          } else {
            toast.error('An error occurred while fetching school results.');
          }
        });
    } else {
      setMessage('Fields cannot be left empty');
    }
  };
  

  return (

    <div>
      <div>

        <h1 className='quizathon-heading'>

          < img src={shikshaklogo} alt="" className='shikshakcss' />

          <div></div>

          {/* <img src={care4edulogo} alt="" className='care4edulogo' /> */}




          <div><br /></div>

          Quizathon - 23</h1>

      </div>

      <div className="quizathon-landing">
        <div className="quizathon-button-container">
          <button className='quizathon-button' onClick={() => {
            setIsSchoolResultsVisible(true);
            setIsResultsVisible(false);
            setIsShortlistedVisible(false);
            setSelectedOption('');
            setSelectedOption('');
            setData([]);
          }}>School Results</button>
        </div>
        <div className="quizathon-button-container">
          <button className='quizathon-button' onClick={() => {
            setIsSchoolResultsVisible(false);
            setIsResultsVisible(true);
            setIsShortlistedVisible(false);
            setSelectedOption('');
            setSelectedOption('');
            setData([]);
            setSchoolResults([]);
          }}>Student Results</button>
        </div>
        <div className="quizathon-button-container">
          <button className='quizathon-button' onClick={() => {
            setIsShortlistedVisible(true);
            setIsResultsVisible(false);
            setSelectedOption('');
            setSchoolResults([]);
            setIsSchoolResultsVisible(false);
          }}>Shortlisted</button>
        </div>
        <div className="quizathon-button-container">
          <select
            name="level"
            id="quizathon-levels"
            className='quizathon-button'
            value={selectedOption}
            onChange={(e) => {
              setSelectedOption(e.target.value);
              setIsResultsVisible(false);
              setIsShortlistedVisible(false);
              setIsSchoolResultsVisible(false);
            }}
          >
            <option value="">Select a Level</option>
            <option value="Preliminary Round">Preliminary</option>
            <option value="Elimination Round">Elimination</option>
            <option value="Winner Round">Winners</option>
          </select>
        </div>
      </div>

      {isSchoolResultsVisible && (
        <div className="quizathon-section">
          <div className="quizathon-container">
            <h1 className='quizathon-h1'>School Results</h1>
            <div className="quizathon-input-container">
              <label className='quizathon-label' htmlFor="schoolId">School Name:</label>
              <select
                className='quizathon-input-tag'
                id="schoolName"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
              >
                <option value="">Select a school</option>
                {schoolNames.map((school, index) => (
                  <option key={index} value={school}>{school}</option>
                ))}
              </select>
            </div>
            <div className="quizathon-input-container">
              <label className='quizathon-label' htmlFor="studentName">School Code</label>
              <input
                type="text"
                title="Contact your administrator for the School Code" 
                id="studentCode"
                value={schoolCode}
                onChange={(e) => setSchoolCode(e.target.value)}
                placeholder="Eg: schoolname@sep17"

              />
            </div>
            <button className='quizathon-button' onClick={fetchSchoolResults}>Get Results</button>

            {/* <p className="quizathon-message">{message}</p> */}
            <div className='App'>
              {/* <h1 className='quizathon-h1'>Shortlisted Details</h1> */}

              {
                schoolResults.length > 0 && (
                  <div className="table-container"> {/* Wrap table in a container */}
                    <table>
                      <thead>
                        <tr>
                          <th className="centered">Id</th>
                          <th className="centered">Student Name</th>
                          <th className="centered">Correct Answers</th>
                          <th className="centered">Negative Marks</th>
                          <th className="centered">Total Marks</th>
                          <th className="centered">Mobile Number</th>
                          <th className="centered">Grade</th>
                        </tr>
                      </thead>
                      <tbody>
                        {schoolResults.map((item, index) => (
                          <tr key={index}>
                            <td className="centered">{item.slNo}</td>
                            <td className="centered">{item.student}</td>
                            <td className="centered">{item.correctAnswers}</td>
                            <td className="centered">{item.negativeMarks}</td>
                            <td className="centered">{item.totalMarksObtained}</td>
                            <td className="centered">{item.mobileNumber}</td>
                            <td className="centered">{item.grade}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      )}

      {isResultsVisible && (
        <div className="quizathon-section">
          <div className="quizathon-container">
            <h1 className='quizathon-h1'>Student Results</h1>
            <div className="quizathon-input-container">
              <label className='quizathon-label' htmlFor="schoolId">School Name:</label>
              <select
                className='quizathon-input-tag'
                id="schoolName"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
              >
                <option value="">Select a school</option>
                {schoolNames.map((school, index) => (
                  <option key={index} value={school}>{school}</option>
                ))}
              </select>
            </div>
            <div className="quizathon-input-container">
              <label className='quizathon-label' htmlFor="studentName">Student Name:</label>
              <input
                type="text"
                id="studentName"
                // title="In CAPS" 
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter Name (In Capital)"

              />
            </div>
            <button className='quizathon-button' onClick={fetchResults}>Get Results</button>

            <p className="quizathon-message">{message}</p>
            {Object.keys(result).length > 0 && (
              <div className="quizathon-container">
                <div className='App'>
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th className="centered">Correct Answers</th>
                          <th className="centered">Negative Marks</th>
                          <th className="centered">Total Marks</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="centered">{result.correctAnswers}</td>
                          <td className="centered">{result.negativeMarks}</td>
                          <td className="centered">{result.totalMarksObtained}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {isShortlistedVisible && (
        <div className="quizathon-section">
          <div className="quizathon-container">
            <div className='App'>
              <h1 className='quizathon-h1'>Shortlisted Details</h1>

              <div className="table-container"> {/* Wrap table in a container */}
                <table>
                  <thead>
                    <tr>
                      <th className="centered">Level</th>
                      <th className="centered">School</th>
                      <th className="centered">Grade</th>
                      <th className="centered">Student Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td className="centered">{item.level}</td>
                        <td className="centered">{item.school}</td>
                        <td className="centered">{item.grade}</td>
                        <td className="centered">{item.student_Name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedOption && (
        <div className="quizathon-section">
          <div className="quizathon-container">
            <div className='App'>
              <h1 className='quizathon-h1'>{selectedOption} Details</h1>

              <div className="table-container"> {/* Wrap table in a container */}
                <table>
                  <thead>
                    <tr>
                      <th className="centered">Level</th>
                      <th className="centered">School</th>
                      <th className="centered">Grade</th>
                      <th className="centered">Student Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td className="centered">{item.level}</td>
                        <td className="centered">{item.school}</td>
                        <td className="centered">{item.grade}</td>
                        <td className="centered">{item.student_Name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}


    <p className='bottom-query'>Queries? Contact : +91 9535352376   Email: info@care4edu.com</p>
    </div>
  );
}

export default Quizathon;
