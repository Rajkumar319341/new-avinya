import React from "react";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { IconContext } from "react-icons";
import * as MdIcons from "react-icons/md";
import * as GoIcons from "react-icons/go";
import { GiExitDoor } from "react-icons/gi";
import { RiDashboardLine } from "react-icons/ri";
import { MdHolidayVillage } from "react-icons/md";
import { IoIosPaper } from "react-icons/io";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import LocationCityIcon from '@material-ui/icons/LocationCity';

//import *
var sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
var departdetails = localStorage.getItem("Depart Details");

function GetSortOrder(prop) {
   return function (a, b) {
      if (a[prop] > b[prop]) {
         return 1;
      } else if (a[prop] < b[prop]) {
         return -1;
      }
      return 0;
   };
}


let Data = [];

if (sessiondetails == null) {
   sessiondetails = { userType: "externaluser" };
}
// User
let Sidebar = [
   {
      title: "",
      icon: <AiIcons.AiOutlineClose />,
      path: "#",
      child: "",
   },
   {
      title: "Festivals",
      path: "/festivals",
      icon: <MdIcons.MdFestival />,
      cName: "nav-text01",
      child: "",
   },
   {
      title: "EmailService",
      path: "/emails",
      icon: <MdIcons.MdEmail />,
      cName: "nav-text01",
      child: "",
   },
   {
      title: "Dashboard",
      path: "/",
      icon: <MdIcons.MdDashboard />,
      cName: "nav-text01",
      child: "",
   },

   {
      title: "Home",
      path: "/userhome",
      icon: <AiIcons.AiFillHome />,
      cName: "nav-text01",
      child: "",
   },
   {
      title: "About",
      path: "/about",
      icon: <IoIcons.IoIosPaper />,
      cName: "nav-text01",
      child: "",
   },
   {
      title: "Courses",
      path: "/usercourses",
      icon: <AiIcons.AiOutlineBook />,
      cName: "nav-text01",
      child: "",
   },
   {
      title: "Jobs",
      path: "/userjob",
      icon: <IconContext.Provider value={{ color: "white" }}>
         <MdIcons.MdWork />
      </IconContext.Provider>,
      cName: "nav-text01",
      child: "",
   },
   {
      title: "Contact Us",
      path: "/contact",
      icon: <AiIcons.AiOutlineContacts />,
      cName: "nav-text01",
      child: "",
   },
];

let FinanceSidebar = [
   {
      title: "",
      icon: <AiIcons.AiOutlineClose />,
      path: "#",
      child: "",
   },
   {
      title: "EmailService",
      path: "/emails",
      icon: <MdIcons.MdEmail />,
      cName: "nav-text01",
      child: "",
   },
   {
      title: "Festivals",
      path: "/festivals",
      icon: <MdIcons.MdFestival />,
      cName: "nav-text01",
      child: "",
   },
   {
      title: "Dashboard",
      path: "/",
      icon: <MdIcons.MdDashboard />,
      cName: "nav-text01",
      child: "",
   },
   {
      title: "Stores",
      path: "/assets",
      icon: <MdIcons.MdAccessibility />,
      cName: "nav-text01",
      child: "",
   },
   {
      title: "Policy",
      icon: <GoIcons.GoUnverified />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: "Terms Of Use",
            path: "/shikshakpro/terms-of-use",
            icon: <GoIcons.GoUnverified />,
            cName: "nav-text01",
            child: "",
         },
         {
            title: "Payment Policy",
            path: "/shikshakpro/payment-refund-policy",
            icon: <GoIcons.GoUnverified />,
            cName: "nav-text01",
            child: "",
         },
         {
            title: "Privacy Policy",
            path: "/shikshakpro/privacy-policy",
            icon: <GoIcons.GoUnverified />,
            cName: "nav-text01",
            child: "",
         },
      ],
   },
   // {
   //    title: "Policy",
   //    path: "/facultyPolicy",
   //    icon: <GoIcons.GoUnverified />,
   //    cName: "nav-text01",
   //    child: "",
   // },
   // {
   //    title: "Apply For Admin",
   //    path: "/facultyadminjob",
   //    icon: <IoIcons.IoMdPersonAdd />,
   //    cName: "nav-text01",
   //    child: "",
   // },
   {
      title: "Passwords",
      icon: <AiIcons.AiFillFolder />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: "User Passwords",
            path: "/userPasswordManage",
            icon: <AiIcons.AiFillFilePdf />,
            cName: "nav-text01",
            child: "",
         },
         {
            title: "Org Passwords",
            path: "/orgPasswordManage",
            icon: <AiIcons.AiFillFilePdf />,
            cName: "nav-text01",
            child: "",
         },
         // {
         //    title: "Password Requests",
         //    path: "/orgPasswordAccess",
         //    icon: <AiIcons.AiFillFilePdf />,
         //    cName: "nav-text01",
         //    child: "",
         // },
      ],
   },
   // {
   //    title: "My Account",
   //    icon: <AiIcons.AiOutlineUser />,
   //    cName: "nav-text-dropdown",
   //    child: [
   //       {
   //          title: "Profile",
   //          path: "/facultyProfile",
   //          icon: <AiIcons.AiFillProfile />,
   //          cName: "nav-text01",
   //          child: "",
   //       },
   //       {
   //          title: "Change Password",
   //          path: "/changePassword",
   //          icon: <AiIcons.AiFillLock />,
   //          cName: "nav-text01",
   //          child: "",
   //       },
   //       {
   //          title: "Offer Letter",
   //          path: "/offerLetter",
   //          icon: <AiIcons.AiOutlineLock />,
   //          cName: "nav-text01",
   //          child: "",
   //       },
   //       // {
   //       // title: "Identity Card",
   //       // path: "/facultyidCard",
   //       // icon: <AiIcons.AiOutlineLock />,
   //       // cName: "nav-text01",
   //       // child: "",
   //       // },
   //    ],
   // },
   {
      title: "Employee Exit",
      icon: <GiExitDoor />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: "Exit from Organization",
            path: "/empexit",
            icon: <GiExitDoor />,
            cName: "initiate-exit",
            child: "",
         },
         {
            title: "Employee Exit Dashboard",
            path: "/exitdashboard",
            icon: <RiDashboardLine />,
            cName: "dashboard",
            child: "",
         },
      ],
   },
   // {
   //    title: "Classroom",
   //    icon: <AiIcons.AiOutlineRobot />,
   //    cName: "nav-text-dropdown",
   //    child: [
   //       {
   //          title: "Marks",
   //          path: "/facultyMarks",
   //          icon: <IoIcons.IoMdPaper />,
   //          cName: "nav-text01",
   //          child: "",
   //       },
   //       {
   //          title: "Timetable",
   //          path: "/facultyTimeTable",
   //          icon: <AiIcons.AiFillClockCircle />,
   //          cName: "nav-text01",
   //          child: "",
   //       },
   //       {
   //          title: "Students",
   //          path: "/facultyStudentAPI",
   //          icon: <IoIcons.IoIosPeople />,
   //          cName: "nav-text01",
   //          child: "",
   //       },
   //       {
   //          title: "Courses Enrolled",
   //          path: "/facultyCourseEnrolled",
   //          icon: <IoIcons.IoIosBook />,
   //          cName: "nav-text01",
   //          child: "",
   //       },
   //    ],
   // },
   {
      title: "Files",
      icon: <AiIcons.AiFillFolder />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: "Documents",
            path: "/facultydocuments",
            icon: <AiIcons.AiFillFolder />,
            cName: "nav-text01",
            child: "",
         },
      ],
   },
   {
      title: "Finance",
      icon: <AiIcons.AiOutlineMoneyCollect />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: "Expenses",
            path: "/facultyExpenseAPI",
            icon: <AiIcons.AiOutlineMoneyCollect />,
            cName: "nav-text01",
            child: "",
         },
         {
            title: "Invoice",
            path: "/superAdminInvoice",
            icon: <AiIcons.AiOutlineBook />,
            cName: "nav-text01",
            child: "",
         },
      ],
   },
   {
      title: "Org Hierarchy",
      icon: <AiIcons.AiOutlineMoneyCollect />,
      cName: "nav-text-dropdown",
      child: [
         // {
         //    title:" C4e Hierarchy Register",
         //    path: "/OrgRegister",
         //    icon: <AiIcons.AiOutlineMoneyCollect />,
         //    cName: "nav-text01",
         //    child: "",
         // },
         // {
         //    title:" Teacher Hierarchy Register",
         //    path: "/AvinRegister",
         //    icon: <AiIcons.AiOutlineMoneyCollect />,
         //    cName: "nav-text01",
         //    child: "",
         // },
         {
            title: "Employee Hierarchy",
            path: "/Orghierarchy",
            icon: <AiIcons.AiOutlineMoneyCollect />,
            cName: "nav-text01",
            child: "",
         },
         {
            title: "Avinya Faculty Hierarchy",
            path: "/Avinhierarchy",
            icon: <AiIcons.AiOutlineMoneyCollect />,
            cName: "nav-text01",
            child: "",
         },
      ],
   },
   {
      title: "Stationary",
      icon: <AiIcons.AiOutlineAppstore />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: " Stationary Items",
            path: "/StationeryItems",
            icon: <AiIcons.AiOutlineAppstore />,
            cName: "nav-text01",
            child: "",
         },
      ],
   },
];




//RiOrganizationChart

let TechSidebar = [
   {
      title: "",
      icon: <AiIcons.AiOutlineClose />,
      path: "#",
      cName: "navcross",
      child: "",
   },
   {
      title: "Dashboard",
      path: "/",
      icon: <MdIcons.MdDashboard />,
      cName: "nav-text01",
      child: "",
   },
   {
      title: "Internal Jobs",
      path: "/internal-job",
      icon: <MdIcons.MdDashboard />,
      cName: "nav-text01",
      child: "",
   },

   // {
   //    title: "Questions",
   //    icon: <IoIosPaper />,
   //    cName: "nav-text-dropdown",
   //    child: [
   //       {
   //          title: "Question Papers",
   //          path: "/all-questions",

   //          cName: "nav-text01",
   //          child: "",
   //       },
   //       {
   //          title: "Add questions",
   //          path: "/addquestion",

   //          cName: "nav-text01",
   //          child: "",
   //       },
   //       {
   //          title: "View questions",
   //          path: "/viewquestion",

   //          cName: "nav-text01",
   //          child: "",
   //       },

   //    ],
   // },

   {
      title: "EmailService",
      path: "/emails",
      icon: <MdIcons.MdEmail />,
      cName: "nav-text01",
      child: "",
   },

   // {
   //    title: "Roles",
   //    icon: <MdIcons.MdEmail />,
   //    cName: "nav-text01",
   //    child: [
   //       {
   //          title: "Created Role",
   //          path: "/rolesdata",

   //          cName: "nav-text01",
   //          child: "",

   //       },
   //       {
   //          title: "Allocated Roles",
   //          path: "/deatiled roles",

   //          cName: "nav-text01",
   //          child: "",

   //       }
   //    ],
   // },

   {
      title: "Festivals",
      path: "/festivals",
      icon: <MdIcons.MdFestival />,
      cName: "nav-text01",
      child: "",
   },
   {
      title: "Holiday details",
      icon: <AiIcons.AiOutlineStar />,
      // path: "/holidayform",
      cName: "navcross",
      child: [
         // {
         //    title: "Add Holiday",
         //    path: "/holidayform",
         //    cName: "navcross",
         //    child: "",
         // },
         {
            title: "Holiday Details",
            path: "/holidays",
            cName: "navcross",
            child: "",
         },
      ],
   },
   {
      title: "Stores",
      path: "/assets",
      icon: <MdIcons.MdAccessibility />,
      cName: "nav-text01",
      child: "",
   },
   {
      title: "Policy",
      icon: <GoIcons.GoUnverified />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: "Terms Of Use",
            path: "/shikshakpro/terms-of-use",
            icon: <GoIcons.GoUnverified />,
            cName: "nav-text01",
            child: "",
         },
         {
            title: "Payment Policy",
            path: "/shikshakpro/payment-refund-policy",
            icon: <GoIcons.GoUnverified />,
            cName: "nav-text01",
            child: "",
         },
         {
            title: "Privacy Policy",
            path: "/shikshakpro/privacy-policy",
            icon: <GoIcons.GoUnverified />,
            cName: "nav-text01",
            child: "",
         },
      ],
   },
   // {
   //    title: "Policy",
   //    path: "/superAdminPolicy",
   //    icon: <GoIcons.GoUnverified />,
   //    cName: "nav-text01",
   //    child: "",
   // },
   {
      title: "Passwords",
      icon: <AiIcons.AiFillFolder />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: "User Passwords",
            path: "/userPasswordManage",
            icon: <AiIcons.AiFillFilePdf />,
            cName: "nav-text01",
            child: "",
         },
         {
            title: "Org Passwords",
            path: "/orgPasswordManage",
            icon: <AiIcons.AiFillFilePdf />,
            cName: "nav-text01",
            child: "",
         },
         // {
         //    title: "Password Requests",
         //    path: "/orgPasswordAccess",
         //    icon: <AiIcons.AiFillFilePdf />,
         //    cName: "nav-text01",
         //    child: "",
         // },
         // {
         //    title: "All",
         //    path: "/orgPasswordAccessAll",
         //    icon: <AiIcons.AiFillFilePdf />,
         //    cName: "nav-text01",
         //    child: "",
         // },
      ],
   },
   // {
   //    title: "Homepage Card",
   //    path: "/superAdminHomepageCard",
   //    icon: <AiIcons.AiFillIdcard />,
   //    cName: "nav-text01",
   //    child: "",
   // },
   // {
   //    title: "Members",
   //    icon: <IoIcons.IoIosPeople />,
   //    cName: "nav-text-dropdown",
   //    child: [
   //       {
   //          title: "Admin",
   //          path: "/SuperAdmin",
   //          icon: <IoIcons.IoIosArrowDropright />,
   //          cName: "nav-text-dropdown-holder",
   //          child: "",
   //       },
   //       {
   //          title: "Faculties",
   //          path: "/superAdminFaculty",
   //          icon: <IoIcons.IoIosArrowDropright />,
   //          cName: "nav-text-dropdown-holder",
   //          child: "",
   //       },
   //       {
   //          title: "FailedReg Users",
   //          path: "/superAdminNonRegUser",
   //          icon: <IoIcons.IoIosArrowDropright />,
   //          cName: "nav-text-dropdown-holder",
   //          child: "",
   //       },
   //       {
   //          title: "Member Status",
   //          path: "/superAdminMembersStatus",
   //          icon: <IoIcons.IoIosArrowDropright />,
   //          cName: "nav-text-dropdown-holder",
   //          child: "",
   //       },
   //       {
   //          title: "Students",
   //          path: "/superAdminStudents",
   //          icon: <IoIcons.IoIosArrowDropright />,
   //          cName: "nav-text-dropdown-holder",
   //          child: "",
   //       },
   //       {
   //          title: "Users",
   //          path: "/superAdminUser",
   //          icon: <IoIcons.IoIosArrowDropright />,
   //          cName: "nav-text-dropdown-holder",
   //          child: "",
   //       },
   //    ],
   // },
   {
      title: "Employee Exit",
      icon: <GiExitDoor />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: "Exit from Organization",
            path: "/empexit",
            icon: <GiExitDoor />,
            cName: "initiate-exit",
            child: "",
         },
         // {
         //    title: "Exit overview",
         //    path: "/exitdetails",
         //    icon: <GiExitDoor />,
         //    cName: "initiate-exit",
         //    child: "",
         // },
         {
            title: "Employee Exit Dashboard",
            path: "/exitdashboard",
            icon: <RiDashboardLine />,
            cName: "dashboard",
            child: "",
         },
      ],
   },
   {
      title: "Org Hierarchy",
      icon: <AiIcons.AiOutlineMoneyCollect />,
      cName: "nav-text-dropdown",
      child: [
         // {
         //    title: " C4e Hierarchy Registration",
         //    path: "/OrgRegister",
         //    icon: <AiIcons.AiOutlineMoneyCollect />,
         //    cName: "nav-text01",
         //    child: "",
         // },
         // {
         //    title: " Teacher Hierarchy Registration",
         //    path: "/AvinRegister",
         //    icon: <AiIcons.AiOutlineMoneyCollect />,
         //    cName: "nav-text01",
         //    child: "",
         // },
         {
            title: "Employee Hierarchy",
            path: "/Orghierarchy",
            icon: <AiIcons.AiOutlineMoneyCollect />,
            cName: "nav-text01",
            child: "",
         },
         {
            title: "Avinya Faculty Hierarchy",
            path: "/Avinhierarchy",
            icon: <AiIcons.AiOutlineMoneyCollect />,
            cName: "nav-text01",
            child: "",
         },
      ],
   },
   // {
   //    title: "Jobs",
   //    icon: <MdIcons.MdWork />,
   //    cName: "nav-text-dropdown",
   //    child: [
   //       {
   //          title: "Admin",
   //          path: "/superAdminJob",
   //          icon: <IoIcons.IoIosArrowDropright />,
   //          cName: "nav-text-dropdown-holder",
   //          child: "",
   //       },
   //       {
   //          title: "Employee",
   //          path: "/superAdminFacultyJobs",
   //          icon: <IoIcons.IoIosArrowDropright />,
   //          cName: "nav-text-dropdown-holder",
   //          child: "",
   //       },
   //       {
   //          title: "View Jobs",
   //          path: "/jobstatus",
   //          icon: <IoIcons.IoIosArrowDropright />,
   //          cName: "nav-text-dropdown-holder",
   //          child: "",
   //       },
   //       {
   //          title: "Add Designation",
   //          path: "/create-job",
   //          icon: <IoIcons.IoIosArrowDropright />,
   //          cName: "nav-text-dropdown-holder",
   //          child: "",
   //       },
   //       {
   //          title: "Add Job",
   //          path: "/add-job",
   //          icon: <IoIcons.IoIosArrowDropright />,
   //          cName: "nav-text-dropdown-holder",
   //          child: "",
   //       },
   //    ],
   // },
   // {
   //    title: "My Account",
   //    icon: <AiIcons.AiOutlineUser />,
   //    cName: "nav-text-dropdown",
   //    child: [
   //       {
   //          title: "Profile",
   //          path: "/facultyProfile",
   //          icon: <AiIcons.AiFillProfile />,
   //          cName: "nav-text01",
   //          child: "",
   //       },
   //       {
   //          title: "Change Password",
   //          path: "/changePassword",
   //          icon: <AiIcons.AiOutlineLock />,
   //          cName: "nav-text01",
   //          child: "",
   //       },
   //    ],
   // },

   // {
   //    title: "Id Card",
   //    icon: <AiIcons.AiFillIdcard />,
   //    cName: "nav-text-dropdown",
   //    child: [
   //       {
   //          title: "Employee",
   //          path: "/superAdminIDCards",
   //          icon: <IoIcons.IoMdCard />,
   //          cName: "nav-text01",
   //          child: "",
   //       },
   //       {
   //          title: "Student",
   //          path: "/superAdminStudentIdCard",
   //          icon: <IoIcons.IoMdCard />,
   //          cName: "nav-text01",
   //          child: "",
   //       },
   //    ],
   // },


   // {
   //    title: "Courses",
   //    path: "/superAdminCourses",
   //    icon: <IoIcons.IoIosBook />,
   //    cName: "nav-text01",
   //    child: "",
   // },
   // {
   //    title: "Classroom",
   //    icon: <AiIcons.AiOutlineRobot />,
   //    cName: "nav-text-dropdown",
   //    child: [
   //       {
   //          title: "Courses Enrolled",
   //          path: "/superAdminCoursesEnrolled",
   //          icon: <AiIcons.AiOutlineInsurance />,
   //          cName: "nav-text01",
   //          child: "",
   //       },
   //       {
   //          title: "Marks",
   //          path: "/superAdminMarks",
   //          icon: <AiIcons.AiOutlineBook />,
   //          cName: "nav-text01",
   //          child: "",
   //       },
   //       {
   //          title: "Timetables",
   //          path: "/superAdminTimeTable",
   //          icon: <AiIcons.AiFillClockCircle />,
   //          cName: "nav-text01",
   //          child: "",
   //       },
   //    ],
   // },
   {
      title: "Files",
      icon: <AiIcons.AiFillFolder />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: "Documents",
            path: "/adminDocumentsAPI",
            icon: <AiIcons.AiFillFolder />,
            cName: "nav-text01",
            child: "",
         },
         // {
         //    title: "Office Documents",
         //    path: "/superAdminOfficeDocumentAPI",
         //    icon: <AiIcons.AiFillFolder />,
         //    cName: "nav-text01",
         //    child: "",
         // },
      ],
   },
   {
      title: "Enrollments ",
      icon: <IoIcons.IoMdLogIn />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: "ALL",
            path: "/adminenrollments",
            icon: <IoIcons.IoIosArrowDropright />,
            cName: "nav-text-dropdown-holder",
            child: "",
         },
         {
            title: "Applied",
            path: "/EnrollmentsApplied",
            icon: <IoIcons.IoIosArrowDropright />,
            cName: "nav-text-dropdown-holder",
            child: "",
         },
         {
            title: "Accepted",
            path: "/enrollmentsAccepted",
            icon: <IoIcons.IoIosArrowDropright />,
            cName: "nav-text-dropdown-holder",
            child: "",
         },
         {
            title: "Completed",
            path: "/enrollmentsCompleted",
            icon: <IoIcons.IoIosArrowDropright />,
            cName: "nav-text-dropdown-holder",
            child: "",
         },
      ],
   },
   {
      title: "Finance",
      icon: <AiIcons.AiOutlineMoneyCollect />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: "Expenses",
            path: "/adminExpenseAPI",
            icon: <AiIcons.AiOutlineMoneyCollect />,
            cName: "nav-text01",
            child: "",
         },
         // {
         //    title: "Invoice",
         //    path: "/superAdminInvoice",
         //    icon: <AiIcons.AiOutlineBook />,
         //    cName: "nav-text01",
         //    child: "",
         // },
      ],
   },
   {
      title: "Stationary",
      icon: <AiIcons.AiOutlineAppstore />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: " Stationary Items",
            path: "/StationeryItems",
            icon: <AiIcons.AiOutlineAppstore />,
            cName: "nav-text01",
            child: "",
         },
      ],
   },

   {
      title: "Server Stats",
      path: "/superAdminGraph",
      icon: <IoIcons.IoMdStats />,
      cName: "nav-text01",
      child: "",
   },
   // {
   // title: "HomePage Cards",
   // path: "/superAdminHomepageCards",
   // icon: <GoIcons.GoUnverified/>,
   // cName: "nav-text01",
   // child: "",
   // },

   {
      title: "Queries",
      path: "/queries",
      icon: <AiIcons.AiOutlineQuestionCircle />,
      cName: "nav-text01",
      child: "",
   },
];


let HrSidebar = [
   {

      title: "",
      icon: <AiIcons.AiOutlineClose />,
      path: "#",
      child: "",
   },
   {
      title: "EmailService",
      path: "/emails",
      icon: <MdIcons.MdEmail />,
      cName: "nav-text01",
      child: "",
   },
   {
      title: "Festivals",
      path: "/festivals",
      icon: <MdIcons.MdFestival />,
      cName: "nav-text01",
      child: "",
   },
   {
      title: "Dashboard",
      path: "/",
      icon: <MdIcons.MdDashboard />,
      cName: "nav-text01",
      child: "",
   },
   {
      title: "Stores",
      path: "/assets",
      icon: <MdIcons.MdAccessibility />,
      cName: "nav-text01",
      child: "",
   },
   {
      title: "Policy",
      icon: <GoIcons.GoUnverified />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: "Terms Of Use",
            path: "/shikshakpro/terms-of-use",
            icon: <GoIcons.GoUnverified />,
            cName: "nav-text01",
            child: "",
         },
         {
            title: "Payment Policy",
            path: "/shikshakpro/payment-refund-policy",
            icon: <GoIcons.GoUnverified />,
            cName: "nav-text01",
            child: "",
         },
         {
            title: "Privacy Policy",
            path: "/shikshakpro/privacy-policy",
            icon: <GoIcons.GoUnverified />,
            cName: "nav-text01",
            child: "",
         },
      ],
   },

   {

      title: "Enrollments ",
      icon: <IoIcons.IoMdLogIn />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: "ALL",
            path: "/superAdminEnrollments",
            icon: <IoIcons.IoIosArrowDropright />,
            cName: "nav-text-dropdown-holder",
            child: "",

         },

         {
            title: "Applied",
            path: "/superAdminEnrollmentsApplied",
            icon: <IoIcons.IoIosArrowDropright />,
            cName: "nav-text-dropdown-holder",
            child: "",

         },

         {
            title: "Accepted",
            path: "/superAdminEnrollmentsAccepted",
            icon: <IoIcons.IoIosArrowDropright />,
            cName: "nav-text-dropdown-holder",
            child: "",

         },

         {

            title: "Completed",
            path: "/superAdminEnrollmentsCompleted",
            icon: <IoIcons.IoIosArrowDropright />,
            cName: "nav-text-dropdown-holder",
            child: "",

         },

      ],

   },

   {
      title: "Roles",

      icon: <MdIcons.MdEmail />,
      cName: "nav-text01",
      child: [
         // {
         //    title: "Created Role",
         //    path: "/rolesdata",

         //    cName: "nav-text01",
         //    child: "",

         // },
         {
            title: "Allocated Roles",
            path: "/deatiled roles",

            cName: "nav-text01",
            child: "",

         }
      ],
   },
   {
      title: "Jobs",
      icon: <MdIcons.MdWork />,
      cName: "nav-text-dropdown",
      child: [
         // {
         //    title: "Admin",
         //    path: "/superAdminJob",
         //    icon: <IoIcons.IoIosArrowDropright />,
         //    cName: "nav-text-dropdown-holder",
         //    child: "",
         // },
         // {
         //    title: "Employee",
         //    path: "/superAdminFacultyJobs",
         //    icon: <IoIcons.IoIosArrowDropright />,
         //    cName: "nav-text-dropdown-holder",
         //    child: "",
         // },
         {
            title: "View Jobs",
            path: "/jobstatus",
            icon: <IoIcons.IoIosArrowDropright />,
            cName: "nav-text-dropdown-holder",
            child: "",
         },
         {
            title: "Add Designation",
            path: "/create-job",
            icon: <IoIcons.IoIosArrowDropright />,
            cName: "nav-text-dropdown-holder",
            child: "",
         },
         {
            title: "Add Job",
            path: "/add-job",
            icon: <IoIcons.IoIosArrowDropright />,
            cName: "nav-text-dropdown-holder",
            child: "",
         },
      ],
   },
   // {
   //    title: "Policy",
   //    path: "/facultyPolicy",
   //    icon: <GoIcons.GoUnverified />,
   //    cName: "nav-text01",
   //    child: "",
   // },
   // {
   //    title: "Apply For Admin",
   //    path: "/facultyadminjob",
   //    icon: <IoIcons.IoMdPersonAdd />,
   //    cName: "nav-text01",
   //    child: "",
   // },
   {
      title: "Passwords",
      icon: <AiIcons.AiFillFolder />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: "User Passwords",
            path: "/userPasswordManage",
            icon: <AiIcons.AiFillFilePdf />,
            cName: "nav-text01",
            child: "",
         },
         {
            title: "Org Passwords",
            path: "/orgPasswordManage",
            icon: <AiIcons.AiFillFilePdf />,
            cName: "nav-text01",
            child: "",
         },
         // {
         //    title: "Password Requests",
         //    path: "/orgPasswordAccess",
         //    icon: <AiIcons.AiFillFilePdf />,
         //    cName: "nav-text01",
         //    child: "",
         // },
      ],
   },
   {
      title: "My Account",
      icon: <AiIcons.AiOutlineUser />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: "Profile",
            path: "/facultyProfile",
            icon: <AiIcons.AiFillProfile />,
            cName: "nav-text01",
            child: "",
         },
         {
            title: "Change Password",
            path: "/changePassword",
            icon: <AiIcons.AiFillLock />,
            cName: "nav-text01",
            child: "",
         },
         {
            title: "Offer Letter",
            path: "/offerLetter",
            icon: <AiIcons.AiOutlineLock />,
            cName: "nav-text01",
            child: "",
         },
         // {
         // title: "Identity Card",
         // path: "/facultyidCard",
         // icon: <AiIcons.AiOutlineLock />,
         // cName: "nav-text01",
         // child: "",
         // },
      ],
   },
   {
      title: "Employee Exit",
      icon: <GiExitDoor />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: "Exit from Organization",
            path: "/empexit",
            icon: <GiExitDoor />,
            cName: "initiate-exit",
            child: "",
         },
         {
            title: "Employee Exit Dashboard",
            path: "/exitdashboard",
            icon: <RiDashboardLine />,
            cName: "dashboard",
            child: "",
         },
      ],
   },

   {
      title: "Holiday details",
      icon: <AiIcons.AiOutlineStar />,
      // path: "/holidayform",
      cName: "navcross",
      child: [
         {
            title: "Add Holiday",
            path: "/holidayform",
            cName: "navcross",
            child: "",
         },
         {
            title: "Holiday Details",
            path: "/holidays",
            cName: "navcross",
            child: "",
         },
      ],
   },
   {
      title: "Classroom",
      icon: <AiIcons.AiOutlineRobot />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: "Marks",
            path: "/facultyMarks",
            icon: <IoIcons.IoMdPaper />,
            cName: "nav-text01",
            child: "",
         },
         {
            title: "Timetable",
            path: "/facultyTimeTable",
            icon: <AiIcons.AiFillClockCircle />,
            cName: "nav-text01",
            child: "",
         },
         {
            title: "Students",
            path: "/facultyStudentAPI",
            icon: <IoIcons.IoIosPeople />,
            cName: "nav-text01",
            child: "",
         },
         {
            title: "Courses Enrolled",
            path: "/facultyCourseEnrolled",
            icon: <IoIcons.IoIosBook />,
            cName: "nav-text01",
            child: "",
         },
      ],
   },
   {
      title: "Files",
      icon: <AiIcons.AiFillFolder />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: "Documents",
            path: "/facultydocuments",
            icon: <AiIcons.AiFillFolder />,
            cName: "nav-text01",
            child: "",
         },
      ],
   },
   {
      title: "Finance",
      icon: <AiIcons.AiOutlineMoneyCollect />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: "Expenses",
            path: "/facultyExpenseAPI",
            icon: <AiIcons.AiOutlineMoneyCollect />,
            cName: "nav-text01",
            child: "",
         },
      ],
   },
   {
      title: "Org Hierarchy",
      icon: <AiIcons.AiOutlineMoneyCollect />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: " C4e Hierarchy Register",
            path: "/OrgRegister",
            icon: <AiIcons.AiOutlineMoneyCollect />,
            cName: "nav-text01",
            child: "",
         },
         {
            title: " Teacher Hierarchy Register",
            path: "/AvinRegister",
            icon: <AiIcons.AiOutlineMoneyCollect />,
            cName: "nav-text01",
            child: "",
         },
         {
            title: "Employee Hierarchy",
            path: "/Orghierarchy",
            icon: <AiIcons.AiOutlineMoneyCollect />,
            cName: "nav-text01",
            child: "",
         },
         {
            title: "Avinya Faculty Hierarchy",
            path: "/Avinhierarchy",
            icon: <AiIcons.AiOutlineMoneyCollect />,
            cName: "nav-text01",
            child: "",
         },
      ],
   },
   {
      title: "Stationary",
      icon: <AiIcons.AiOutlineAppstore />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: " Stationary Items",
            path: "/StationeryItems",
            icon: <AiIcons.AiOutlineAppstore />,
            cName: "nav-text01",
            child: "",
         },
      ],
   },
];


let SalesSidebar = [

   {
      title: "Customer Sales onboard",
      icon: <ShoppingBasketIcon />,
      path: "/salesonboard-data",
      cName: "navcross",
      child: "",
   },
   // {
   //    title: "Customer Sales onboard",
   //    icon: <ShoppingBasketIcon />,
   //    path: "/customersalesonboard",
   //    cName: "navcross",
   //    child: "",
   // },
   {
      title: "Customer org Mdm",
      icon: < LocationCityIcon />,
      path: "/mdm-data",
      cName: "navcross",
      child: "",
   },
   // {
   //    title: "Customer org Mdm",
   //    icon: < LocationCityIcon />,
   //    path: "/customermdm",
   //    cName: "navcross",
   //    child: "",
   // },
  
  
   {
      title: "Customer Onboard",
      icon: <AssignmentIndIcon />,
      path: "/customeronboard",
      cName: "navcross",
      child: "",
   },
   {
      title: "",
      icon: <AiIcons.AiOutlineClose />,
      path: "#",
      cName: "navcross",
      child: "",
   },
   {
      title: "Dashboard",
      path: "/",
      icon: <MdIcons.MdDashboard />,
      cName: "nav-text01",
      child: "",
   },

   // {
   //    title: "Questions",
   //    icon: <IoIosPaper />,
   //    cName: "nav-text-dropdown",
   //    child: [
   //       {
   //          title: "Question Papers",
   //          path: "/all-questions",

   //          cName: "nav-text01",
   //          child: "",
   //       },
   //       {
   //          title: "Add questions",
   //          path: "/addquestion",

   //          cName: "nav-text01",
   //          child: "",
   //       },
   //       {
   //          title: "View questions",
   //          path: "/viewquestion",

   //          cName: "nav-text01",
   //          child: "",
   //       },

   //    ],
   // },

   {
      title: "EmailService",
      path: "/emails",
      icon: <MdIcons.MdEmail />,
      cName: "nav-text01",
      child: "",
   },

   // {
   //    title: "Roles",
   //    icon: <MdIcons.MdEmail />,
   //    cName: "nav-text01",
   //    child: [
   //       {
   //          title: "Created Role",
   //          path: "/rolesdata",

   //          cName: "nav-text01",
   //          child: "",

   //       },
   //       {
   //          title: "Allocated Roles",
   //          path: "/deatiled roles",

   //          cName: "nav-text01",
   //          child: "",

   //       }
   //    ],
   // },

   {
      title: "Festivals",
      path: "/festivals",
      icon: <MdIcons.MdFestival />,
      cName: "nav-text01",
      child: "",
   },
   {
      title: "Holiday details",
      icon: <AiIcons.AiOutlineStar />,
      // path: "/holidayform",
      cName: "navcross",
      child: [
         // {
         //    title: "Add Holiday",
         //    path: "/holidayform",
         //    cName: "navcross",
         //    child: "",
         // },
         {
            title: "Holiday Details",
            path: "/holidays",
            cName: "navcross",
            child: "",
         },
      ],
   },
   {
      title: "Stores",
      path: "/assets",
      icon: <MdIcons.MdAccessibility />,
      cName: "nav-text01",
      child: "",
   },
   {
      title: "Policy",
      icon: <GoIcons.GoUnverified />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: "Terms Of Use",
            path: "/shikshakpro/terms-of-use",
            icon: <GoIcons.GoUnverified />,
            cName: "nav-text01",
            child: "",
         },
         {
            title: "Payment Policy",
            path: "/shikshakpro/payment-refund-policy",
            icon: <GoIcons.GoUnverified />,
            cName: "nav-text01",
            child: "",
         },
         {
            title: "Privacy Policy",
            path: "/shikshakpro/privacy-policy",
            icon: <GoIcons.GoUnverified />,
            cName: "nav-text01",
            child: "",
         },
      ],
   },
   // {
   //    title: "Policy",
   //    path: "/superAdminPolicy",
   //    icon: <GoIcons.GoUnverified />,
   //    cName: "nav-text01",
   //    child: "",
   // },
   {
      title: "Passwords",
      icon: <AiIcons.AiFillFolder />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: "User Passwords",
            path: "/userPasswordManage",
            icon: <AiIcons.AiFillFilePdf />,
            cName: "nav-text01",
            child: "",
         },
         {
            title: "Org Passwords",
            path: "/orgPasswordManage",
            icon: <AiIcons.AiFillFilePdf />,
            cName: "nav-text01",
            child: "",
         },
         // {
         //    title: "Password Requests",
         //    path: "/orgPasswordAccess",
         //    icon: <AiIcons.AiFillFilePdf />,
         //    cName: "nav-text01",
         //    child: "",
         // },
         // {
         //    title: "All",
         //    path: "/orgPasswordAccessAll",
         //    icon: <AiIcons.AiFillFilePdf />,
         //    cName: "nav-text01",
         //    child: "",
         // },
      ],
   },
   // {
   //    title: "Homepage Card",
   //    path: "/superAdminHomepageCard",
   //    icon: <AiIcons.AiFillIdcard />,
   //    cName: "nav-text01",
   //    child: "",
   // },
   // {
   //    title: "Members",
   //    icon: <IoIcons.IoIosPeople />,
   //    cName: "nav-text-dropdown",
   //    child: [
   //       {
   //          title: "Admin",
   //          path: "/SuperAdmin",
   //          icon: <IoIcons.IoIosArrowDropright />,
   //          cName: "nav-text-dropdown-holder",
   //          child: "",
   //       },
   //       {
   //          title: "Faculties",
   //          path: "/superAdminFaculty",
   //          icon: <IoIcons.IoIosArrowDropright />,
   //          cName: "nav-text-dropdown-holder",
   //          child: "",
   //       },
   //       {
   //          title: "FailedReg Users",
   //          path: "/superAdminNonRegUser",
   //          icon: <IoIcons.IoIosArrowDropright />,
   //          cName: "nav-text-dropdown-holder",
   //          child: "",
   //       },
   //       {
   //          title: "Member Status",
   //          path: "/superAdminMembersStatus",
   //          icon: <IoIcons.IoIosArrowDropright />,
   //          cName: "nav-text-dropdown-holder",
   //          child: "",
   //       },
   //       {
   //          title: "Students",
   //          path: "/superAdminStudents",
   //          icon: <IoIcons.IoIosArrowDropright />,
   //          cName: "nav-text-dropdown-holder",
   //          child: "",
   //       },
   //       {
   //          title: "Users",
   //          path: "/superAdminUser",
   //          icon: <IoIcons.IoIosArrowDropright />,
   //          cName: "nav-text-dropdown-holder",
   //          child: "",
   //       },
   //    ],
   // },
   {
      title: "Employee Exit",
      icon: <GiExitDoor />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: "Exit from Organization",
            path: "/empexit",
            icon: <GiExitDoor />,
            cName: "initiate-exit",
            child: "",
         },
         // {
         //    title: "Exit overview",
         //    path: "/exitdetails",
         //    icon: <GiExitDoor />,
         //    cName: "initiate-exit",
         //    child: "",
         // },
         {
            title: "Employee Exit Dashboard",
            path: "/exitdashboard",
            icon: <RiDashboardLine />,
            cName: "dashboard",
            child: "",
         },
      ],
   },
   {
      title: "Org Hierarchy",
      icon: <AiIcons.AiOutlineMoneyCollect />,
      cName: "nav-text-dropdown",
      child: [
         // {
         //    title: " C4e Hierarchy Registration",
         //    path: "/OrgRegister",
         //    icon: <AiIcons.AiOutlineMoneyCollect />,
         //    cName: "nav-text01",
         //    child: "",
         // },
         // {
         //    title: " Teacher Hierarchy Registration",
         //    path: "/AvinRegister",
         //    icon: <AiIcons.AiOutlineMoneyCollect />,
         //    cName: "nav-text01",
         //    child: "",
         // },
         {
            title: "Employee Hierarchy",
            path: "/Orghierarchy",
            icon: <AiIcons.AiOutlineMoneyCollect />,
            cName: "nav-text01",
            child: "",
         },
         {
            title: "Avinya Faculty Hierarchy",
            path: "/Avinhierarchy",
            icon: <AiIcons.AiOutlineMoneyCollect />,
            cName: "nav-text01",
            child: "",
         },
      ],
   },
   // {
   //    title: "Jobs",
   //    icon: <MdIcons.MdWork />,
   //    cName: "nav-text-dropdown",
   //    child: [
   //       {
   //          title: "Admin",
   //          path: "/superAdminJob",
   //          icon: <IoIcons.IoIosArrowDropright />,
   //          cName: "nav-text-dropdown-holder",
   //          child: "",
   //       },
   //       {
   //          title: "Employee",
   //          path: "/superAdminFacultyJobs",
   //          icon: <IoIcons.IoIosArrowDropright />,
   //          cName: "nav-text-dropdown-holder",
   //          child: "",
   //       },
   //       {
   //          title: "View Jobs",
   //          path: "/jobstatus",
   //          icon: <IoIcons.IoIosArrowDropright />,
   //          cName: "nav-text-dropdown-holder",
   //          child: "",
   //       },
   //       {
   //          title: "Add Designation",
   //          path: "/create-job",
   //          icon: <IoIcons.IoIosArrowDropright />,
   //          cName: "nav-text-dropdown-holder",
   //          child: "",
   //       },
   //       {
   //          title: "Add Job",
   //          path: "/add-job",
   //          icon: <IoIcons.IoIosArrowDropright />,
   //          cName: "nav-text-dropdown-holder",
   //          child: "",
   //       },
   //    ],
   // },
   // {
   //    title: "My Account",
   //    icon: <AiIcons.AiOutlineUser />,
   //    cName: "nav-text-dropdown",
   //    child: [
   //       {
   //          title: "Profile",
   //          path: "/facultyProfile",
   //          icon: <AiIcons.AiFillProfile />,
   //          cName: "nav-text01",
   //          child: "",
   //       },
   //       {
   //          title: "Change Password",
   //          path: "/changePassword",
   //          icon: <AiIcons.AiOutlineLock />,
   //          cName: "nav-text01",
   //          child: "",
   //       },
   //    ],
   // },

   // {
   //    title: "Id Card",
   //    icon: <AiIcons.AiFillIdcard />,
   //    cName: "nav-text-dropdown",
   //    child: [
   //       {
   //          title: "Employee",
   //          path: "/superAdminIDCards",
   //          icon: <IoIcons.IoMdCard />,
   //          cName: "nav-text01",
   //          child: "",
   //       },
   //       {
   //          title: "Student",
   //          path: "/superAdminStudentIdCard",
   //          icon: <IoIcons.IoMdCard />,
   //          cName: "nav-text01",
   //          child: "",
   //       },
   //    ],
   // },


   // {
   //    title: "Courses",
   //    path: "/superAdminCourses",
   //    icon: <IoIcons.IoIosBook />,
   //    cName: "nav-text01",
   //    child: "",
   // },
   // {
   //    title: "Classroom",
   //    icon: <AiIcons.AiOutlineRobot />,
   //    cName: "nav-text-dropdown",
   //    child: [
   //       {
   //          title: "Courses Enrolled",
   //          path: "/superAdminCoursesEnrolled",
   //          icon: <AiIcons.AiOutlineInsurance />,
   //          cName: "nav-text01",
   //          child: "",
   //       },
   //       {
   //          title: "Marks",
   //          path: "/superAdminMarks",
   //          icon: <AiIcons.AiOutlineBook />,
   //          cName: "nav-text01",
   //          child: "",
   //       },
   //       {
   //          title: "Timetables",
   //          path: "/superAdminTimeTable",
   //          icon: <AiIcons.AiFillClockCircle />,
   //          cName: "nav-text01",
   //          child: "",
   //       },
   //    ],
   // },
   {
      title: "Files",
      icon: <AiIcons.AiFillFolder />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: "Documents",
            path: "/adminDocumentsAPI",
            icon: <AiIcons.AiFillFolder />,
            cName: "nav-text01",
            child: "",
         },
         // {
         //    title: "Office Documents",
         //    path: "/superAdminOfficeDocumentAPI",
         //    icon: <AiIcons.AiFillFolder />,
         //    cName: "nav-text01",
         //    child: "",
         // },
      ],
   },
   {
      title: "Enrollments ",
      icon: <IoIcons.IoMdLogIn />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: "ALL",
            path: "/superAdminEnrollments",
            icon: <IoIcons.IoIosArrowDropright />,
            cName: "nav-text-dropdown-holder",
            child: "",
         },
         {
            title: "Applied",
            path: "/superAdminEnrollmentsApplied",
            icon: <IoIcons.IoIosArrowDropright />,
            cName: "nav-text-dropdown-holder",
            child: "",
         },
         {
            title: "Accepted",
            path: "/superAdminEnrollmentsAccepted",
            icon: <IoIcons.IoIosArrowDropright />,
            cName: "nav-text-dropdown-holder",
            child: "",
         },
         {
            title: "Completed",
            path: "/superAdminEnrollmentsCompleted",
            icon: <IoIcons.IoIosArrowDropright />,
            cName: "nav-text-dropdown-holder",
            child: "",
         },
      ],
   },
   {
      title: "Finance",
      icon: <AiIcons.AiOutlineMoneyCollect />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: "Expenses",
            path: "/adminExpenseAPI",
            icon: <AiIcons.AiOutlineMoneyCollect />,
            cName: "nav-text01",
            child: "",
         },
         // {
         //    title: "Invoice",
         //    path: "/superAdminInvoice",
         //    icon: <AiIcons.AiOutlineBook />,
         //    cName: "nav-text01",
         //    child: "",
         // },
      ],
   },
   {
      title: "Stationary",
      icon: <AiIcons.AiOutlineAppstore />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: " Stationary Items",
            path: "/StationeryItems",
            icon: <AiIcons.AiOutlineAppstore />,
            cName: "nav-text01",
            child: "",
         },
      ],
   },

   // {
   //    title: "Server Stats",
   //    path: "/superAdminGraph",
   //    icon: <IoIcons.IoMdStats />,
   //    cName: "nav-text01",
   //    child: "",
   // },
   // {
   // title: "HomePage Cards",
   // path: "/superAdminHomepageCards",
   // icon: <GoIcons.GoUnverified/>,
   // cName: "nav-text01",
   // child: "",
   // },

   // {
   //    title: "Queries",
   //    path: "/superAdminQueryAPI",
   //    icon: <AiIcons.AiOutlineQuestionCircle />,
   //    cName: "nav-text01",
   //    child: "",
   // },
];

let StudentSidebar = [
   {
      title: "",
      icon: <AiIcons.AiOutlineClose />,
      path: "#",
      child: "",
   },
   {
      title: "EmailService",
      path: "/emails",
      icon: <MdIcons.MdEmail />,
      cName: "nav-text01",
      child: "",
   },
   {
      title: "Festivals",
      path: "/festivals",
      icon: <MdIcons.MdFestival />,
      cName: "nav-text01",
      child: "",
   },
   {
      title: "Dashboard",
      path: "/",
      icon: <MdIcons.MdDashboard />,
      cName: "nav-text01",
      child: "",
   },
   {
      title: "Policy",
      path: "/studentPolicy",
      icon: <GoIcons.GoUnverified />,
      cName: "nav-text01",
      child: "",
   },

   {
      title: "My Account",
      icon: <AiIcons.AiOutlineUser />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: "Profile",
            path: "/studentProfile",
            icon: <AiIcons.AiOutlineUser />,
            cName: "nav-text01",
            child: "",
         },
         {
            title: "Change Password",
            path: "/changepassword",
            icon: <AiIcons.AiFillLock />,
            cName: "nav-text01",
            child: "",
         },
      ],
   },

   {
      title: "Classroom",
      icon: <AiIcons.AiOutlineRobot />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: "Marks",
            path: "/studentMarksAPI",
            icon: <AiIcons.AiFillTrophy />,
            cName: "nav-text01",
            child: "",
         },
         {
            title: "Timetable",
            path: "/studentTimetable",
            icon: <AiIcons.AiFillClockCircle />,
            cName: "nav-text01",
            child: "",
         },
         {
            title: "Performance Graph",
            path: "/studentGraph",
            icon: <AiIcons.AiFillSignal />,
            cName: "nav-text01",
            child: "",
         },
      ],
   },
   {
      title: "Files",
      icon: <AiIcons.AiFillFolder />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: "Documents",
            path: "/StudentDocumentsAPI",
            icon: <AiIcons.AiFillFilePdf />,
            cName: "nav-text01",
            child: "",
         },
      ],
   },
];

let SuperAdminSidebar = [
   {
      title: "",
      icon: <AiIcons.AiOutlineClose />,
      path: "#",
      cName: "navcross",
      child: "",
   },
   
   {
      title: "Dashboard",
      path: "/",
      icon: <MdIcons.MdDashboard />,
      cName: "nav-text01",
      child: "",
   },
   // {
   //    title: "Upload Images",
   //    path: "/upload-image",
   //    icon: <MdIcons.MdDashboard />,
   //    cName: "nav-text01",
   //    child: "",
   // },
   // {
   //    title: "Update Images",
   //    path: "/update-image",
   //    icon: <MdIcons.MdDashboard />,
   //    cName: "nav-text01",
   //    child: "",
   // },
   {
      title: "Dashboard Details",
      path: "/dashboard-details",
      icon: <MdIcons.MdDashboard />,
      cName: "nav-text01",
      child: "",
   },
   {
      title: "Internal Jobs",
      path: "/internal-job",
      icon: <MdIcons.MdDashboard />,
      cName: "nav-text01",
      child: "",
   },

   {
      title: "Questions",
      icon: <IoIosPaper />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: "Question Papers",
            path: "/all-questions",

            cName: "nav-text01",
            child: "",
         },
         {
            title: "Add questions",
            path: "/addquestion",

            cName: "nav-text01",
            child: "",
         },
         {
            title: "View questions",
            path: "/viewquestion",

            cName: "nav-text01",
            child: "",
         },

      ],
   },

   {
      title: "EmailService",
      path: "/emails",
      icon: <MdIcons.MdEmail />,
      cName: "nav-text01",
      child: "",
   },

   {
      title: "Roles",

      icon: <MdIcons.MdEmail />,
      cName: "nav-text01",
      child: [
         // {
         //    title: "Created Role",
         //    path: "/rolesdata",

         //    cName: "nav-text01",
         //    child: "",

         // },
         {
            title: "Allocated Roles",
            path: "/deatiled roles",

            cName: "nav-text01",
            child: "",

         }
      ],
   },

   {
      title: "Festivals",
      path: "/festivals",
      icon: <MdIcons.MdFestival />,
      cName: "nav-text01",
      child: "",
   },
   {
      title: "Holiday details",
      icon: <AiIcons.AiOutlineStar />,
      // path: "/holidayform",
      cName: "navcross",
      child: [
         {
            title: "Add Holiday",
            path: "/holidayform",
            cName: "navcross",
            child: "",
         },
         {
            title: "Holiday Details",
            path: "/holidays",
            cName: "navcross",
            child: "",
         },
      ],
   },
   {
      title: "Stores",
      path: "/assets",
      icon: <MdIcons.MdAccessibility />,
      cName: "nav-text01",
      child: "",
   },
   {
      title: "Policy",
      icon: <GoIcons.GoUnverified />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: "Terms Of Use",
            path: "/shikshakpro/terms-of-use",
            icon: <GoIcons.GoUnverified />,
            cName: "nav-text01",
            child: "",
         },
         {
            title: "Payment Policy",
            path: "/shikshakpro/payment-refund-policy",
            icon: <GoIcons.GoUnverified />,
            cName: "nav-text01",
            child: "",
         },
         {
            title: "Privacy Policy",
            path: "/shikshakpro/privacy-policy",
            icon: <GoIcons.GoUnverified />,
            cName: "nav-text01",
            child: "",
         },
      ],
   },
   // {
   //    title: "Policy",
   //    path: "/superAdminPolicy",
   //    icon: <GoIcons.GoUnverified />,
   //    cName: "nav-text01",
   //    child: "",
   // },
   {
      title: "Passwords",
      icon: <AiIcons.AiFillFolder />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: "User Passwords",
            path: "/userPasswordManage",
            icon: <AiIcons.AiFillFilePdf />,
            cName: "nav-text01",
            child: "",
         },
         {
            title: "Org Passwords",
            path: "/orgPasswordManage",
            icon: <AiIcons.AiFillFilePdf />,
            cName: "nav-text01",
            child: "",
         },
         {
            title: "Password Requests",
            path: "/orgPasswordAccess",
            icon: <AiIcons.AiFillFilePdf />,
            cName: "nav-text01",
            child: "",
         },
         {
            title: "All",
            path: "/orgPasswordAccessAll",
            icon: <AiIcons.AiFillFilePdf />,
            cName: "nav-text01",
            child: "",
         },
      ],
   },
   {
      title: "Homepage Card",
      path: "/superAdminHomepageCard",
      icon: <AiIcons.AiFillIdcard />,
      cName: "nav-text01",
      child: "",
   },
   {
      title: "Members",
      icon: <IoIcons.IoIosPeople />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: "Admin",
            path: "/SuperAdmin",
            icon: <IoIcons.IoIosArrowDropright />,
            cName: "nav-text-dropdown-holder",
            child: "",
         },
         {
            title: "Faculties",
            path: "/superAdminFaculty",
            icon: <IoIcons.IoIosArrowDropright />,
            cName: "nav-text-dropdown-holder",
            child: "",
         },
         {
            title: "FailedReg Users",
            path: "/superAdminNonRegUser",
            icon: <IoIcons.IoIosArrowDropright />,
            cName: "nav-text-dropdown-holder",
            child: "",
         },
         {
            title: "Member Status",
            path: "/superAdminMembersStatus",
            icon: <IoIcons.IoIosArrowDropright />,
            cName: "nav-text-dropdown-holder",
            child: "",
         },
         {
            title: "Students",
            path: "/superAdminStudents",
            icon: <IoIcons.IoIosArrowDropright />,
            cName: "nav-text-dropdown-holder",
            child: "",
         },
         {
            title: "Users",
            path: "/superAdminUser",
            icon: <IoIcons.IoIosArrowDropright />,
            cName: "nav-text-dropdown-holder",
            child: "",
         },
      ],
   },
   {
      title: "Employee Exit",
      icon: <GiExitDoor />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: "Exit from Organization",
            path: "/empexit",
            icon: <GiExitDoor />,
            cName: "initiate-exit",
            child: "",
         },
         {
            title: "Exit overview",
            path: "/exitdetails",
            icon: <GiExitDoor />,
            cName: "initiate-exit",
            child: "",
         },
         {
            title: "Employee Exit Dashboard",
            path: "/exitdashboard",
            icon: <RiDashboardLine />,
            cName: "dashboard",
            child: "",
         },
      ],
   },
   {
      title: "Org Hierarchy",
      icon: <AiIcons.AiOutlineMoneyCollect />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: " C4e Hierarchy Registration",
            path: "/OrgRegister",
            icon: <AiIcons.AiOutlineMoneyCollect />,
            cName: "nav-text01",
            child: "",
         },
         {
            title: " Teacher Hierarchy Registration",
            path: "/AvinRegister",
            icon: <AiIcons.AiOutlineMoneyCollect />,
            cName: "nav-text01",
            child: "",
         },
         {
            title: "Employee Hierarchy",
            path: "/Orghierarchy",
            icon: <AiIcons.AiOutlineMoneyCollect />,
            cName: "nav-text01",
            child: "",
         },
         {
            title: "Avinya Faculty Hierarchy",
            path: "/Avinhierarchy",
            icon: <AiIcons.AiOutlineMoneyCollect />,
            cName: "nav-text01",
            child: "",
         },
      ],
   },
   {
      title: "Jobs",
      icon: <MdIcons.MdWork />,
      cName: "nav-text-dropdown",
      child: [
         // {
         //    title: "Admin",
         //    path: "/superAdminJob",
         //    icon: <IoIcons.IoIosArrowDropright />,
         //    cName: "nav-text-dropdown-holder",
         //    child: "",
         // },
         // {
         //    title: "Employee",
         //    path: "/superAdminFacultyJobs",
         //    icon: <IoIcons.IoIosArrowDropright />,
         //    cName: "nav-text-dropdown-holder",
         //    child: "",
         // },
         {
            title: "View Jobs",
            path: "/jobstatus",
            icon: <IoIcons.IoIosArrowDropright />,
            cName: "nav-text-dropdown-holder",
            child: "",
         },
         {
            title: "Add Designation",
            path: "/create-job",
            icon: <IoIcons.IoIosArrowDropright />,
            cName: "nav-text-dropdown-holder",
            child: "",
         },
         {
            title: "Add Job",
            path: "/add-job",
            icon: <IoIcons.IoIosArrowDropright />,
            cName: "nav-text-dropdown-holder",
            child: "",
         },
      ],
   },
   {
      title: "My Account",
      icon: <AiIcons.AiOutlineUser />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: "Profile",
            path: "/superAdminProfile",
            icon: <AiIcons.AiFillProfile />,
            cName: "nav-text01",
            child: "",
         },
         {
            title: "Change Password",
            path: "/superAdminChangePassword",
            icon: <AiIcons.AiOutlineLock />,
            cName: "nav-text01",
            child: "",
         },
      ],
   },

   {
      title: "Id Card",
      icon: <AiIcons.AiFillIdcard />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: "Employee",
            path: "/superAdminIDCards",
            icon: <IoIcons.IoMdCard />,
            cName: "nav-text01",
            child: "",
         },
         {
            title: "Student",
            path: "/superAdminStudentIdCard",
            icon: <IoIcons.IoMdCard />,
            cName: "nav-text01",
            child: "",
         },
      ],
   },


   {
      title: "Courses",
      path: "/superAdminCourses",
      icon: <IoIcons.IoIosBook />,
      cName: "nav-text01",
      child: "",
   },
   {
      title: "Classroom",
      icon: <AiIcons.AiOutlineRobot />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: "Courses Enrolled",
            path: "/superAdminCoursesEnrolled",
            icon: <AiIcons.AiOutlineInsurance />,
            cName: "nav-text01",
            child: "",
         },
         {
            title: "Marks",
            path: "/superAdminMarks",
            icon: <AiIcons.AiOutlineBook />,
            cName: "nav-text01",
            child: "",
         },
         {
            title: "Timetables",
            path: "/superAdminTimeTable",
            icon: <AiIcons.AiFillClockCircle />,
            cName: "nav-text01",
            child: "",
         },
      ],
   },
   {
      title: "Files",
      icon: <AiIcons.AiFillFolder />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: "Documents",
            path: "/superAdminDocumentsAPI",
            icon: <AiIcons.AiFillFolder />,
            cName: "nav-text01",
            child: "",
         },
         {
            title: "Office Documents",
            path: "/superAdminOfficeDocumentAPI",
            icon: <AiIcons.AiFillFolder />,
            cName: "nav-text01",
            child: "",
         },
      ],
   },
   {
      title: "Enrollments ",
      icon: <IoIcons.IoMdLogIn />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: "ALL",
            path: "/superAdminEnrollments",
            icon: <IoIcons.IoIosArrowDropright />,
            cName: "nav-text-dropdown-holder",
            child: "",
         },
         {
            title: "Applied",
            path: "/superAdminEnrollmentsApplied",
            icon: <IoIcons.IoIosArrowDropright />,
            cName: "nav-text-dropdown-holder",
            child: "",
         },
         {
            title: "Accepted",
            path: "/superAdminEnrollmentsAccepted",
            icon: <IoIcons.IoIosArrowDropright />,
            cName: "nav-text-dropdown-holder",
            child: "",
         },
         {
            title: "Completed",
            path: "/superAdminEnrollmentsCompleted",
            icon: <IoIcons.IoIosArrowDropright />,
            cName: "nav-text-dropdown-holder",
            child: "",
         },
      ],
   },
   {
      title: "Finance",
      icon: <AiIcons.AiOutlineMoneyCollect />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: "Expenses",
            path: "/superAdminExpenseAPI",
            icon: <AiIcons.AiOutlineMoneyCollect />,
            cName: "nav-text01",
            child: "",
         },
         {
            title: "Invoice",
            path: "/superAdminInvoice",
            icon: <AiIcons.AiOutlineBook />,
            cName: "nav-text01",
            child: "",
         },
      ],
   },
   {
      title: "Stationary",
      icon: <AiIcons.AiOutlineAppstore />,
      cName: "nav-text-dropdown",
      child: [
         {
            title: " Stationary Items",
            path: "/StationeryItems",
            icon: <AiIcons.AiOutlineAppstore />,
            cName: "nav-text01",
            child: "",
         },
      ],
   },

   {
      title: "Server Stats",
      path: "/superAdminGraph",
      icon: <IoIcons.IoMdStats />,
      cName: "nav-text01",
      child: "",
   },
   // {
   // title: "HomePage Cards",
   // path: "/superAdminHomepageCards",
   // icon: <GoIcons.GoUnverified/>,
   // cName: "nav-text01",
   // child: "",
   // },

   {
      title: "Queries",
      path: "/superAdminQueryAPI",
      icon: <AiIcons.AiOutlineQuestionCircle />,
      cName: "nav-text01",
      child: "",
   },
];



SuperAdminSidebar.sort(GetSortOrder("title"));
StudentSidebar.sort(GetSortOrder("title"));
SalesSidebar.sort(GetSortOrder("title"));
FinanceSidebar.sort(GetSortOrder("title"));
TechSidebar.sort(GetSortOrder("title"));
HrSidebar.sort(GetSortOrder("title"));
Sidebar.sort(GetSortOrder("title"));

if (sessiondetails.userType === "superadmin") {
   Data = SuperAdminSidebar;
}
else if (departdetails === "TECHNICAL") {
   Data = TechSidebar;
}
else if (sessiondetails.userType === "student") {
   Data = StudentSidebar;
}
else if (departdetails === "SALES") {
   Data = SalesSidebar;
}
else if (departdetails === "HR") {
   Data = HrSidebar;
}
else if (departdetails === "FINANCE") {
   Data = FinanceSidebar;
}
else if (sessiondetails.userType === "user") {
   Data = Sidebar;
}

export const SidebarData = Data;