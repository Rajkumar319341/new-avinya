import React, { Component } from 'react';
import Navbar from './Navigation/Navbar';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Faculty from './Admin/Faculty';
import Students from './Admin/Students';
import Courses from './Admin/Courses';
import User from './Admin/User'
import Admin from './Admin/Admin';
import TimeTable from './Admin/TimeTable';
import AddCourses from './Super_Admin/AddComponents/AddCourses';
// import Assets from './Admin/Assets';
import AdminCourseEnrolled from './Admin/AdminCoursesEnrolled'
import AdminEnrollments from './Admin/AdminEnrollments';
import EnrollmentsAccepted from './Admin/EnrollmentsAccepted';
import EnrollmentsApplied from './Admin/EnrollmentsApplied';
import EnrollmentsCompleted from './Admin/EnrollmentsCompleted';
import UploadSingle from './Upload/UploadSingle';
import AdminDocumentsAPI from './Admin/AdminDocumentsAPI';
import AdminOfficeDocumentAPI from './Admin/AdminOfficeDocumentAPI';
import AdminJob from './Admin/AdminJob';
import FacultyJobs from './Admin/FacultyJobs';
import CreateAssets from './Super_Admin/AddComponents/CreateAssets'
import MembersStatus from './Admin/MembersStatus';
import AdminMarks from './Admin/AdminMarks';
import Invoice from './Admin/Invoice'
import AdminProfile from './Admin/AdminProfile';
import AddJobs from './Super_Admin/AddComponents/AddJobs';
import CreateInvoice from './Super_Admin/AddComponents/CreateInvoice';
import UploadSingleOffice from './Upload/UploadSingleOffice'
import AdminQueryAPI from './Admin/AdminQueryAPI';
import AdminExpenseAPI from './Admin/AdminExpenseAPI';

import AddExpenses from './Super_Admin/AddComponents/AddExpenses';
import * as FaIcons from "react-icons/fa";
import Guide from './Guide';
import CreateMarks from './Super_Admin/AddComponents/CreateMarks';
import CreateTimeTable from './Super_Admin/AddComponents/CreateTimeTable';
import ViewTimeTable from './Super_Admin/AddComponents/ViewTimeTable';
import DashboardUser from './Dashboard/DashboardUser'
import PerformanceGraph from './PerformanceGraph'
import Policy from './Policy'
import AdminPolicy from './Admin/AdminPolicy';
import AddPolicy from './Super_Admin/AddComponents/AddPolicy';
import AdminIdCard from './Admin/AdminIdCard'
import HomepageCardAdmin from './Admin/HomepageCardAdmin';
import createHomepageCards from './Super_Admin/AddComponents/createHomepageCards';
import AdminStudentId from './Admin/AdminStudentId';
import Camera from './Camera';
import UserPasswordManage from './Password/UserPasswordManage';
import OrgPasswordManage from './Password/OrgPasswordManage';
import OrgPasswordCreate from './Password/OrgPasswordCreate';
import OrgPasswordAccess from './Password/OrgPasswordAccess';
import UserPasswordCreate from './Password/UserPasswordCreate';
import Survey from './Admin/Survey';
import AssetsGroup from './Assets/AssetsGroup';
import AssetList from './Assets/AssetList';
import AddAsset from './Assets/AddAsset';
import C4eUserAssets from './Assets/C4eUserAssets';
import AllocateAsset from './Assets/AllocateAsset';
import EmployeeAssetAllocation from './Assets/EmployeeAssetAllocation';
import ApproveProcurement from './Assets/ApproveProcurement';
import Procurement from './Assets/Procurement';
import EmployeeAssetsList from './Assets/EmployeeAssetsList';
import Avinhierarchy from './Faculty/Avinhierarchy';
import Orghierarchy from './Faculty/Orghierarchy';
import Addstationary from './Stationary/Addstationary';
import StationeryItems from './Stationary/Stationerytems';
import EmpStationaryAllocation from './Stationary/EmpStationaryAllocation';
import AllocateStationary from './Stationary/AllocateStationary';
import C4eStationary from './Stationary/C4eStationary'
import EmpStationeryList from './Stationary/EmpStationeryList';
import AdminConsoleForExit from './EmployeeExit/AdminConsoleForExit/AdminConsoleForExit';
import EmployeeExit from './EmployeeExit/EmployeeExit';
import AddEmail from './Super_Admin/AddComponents/AddEmail';
import FestivalForm from './Super_Admin/Festivalform';
import SuperAdminFestivalApi from './Super_Admin/SuperAdminFestivalApi';
import SuperAdminEmailAPI from './Super_Admin/SuperAdminEmailAPI';
import Holidays from './holidays/holidays';
import FacultyProfile from './Faculty/FacultyProfile';
import ChangePassword from './Authentication/ChangePassword';

import { InternalJob } from './InternalJobs/InternalJob';
import { InternalJobApply } from './InternalJobs/InternalJobApply';
import { InternalJobDetails } from './InternalJobs/InternalJobDetails';
import { ReleaseStatus } from './InternalJobs/ReleaseStatus';


class TechnicalApp extends Component {
  render() {

    return (
      <Router className="AdminConsole">
        <Navbar />
        <Switch>
          <Route path='/' exact component={DashboardUser} />
          <Route path='/emailservice' exact component={AddEmail} />
          <Route path='/addfestival' exact component={FestivalForm} />
         
          <Route path='/viewTimeTable' component={ViewTimeTable} />
          <Route path='/adminprofile' component={AdminProfile} />
          <Route path='/facultyProfile' exact component={FacultyProfile} />
          <Route path='/changePassword' exact component={ChangePassword} />

          <Route path='/students' component={Students} />
          <Route path='/faculty' component={Faculty} />
          <Route path='/courses' component={Courses} />
          <Route path='/guide' component={Guide} />
          <Route path='/user' component={User} />
          <Route path='/admins' component={Admin} />
          <Route path='/timetable' component={TimeTable} />
          <Route path='/superaddcourses' component={AddCourses} />
          {/* <Route path='/assets' component={Assets} /> */}
          <Route path='/assets' component={AssetsGroup} />
          <Route path='/assetsList/:id' component={AssetList} />
          <Route path='/addAsset' component={AddAsset} />
          <Route path='/myAssets' component={C4eUserAssets} />
          <Route path='/employeeAssets' component={EmployeeAssetsList} />
          <Route path='/allocateAsset' component={AllocateAsset} />
          <Route path='/procurement/approve' component={ApproveProcurement} />
          <Route path='/procurement/request' component={Procurement} />
          <Route path='/employeeAssetAllocation/:assetId/:assetName' component={EmployeeAssetAllocation} />
          <Route path='/festivals' component={SuperAdminFestivalApi} />
          <Route path='/emails' component={SuperAdminEmailAPI} />
          <Route path='/marks' component={AdminMarks} />
          <Route path='/adminenrollments' component={AdminEnrollments} />
          <Route path='/enrollmentsAccepted' component={EnrollmentsAccepted} />
          <Route path='/enrollmentsCompleted' component={EnrollmentsCompleted} />
          <Route path='/EnrollmentsApplied' exact component={EnrollmentsApplied} />
          <Route path='/ChangePassword' component={ChangePassword} />
          <Route path='/adminofficeDocumentsAPI' component={AdminOfficeDocumentAPI} />
          <Route path='/adminDocumentsAPI' component={AdminDocumentsAPI} />
          <Route path='/uploadsingle' component={UploadSingle} />
          <Route path='/uploadsingleoffice' component={UploadSingleOffice} />
          <Route path='/adminJobs' component={AdminJob} />
          <Route path='/facultyJobs' component={FacultyJobs} />
          <Route path='/addcourses' component={AddCourses} />
          <Route path='/createassets' component={CreateAssets} />
          <Route path='/membersStatus' component={MembersStatus} />
          <Route path='/adminCourseEnrolled' component={AdminCourseEnrolled} />
          <Route path='/invoice' component={Invoice} />
          <Route path='/addjobs' component={AddJobs} />
          <Route path='/addExpenses' component={AddExpenses} />
          <Route path='/createInvoice' component={CreateInvoice} />
          <Route path='/createMarks' component={CreateMarks} />
          <Route path='/createTimeTable' component={CreateTimeTable} />
          <Route path='/queries' component={AdminQueryAPI} />
          <Route path='/adminExpenseAPI' component={AdminExpenseAPI} />
          <Route path='/performanceGraph' component={PerformanceGraph} />
          <Route path='/policy' component={Policy} />
          <Route path='/adminPolicy' component={AdminPolicy} />
          <Route path='/addPolicy' component={AddPolicy} />
          <Route path='/adminIdCard' component={AdminIdCard} />
          <Route path='/HomepageCardAdmin' component={HomepageCardAdmin} />
          <Route path='/createHomepageCards' component={createHomepageCards} />
          <Route path='/adminStudentID' component={AdminStudentId} />
          <Route path="/camera" component={Camera} />
          <Route path="/userPasswordManage" component={UserPasswordManage} />
          <Route path="/orgPasswordManage" component={OrgPasswordManage} />
          <Route path="/orgPasswordAccess" component={OrgPasswordAccess} />
          <Route path="/userPasswordCreate" component={UserPasswordCreate} />
          <Route path="/orgPasswordCreate" component={OrgPasswordCreate} />
          <Route path="/survey" component={Survey}/>
          <Route path="/Orghierarchy" component={Orghierarchy}/> 
           <Route path="/Avinhierarchy" component={Avinhierarchy}/>

           <Route path='/allocateStationay' component={AllocateStationary} />
           <Route path="/Addstationary" component={Addstationary}/>
            <Route path="/StationeryItems"  component={StationeryItems}/>
            <Route path="/EmpStationaryAllocation/:id/:name"  component={EmpStationaryAllocation}/>
            <Route path="/C4eStationary" component={ C4eStationary}/>
            <Route path="/EmpStationeryList" component={ EmpStationeryList}/>
            <Route path='/holidays' component={Holidays} />
            <Route path="/exitdashboard" component={AdminConsoleForExit}/>
            <Route path="/empexit" component={EmployeeExit}/>

            <Route path="/internal-job" component={InternalJob}/>
          <Route path="/job_id/:index" component={InternalJobDetails}/>
          <Route path="/internal-job-apply" component={InternalJobApply}/>

          <Route path="/release-status" component={ReleaseStatus}/>
 

          <DashboardUser />
        </Switch>
        {/* <Link to="/guide">
          <div className="guideButton"><FaIcons.FaBook /></div>
        </Link> */}
      </Router>
    );
  }
}

export default TechnicalApp;