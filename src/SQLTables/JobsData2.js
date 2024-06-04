import React from "react";
import axios from 'axios';
import "../CRUDTable.css";
import { Component } from "react";
import { toast } from 'react-toastify';
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import {APIData} from '../Authentication/APIData';
import 'react-toastify/dist/ReactToastify.css';
import CRUDTable, {
  Fields,
  Field,
  // CreateForm,
  UpdateForm,
  DeleteForm,
  Pagination
} from "react-crud-table";
import { Link } from "react-router-dom";
import Loading from "../Loading";
const sessiondetails=JSON.parse(localStorage.getItem("sessiondetails"));
toast.configure()

function returntypebased(){
if(sessiondetails){

  if(sessiondetails.userType==="superadmin")
  {   
      return ( <div>
        <Link to="/addjobs"><div className="Upload"> 
        <FaIcons.FaPlusCircle/>
  
        </div></Link>
      <CRUDTable
         caption="Admin Jobs"
        
        fetchItems={payload => service.fetchItems(payload)}
      >
        <Fields>
          <Field name="course_id" label="Job ID" placeholder="Job ID" />
          <Field name="course_description" label="Job Description" placeholder="Job Description" render={DescriptionRenderer} />
          <Field name="course_type" label="Job Type" placeholder="Job Type" />
          <Field name="course_sub_type" label="Job Sub Type" placeholder="Job Sub Type" />
          <Field name="course_fees" label="salary" placeholder="salary" />
          <Field name="course_duration" label="Job Tenure" placeholder="Job Tenure" />
          <Field name="admin_id" label="Admin ID" placeholder="Admin ID" />
        </Fields>
        {/* <CreateForm
          title="Course Creation"
          message="Create a new Course!"
          trigger={<AiIcons.AiOutlinePlusCircle/>}
          onSubmit={task => service.create(task)}
          submitText="Create"
          validate={values => {
            const errors = {};
                if (!values.course_id) {
              errors.course_id = "Please, provide Course ID";
            }
  
            if (!values.course_description) {
              errors.course_description = "Please, provide Course Description";
            }
  
            if (values.course_type !== "course-academics" && values.course_type !== "course-professional" && values.course_type !== "job" && values.course_type !== "admin") {
              errors.course_type = "Please enter course-academics ";
            }
  
            if (!values.course_sub_type) {
              errors.course_sub_type = "Please, provide Course SubType";
            }
            if (!values.course_fees) {
              errors.course_fees = "Please, provide Course Fees";
            }
            if (!values.course_duration) {
              errors.course_duration = "Please, provide Course Duration";
            }
            if (!values.admin_id) {
              errors.admin_id = "Please, provide Admin ID";
            }
  
  
            return errors;
          }}
        /> */}
  
        <UpdateForm
          title="Course Update Process"
          message="Update Course"
          trigger= {<FaIcons.FaEdit/>}
          onSubmit={task => service.update(task)}
          submitText="Update"
          validate={values => {
            const errors = {};
  
            if (!values.course_id) {
              errors.course_id = "Please, provide Course ID";
            }
  
            if (!values.course_description) {
              errors.course_description = "Please, provide Course Description";
            }
  
            if (!values.course_type) {
              errors.course_type = "Please, provide Course Type";
            }
  
            if (!values.course_sub_type) {
              errors.course_sub_type = "Please, provide Course SubType";
            }
            if (!values.course_fees) {
              errors.course_fees = "Please, provide Course Fees";
            }
            if (!values.course_duration) {
              errors.course_duration = "Please, provide Course Duration";
            }
            if (!values.admin_id) {
              errors.admin_id = "Please, provide Admin ID";
            }
  
  
            return errors;
          }}
        />
        <DeleteForm
          title="Course Delete Process"
          message="Are you sure you want to delete the Course?"
          trigger={<AiIcons.AiFillDelete />}
          onSubmit={task => service.delete(task)}
          submitText="Delete"
          validate={values => {
            const errors = {};
                if (!values.course_id) {
              errors.course_id = "Please, provide Course ID";
            }
  
            if (!values.course_description) {
              errors.course_id = "Please, provide Course Description";
            }
  
            if (!values.course_type) {
              errors.course_type = "Please, provide Course Type";
            }
  
            if (!values.course_sub_type) {
              errors.course_sub_type = "Please, provide Course SubType";
            }
            if (!values.course_fees) {
              errors.course_fees = "Please, provide Course Fees";
            }
            if (!values.course_duration) {
              errors.course_duration = "Please, provide Course Duration";
            }
            if (!values.admin_id) {
              errors.admin_id = "Please, provide Admin ID";
            }
  
            return errors;
          }}
        />
        <Pagination
          itemsPerPage={10}
          activePage = {1}
          fetchTotalOfItems={payload => service.fetchTotal(payload)}
        />
      </CRUDTable>
    </div>)
}
  else if(sessiondetails.userType==="admin")
  {    
      return (<div>
        <Link to="/addjobs"><div className="Upload"> 
        <FaIcons.FaPlusCircle/>
  
        </div></Link>
      <CRUDTable
         caption="Admin Jobs"
        
        fetchItems={payload => service.fetchItems(payload)}
      >
        <Fields>
          <Field name="course_id" label="Job ID" placeholder="Job ID" />
          <Field name="course_description" label="Job Description" placeholder="Job Description" render={DescriptionRenderer} />
          <Field name="course_type" label="Job Type" placeholder="Job Type" />
          <Field name="course_sub_type" label="Job Sub Type" placeholder="Job Sub Type" />
          <Field name="course_fees" label="salary" placeholder="salary" />
          <Field name="course_duration" label="Job Tenure" placeholder="Job Tenure" />
          <Field name="admin_id" label="Admin ID" placeholder="Admin ID" />
        </Fields>
        {/* <CreateForm
          title="Course Creation"
          message="Create a new Course!"
          trigger={<AiIcons.AiOutlinePlusCircle/>}
          onSubmit={task => service.create(task)}
          submitText="Create"
          validate={values => {
            const errors = {};
                if (!values.course_id) {
              errors.course_id = "Please, provide Course ID";
            }
  
            if (!values.course_description) {
              errors.course_description = "Please, provide Course Description";
            }
  
            if (values.course_type !== "course-academics" && values.course_type !== "course-professional" && values.course_type !== "job" && values.course_type !== "admin") {
              errors.course_type = "Please enter course-academics ";
            }
  
            if (!values.course_sub_type) {
              errors.course_sub_type = "Please, provide Course SubType";
            }
            if (!values.course_fees) {
              errors.course_fees = "Please, provide Course Fees";
            }
            if (!values.course_duration) {
              errors.course_duration = "Please, provide Course Duration";
            }
            if (!values.admin_id) {
              errors.admin_id = "Please, provide Admin ID";
            }
  
  
            return errors;
          }}
        /> */}
  
        <UpdateForm
          title="Course Update Process"
          message="Update Course"
          trigger= {<FaIcons.FaEdit/>}
          onSubmit={task => service.update(task)}
          submitText="Update"
          validate={values => {
            const errors = {};
  
            if (!values.course_id) {
              errors.course_id = "Please, provide Course ID";
            }
  
            if (!values.course_description) {
              errors.course_description = "Please, provide Course Description";
            }
  
            if (!values.course_type) {
              errors.course_type = "Please, provide Course Type";
            }
  
            if (!values.course_sub_type) {
              errors.course_sub_type = "Please, provide Course SubType";
            }
            if (!values.course_fees) {
              errors.course_fees = "Please, provide Course Fees";
            }
            if (!values.course_duration) {
              errors.course_duration = "Please, provide Course Duration";
            }
            if (!values.admin_id) {
              errors.admin_id = "Please, provide Admin ID";
            }
  
  
            return errors;
          }}
        />
        <DeleteForm
          title="Course Delete Process"
          message="Are you sure you want to delete the Course?"
          trigger={<AiIcons.AiFillDelete />}
          onSubmit={task => service.delete(task)}
          submitText="Delete"
          validate={values => {
            const errors = {};
                if (!values.course_id) {
              errors.course_id = "Please, provide Course ID";
            }
  
            if (!values.course_description) {
              errors.course_id = "Please, provide Course Description";
            }
  
            if (!values.course_type) {
              errors.course_type = "Please, provide Course Type";
            }
  
            if (!values.course_sub_type) {
              errors.course_sub_type = "Please, provide Course SubType";
            }
            if (!values.course_fees) {
              errors.course_fees = "Please, provide Course Fees";
            }
            if (!values.course_duration) {
              errors.course_duration = "Please, provide Course Duration";
            }
            if (!values.admin_id) {
              errors.admin_id = "Please, provide Admin ID";
            }
  
            return errors;
          }}
        />
        <Pagination
          itemsPerPage={10}
          activePage = {1}
          fetchTotalOfItems={payload => service.fetchTotal(payload)}
        />
      </CRUDTable>
    </div>
    )
}
  else if(sessiondetails.userType==="employee")
  {    
      
}
  else if(sessiondetails.userType==="student")
  {    
      
}
  else if(sessiondetails.userType==="user")
  {    
     
}
  else if(sessiondetails.userType==="externaluser")
  {    
      
}
}}


// Component's Base CSS
//import "./index.css";
const DescriptionRenderer = ({ field }) => <textarea {...field} />;
let tasks = [];
function  getTask(testTask){
  tasks = testTask;
  console.log(tasks);
}
// function Postcourse(AdminCoursesRow){
// axios
//       .post(APIData.api+'courses/', AdminCoursesRow, {headers:APIData.headers})
//       .then(response => {
//         //console.log(response)

//         if(response.data.status.toString().toLowerCase() =="success"){
//           toast(response.data.description)  
//           window.location.reload();
//         }
//         else{        
//           toast(response.data.errorDesc)
//           window.location.reload()
//         }
//       })
//       .catch(error => {
//         toast('Its Time To Grab A Coffee')
//       })
// }

// function deletecourse(AdminCoursesRow){
  
//   const url = APIData.api+'courses/' + AdminCoursesRow.course_id;
//  axios
//   .delete(url,{headers:APIData.headers})     
//   .then(response => {
//     if(response.data.status.toString().toLowerCase() =="success"){
//       toast(response.data.description)  
//       window.location.reload();
//     }
//     else{        
//       toast(response.data.errorDesc)
//     }
//         })
//         .catch(error => {
//           toast("It's Time To Grab To Coffee")
//           window.location.reload()
//         })
        
//   }
const SORTERS = {
  NUMBER_ASCENDING: mapper => (a, b) => mapper(a) - mapper(b),
  NUMBER_DESCENDING: mapper => (a, b) => mapper(b) - mapper(a),
  STRING_ASCENDING: mapper => (a, b) => mapper(a).localeCompare(mapper(b)),
  STRING_DESCENDING: mapper => (a, b) => mapper(b).localeCompare(mapper(a))
};

const getSorter = data => {
  const mapper = x => x[data.field];
  let sorter = SORTERS.STRING_ASCENDING(mapper);

  if (data.field === "course_id") {
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  } 
  else if (data.field === "course_description"){
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }
  else if (data.field === "course_type"){
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }
  else if (data.field === "course_sub_type"){
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }
  else if (data.field === "course_duration"){
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }
  else if (data.field === "admin_id"){
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }
  else {
    sorter =
      data.direction === "ascending"
        ? SORTERS.NUMBER_ASCENDING(mapper)
        : SORTERS.NUMBER_DESCENDING(mapper);
  }

  return sorter;
};

// let count = tasks.length;
// console.log(count);
const service = {
  fetchItems: payload => {
    const { activePage, itemsPerPage } = payload.pagination;
    const start = (activePage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    let result = Array.from(tasks);
    result = result.sort(getSorter(payload.sort));
    return Promise.resolve(result.slice(start, end));
  },
  fetchTotal: payload => {
    return Promise.resolve(tasks.length);
  },
  create: task => {
    tasks.push({
     });
     //Postcourse(task);
    return Promise.resolve(task);
  },
  update: data => {
    const task = tasks.find(t => t.course_id === data.course_id);
    const url = APIData.api+'courses/' + data.course_id;
    console.log(url);
    window.responseload.responseloading();
    console.log(APIData.api+'courses/', data);
    const newurl=APIData.api+'courses/'
    axios.post(newurl,data, {headers:APIData.headers})
      .then(response => {
        if(response.data.status.toString().toLowerCase() =="success"){
          toast(response.data.description)
          task.course_description = data.course_description;
          task.course_type = data.course_type;
          task.course_sub_type = data.course_sub_type;
          task.course_fees = data.course_fees;
          task.course_duration = data.course_duration;
          task.admin_id = APIData.sessiondetails.user;  
          window.responseload.responseloading();
        }
        else{        
          toast(response.data.errorDesc)
          window.responseload.responseloading();
        }
      })
      .catch(error => {
        toast('Its Time To Grab A Coffee')
        window.responseload.responseloading();
      })
      console.log(task);
    return Promise.resolve(task);
  },
   delete: data => {
     const task = tasks.find(t => t.course_id === data.course_id);
       const url = APIData.api+'courses/' + data.course_id;
       console.log(url);
       window.responseload.responseloading();
 axios.delete(url,{headers:APIData.headers})     
  .then(response => {
    
    if(response.data.status.toString().toLowerCase() =="success"){
      toast(response.data.description)
      tasks = tasks.filter(t => t.course_id !== task.course_id);
      window.responseload.responseloading();  
    }
    else{        
      toast(response.data.errorDesc)
      window.responseload.responseloading();
    }
        })
        .catch(error => {
          toast("It's Time To Grab To Coffee")
          window.responseload.responseloading();
          
        })
     
     return Promise.resolve(task);
  }
};

const styles = {
  container: { margin: "auto", width: "fit-content" }
};

const JOB = () => (
  <div style={styles.container}>
{returntypebased()}
  </div>
)

class JobsData2 extends Component {
  state={
    loading: false,
}
    constructor(props) {
    
        super(props);
        window.responseload=this;
        getTask(this.props.data);
        }
    responseloading(){
      this.setState({loading:!this.state.loading});
    }
    render() {
      return (
        <div>
          <div>
        {this.state.loading ? <Loading/>: <JOB />}
      </div>
      </div>
      );
    }
  }
  export default JobsData2;