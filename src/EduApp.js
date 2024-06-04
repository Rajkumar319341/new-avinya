import React,{Component} from 'react';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';

import App from './App';
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
import Navbar from './components/Navbar';
// import Navbar2 from './Navigation/Navbar2';
// import Navbar2 from './components/Navbar2';



class EduApp  extends Component {
 
  render() { 
    return (  
     <Router>
        <Navbar />
     <Switch>
          <Route path='/' exact component={App} />
          <Route path='/SoftwareHome' exact component={HomeSoft} />
          <Route path='/about' exact component={About} />
          <Route path='/services' component={Services} />
          <Route path='/mulesoft' component={Mulesoft} />
          <Route path='/springmicroservices' component={SpringMicroservices} />
          <Route path='/csd' component={CSD} />
          <Route path='/webappdev' component={WebAppDev} />
          <Route path='/cloudcon' component={CloudCon} />
          <Route path='/devopsauto' component={DevopsAuto} />
          <Route path='/softwareproto' component={SoftwareProto} />
          <Route path='/quality' component={Quality} />
          <Route path='/sbs' component={SBS} />
          <Route path='/appdev' component={AppDevelopment} />
          <Route path='/contactSoftware' component={Contact} />
          <Route path='/aboutwithfooter' exact component={AboutWithFooter} />      
    </Switch>
    </Router>
    );
  }
}

export default EduApp;