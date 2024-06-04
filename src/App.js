import React, { Component } from 'react';
import './App.css';
import './Student/Student.css';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import SignUp from '../src/Authentication/SignUp';
import ContactUser from './ContactUser';
import SignIn from './Authentication/SignIn';
import InstitutionalSignIn from './Authentication/InstitutionalSignIn';
import AdminApp from './AdminApp';
import HomePage from './HomePage';
import UserApp from './UserApp'
import FacultyPolicy from './Faculty/FacultyPolicy';
import ForgotPassword from './Authentication/ForgotPassword';
import StudentApp from './StudentApp';
import ForgotPasswordUser from './Authentication/ForgotPasswordUser';
import * as FaIcons from "react-icons/fa";
import Guide from './Guide';
import TermsAndCondition from './TermsAndConditions';
import Landing from './Landing';
import Quizathon from './Quizathon';
import PrivacyPolicy from './PrivacyPolicy';
import UserData from './UserData';
import TermsOfUse from './TermsOfUse';
import GeoLocationPolicy from './GeoLocationPolicy';
import ShikshakPro from './ShikshakPro';


import Services from './components/pages/Services';
import About from './components/pages/About';
import Mulesoft from './components/pages/Mulesoft';
import SpringMicroservices from './components/pages/SpringMicroservices';
import CSD from './components/pages/CSD';
import WebAppDev from './components/pages/WebAppDev';
import CloudCon from './components/pages/CloudCon';
import DevopsAuto from './components/pages/DevopsAuto';
import SoftwareProto from './components/pages/SoftwareProto';
import Quality from './components/pages/Quality';
import SBS from './components/pages/SBS';
import AppDevelopment from './components/pages/AppDevelopment';
import Contact from '../src/components/pages/Contact';
import AboutWithFooter from '../src/components/pages/AboutWithFooter';
import HomeSoft from './components/pages/HomeSoft';
import PaymentPolicy from './PaymentPolicy';
import EmailService from './Super_Admin/EmailService';
import FestivalForm from './Super_Admin/Festivalform';
import HomePageCard from './HomepageCard';
import DetailPage from './DetailPage';
import ApplyJobData from './SQLTables/ApplyJobData';
import CourseDetailsPage from './SQLTables/CourseDetailsPage';
import UserJobs from './User/UserJobs';
import JobApplyPage from './SQLTables/JobApplyPage';
// import Navbar2 from './Navigation/Navbar2';
// import Navbar2 from './components/Navbar2';
import SelectDept from './SelectDept';



class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path="/homepage-card" exact component={HomePageCard} />
          <Route path="/detail/:index" component={DetailPage} />

          {/* <Route path='/addfestival' exact component={FestivalForm} /> */}
          {/* <Route path='/emailservice' exact component={EmailService} /> */}
          <Route path='/quizathon' exact component={Quizathon} />
          <Route path="/apply-job-data"  exact  component={ApplyJobData} />
           <Route path="/job_id/:index" component={CourseDetailsPage} />
          <Route path='/user-signin' exact component={SignIn} />
          <Route path='/guide' component={Guide} />
          <Route path='/signup' component={SignUp} />
          <Route path='/institutionalSignIn' component={InstitutionalSignIn} />
          <Route path='/AdminConsole' component={AdminApp} />
          <Route path='/userapp' component={UserApp} />
          <Route path='/facultyPolicy' component={FacultyPolicy} />
          <Route path='/teaching-training' component={HomePage} />
          <Route path='/contact' component={ContactUser} />
          <Route path='/forgotpassword' component={ForgotPassword} />
          <Route path='/forgotpassworduser' component={ForgotPasswordUser} />
          <Route path='/studentConsole' component={StudentApp} />
          <Route path='/termsAndCondition' component={TermsAndCondition} />
          {/* <Route path='/navbar2' component={Navbar2}/> */}


          <Route path='/software-solutions' exact component={HomeSoft} />
          <Route path='/about' exact component={About} />
          <Route path='/services' component={Services} />
          <Route path='/mulesoft' component={Mulesoft} />
          <Route path='/spring-microservices' component={SpringMicroservices} />
          <Route path='/custom-software-development' component={CSD} />
          <Route path='/web-application-development' component={WebAppDev} />
          <Route path='/cloud-computing' component={CloudCon} />
          <Route path='/devops-automation' component={DevopsAuto} />
          <Route path='/software-prototyping' component={SoftwareProto} />
          <Route path='/quality-assurance' component={Quality} />
          <Route path='/streamline-business-solutions' component={SBS} />
          <Route path='/app-development' component={AppDevelopment} />
          <Route path='/contact-us' component={Contact} />
          <Route path='/about-us' exact component={AboutWithFooter} />


          <Route path='/shikshakpro/payment-refund-policy' component={PaymentPolicy} />
          <Route path='/shikshakpro/user-data' component={UserData} />
          <Route path='/shikshakpro/privacy-policy/user-data' component={PrivacyPolicy} />
          <Route path='/shikshakpro/terms-of-use' component={TermsOfUse} />
          <Route path='/geolocation-policy' component={GeoLocationPolicy}/>


          <Route path='/shikshakpro' component={ShikshakPro}/>
          <Route path='/userjob' component = {UserJobs} />
          <Route path="/job-apply-page" component={JobApplyPage}/>

          <Route path="/select-dept" component={SelectDept}/>

          <Route path="/admin" component={AdminApp}/>


        </Switch>
        {/* <Link to="/guide">
          <div className="guideButton"><FaIcons.FaBook /></div>
        </Link> */}
      </Router>
    );
  }
}

export default App;
