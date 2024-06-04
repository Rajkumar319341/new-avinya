import React, { Component } from 'react';
import Navbar from './Navigation/Navbar';
import './App.css';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import StudentProfile from './Student/StudentProfile'
import ChangePassword from './Authentication/ChangePassword';
import StudentMarksAPI from './Student/StudentMarksAPI'
import StudentTimeTableAPI from './Student/StudentTimeTableAPI';
import StudentDocumentsAPI from './Student/StudentDocuments';
import StudentGraph from './Student/StudentGraph';
import * as FaIcons from "react-icons/fa";
import Guide from './Guide';
import ViewTimeTable from './Super_Admin/AddComponents/ViewTimeTable';
import DashboardUser from './Dashboard/DashboardUser'
import StudentPolicy from './Student/StudentPolicy';
import StudentCamera from './Student/StudentCamera'
import SuperAdminFestivalApi from './Super_Admin/SuperAdminFestivalApi';
import SuperAdminEmailAPI from './Super_Admin/SuperAdminEmailAPI';
import AddEmail from './Super_Admin/AddComponents/AddEmail';
import FestivalForm from './Super_Admin/Festivalform';

class StudentApp extends Component {
  render() {
    return (
      <Router className="studentConsole">
        <Navbar />
        <Switch>
          <Route path='/' exact component={DashboardUser} />
          <Route path='/emailservice' exact component={AddEmail} />
          <Route path='/addfestival' exact component={FestivalForm} />
          <Route path='/studentProfile' exact component={StudentProfile} />
          <Route path='/viewTimeTable' component={ViewTimeTable} />
          <Route path='/changePassword' exact component={ChangePassword} />
          <Route path='/guide' component={Guide} />
          <Route path='/studentMarksAPI' exact component={StudentMarksAPI} />
          <Route path='/studentTimeTableAPI' exact component={StudentTimeTableAPI} />
          <Route path='/studentDocumentsAPI' exact component={StudentDocumentsAPI} />
          <Route path='/studentGraph' component={StudentGraph} />
          <Route path='/studentPolicy' component={StudentPolicy} />
          <Route path='/studentTimetable' component={StudentTimeTableAPI} />
          <Route path='/festivals' component={SuperAdminFestivalApi} />
          <Route path='/emails' component={SuperAdminEmailAPI} />
          <Route path="/camera" component={StudentCamera} />


          <DashboardUser />
        </Switch>
        {/* <Link to="/guide">
          <div className="guideButton"><FaIcons.FaBook /></div>
        </Link> */}
      </Router>
    );
  }
}
export default StudentApp;