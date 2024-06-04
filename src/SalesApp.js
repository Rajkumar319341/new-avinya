import React, { Component } from 'react';
import './App.css';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import FacultyProfile from './Faculty/FacultyProfile';
import Navbar from './Navigation/Navbar';
import ChangePassword from './Authentication/ChangePassword';
import FacultyMarks from './Faculty/FacultyMarks';
import Facultydocuments from './Faculty/Facultydocuments';
import FacultyTimeTableData from './Faculty/FacultyTimeTable';
import FacultyAdminJob from './Faculty/FacultyAdminJob';
import FacultyStudentAPI from './Faculty/FacultyStudentAPI';
import FacultyCourseEnrolled from './Faculty/FacultyCourseEnrolled';
import UploadSingle from './Upload/UploadSingle';
import FacultyExpenseAPI from './Faculty/FacultyExpenseAPI';
import AddExpenses from './Super_Admin/AddComponents/AddExpenses';
import * as FaIcons from "react-icons/fa";
import Guide from './Guide';
import CreateMarks from './Super_Admin/AddComponents/CreateMarks';
import ViewTimeTable from './Super_Admin/AddComponents/ViewTimeTable';
import DashboardUser from './Dashboard/DashboardUser'
import FacultyPolicy from './Faculty/FacultyPolicy';
import OfferLetter from './Faculty/OfferLetter'
import FacultyIdentityCard from './Faculty/FacultyIdentityCard';
import FacultyCamera from './Faculty/FacultyCamera';
import UserPasswordManage from './Password/UserPasswordManage';
import UserPasswordCreate from './Password/UserPasswordCreate';
import OrgPasswordManage from './Password/OrgPasswordManage';
import OrgPasswordAccess from './Password/OrgPasswordAccess';
import AssetsGroup from './Assets/AssetsGroup';
import AssetList from './Assets/AssetList';
import AddAsset from './Assets/AddAsset';
import C4eUserAssets from './Assets/C4eUserAssets';
import AllocateAsset from './Assets/AllocateAsset';
import EmployeeAssetAllocation from './Assets/EmployeeAssetAllocation';
import Procurement from './Assets/Procurement';
import Orghierarchy from './Faculty/Orghierarchy';
import Avinhierarchy from './Faculty/Avinhierarchy';
import Addstationary from './Stationary/Addstationary';
import StationeryItems from './Stationary/Stationerytems';
import EmpStationaryAllocation from './Stationary/EmpStationaryAllocation';
import AllocateStationary from './Stationary/AllocateStationary';
import C4eStationary from './Stationary/C4eStationary'
import EmpStationeryList from './Stationary/EmpStationeryList';
import EmployeeExit from './EmployeeExit/EmployeeExit';
import AdminConsoleForExit from './EmployeeExit/AdminConsoleForExit/AdminConsoleForExit';
import OrgRegister from './Faculty/OrgRegister';
import AddEmail from './Super_Admin/AddComponents/AddEmail';
import FestivalForm from './Super_Admin/Festivalform';
import SuperAdminEmailAPI from './Super_Admin/SuperAdminEmailAPI';
import SuperAdminFestivalApi from './Super_Admin/SuperAdminFestivalApi';
import SuperAdminEnrollments from './Super_Admin/SuperAdminEnrollments';
import SuperAdminEnrollmentsAccepted from './Super_Admin/SuperAdminEnrollmentsAccepted';
import SuperAdminEnrollmentsCompleted from './Super_Admin/SuperAdminEnrollmentsCompleted';
import SuperAdminEnrollmentsApplied from './Super_Admin/SuperAdminEnrollmentsApplied';
import Holidays from './holidays/holidays';
import AdminDocumentsAPI from './Admin/AdminDocumentsAPI';
import AdminExpenseAPI from './Admin/AdminExpenseAPI';
import { CustomerSalesonBoard } from './Sales/CustomerSalesonBoard';
import MdmForm from './Sales/MdmForm';
import { CustomerOnboard } from './Sales/CustomerOnboard';
import SalesOnBoardData from './Sales/SalesOnBoardData';
import { MdmData } from './Sales/MdmData';



class SalesApp extends Component {
  render() {
    return (
      <Router className="facultyConsole">
        <Navbar />
        <Switch>
          <Route path='/' exact component={DashboardUser} />
          <Route path='/emailservice' exact component={AddEmail} />
          <Route path='/addfestival' exact component={FestivalForm} />
          <Route path='/facultyProfile' exact component={FacultyProfile} />
          <Route path='/uploadsingle' component={UploadSingle} />
          <Route path='/viewTimeTable' component={ViewTimeTable} />
          <Route path='/guide' component={Guide} />
          <Route path='/changePassword' exact component={ChangePassword} />
          <Route path='/facultyMarks' exact component={FacultyMarks} />
          <Route path='/facultydocuments' component={Facultydocuments} />
          <Route path='/facultyTimeTable' component={FacultyTimeTableData} />
          <Route path='/facultyadminjob' component={FacultyAdminJob} />
          <Route path='/facultyStudentAPI' component={FacultyStudentAPI} />
          <Route path='/facultyCourseEnrolled' component={FacultyCourseEnrolled} />
          <Route path='/festivals' component={SuperAdminFestivalApi} />
          <Route path='/emails' component={SuperAdminEmailAPI} />
          <Route path='/facultyExpenseAPI' component={FacultyExpenseAPI} />
          <Route path='/addExpenses' component={AddExpenses} />
          <Route path='/createMarks' component={CreateMarks} />
          <Route path='/facultyPolicy' component={FacultyPolicy} />
          <Route path='/offerLetter' component={OfferLetter} />
          <Route path='/facultyidCard' component={FacultyIdentityCard} />
          <Route path="/camera" component={FacultyCamera} />

          <Route path='/assets' component={AssetsGroup} />
          <Route path='/assetsList/:id' component={AssetList} />
          <Route path='/addAsset' component={AddAsset} />
          <Route path='/myAssets' component={C4eUserAssets} />
          <Route path='/procurement/request' component={Procurement} />
          <Route path='/employeeAssetAllocation/:assetId/:assetName' component={EmployeeAssetAllocation} />
          <Route path='/superAdminEnrollments' component={SuperAdminEnrollments} />
          <Route path='/superAdminEnrollmentsApplied' exact component={SuperAdminEnrollmentsApplied} />
          <Route path='/superAdminEnrollmentsAccepted' component={SuperAdminEnrollmentsAccepted} />
          <Route path='/superAdminEnrollmentsCompleted' component={SuperAdminEnrollmentsCompleted} />
          <Route path="/userPasswordManage" component={UserPasswordManage} />
          <Route path="/orgPasswordManage" component={OrgPasswordManage} />
          <Route path="/orgPasswordAccess" component={OrgPasswordAccess} />
          <Route path="/userPasswordCreate" component={UserPasswordCreate} />
          <Route path="/OrgRegister" component={OrgRegister}/>
           <Route path="/Orghierarchy" component={Orghierarchy}/> 
           <Route path="/Avinhierarchy" component={Avinhierarchy}/>
           <Route path='/adminDocumentsAPI' component={AdminDocumentsAPI} />
           <Route path="/empexit" component={EmployeeExit}/>
           <Route path="/exitdashboard" component={AdminConsoleForExit}/>

           <Route path='/adminExpenseAPI' component={AdminExpenseAPI} />
           <Route path='/allocateStationay' component={AllocateStationary} />
           <Route path="/Addstationary" component={Addstationary}/>
            <Route path="/StationeryItems"  component={StationeryItems}/>
            <Route path="/EmpStationaryAllocation/:id/:name"  component={EmpStationaryAllocation}/>
            <Route path="/C4eStationary" component={ C4eStationary}/>
            <Route path='/holidays' component={Holidays} />


            <Route path="/customersalesonboard" component={CustomerSalesonBoard} />
            <Route path="/customermdm" component={MdmForm} />
            <Route path="/customeronboard" component={CustomerOnboard} />

            <Route path="/salesonboard-data" component={SalesOnBoardData}/>
            <Route path="/mdm-data" component={MdmData}/>


           
          <DashboardUser />
        </Switch>
       
      </Router>
    );
  }
}
export default SalesApp;