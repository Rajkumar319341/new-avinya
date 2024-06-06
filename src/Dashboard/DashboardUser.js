import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import demo from '../Assets/cartoon.svg';
import './DashboardUser.css';
import { APIData, org } from '../Authentication/APIData';
import { DashboardData } from "./DashboardData";
import { Link } from "react-router-dom"
import "../App.css";
import { Paper } from "@mui/material";
import { Grid } from '@mui/material';
import Aos from "aos";
import 'aos/dist/aos.css'
import Puzzle from "./Puzzle";
import TicTacToe from "./TicTacToe";
 
 
import { Container } from '@mui/material';
const DashboardUser = () => {
 
  const PieChartContainer = useRef(null);
 
  const [data, setData] = useState(null);
  const [date, setDate] = useState(new Date());
  const [day, setDay] = useState('');
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
 
 
  var sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesCount = await fetchTotalCoursesCount();
        const usersCount = await fetchTotalUsersCount();
        const studentsCount = await fetchTotalStudentsCount();
        const adminsCount = await fetchTotalAdminsCount();
        const employeesCount = await fetchTotalEmployeesCount();
 
        setData({
          courses: coursesCount.length,
          users: usersCount.length,
          students: studentsCount.length,
          admins: adminsCount.length,
          employees: employeesCount.length
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
 
    fetchData();
  }, []);
 
  useEffect(() => {
    Aos.init({ delay: 100 })
  }, [])
 
  useEffect(() => {
    if (data && PieChartContainer.current) {
      const pieCtx = PieChartContainer.current.getContext('2d');
      const dataValues = [
        data.courses,
        data.users,
        data.students,
        data.admins,
        data.employees
      ];
      new Chart(pieCtx, {
        type: 'pie',
        data: {
          labels: ['Total Courses', 'Total Users', 'Total Students', 'Total Admins', 'Total Employees'],
          datasets: [{
            label: 'Counts',
            data: dataValues,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)'
            ]
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: false,
            title: {
              display: true,
              text: 'Counts Summary',
              color: 'black',
              fontStyle: 'Arial',
              sidePadding: 20,
              minFontSize: 20,
              lineHeight: 25
            }
          },
          animation: {
            animateScale: true,
            animateRotate: true
          }
        }
      });
    }
  }, [data]);
 
  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      setDate(now);
      setDay(now.toLocaleDateString('en-US', { weekday: 'long' }));
    };
 
    const updateTime = () => {
      const now = new Date();
      setTime({
        hours: now.getHours(),
        minutes: now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes(),
        seconds: now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()
      });
    };
 
    updateDate();
    updateTime();
 
    const timer = setInterval(() => {
      updateDate();
      updateTime();
    }, 1000);
 
    return () => clearInterval(timer);
  }, []);
 
  const dateString = `${(date.getDate()) < 10 ? '0' + date.getDate() : date.getDate()}-${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth()}-${date.getFullYear()}`;
 
  const fetchTotalCoursesCount = async () => {
    try {
      const url = APIData.api + `courses/course?org=${org}`;
      const response = await fetch(url, { headers: APIData.headers });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching total courses count:', error);
      throw new Error('Failed to fetch total courses count');
    }
  };
 
 
  const fetchTotalAdminsCount = async () => {
    try {
      const url = APIData.api + `admins?org=${org}`;
      console.log("Url:", url)
      const response = await fetch(url, { headers: APIData.headers });
      console.log("response:", response)
      const data = await response.json();
      console.log("Data:", data)
      return data;
    } catch (error) {
      throw new Error("Failed to fetch total admins count");
    }
  };
 
  const fetchTotalUsersCount = async () => {
    try {
      const url = APIData.api + `users?org=${org}`;
      console.log("Url:", url)
      const response = await fetch(url, { headers: APIData.headers });
      console.log("response:", response)
      const data = await response.json();
      console.log("Data:", data)
      return data;
    } catch (error) {
      throw new Error("Failed to fetch total admins count");
    }
  };
 
 
  const fetchTotalEmployeesCount = async () => {
    try {
      const url = APIData.api + `employee/details?org=${org}`;
      const response = await fetch(url, { headers: APIData.headers });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Failed to fetch total admins count");
    }
  };
 
  const fetchTotalStudentsCount = async () => {
    try {
      const url = APIData.api + `students?org=${org}`;
      const response = await fetch(url, { headers: APIData.headers });
      const data = await response.json();
      return data;
    }
    catch (error) {
      throw new Error("Failed to fetch total admins count");
    }
  };
 
 
  return (
    <div className="dashboard-container">
      <Paper elevation={3} style={{ height: "300px", padding: "30px" }} className='paper'>
        <div className="overview">
          <div className="overview-left">
            <div className="overview-content">
              <h2 style={{ color: "white" }}>Welcome to Avinya Portal</h2>
              <br></br>
              <h5 style={{ color: "white" }}>Here's what's happening in your Academy today</h5>
              <br></br>
 
            </div>
            <img src={demo} alt="Welcome illustration" className="overview-image" />
          </div>
        </div>
      </Paper>
 
 
      <Paper elevation={3} className="clock_paper" >
        <div className="digital_clock">
          <div className="digital_time">
            <Paper elevation={4} className='paper_time_value'>
              <span className="time_value">{dateString}</span>
            </Paper>
          </div>
          <div className="digital_time">
            <Paper elevation={4} className='paper_time_value'>
              <span className="time_value">{day}</span>
            </Paper>
 
          </div>
          <div className="digital_time">
            <Paper elevation={4} className='paper_time_value'>
 
              <span className="time_value">{time.hours}:{time.minutes}:{time.seconds}</span>
            </Paper>
 
          </div>
        </div>
      </Paper>
 
      <Paper elevation={3}>
        <div className="chart-legend-container">
 
          <div className="chart-container" style={{ padding: "20px", width: "50%" }}>
            <canvas ref={PieChartContainer} id="my_chart2" className="chart-pie"></canvas>
          </div>
 
          <div className="legend-container" style={{ width: "100%", padding: "20px" }}>
            <Paper elevation={3} className='paper-lengend-card'>
 
              <div className="legend-card">
 
                <ul className="legend-labels">
                  <li style={{ height: "2rem", color: "white", fontWeight: "bold" }}>Total Courses</li>
                  <li style={{ height: "2rem", color: "white", fontWeight: "bold" }}>Total Users</li>
                  <li style={{ height: "2rem", color: "white", fontWeight: "bold" }}>Total Students</li>
                  <li style={{ height: "2rem", color: "white", fontWeight: "bold" }}>Total Admins</li>
                  <li style={{ height: "2rem", color: "white", fontWeight: "bold" }}>Total Employees</li>
                </ul>
                <ul className="legend-values">
                  <Paper elevation={4} style={{ width: "3rem", height: "2rem", textAlign: "center", fontWeight: "bold" }}>   <li>{data ? data.courses : '-'}</li></Paper >
                  <Paper elevation={4} style={{ width: "3rem", height: "2rem", textAlign: "center", fontWeight: "bold" }}>   <li>{data ? data.users : '-'}</li></Paper >
                  <Paper elevation={4} style={{ width: "3rem", height: "2rem", textAlign: "center", fontWeight: "bold" }}>   <li>{data ? data.students : '-'}</li></Paper >
                  <Paper elevation={4} style={{ width: "3rem", height: "2rem", textAlign: "center", fontWeight: "bold" }}>    <li>{data ? data.admins : '-'}</li></Paper >
                  <Paper elevation={4} style={{ width: "3rem", height: "2rem", textAlign: "center", fontWeight: "bold" }}>   <li>{data ? data.employees : '-'}</li></Paper >
                </ul>
 
              </div>
            </Paper>
 
          </div>
 
        </div>
      </Paper>
 
      {/* NAVBAR CARDS  */}
      <div className="gridContainer">
        <Grid container spacing={3}>
          {DashboardData.slice(1).map((item, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={2}>
              <Link
                to={item.path}
                className="dashboard_link"
                style={{
                  textDecoration: 'none',
                  padding: '0px',
                  margin: '0px',
                }}
              >
                <Paper elevation={3} className="dashboard_card">
                  <Grid container data-aos="zoom-in">
                    <Grid item xs={12}>
                      <img src={item.image} alt="IMAGES" className="card_image" />
                    </Grid>
                    <Grid item xs={12}>
                      <div className="card_content">
                        <p className="card_title">{item.title}</p>
                      </div>
                    </Grid>
                  </Grid>
                </Paper>
              </Link>
            </Grid>
          ))}
        </Grid>
        <br></br>
 
        <Container maxWidth="lg">
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={12} md={6}>
              <div className="our_Web_page">
                <h3 className="heading_01">Puzzle</h3>
                <Puzzle />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="our_Web_page">
                <h3 className="heading_01">Tic Tac Toe</h3>
                <TicTacToe />
              </div>
            </Grid>
          </Grid>
        </Container>
 
      </div>
    </div>
  );
};
 
export default DashboardUser;