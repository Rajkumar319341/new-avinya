import React, { Component } from 'react';
import Navbar from './Navigation/Navbar';
import './App.css';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import HomeUser from './User/HomeUser';
import AboutUser from './User/AboutUser';
import ContactUser from './User/ContactUser';
import QueriesUser from './User/QueriesUser';
import UserCourse from './User/UserCourse';
import UserJob from './User/UserJobs';
import DashboardUser from './Dashboard/DashboardUser'
import * as AiIcons from "react-icons/ai";
import Guide from './Guide';
import MockTest from './User/MockTest';
import Mock from './User/Mock';
import ApplyJobData from './SQLTables/ApplyJobData';
import CourseDetailsPage from './SQLTables/CourseDetailsPage';
import JobApplyPage from './SQLTables/JobApplyPage';
import AddEmail from './Super_Admin/AddComponents/AddEmail';
import FestivalForm from './Super_Admin/Festivalform';
import SuperAdminFestivalApi from './Super_Admin/SuperAdminFestivalApi';
import SuperAdminEmailAPI from './Super_Admin/SuperAdminEmailAPI';

class UserApp extends Component {

  render() {

    return (
      <Router className="userapp">
        <Navbar />
        <Switch>
          <Route path='/' exact component={DashboardUser} />
          <Route path='/emailservice' exact component={AddEmail} />
          <Route path='/addfestival' exact component={FestivalForm} />
          <Route path='/guide' component={Guide} />
          <Route path='/about' component={AboutUser} />
          <Route path='/contact' component={ContactUser} />
          <Route path='/queries' component={QueriesUser} />
          <Route path='/usercourses' component={UserCourse} />
          <Route path='/userhome' exact component={HomeUser} />
          <Route path='/mockTest' component={MockTest} />
          <Route path='/mock' component={Mock} />
          <Route path='/festivals' component={SuperAdminFestivalApi} />
          <Route path='/emails' component={SuperAdminEmailAPI} />



          <Route path='/userjob' component={UserJob} />

          <Route path="/apply-job-data" exact component={ApplyJobData} />
          <Route path="/job_id/:index" component={CourseDetailsPage} />

          <Route path="/job-apply-page" component={JobApplyPage} />

          <DashboardUser />
        </Switch>
        {/* <Link to="/guide">  
                    <div className="guideButton"><AiIcons.AiFillQuestionCircle /></div>
    </Link>  */}
      </Router>
    );
  }
}

export default UserApp;