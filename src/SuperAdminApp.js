import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Navbar from './Navigation/Navbar';
 
import SuperAdminProfile from './Super_Admin/SuperAdminProfile';
import SuperAdminStudents from './Super_Admin/SuperAdminStudents';
import SuperAdminFaculty from './Super_Admin/SuperAdminFaculty';
import SuperAdminCourses from './Super_Admin/SuperAdminCourses';
import SuperAdminUser from './Super_Admin/SuperAdminUser';
import SuperAdmin from './Super_Admin/SuperAdmin';
import SuperAdminTimeTable from './Super_Admin/SuperAdminTimeTable';
import SuperAdminGraph from './Super_Admin/SuperAdminGraph';
import SuperAdminMarks from './Super_Admin/SuperAdminMarks';
import SuperAdminEnrollments from './Super_Admin/SuperAdminEnrollments';
import SuperAdminEnrollmentsAccepted from './Super_Admin/SuperAdminEnrollmentsAccepted';
import SuperAdminEnrollmentsCompleted from './Super_Admin/SuperAdminEnrollmentsCompleted';
import SuperAdminEnrollmentsApplied from './Super_Admin/SuperAdminEnrollmentsApplied';
import SuperAdminChangePassword from './Super_Admin/SuperAdminChangePassword';
import SuperAdminOfficeDocumentAPI from './Super_Admin/SuperAdminOfficeDocumentAPI';
import SuperAdminDocumentsAPI from './Super_Admin/SuperAdminDocumentsAPI';
import SuperAdminJob from './Super_Admin/SuperAdminJob';
import UploadSingle from './Upload/UploadSingle';
import UploadSingleOffice from './Upload/UploadSingleOffice';
import SuperAdminFacultyJobs from './Super_Admin/SuperAdminFacultyJobs';
import SuperAdminMembersStatus from './Super_Admin/SuperAdminMembersStatus';
import AddCourses from './Super_Admin/AddComponents/AddCourses';
import CreateAssets from './Super_Admin/AddComponents/CreateAssets';
import SuperAdminCoursesEnrolled from './Super_Admin/SuperAdminCoursesEnrolled';
import SuperAdminInvoice from './Super_Admin/SuperAdminInvoice';
import AddJobs from './Super_Admin/AddComponents/AddJobs';
import CreateInvoice from './Super_Admin/AddComponents/CreateInvoice';
import CreateMarks from './Super_Admin/AddComponents/CreateMarks';
import CreateTimeTable from './Super_Admin/AddComponents/CreateTimeTable';
import SuperAdminQueryAPI from './Super_Admin/SuperAdminQueryAPI';
import SuperAdminExpenseAPI from './Super_Admin/SuperAdminExpenseAPI';
// import SuperAdminAssets from './Super_Admin/SuperAdminAssets';
import SuperAdminNonRegUser from './Super_Admin/SuperAdminNonRegUser';
import AddExpenses from './Super_Admin/AddComponents/AddExpenses';
import UpdateExpenses from './Super_Admin/AddComponents/UpdateExpense';
import * as FaIcons from "react-icons/fa";
import Guide from './Guide';
import ViewTimeTable from './Super_Admin/AddComponents/ViewTimeTable';
import DashboardUser from './Dashboard/DashboardUser'
import AddPolicy from './Super_Admin/AddComponents/AddPolicy';
import SuperAdminPolicy from './Super_Admin/SuperAdminPolicy';
import SuperAdminOfferLetter from './Super_Admin/SuperAdminOfferLetter';
import SuperAdminIdCards from './Super_Admin/SuperAdminIdCards';
// import IdCard from './IdCard';
// import HomepageCard from './HomepageCard';
import UpdateHomepageCards from './Super_Admin/AddComponents/UpdateHomepageCards';
// import createHomepageCards from './Super_Admin/AddComponents/createHomepageCards';
// import SuperAdminHomepageCard from './Super_Admin/AddComponents/SuperAdminHomepageCard';
// import SuperAdminHomePageCard from './Super_Admin/AddComponents/SuperAdminHomePageCard';
import SuperAdminHomePageCard from './Super_Admin/SuperAdminHomePageCard';
import createHomepageCards from './Super_Admin/AddComponents/createHomepageCards';
import SuperAdminStudentId from './Super_Admin/SuperAdminStudentId';
import CreateAttendance from './Super_Admin/AddComponents/CreateAttendance'
import Camera from './Camera';
import OrgPasswordManage from './Password/OrgPasswordManage';
import OrgPasswordCreate from './Password/OrgPasswordCreate';
import UserPasswordManage from './Password/UserPasswordManage';
import OrgPasswordAccess from './Password/OrgPasswordAccess';
import UserPasswordCreate from './Password/UserPasswordCreate';
import OrgPasswordAccessAll from './Password/OrgPasswordAccessAll';
import AssetsGroup from './Assets/AssetsGroup';
import AssetList from './Assets/AssetList';
import EmployeeAssetAllocation from './Assets/EmployeeAssetAllocation';
import AddAsset from './Assets/AddAsset';
import AllocateAsset from './Assets/AllocateAsset';
import C4eUserAssets from './Assets/C4eUserAssets';
import Procurement from './Assets/Procurement';
import ApproveProcurement from './Assets/ApproveProcurement';
import EmployeeAssetsList from './Assets/EmployeeAssetsList';
import OrgRegister from './Faculty/OrgRegister';
import Orghierarchy from './Faculty/Orghierarchy';
import AvinRegister from './Faculty/AvinRegister';
import Avinhierarchy from './Faculty/Avinhierarchy';
import EmpStationeryList from './Stationary/EmpStationeryList';
import Addstationary from './Stationary/Addstationary';
import StationeryItems from './Stationary/Stationerytems';
import EmpStationaryAllocation from './Stationary/EmpStationaryAllocation';
import AllocateStationary from './Stationary/AllocateStationary';
import C4eStationary from './Stationary/C4eStationary'
import AdminConsoleForExit from './EmployeeExit/AdminConsoleForExit/AdminConsoleForExit';
import EmployeeExit from './EmployeeExit/EmployeeExit';
import DetailsForExit from './EmployeeExit/AdminConsoleForExit/DetailsForExit';
import EmailService from './Super_Admin/EmailService';
import EmailTrack from './Super_Admin/EmailTrack';
import EmailCred from './Super_Admin/EmailCred';
import FestivalForm from './Super_Admin/Festivalform';
import SuperAdminFestivalApi from './Super_Admin/SuperAdminFestivalApi';
import SuperAdminEmailAPI from './Super_Admin/SuperAdminEmailAPI';
import AddEmail from './Super_Admin/AddComponents/AddEmail';
import SuperAdminHolidayAPI from './Super_Admin/SuperAdminHolidayAPI';
import HolidayForm from './holidays/holidayForm'
import QuestionPaperTemplate from './QuestionPapers/QuestionPaperTemplate';
import QuestionPaperByAll from './QuestionPapers/QuestionpaperByAll';
import Addquestions from './QuestionPapers/Addquestions';
import Holidays from './holidays/holidays';
import Viewquestions from './QuestionPapers/Viewquestions';
import  Jobstatus  from './SQLTables/Jobstatus';
import Rolesalocate from './Rolesalocating/Rolesalocate';
import Allocatedroledata from './Rolesalocating/Allocatedroledata';
import Createroles from './Addroles/Createroles';
import Rolesdatacreated from './Addroles/Rolesdatacreated';
import InvoiceData from './SQLTables/InvoiceData';
import CreateJob from './Super_Admin/AddComponents/CreateJob';
import AddJob from './Super_Admin/AddComponents/AddJob';
import BrainGame from './Dashboard/BrainGame';
import UploadDashboardImg from './Dashboard/UploadDashboardImg';
import UpdateDashboardImg from './Dashboard/UpdateDashboardImg';
import { DashboardDetails } from './Dashboard/DashboardDetails';
import { InternalJob } from './InternalJobs/InternalJob';
import { InternalJobDetails } from './InternalJobs/InternalJobDetails';
import { InternalJobApply } from './InternalJobs/InternalJobApply';
 
 
 
class SuperAdminApp extends Component {
  render() {
    return (
 
      <Router className="SuperAdminConsole">
        <Navbar />
        <Switch>
          <Route path='/' exact component={DashboardUser} />
          <Route path='/emailservice' exact component={AddEmail} />
          <Route path='/addfestival' exact component={FestivalForm} />
 
         
          <Route path='/viewTimeTable' component={ViewTimeTable} />
          <Route path='/superAdminProfile' component={SuperAdminProfile} />
          <Route path='/addExpenses' component={AddExpenses} />
          <Route path='/guide' component={Guide} />
          <Route path='/superAdminStudents' component={SuperAdminStudents} />
          <Route path='/superAdminFaculty' component={SuperAdminFaculty} />
          <Route path='/superAdminCourses' component={SuperAdminCourses} />
          <Route path='/superAdminUser' component={SuperAdminUser} />
          <Route path='/superAdminNonRegUser' component={SuperAdminNonRegUser} />
          <Route path='/superAdmin' component={SuperAdmin} />
          <Route path='/superAdminTimeTable' component={SuperAdminTimeTable} />
          <Route path='/AddCourses' component={AddCourses} />
 
          <Route path='/assets' component={AssetsGroup} />
          <Route path='/assetsList/:id' component={AssetList} />
          <Route path='/addAsset' component={AddAsset} />
          <Route path='/myAssets' component={C4eUserAssets} />
          <Route path='/employeeAssets' component={EmployeeAssetsList} />
          <Route path='/allocateAsset' component={AllocateAsset} />
          <Route path='/procurement/approve' component={ApproveProcurement} />
          <Route path='/procurement/request' component={Procurement} />
          <Route path='/employeeAssetAllocation/:assetId/:assetName' component={EmployeeAssetAllocation} />
 
     
          <Route path='/superAdminGraph' component={SuperAdminGraph} />
          <Route path='/superAdminMarks' component={SuperAdminMarks} />
          <Route path='/superAdminEnrollments' component={SuperAdminEnrollments} />
          <Route path='/superAdminEnrollmentsApplied' exact component={SuperAdminEnrollmentsApplied} />
          <Route path='/superAdminEnrollmentsAccepted' component={SuperAdminEnrollmentsAccepted} />
          <Route path='/superAdminEnrollmentsCompleted' component={SuperAdminEnrollmentsCompleted} />
          <Route path='/superAdminChangePassword' component={SuperAdminChangePassword} />
          <Route path='/superAdminOfficeDocumentAPI' component={SuperAdminOfficeDocumentAPI} />
          <Route path='/superAdminDocumentsAPI' component={SuperAdminDocumentsAPI} />
          <Route path='/uploadsingle' component={UploadSingle} />
          <Route path='/uploadsingleoffice' component={UploadSingleOffice} />
          <Route path='/superAdminJob' component={SuperAdminJob} />
          <Route path='/superAdminFacultyJobs' component={SuperAdminFacultyJobs} />
          <Route path='/superaddcourses' component={AddCourses} />
          <Route path='/createassets' component={CreateAssets} />
          <Route path='/superAdminMembersStatus' component={SuperAdminMembersStatus} />
          <Route path='/superAdminCoursesEnrolled' component={SuperAdminCoursesEnrolled} />
          <Route path='/superAdminInvoice' component={SuperAdminInvoice} />
          <Route path='/addjobs' component={AddJobs} />
          <Route path='/createInvoice' component={CreateInvoice} />
          <Route path='/createMarks' component={CreateMarks} />
          <Route path='/createTimeTable' component={CreateTimeTable} />
          <Route path='/superAdminQueryAPI' component={SuperAdminQueryAPI} />
          <Route path='/superAdminExpenseAPI' component={SuperAdminExpenseAPI} />
          <Route path='/festivals' component={SuperAdminFestivalApi} />
          <Route path='/holidays' component={SuperAdminHolidayAPI} />
          <Route path='/emails' component={SuperAdminEmailAPI} />
          <Route path='/updateExpense' component={UpdateExpenses} />
          <Route path='/superAdminPolicy' component={SuperAdminPolicy} />
          <Route path='/addPolicy' component={AddPolicy} />
          <Route path='/offerLetter' component={SuperAdminOfferLetter} />
          <Route path='/superAdminIDCards' component={SuperAdminIdCards} />
          <Route path='/superAdminHomepageCard' component={SuperAdminHomePageCard} />
          <Route path='/superAdmincreateHomepageCards' component={UpdateHomepageCards} />
          <Route path='/createHomepageCards' component={createHomepageCards} />
          <Route path='/superAdminStudentIdCard' component={SuperAdminStudentId} />
          <Route path='/createAttendance' component={CreateAttendance} />
          <Route path="/camera" component={Camera} />
 
          <Route path="/userPasswordManage" component={UserPasswordManage} />
          <Route path="/orgPasswordManage" component={OrgPasswordManage} />
          <Route path="/orgPasswordAccess" component={OrgPasswordAccess} />
          <Route path="/userPasswordCreate" component={UserPasswordCreate} />
          <Route path="/orgPasswordCreate" component={OrgPasswordCreate} />
          <Route path="/orgPasswordAccessAll" component={OrgPasswordAccessAll} />
          <Route path="/OrgRegister" component={OrgRegister} />
          <Route path="/Orghierarchy" component={Orghierarchy} />
          <Route path="/AvinRegister" component={AvinRegister} />
          <Route path="/Avinhierarchy" component={Avinhierarchy} />
 
          <Route path="/EmpStationeryList" component={EmpStationeryList} />
          <Route path='/allocateStationay' component={AllocateStationary} />
          <Route path="/Addstationary" component={Addstationary} />
          <Route path="/StationeryItems" component={StationeryItems} />
          <Route path="/EmpStationaryAllocation/:id/:name" component={EmpStationaryAllocation} />
          <Route path="/C4eStationary" component={C4eStationary} />
 
          <Route path="/exitdashboard" component={AdminConsoleForExit} />
          <Route path="/exitdetails" component={DetailsForExit} />
          <Route path="/empexit" component={EmployeeExit} />
          <Route path='/holidayform' component={HolidayForm} />
          <Route path='/holidays' component={Holidays} />
          <Route path="/all-questions" component={QuestionPaperByAll} />
          <Route path="/ques-template" component={QuestionPaperTemplate} />
          <Route path="/addquestion" component={Addquestions} />
          <Route path="/viewquestion" component={Viewquestions} />
         
          <Route path="/jobstatus" component={Jobstatus}/>
          <Route path="/rolesallocate" component={Rolesalocate}/>
          <Route path="/deatiled roles" component={Allocatedroledata}/>
          <Route path="/rolecreation" component={Createroles}/>
          <Route path="/rolesdata" component={Rolesdatacreated}/>
 
 
          <Route path="/invoice" component={InvoiceData}/>
 
          <Route path="/create-job" component={CreateJob}/>
          <Route path="/add-job" component={AddJob}/>
 
          {/* <Route path="/brain-game" component={BrainGame}/> */}
          <Route path="/upload-image" component={UploadDashboardImg}/>
          <Route path="/update-image" component={UpdateDashboardImg}/>
          <Route path="/dashboard-details" component={DashboardDetails}/>


          <Route path="/internal-job" component={InternalJob}/>
          <Route path="/job_id/:index" component={InternalJobDetails}/>
          <Route path="/internal-job-apply" component={InternalJobApply}/>
 
 
 
 
          <DashboardUser />
        </Switch>
        {/* <Link to="/guide">
          <div className="guideButton"><FaIcons.FaBook /></div>
        </Link> */}
      </Router>
    );
  }
}
export default SuperAdminApp;