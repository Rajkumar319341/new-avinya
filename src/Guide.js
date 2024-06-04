// import React, { Component } from "react";
// import * as AiIcons from "react-icons/ai";
// import { Link } from "react-router-dom";
// import home from "./Guide_Images/home.png";
// import newhome from "./Guide_Images/Home page.png"
// import newsignup from "./Guide_Images/Sign up.png"
// import newusersignin from "./Guide_Images/User Sign in.png"
// import newinstitutionalsignin from "./Guide_Images/Institutional Sign In.png"
// import newusersigninmobile from "./Guide_Images/User Sign in Mobile.png"
// import newinstitutionalsigninmobile from "./Guide_Images/Institutional Sign In mobile.png"
// import newhomemobile from "./Guide_Images/Home page mobile combined.png"
// import newsignupmobile from "./Guide_Images/newsignupmobile.gif";
// import newAdminHomePage from "./Guide_Images/newAdminHomePage.gif";
// import newCourse from "./Guide_Images/newCourse.gif";
// import newEnrollments from "./Guide_Images/newEnrollments.gif";
// import newDocuments from "./Guide_Images/newDocuments.gif";
// import newExpenses from "./Guide_Images/newExpenses.gif";
// import newInvoice from "./Guide_Images/newInvoice.gif";
// import newAssetStore from "./Guide_Images/newAssetStore.gif";
// import newJobs from "./Guide_Images/newJobs.gif";
// import newMarks from "./Guide_Images/newMarks.gif";
// import newTimeTables from "./Guide_Images/newTimeTables.gif";
// import newQueries from "./Guide_Images/newQueries.gif";
// import newMemberStatus from "./Guide_Images/newMemberStatus.gif";
// import newupdateprofile from "./Guide_Images/newupdateprofile.gif";
// import newchangepassword from "./Guide_Images/newchangepassword.gif";
// import newuserhomepage from "./Guide_Images/newuserhomepage.gif";
// import newapplyforcourse from "./Guide_Images/newapplyforcourse.gif";
// import newapplyforjob from "./Guide_Images/newapplyforjob.gif";
// import newmobilehomepage from "./Guide_Images/newmobilehomepage.gif";

// import homemobile from "./Guide_Images/home-mobile.png";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import signupok from "./Guide_Images/signup-ok.gif";
// import signupmobile from "./Guide_Images/signupmobile.gif";
// import usersignin from "./Guide_Images/usersignin.png";
// import usersigninmobile from "./Guide_Images/usersigninmobile.png";
// import Institutionalsignin from "./Guide_Images/instsignin.png";
// import Institutionalsigninmobile from "./Guide_Images/instsigninmobile.png";
// import Userhomepage from "./Guide_Images/Userhomepage.gif";
// import Userhomepagemobile from "./Guide_Images/Userhomepagemobile.gif";
// import ApplyForCourse from "./Guide_Images/Applyforcourse.gif";
// import ApplyForCoursemobile from "./Guide_Images/ApplyForCoursemobile.gif";
// import ApplyForJob from "./Guide_Images/Applyforjob.gif";
// import ApplyForJobmobile from "./Guide_Images/ApplyForJobmobile.gif";
// import StudentsEmployeeDocuments from "./Guide_Images/StudentsEmployeeDocuments.gif";
// import StudentsProfile from "./Guide_Images/StudentsProfile.gif";
// import StudentHomePage from "./Guide_Images/StudentHomePage.gif";
// import EmployeeHomePage from "./Guide_Images/EmployeeHomePage.gif";
// import EmployeeProfile from "./Guide_Images/EmployeeProfile.gif";
// import ApplyForAdmin from "./Guide_Images/ApplyForAdmin.gif";
// import Expense from "./Guide_Images/Expense.gif";
// import SuperAdminExpense from "./Guide_Images/SuperAdminExpense.gif";
// import Marks from "./Guide_Images/Marks.gif";
// import ChangePassword from "./Guide_Images/ChangePassword.gif";
// import Documents from "./Guide_Images/Documents.gif";
// import Invoice from "./Guide_Images/Invoice.gif";
// import Assets from "./Guide_Images/Assets.gif";
// import AdminJob from "./Guide_Images/AdminJob.gif";
// import AdminDeactivateMember from "./Guide_Images/AdminDeactivateMember.gif";
// import AdminProfile from "./Guide_Images/AdminProfile.gif";
// import Course from "./Guide_Images/Course.gif";
// import EnrollmentmanagmentSystem from "./Guide_Images/Enrollment managment System.gif";
// import AdminHomePage from "./Guide_Images/AdminHomePage.gif";

// import queries from "./Guide_Images/queries.gif";
// import TimeTable from "./Guide_Images/TimeTable.gif";
// import LazyLoad from "react-lazyload";

// const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
// let sessioninfo = { userType: "externaluser" };
// if (sessiondetails == null) {
// } else {
//   sessioninfo = sessiondetails;
// }

// function returntypebased() {
//   if (sessioninfo.userType === "superadmin") {
//     return (
//       <div>
//         <div className="">
//           <p className="heading01">Home page</p>
//           <div className="gifholder">
//             <LazyLoad height={200} offset={500}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="commongifs"
//                 alt="AdminHomePage"
//                 // src={AdminHomePage}
//                 src={newAdminHomePage}
//               />
//             </LazyLoad>
//           </div>
//         </div>
//         <div className="">
//           <p className="heading01">Course</p>
//           <div className="gifholder">
//             <LazyLoad height={200} offset={500}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="commongifs"
//                 alt="Course"
//                 // src={Course}
//                 src={newCourse}
//               />
//             </LazyLoad>
//           </div>
//         </div>
//         <div className="">
//           <p className="heading01">Enrollments</p>
//           <div className="gifholder">
//             <LazyLoad height={200} offset={500}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="commongifs"
//                 alt="Enrollment Management System"
//                 // src={EnrollmentmanagmentSystem}
//                 src={newEnrollments}
//               />
//             </LazyLoad>
//           </div>
//         </div>
//         <div className="">
//           <p className="heading01">Files</p>
//           <div className="gifholder">
//             <LazyLoad height={200} offset={500}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="commongifs"
//                 alt="File Management System"
//                 // src={Documents}
//                 src={newDocuments}
//               />
//             </LazyLoad>
//           </div>
//         </div>
//         <div className="">
//           <p className="heading01">Expenses</p>
//           <div className="gifholder">
//             <LazyLoad height={200} offset={500}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="commongifs"
//                 alt="Expense"
//                 // src={SuperAdminExpense}
//                 src={newExpenses}
//               />
//             </LazyLoad>
//           </div>
//         </div>
//         <div className="">
//           <p className="heading01">Invoice</p>
//           <div className="gifholder">
//             <LazyLoad height={200} offset={500}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="commongifs"
//                 alt="Automated Invoice"
//                 // src={Invoice}
//                 src={newInvoice}
//               />
//             </LazyLoad>
//           </div>
//         </div>
//         <div className="">
//           <p className="heading01">Store-Assets</p>
//           <div className="gifholder">
//             <LazyLoad height={200} offset={500}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="commongifs"
//                 alt="Assets"
//                 // src={Assets}
//                 src={newAssetStore}
//               />
//             </LazyLoad>
//           </div>
//         </div>
//         <div className="">
//           <p className="heading01">Jobs</p>
//           <div className="gifholder">
//             <LazyLoad height={200} offset={500}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="commongifs"
//                 alt="Jobs"
//                 // src={AdminJob}
//                 src={newJobs}
//               />
//             </LazyLoad>
//           </div>
//         </div>
//         <div className="">
//           <p className="heading01">Marks</p>
//           <div className="gifholder">
//             <LazyLoad height={200} offset={500}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="commongifs"
//                 alt="Marks"
//                 // src={Marks}
//                 src={newMarks}
//               />
//             </LazyLoad>
//           </div>
//         </div>
//         <div className="">
//           <p className="heading01">Time Table</p>
//           <div className="gifholder">
//             <LazyLoad height={200} offset={500}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="commongifs"
//                 alt="TimeTable"
//                 // src={TimeTable}
//                 src={newTimeTables}
//               />
//             </LazyLoad>
//           </div>
//         </div>
//         <div className="">
//           <p className="heading01">Queries</p>
//           <div className="gifholder">
//             <LazyLoad height={200} offset={500}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="commongifs"
//                 alt="Queries"
//                 // src={queries}
//                 src={newQueries}
//               />
//             </LazyLoad>
//           </div>
//         </div>
        
//         <div className="">
//           <p className="heading01">Deactivate Member</p>
//           <div className="gifholder">
//             <LazyLoad height={200} offset={500}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="commongifs"
//                 alt="Deactivate Member"
//                 // src={AdminDeactivateMember}
//                 src={newMemberStatus}
//               />
//             </LazyLoad>
//           </div>
//         </div>
//         <div className="">
//           <p className="heading01">Update Profile</p>
//           <div className="gifholder">
//             <LazyLoad height={200} offset={500}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="commongifs"
//                 alt="Profile"
//                 // src={AdminProfile}
//                 src={newupdateprofile}
//               />
//             </LazyLoad>
//           </div>
//         </div>
//         <div className="">
//           <p className="heading01">Change Password</p>
//           <div className="gifholder">
//             <LazyLoad height={200} offset={500}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="commongifs"
//                 alt="ChangePassword"
//                 // src={ChangePassword}
//                 src={newchangepassword}
//               />
//             </LazyLoad>
//           </div>
//         </div>
//       </div>
//     );
//   } else if (sessioninfo.userType === "admin") {
//     return (
//       <div>
//         <div className="">
//           <p className="heading01">Home page</p>
//           <div className="gifholder">
//             <LazyLoad height={200} offset={500}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="commongifs"
//                 alt="AdminHomePage"
//                 src={AdminHomePage}
//               />
//             </LazyLoad>
//           </div>
//         </div>
//         <div className="">
//           <p className="heading01">Course</p>
//           <div className="gifholder">
//             <LazyLoad height={200} offset={500}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="commongifs"
//                 alt="Course"
//                 src={Course}
//               />
//             </LazyLoad>
//           </div>
//         </div>
//         <div className="">
//           <p className="heading01">Enrollment Management System</p>
//           <div className="gifholder">
//             <LazyLoad height={200} offset={500}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="commongifs"
//                 alt="Enrollment Management System"
//                 src={EnrollmentmanagmentSystem}
//               />
//             </LazyLoad>
//           </div>
//         </div>
//         <div className="">
//           <p className="heading01">File Management System</p>
//           <div className="gifholder">
//             <LazyLoad height={200} offset={500}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="commongifs"
//                 alt="File Management System"
//                 src={Documents}
//               />
//             </LazyLoad>
//           </div>
//         </div>
//         <div className="">
//           <p className="heading01">Expense Management System</p>
//           <div className="gifholder">
//             <LazyLoad height={200} offset={500}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="commongifs"
//                 alt="Expense"
//                 src={Expense}
//               />
//             </LazyLoad>
//           </div>

//         </div>
//         <div className="">
//           <p className="heading01">Automated Invoice</p>
//           <div className="gifholder">
//             <LazyLoad height={200} offset={500}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="commongifs"
//                 alt="Automated Invoice"
//                 src={Invoice}
//               />
//             </LazyLoad>
//           </div>
//         </div>
//         <div className="">
//           <p className="heading01">Assets Management System</p>
//           <div className="gifholder">
//             <LazyLoad height={200} offset={500}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="commongifs"
//                 alt="Assets"
//                 src={Assets}
//               />
//             </LazyLoad>
//           </div>
//         </div>
//         <div className="">
//           <p className="heading01">Jobs</p>
//           <div className="gifholder">
//             <LazyLoad height={200} offset={500}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="commongifs"
//                 alt="Jobs"
//                 src={AdminJob}
//               />
//             </LazyLoad>
//           </div>
//         </div>
//         <div className="">
//           <p className="heading01">Marks</p>
//           <div className="gifholder">
//             <LazyLoad height={200} offset={500}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="commongifs"
//                 alt="Marks"
//                 src={Marks}
//               />
//             </LazyLoad>
//           </div>
//         </div>
//         <div className="">
//           <p className="heading01">Time Table</p>
//           <div className="gifholder">
//             <LazyLoad height={200} offset={500}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="commongifs"
//                 alt="TimeTable"
//                 src={TimeTable}
//               />
//             </LazyLoad>
//           </div>
//         </div>
//         <div className="">
//           <p className="heading01">Queries</p>
//           <div className="gifholder">
//             <LazyLoad height={200} offset={500}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="commongifs"
//                 alt="Queries"
//                 src={queries}
//               />
//             </LazyLoad>
//           </div>
//         </div>
//         <div className="">
//           <p className="heading01">Deactivate Member</p>
//           <div className="gifholder">
//             <LazyLoad height={200} offset={500}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="commongifs"
//                 alt="Deactivate Member"
//                 src={AdminDeactivateMember}
//               />
//             </LazyLoad>
//           </div>
//         </div>
//         <div className="">
//           <p className="heading01">Update Profile</p>
//           <div className="gifholder">
//             <LazyLoad height={200} offset={500}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="commongifs"
//                 alt="Profile"
//                 src={AdminProfile}
//               />
//             </LazyLoad>
//           </div>
//         </div>
//         <div className="">
//           <p className="heading01">Change Password</p>
//           <div className="gifholder">
//             <LazyLoad height={200} offset={500}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="commongifs"
//                 alt="ChangePassword"
//                 src={ChangePassword}
//               />
//             </LazyLoad>
//           </div>
//         </div>
//       </div>
//     );
//   } else if (sessioninfo.userType === "student") {
//     return (
//       <div>
//         <div className="">
//           <p className="heading01">Home page</p>
//           <div className="gifholder">
//             <LazyLoad height={200} offset={500}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="commongifs"
//                 alt="StudentHomePage"
//                 src={StudentHomePage}
//               />
//             </LazyLoad>
//           </div>
//         </div>
//         <div className="">
//           <p className="heading01">Accessing Document</p>
//           <div className="gifholder">
//             <LazyLoad height={200} offset={500}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="commongifs"
//                 alt="Accessing Document"
//                 src={StudentsEmployeeDocuments}
//               />
//             </LazyLoad>
//           </div>
//         </div>
//         <div className="">
//           <p className="heading01">Update Profile</p>
//           <div className="gifholder">
//             <LazyLoad height={200} offset={500}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="commongifs"
//                 alt="StudentsProfile"
//                 src={StudentsProfile}
//               />
//             </LazyLoad>
//           </div>
//         </div>
//         <div className="">
//           <p className="heading01">ChangePassword</p>
//           <div className="gifholder">
//             <LazyLoad height={200} offset={500}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="commongifs"
//                 alt="ChangePassword"
//                 src={ChangePassword}
//               />
//             </LazyLoad>
//           </div>
//         </div>
//       </div>
//     );
//   } else if (sessioninfo.userType === "employee") {
//     return (
//       <div>
//         <div className="">
//           <p className="heading01">Home page</p>
//           <div className="gifholder">
//             <LazyLoad height={200} offset={500}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="commongifs"
//                 alt="EmployeeHomePage"
//                 src={EmployeeHomePage}
//               />
//             </LazyLoad>
//           </div>
//         </div>
//         <div className="">
//           <p className="heading01">Accessing Document</p>
//           <div className="gifholder">
//             <LazyLoad height={200} offset={500}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="commongifs"
//                 alt="Accessing Document"
//                 src={StudentsEmployeeDocuments}
//               />
//             </LazyLoad>
//           </div>
//         </div>
//         <div className="">
//           <p className="heading01">Expense</p>
//           <div className="gifholder">
//             <LazyLoad height={200} offset={500}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="commongifs"
//                 alt="Expense"
//                 src={Expense}
//               />
//             </LazyLoad>
//           </div>
//         </div>
//         <div className="">
//           <p className="heading01">Marks</p>
//           <div className="gifholder">
//             <LazyLoad height={200} offset={500}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="commongifs"
//                 alt="Marks"
//                 src={Marks}
//               />
//             </LazyLoad>
//           </div>
//         </div>
//         <div className="">
//           <p className="heading01">Apply For Admin</p>
//           <div className="gifholder">
//             <LazyLoad height={200} offset={500}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="commongifs"
//                 alt="Apply For Admin"
//                 src={ApplyForAdmin}
//               />
//             </LazyLoad>
//           </div>
//         </div>
//         <div className="">
//           <p className="heading01">Update Profile</p>
//           <div className="gifholder">
//             <LazyLoad height={200} offset={500}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="commongifs"
//                 alt="EmployeeProfile"
//                 src={EmployeeProfile}
//               />
//             </LazyLoad>
//           </div>
//         </div>
//         <div className="">
//           <p className="heading01">Change Password</p>
//           <div className="gifholder">
//             <LazyLoad height={200} offset={500}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="commongifs"
//                 alt="ChangePassword"
//                 src={ChangePassword}
//               />
//             </LazyLoad>
//           </div>
//         </div>
//       </div>
//     );
//   } else if (sessioninfo.userType === "user") {
//     return (
//       <div>
//         <div className="">
//           <p className="heading01">Home page</p>
//           <div className="gifholder">
//             <LazyLoad height={200} offset={500}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="gifs"
//                 alt="Home page"
//                 // src={Userhomepage}
//                 src={newuserhomepage}
//               />
//             </LazyLoad>
//             <LazyLoadImage
//               effect="blur"
//               className="gifs-mobile"
//               alt="Home page"
//               // src={Userhomepagemobile}
//               src={newmobilehomepage}
//             />
//           </div>
//         </div>
//         <div className="">
//           <p className="heading01">Apply For Course</p>
//           <div className="gifholder">
//             <LazyLoad height={200} offset={500}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="gifs"
//                 alt="Apply For Course"
//                 // src={ApplyForCourse}
//                 src={newapplyforcourse}
//               />
//             </LazyLoad>
//             <LazyLoadImage
//               effect="blur"
//               className="gifs-mobile"
//               alt="Apply For Course"
//               src={ApplyForCoursemobile}
//             />
//           </div>
//         </div>
//         <div className="">
//           <p className="heading01">Apply For Job</p>
//           <div className="gifholder">
//             <LazyLoad height={200} offset={500}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="gifs"
//                 alt="Apply For Job"
//                 // src={ApplyForJob}
//                 src={newapplyforjob}
//               />
//             </LazyLoad>
//             <LazyLoadImage
//               effect="blur"
//               className="gifs-mobile"
//               alt="Apply For Job"
//               src={ApplyForJobmobile}
//             />
//           </div>
//         </div>
//       </div>
//     );
//   } else if (sessioninfo.userType === "externaluser") {
//     return (
//       <div>
//         <div className="">
//           <p className="heading01">Home page</p>
//           <div className="gifholder">
//             <LazyLoad height={200} offset={500}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="gifs"
//                 alt="Home page"
//                 // src={home}
//                 src={newhome}
//               />
//             </LazyLoad>
//             <LazyLoadImage
//               effect="blur"
//               className="gifs-mobile"
//               alt="Home page"
//               // src={homemobile}
//               src={newhomemobile}
//             />
//           </div>
//         </div>

//         <div className="">
//           <p className="heading01">Sign-Up</p>
//           <div className="gifholder">
//             <LazyLoad height={200} offset={500}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="gifs"
//                 alt="Sign Up"
//                 // src={signupok}
//                 src={newsignup}
//               />
//             </LazyLoad>
//             <LazyLoadImage
//               effect="blur"
//               className="gifs-mobile"
//               alt="Sign Up"
//               // src={signupmobile}
//               src={newsignupmobile}
//             />
//           </div>
//         </div>

//         <div className="">
//           <p className="heading01">User Sign-In</p>

//           <div className="gifholder">
//             <LazyLoad height={200} offset={250}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="gifs"
//                 alt="User Sign-In"
//                 // src={usersignin}
//                 src={newusersignin}
//               />
//             </LazyLoad>
//             <LazyLoadImage
//               effect="blur"
//               className="gifs-mobile"
//               alt="User Sign-In"
//               // src={usersigninmobile}
//               src={newusersigninmobile}
//             />
//           </div>
//         </div>
//         <div className="">
//           <p className="heading01">Institutional Sign In</p>
//           <div className="gifholder">
//             <LazyLoad height={200} offset={500}>
//               <LazyLoadImage
//                 effect="blur"
//                 className="gifs"
//                 alt="Institutional Sign In"
//                 // src={Institutionalsignin}
//                 src={newinstitutionalsignin}
//               />
//             </LazyLoad>
//             <LazyLoadImage
//               effect="blur"
//               className="gifs-mobile"
//               alt="Institutional Sign In"
//               // src={Institutionalsigninmobile}
//               src={newinstitutionalsigninmobile}
//             />
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// class Guide extends Component {
//   state = {};
//   render() {
//     return (
//       <div className="guide">
//         <div className="carrybox">
//           <Link to="/">
//             <AiIcons.AiFillCloseCircle />
//           </Link>
//           <h2 className="heading01">Welcome To Avinya Academy</h2>
//           {returntypebased()}
//         </div>
//       </div>
//     );
//   }
// }
// export default Guide;
