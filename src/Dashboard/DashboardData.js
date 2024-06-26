
import AboutUsImg from "./DashboardImages/AboutUs1.jpg";
import HomeImg from "./DashboardImages/Home1.jpg";
import JobsImg from "./DashboardImages/Jobs1.jpg";
import ContactUsImg from "./DashboardImages/ContactUs.jpg";
import AdminImg from "./DashboardImages/Admin.jpg";
import StudentsImg from "./DashboardImages/Students.jpg";
import EmployeeImg from "./DashboardImages/Employee.jpg";
import ChangePasswordImg from "./DashboardImages/Password1.jpg";
import CoursesEnrolledImg from "./DashboardImages/CoursesEnrolled.jpg";
import MarksImg from "./DashboardImages/Marks3.jpg";
import TimeTablesImg from "./DashboardImages/TimeTable.jpg";
import DocumentsImg from "./DashboardImages/Documents.jpg";
import OfficeDocumentsImg from "./DashboardImages/OfficeDocuments.jpg";
import EnrollmentsImg from "./DashboardImages/Enrollments.jpg";
import ExpensesImg from "./DashboardImages/Expenses1.jpg";
import InvoiceImg from "./DashboardImages/Invoice.jpg";
import AssetsImg from "./DashboardImages/assets.jpg";
import QueriesImg from "./DashboardImages/queries.jpg";
import ApplyForAdminImg from "./DashboardImages/Applyforadmin.jpg";
import PerformanceGraphImg from "./DashboardImages/PerformanceGraph1.jpg";
import ServerStatsImg from "./DashboardImages/ServerStats.jpg";
import Courses3Img from "./DashboardImages/Courses3.jpg";
import ProfileImg from "./DashboardImages/Profile1.jpg";
import PolicyImg from './DashboardImages/Policy.jpg';


var sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));


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

let Dashboard = [
  {
    title: "",
    path: "#",

    image: "",
  },
  {
    title: "Home",
    path: "/userhome",

    image: HomeImg,
  },
  {
    title: "About",
    path: "/about",

    image: AboutUsImg,
  },
  {
    title: "Courses",
    path: "/usercourses",

    image: Courses3Img,
  },
  {
    title: "Jobs",
    path: "/userjob",

    image: JobsImg,
  },
  {
    title: "Contact Us",
    path: "/contact",

    image: ContactUsImg,
  },
];


let AdminDashboard = [
  {
    title: "",
    path: "#",

    image: "",
  },
  {
    title: "Policy",
    path: "/adminPolicy",

    image: PolicyImg,
  },
 
  {
    title: "Admin Jobs",
    path: "/adminJobs",
    image: AdminImg,
  },
  {
    title: "Faculty Jobs",
    path: "/facultyJobs",

    image: EmployeeImg,
  },

  {
    title: "Profile",
    path: "/adminprofile",

    image: ProfileImg,
  },


  {
    title: "Courses",
    path: "/courses",

    image: Courses3Img,
  },

 
  {
    title: "Marks",
    path: "/marks",

    image: MarksImg,
  },
  {
    title: "Timetables",
    path: "/timetable",

    image: TimeTablesImg,
  },

  {
    title: "Documents",
    path: "/adminDocumentsAPI",

    image: DocumentsImg,
  },
  {
    title: "Office Docs",
    path: "adminofficeDocumentsAPI",

    image: OfficeDocumentsImg,
  },

  {
    title: "Enrollments",
    path: "/adminenrollments",

    image: EnrollmentsImg,
  },
  
  {
    title: "Expenses",
    path: "/adminExpenseAPI",

    image: ExpensesImg,
  },
  {
    title: "Invoice",
    path: "/invoice",

    image: InvoiceImg,
  },
  {
    title: "Store",
    path: "/assets",

    image: AssetsImg,
  },

  {
    title: "Queries",
    path: "/queries",

    image: QueriesImg,
  },
];



let FacultyDashboard = [
  {
    title: "",

    image: "",
  },

  {
    title: "Store",
    path: "/assets",

    image: AssetsImg,
  },
  {
    title: "Policy",
    path: "/facultyPolicy",

    image: PolicyImg,
  },
  
  {
    title: "Profile",
    path: "/facultyProfile",

    image: ProfileImg,
  },
  {
    title: "Change Password",
    path: "/changePassword",

    image: ChangePasswordImg,
  },

  {
    title: "Marks",
    path: "/facultyMarks",
    image: MarksImg,
  },
  {
    title: "Timetable",
    path: "/facultyTimeTable",

    image: TimeTablesImg,
  },
  {
    title: "Students",
    path: "/facultyStudentAPI",

    image: StudentsImg,
  },
  {
    title: "Courses Enrolled",
    path: "/facultyCourseEnrolled",

    image: CoursesEnrolledImg,
  },

  
  {
    title: "Documents",
    path: "/facultydocuments",

    image: OfficeDocumentsImg,
  },

  {
    title: "Expenses",
    path: "/facultyExpenseAPI",

    image: ExpensesImg,
  },
];


let StudentDashboard = [
  {
    title: "",

    path: "#",

    image: "",
  },
  
  {
    title: "Profile",
    path: "/studentProfile",

    image: ProfileImg,
  },
  {
    title: "Policy",
    path: "/studentPolicy",

    image: PolicyImg,
  },
  {
    title: "Change Password",
    path: "/changepassword",

    image: ChangePasswordImg,
  },

  {
    title: "Marks",
    path: "/studentMarksAPI",

    image: MarksImg,
  },
  {
    title: "Timetable",
    path: "/studentTimetable",

    image: TimeTablesImg,
  },
  {
    title: "Performance Graph",
    path: "/studentGraph",

    image: PerformanceGraphImg,
  },

  {
    title: "Documents",
    path: "/StudentDocumentsAPI",

    image: DocumentsImg,
  },
];

let SuperAdminDashboard = [
  {
    title: "",

    path: "#",

    image: "",
  },

  // {
  //   title: "Admins",
  //   path: "/SuperAdmin",

  //   image: AdminImg,
  // },
  // {
  //   title: "Faculties",
  //   path: "/superAdminFaculty",

  //   image: FacultiesImg,
  // },
  // {
  //   title: "Failed Registration Users",
  //   path: "/superAdminNonRegUser",

  //   image: FailedRegUsersImg,
  // },
  // {
  //   title: "Member Status",
  //   path: "/superAdminMembersStatus",

  //   image: MemberStatusImg,
  // },
  // {
  //   title: "Students",
  //   path: "/superAdminStudents",

  //   image: StudentsImg,
  // },
  // {
  //   title: "Users",
  //   path: "/superAdminUser",

  //   image: UsersImg,
  // },

  {
    title: "Admin Jobs",
    path: "/superAdminJob",

    image: ApplyForAdminImg,
  },
  {
    title: "Faculty Jobs",
    path: "/superAdminFacultyJobs",

    image: EmployeeImg,
  },

  {
    title: "Profile",
    path: "/superAdminProfile",

    image: ProfileImg,
  },
  // {
  //   title: "Change Password",
  //   path: "/superAdminChangePassword",

  //   image: ChangePasswordImg,
  // },

  {
    title: "Courses",
    path: "/superAdminCourses",

    image: Courses3Img,
  },
  {
    title: "Policy",
    path: "/superAdminPolicy",

    image: PolicyImg,
  },

  // {
  //   title: "Courses Enrolled",
  //   path: "/superAdminCoursesEnrolled",

  //   image: CoursesEnrolledImg,
  // },
  {
    title: "Marks",
    path: "/superAdminMarks",

    image: MarksImg,
  },
  {
    title: "Timetables",
    path: "/superAdminTimeTable",

    image: TimeTablesImg,
  },

  {
    title: "Documents",
    path: "/superAdminDocumentsAPI",

    image: DocumentsImg,
  },
  {
    title: "Office Docs",
    path: "/superAdminOfficeDocumentAPI",

    image: OfficeDocumentsImg,
  },

  // {
  //     title: "Enrollments ",

  //     image: '',
  // },
  {
    title: "Enrollments",
    path: "/superAdminEnrollments",
    image: EnrollmentsImg,
  },
  // {
  //   title: "Applied Enrollments",
  //   path: "/superAdminEnrollmentsApplied",
  //   image: AppliedImg,
  // },
  // {
  //   title: "Accepted Enrollements",
  //   path: "/superAdminEnrollmentsAccepted",

  //   image: AcceptedImg,
  // },
  // {
  //   title: "Completed Enrollments",
  //   path: "/superAdminEnrollmentsCompleted",

  //   image: CompletedImg,
  // },

  // {
  //     title: "Finance",

  //     image: '',
  // },
  {
    title: "Expenses",
    path: "/superAdminExpenseAPI",

    image: ExpensesImg,
  },
  {
    title: "Invoice",
    path: "/superAdminInvoice",

    image: InvoiceImg,
  },
  {
    title: "Store",
    path: "/assets",

    image: AssetsImg,
  },

  {
    title: "Server Stats",
    path: "/superAdminGraph",

    image: ServerStatsImg,
  },

  {
    title: "Queries",
    path: "/superAdminQueryAPI",

    image: QueriesImg,
  },
];

SuperAdminDashboard.sort(GetSortOrder("title"));
StudentDashboard.sort(GetSortOrder("title"));
FacultyDashboard.sort(GetSortOrder("title"));
AdminDashboard.sort(GetSortOrder("title"));
Dashboard.sort(GetSortOrder("title"));

if (sessiondetails.userType == "superadmin") {
  Data = SuperAdminDashboard;
} else if (sessiondetails.userType == "admin") {
  Data = AdminDashboard;
} else if (sessiondetails.userType == "student") {
  Data = StudentDashboard;
} else if (sessiondetails.userType == "employee") {
  Data = FacultyDashboard;
} else if (sessiondetails.userType == "user") {
  Data = Dashboard;
} else if (sessiondetails == "externaluser") {
  Data = [];
}

 export const DashboardData = Data;
// export const DashboardData = StudentDashboard;