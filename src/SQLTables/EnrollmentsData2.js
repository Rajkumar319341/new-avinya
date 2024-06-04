import React from "react";
import axios from 'axios';
import "../CRUDTable.css";
import { Component } from "react";
import { toast } from 'react-toastify';
import * as FaIcons from "react-icons/fa";

import {APIData} from '../Authentication/APIData';

import 'react-toastify/dist/ReactToastify.css';
import CRUDTable, {
  Fields,
  Field,
  // CreateForm,
  UpdateForm,
  // DeleteForm,
  Pagination
}
  from "react-crud-table";
import Loading from "../Loading";
const sessiondetails=JSON.parse(localStorage.getItem("sessiondetails"));
toast.configure()

function returntypebased(){
if(sessiondetails){

        if(sessiondetails.userType==="superadmin")
        {   
            return (<div><CRUDTable
      caption="Enrollments"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field name="user_email" label="User Email" placeholder="User Email" readOnly hideInCreateTable />
        <Field name="office_email" label="Office Email" placeholder="Office Email"   />
        <Field name="branch" label="Branch" placeholder="Branch"   />
        <Field name="enrollment_type" label="Enrollment Type" placeholder="Enrollment Type" readOnly />
        <Field name="enrollment_status" label="Enrollment Status" placeholder="Enrollment Status" />
        <Field name="course_id" label="Course ID" placeholder="Course ID" readOnly/>
        <Field name="user_phone_number" label="User Phone Number" hideFromTable placeholder="User Phone Number" readOnly />
        <Field name="user_name" label="User Name" placeholder="User Name" readOnly />
        <Field name="admin_id" label="Admin ID" placeholder="Admin ID" hideInUpdateForm />
        <Field name="followup_datetime" label="Follow Up date" placeholder="Follow Up date Time" type ="date" />
        <Field name="enrolled_date" label="Enrolled Date" placeholder="Enrolled Date" type="date"/>
      </Fields>
      <UpdateForm
        title="User Application Process"
        message="Accept User"
        trigger= {
<FaIcons.FaEdit/>
        }
        onSubmit={task => service.update(task)}
        submitText="Accept"
        validate={values => {
          const errors = {};
          if (!values.followup_datetime) {
            errors.followup_datetime = "Please, provide Follow Up Date and Time";
          }
          if (!values.office_email) {
            errors.office_email = "Please, provide Office Email";
          }
          if (!values.branch) {
            errors.branch = "Please, provide Branch";
          }
          if (!values.enrolled_date) {
            errors.enrolled_date = "Please, provide Follow Up Date and Time";
          }
          if (values.enrollment_status.toLowerCase() != "accepted" && values.enrollment_status.toLowerCase() != "completed" && values.enrollment_status.toLowerCase() != "applied") {
            errors.enrollment_status = "Enter  Accepted  or  Completed  or  Applied";
          }

          return errors;
        }}
      />
      <Pagination
        itemsPerPage={7}
        activePage = {1}
        fetchTotalOfItems={payload => service.fetchTotal(payload)}
      />
    </CRUDTable></div>)
        }
        else if(sessiondetails.userType==="admin")
        {    
            return ( <div>
    <CRUDTable
      caption="Enrollments"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field name="user_email" label="User Email" placeholder="User Email" readOnly hideInCreateTable />
        <Field name="office_email" label="Office Email" placeholder="Office Email"   />
        <Field name="branch" label="Branch" placeholder="Branch"   />
        <Field name="enrollment_type" label="Enrollment Type" placeholder="Enrollment Type" readOnly />
        <Field name="enrollment_status" label="Enrollment Status" placeholder="Enrollment Status" />
        <Field name="course_id" label="Course ID" placeholder="Course ID" readOnly/>
        <Field name="user_phone_number" label="User Phone Number" hideFromTable placeholder="User Phone Number" readOnly />
        <Field name="user_name" label="User Name" placeholder="User Name" readOnly />
        <Field name="admin_id" label="Admin ID" placeholder="Admin ID" hideInUpdateForm />
        <Field name="followup_datetime" label="Follow Up date" placeholder="Follow Up date Time" type ="date" />
        <Field name="enrolled_date" label="Enrolled Date" placeholder="Enrolled Date" type="date"/>
      </Fields>
      <UpdateForm
        title="User Application Process"
        message="Accept User"
        trigger= {<FaIcons.FaEdit/>}
        onSubmit={task => service.update(task)}
        submitText="Accept"
        validate={values => {
          const errors = {};
          if (!values.followup_datetime) {
            errors.followup_datetime = "Please, provide Follow Up Date and Time";
          }
          if (!values.enrolled_date) {
            errors.enrolled_date = "Please, provide Follow Up Date and Time";
          }
          if (values.enrollment_status.toLowerCase() != "accepted" && values.enrollment_status.toLowerCase() != "completed" && values.enrollment_status.toLowerCase() != "applied") {
            errors.enrollment_status = "Enter  Accepted  or  Completed  or  Applied";
          }
          if (!values.office_email) {
            errors.office_email = "Please, provide Office Email";
          }
          if (!values.branch) {
            errors.branch = "Please, provide Branch";
          }

          return errors;
        }}
      />
      <Pagination
        itemsPerPage={7}
        activePage = {1}
        fetchTotalOfItems={payload => service.fetchTotal(payload)}
      />
    </CRUDTable>
  </div>)}
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
        }
}
console.log();
let tasks = [];

function  getTask(testTask){
  tasks = testTask;
  console.log(tasks);
}

function Acceptapplication(AdminEnrollmentsRow){

axios
      .post(APIData.api+'enrollments/', AdminEnrollmentsRow, {headers:APIData.headers})

      .then(response => {
        if(response.data.status.toString().toLowerCase() =="success"){
          toast(response.data.description)  
          //window.location.reload();
        }
        else{        
          toast(response.data.errorDesc)
          //window.location.reload()
        }
      })
      .catch(error => {
          console.log(error);
        toast("It's Time To Grab A Coffee")
        //window.location.reload()
      })
}


const SORTERS = {
  NUMBER_ASCENDING: mapper => (a, b) => mapper(a) - mapper(b),
  NUMBER_DESCENDING: mapper => (a, b) => mapper(b) - mapper(a),
  STRING_ASCENDING: mapper => (a, b) => mapper(a).localeCompare(mapper(b)),
  STRING_DESCENDING: mapper => (a, b) => mapper(b).localeCompare(mapper(a))
};

const getSorter = data => {
  const mapper = x => x[data.field];
  let sorter = SORTERS.STRING_ASCENDING(mapper);

  if (data.field === "user_email") {
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  } 
  else if (data.field === "enrollment_type"){
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }
  else if (data.field === "branch"){
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }
  else if (data.field === "office_email"){
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }
  else if (data.field === "enrollment_status"){
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }
  else if (data.field === "course_id"){
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }
  else if (data.field === "user_name"){
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
  else if (data.field === "followup_datetime" || data.field === "enrolled_date"){
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
    tasks.push({ ...task,
     });
     
    return Promise.resolve(task);
  },
  update: data => {
    const task = tasks.find(t => t.user_email === data.user_email);
    window.responseload.responseloading();
    axios
      .post(APIData.api+'enrollments/', data, {headers:APIData.headers})

      .then(response => {
        if(response.data.status.toString().toLowerCase() =="success"){
          toast(response.data.description)  
          task.enrollment_type = data.enrollment_type;
          task.enrollment_status = data.enrollment_status;
          task.course_id = data.course_id;
          task.user_phone_number = data.user_phone_number;
          task.user_name = data.user_name;
          task.admin_id = sessiondetails.user;
          task.followup_datetime = data.followup_datetime;
          task.enrolled_date = data.enrolled_date;
          task.office_email = data.office_email;
          task.branch = data.branch;
          window.responseload.responseloading();
        }
        else{        
          toast(response.data.errorDesc)
          window.responseload.responseloading();
        }
      })
      .catch(error => {
        toast("It's Time To Grab A Coffee")
        window.responseload.responseloading();
      })

    return Promise.resolve(task);
  }
};

const styles = {
  container: { margin: "auto", width: "fit-content" }
};

const Enrollments = () => (
  
  
  <div style={styles.container}>
{returntypebased()}
  </div>
)


class EnrollmentsData extends Component {
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
        {this.state.loading ? <Loading/>: <Enrollments />}
      </div>
      </div>
      );
    }
  }
   
  export default EnrollmentsData;