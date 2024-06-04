import React from 'react';
import ReactDOM from 'react-dom';
import UserApp from './UserApp';
import App from './App';
import FacultyApp from './FacultyApp'
import SuperAdminApp from './SuperAdminApp';
import StudentApp from './StudentApp';
import TechnicalApp from './AdminApp';
import FinanceApp from './FinanceApp';
import SalesApp from './SalesApp';
import HrApp from './FacultyApp';

const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
// console.log("session details :",sessiondetails)
 
// function checkSessionInfo(){
//     let hours = 24
//     let saved = localStorage.getItem('saved')
//     if (saved && (new Date().getTime() - saved > hours * 60 * 60 * 1000)) {
//       localStorage.clear()
//       toast("Session expired. Please sign in.")
//       sessioninfo.userType==="user" ?
//       setTimeout(()=>{window.location.assign("/signin");},1000) : setTimeout(()=>{window.location.assign("/institutionalSignIn");},1000)
//     }
// }
// setInterval(checkSessionInfo, 5000);

const departdetails = localStorage.getItem("Depart Details");
// console.log("Dept details:",departdetails)
 
 
let sessioninfo = "externaluser";
 
if (sessiondetails == null) {}
 
else {
    sessioninfo = sessiondetails;
}
if (sessioninfo.userType === "superadmin") {
    ReactDOM.render(<SuperAdminApp />, document.getElementById('root'));
}
// else if (sessioninfo.userType === "admin") {
//     ReactDOM.render(<AdminApp />, document.getElementById('root'));
// }
else if (sessioninfo.userType === "student") {
    ReactDOM.render(<StudentApp />, document.getElementById('root'));
}
else if(sessioninfo.userType==="User"){
    ReactDOM.render(<UserApp />, document.getElementById('root'));
}

else if (departdetails==="TECHNICAL") {
    ReactDOM.render(<TechnicalApp />, document.getElementById('root'));
}
 
else if (departdetails==="SALES") {
    ReactDOM.render(<SalesApp />, document.getElementById('root'));
}

else if (departdetails==="HR") {
    ReactDOM.render(<HrApp/>, document.getElementById('root'));
}
 
else if (departdetails==="FINANCE") {
    ReactDOM.render(<FinanceApp/>, document.getElementById('root'));
}
 
else if (sessioninfo === "externaluser") {
    ReactDOM.render(<App />, document.getElementById('root'));
}