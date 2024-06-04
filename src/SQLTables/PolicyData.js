import React from "react";
import axios from 'axios';
import "../CRUDTable.css";
import { Component } from "react";
import { toast } from 'react-toastify';
import * as AiIcons from "react-icons/ai";
import {APIData} from '../Authentication/APIData';
import { useState } from "react";
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
 <Link to="/addPolicy"><div className="Upload"> 
 {<AiIcons.AiFillPlusCircle />}
 </div></Link> 
 <CRUDTable
 caption="POLICIES"
 fetchItems={payload => service.fetchItems(payload)}
 >
 <Fields>
 <Field
 name="policy_id"
 label="ID"
 placeholder="Don't Enter the ID"
 type="number"
 readOnly
 hideFromTable
 hideInCreateForm
 hideInUpdateForm
 />
 <Field
 name="policy_name"
 label="Name"
 placeholder="Name"
 type=""
 readOnly
 />
 <Field
 name="policy_audience"
 label="Audience"
 placeholder=""
 type=""
 
 />
 <Field
 name="policy_type"
 label="Type"
 placeholder="Type"
 type=""
 readOnly
 />
 <Field
 name="policy_description"
 label="Description"
 placeholder="Description"
 type=""
 render={DescriptionRenderer}
 hideFromTable
 
 />
 <Field
 name="policy_date"
 label="Implementation Date"
 placeholder="Date"
 type="date"

 />
 <Field
 name="policy_data"
 label="Policy"
 placeholder="Data"
 type=""
 render={DescriptionRenderer}
 hideFromTable
 />
 <Field
 name="policy_note"
 label="Note"
 placeholder="Note"
 type=""
 render={DescriptionRenderer}
 hideFromTable
 />
 <Field
 name="created_by"
 label="Created By"
 placeholder="Created By"
 type=""
 hideInUpdateForm
 hideFromTable
 />
 <Field
 name="created_date_time"
 label="Created Date & Time"
 placeholder="Created Date & Time"
 type=""
 hideInUpdateForm
 hideFromTable
 />
 <Field
 name="updated_by"
 label="Updated By"
 placeholder="Updated By"
 type=""
 hideInUpdateForm
 />
 <Field
 name="updated_date_time"
 label="Updated Date & Time"
 placeholder="Updated Date & Time"
 type=""
 hideInUpdateForm
 hideFromTable
 />
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
 title="Policy Update Process"
 message="*Policy Type and name cannot be updated"
 trigger= {<AiIcons.AiFillEdit />}
 onSubmit={task => service.update(task)}
 submitText="Update"
 validate={values => {
 const errors = {};

 // if (!values.policy_id) {
 // errors.course_id = "Please, provide Policy ID";
 // }

 
 if (!values.policy_audience) {
    errors.policy_audience = "Please, provide Policy Audience";
    }

 if (!values.policy_type) {
 errors.policy_type = "Please, provide Policy Type";
 }

 if (!values.policy_description) {
 // errors.policy_description = "Please, provide Policy Description";
 values.policy_description = "null";
 }

 if (!values.policy_date) {
    errors.policy_date = "Please, provide Policy Implementation Date";
    }

 if (!values.policy_data) {
 errors.policy_data = "Please, provide Policy Data";
 }

 if (!values.policy_note) {
 // errors.policy_note = "Please, provide Policy Note";
 values.policy_note="null";
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
 if (!values.policy_name) {
 errors.course_id = "Please, provide Course Name";
 }

 // if (!values.course_description) {
 // errors.course_id = "Please, provide Course Description";
 // }

 // if (!values.course_type) {
 // errors.course_type = "Please, provide Course Type";
 // }

 // if (!values.course_sub_type) {
 // errors.course_sub_type = "Please, provide Course SubType";
 // }
 // if (!values.course_fees) {
 // errors.course_fees = "Please, provide Course Fees";
 // }
 // if (!values.course_duration) {
 // errors.course_duration = "Please, provide Course Duration";
 // }
 // if (!values.admin_id) {
 // errors.admin_id = "Please, provide Admin ID";
 // }

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
 return (<div> <Link to="/addPolicy"><div className="Upload"> 
 {<AiIcons.AiFillPlusCircle />}
 </div></Link> 
 <CRUDTable
 caption="POLICIES"
 fetchItems={payload => service.fetchItems(payload)}
 >
 <Fields>
 <Field
 name="policy_id"
 label="ID"
 placeholder="Don't Enter the ID"
 type="number"
 readOnly
 hideFromTable
 hideInCreateForm
 hideInUpdateForm
 />
 <Field
 name="policy_name"
 label="Name"
 placeholder="Name"
 type=""
 readOnly
 />
 <Field
 name="policy_audience"
 label="Audience"
 placeholder=""
 type=""
 
 />
 <Field
 name="policy_type"
 label="Type"
 placeholder="Type"
 type=""
 readOnly
 />
 <Field
 name="policy_description"
 label="Description"
 placeholder="Description"
 type=""
 render={DescriptionRenderer}
 hideFromTable
 
 />
 <Field
 name="policy_date"
 label="Implementation Date"
 placeholder="Date"
 type="date"

 />
 <Field
 name="policy_data"
 label="Policy"
 placeholder="Data"
 type=""
 render={DescriptionRenderer}
 hideFromTable
 />
 <Field
 name="policy_note"
 label="Note"
 placeholder="Note"
 type=""
 render={DescriptionRenderer}
 hideFromTable
 />
 <Field
 name="created_by"
 label="Created By"
 placeholder="Created By"
 type=""
 hideInUpdateForm
 hideFromTable
 />
 <Field
 name="created_date_time"
 label="Created Date & Time"
 placeholder="Created Date & Time"
 type=""
 hideInUpdateForm
 hideFromTable
 />
 <Field
 name="updated_by"
 label="Updated By"
 placeholder="Updated By"
 type=""
 hideInUpdateForm
 />
 <Field
 name="updated_date_time"
 label="Updated Date & Time"
 placeholder="Updated Date & Time"
 type=""
 hideInUpdateForm
 hideFromTable
 />
 
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
 title="Policy Update Process"
 message="*Policy Type and name cannot be updated"
 trigger= {<AiIcons.AiFillEdit />}
 onSubmit={task => service.update(task)}
 submitText="Update"
 validate={values => {
 const errors = {};

if (!values.policy_audience) {
    errors.policy_audience = "Please, provide Policy Audience";
    }

 if (!values.policy_type) {
 errors.policy_type = "Please, provide Policy Type";
 }

 if (!values.policy_description) {
 // errors.policy_description = "Please, provide Policy Description";
 values.policy_description = "null";
 }

 // if (!values.policy_date) {
 // errors.course_sub_type = "Please, provide Policy Date";
 // }
 if (!values.policy_date) {
    errors.policy_date = "Please, provide Policy Implementation Date";
    }

 if (!values.policy_data) {
 errors.policy_data = "Please, provide Policy Data";
 }

 if (!values.policy_note) {
 // errors.policy_note = "Please, provide Policy Note";
 values.policy_note = "null";
 }

 


 return errors;
 }}
 />
 {/* <DeleteForm
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

 // if (!values.course_description) {
 // errors.course_id = "Please, provide Course Description";
 // }

 // if (!values.course_type) {
 // errors.course_type = "Please, provide Course Type";
 // }

 // if (!values.course_sub_type) {
 // errors.course_sub_type = "Please, provide Course SubType";
 // }
 // if (!values.course_fees) {
 // errors.course_fees = "Please, provide Course Fees";
 // }
 // if (!values.course_duration) {
 // errors.course_duration = "Please, provide Course Duration";
 // }
 // if (!values.admin_id) {
 // errors.admin_id = "Please, provide Admin ID";
 // }

 return errors;
 }}
 /> */}
 <Pagination
 itemsPerPage={10}
 activePage = {1}
 fetchTotalOfItems={payload => service.fetchTotal(payload)}
 />
 </CRUDTable></div>)
}
 else if(sessiondetails.userType==="employee")
 { 
 return ( 
 <CRUDTable
 caption="POLICIES"
 fetchItems={payload => service.fetchItems(payload)}
 >
 <Fields>
 <Field
 name="policy_id"
 label="ID"
 placeholder="Don't Enter the ID"
 type="number"
 readOnly
 hideFromTable
 hideInCreateForm
 hideInUpdateForm
 />
 <Field
 name="policy_name"
 label="Name"
 placeholder="Name"
 type=""
 readOnly
 />
 <Field
 name="policy_audience"
 label="Audience"
 placeholder=""
 type=""
 
 />
 <Field
 name="policy_type"
 label="Type"
 placeholder="Type"
 type=""
 readOnly
 />
 <Field
 name="policy_description"
 label="Description"
 placeholder="Description"
 type=""
 render={DescriptionRenderer}
 hideFromTable
 
 />
 <Field
 name="policy_date"
 label="Implementation Date"
 placeholder="Date"
 type="date"

 />
 <Field
 name="policy_data"
 label="Policy"
 placeholder="Data"
 type=""
 render={DescriptionRenderer}
 hideFromTable
 />
 <Field
 name="policy_note"
 label="Note"
 placeholder="Note"
 type=""
 render={DescriptionRenderer}
 hideFromTable
 />
 <Field
 name="created_by"
 label="Created By"
 placeholder="Created By"
 type=""
 hideInUpdateForm
 hideFromTable
 />
 <Field
 name="created_date_time"
 label="Created Date & Time"
 placeholder="Created Date & Time"
 type=""
 hideInUpdateForm
 hideFromTable
 />
 <Field
 name="updated_by"
 label="Updated By"
 placeholder="Updated By"
 type=""
 hideInUpdateForm
 />
 <Field
 name="updated_date_time"
 label="Updated Date & Time"
 placeholder="Updated Date & Time"
 type=""
 hideInUpdateForm
 hideFromTable
 />
 
 </Fields> 
 <Pagination
 itemsPerPage={10}
 activePage = {1}
 fetchTotalOfItems={payload => service.fetchTotal(payload)}
 />
 </CRUDTable>)
 
}
 else if(sessiondetails.userType==="student")
 { 
 return ( 
 <CRUDTable
 caption="POLICIES"
 fetchItems={payload => service.fetchItems(payload)}
 >
 <Fields>
 <Field
 name="policy_id"
 label="ID"
 placeholder="Don't Enter the ID"
 type="number"
 readOnly
 hideFromTable
 hideInCreateForm
 hideInUpdateForm
 />
 <Field
 name="policy_name"
 label="Name"
 placeholder="Name"
 type=""
 readOnly
 />
 <Field
 name="policy_audience"
 label="Audience"
 placeholder=""
 type=""
 
 />
 <Field
 name="policy_type"
 label="Type"
 placeholder="Type"
 type=""
 readOnly
 />
 <Field
 name="policy_description"
 label="Description"
 placeholder="Description"
 type=""
 render={DescriptionRenderer}
 hideFromTable
 
 />
 <Field
 name="policy_date"
 label="Implementation Date"
 placeholder="Date"
 type="date"

 />
 <Field
 name="policy_data"
 label="Policy"
 placeholder="Data"
 type=""
 render={DescriptionRenderer}
 hideFromTable
 />
 <Field
 name="policy_note"
 label="Note"
 placeholder="Note"
 type=""
 render={DescriptionRenderer}
 hideFromTable
 />
 <Field
 name="created_by"
 label="Created By"
 placeholder="Created By"
 type=""
 hideInUpdateForm
 hideFromTable
 />
 <Field
 name="created_date_time"
 label="Created Date & Time"
 placeholder="Created Date & Time"
 type=""
 hideInUpdateForm
 hideFromTable
 />
 <Field
 name="updated_by"
 label="Updated By"
 placeholder="Updated By"
 type=""
 hideInUpdateForm
 />
 <Field
 name="updated_date_time"
 label="Updated Date & Time"
 placeholder="Updated Date & Time"
 type=""
 hideInUpdateForm
 hideFromTable
 />
 
 </Fields> 
 <Pagination
 itemsPerPage={10}
 activePage = {1}
 fetchTotalOfItems={payload => service.fetchTotal(payload)}
 />
 </CRUDTable>)
 
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
// const DateRenderer = ({ field }) => <textarea {...field} />;
// const DataRenderer = ({ field }) => <textarea {...field} />;
// const NoteRenderer = ({ field }) => <textarea {...field} />;
let tasks =[];
function getTask(testTask){
 tasks = testTask;
 //console.log(tasks);

}
// function Postcourse(AdminCoursesRow){
// axios
// .post(APIData.api+'courses/', AdminCoursesRow, {headers:APIData.headers})
// .then(response => {
// //console.log(response)

// if(response.data.status.toString().toLowerCase() =="success"){
// toast(response.data.description) 
// window.location.reload();
// }
// else{ 
// toast(response.data.errorDesc)
// window.location.reload()
// }
// })
// .catch(error => {
// toast('Its Time To Grab A Coffee')
// })
// }

// function deletecourse(AdminCoursesRow){
 
// const url = APIData.api+'courses/' + AdminCoursesRow.course_id;
// axios
// .delete(url,{headers:APIData.headers}) 
// .then(response => {
// if(response.data.status.toString().toLowerCase() =="success"){
// toast(response.data.description) 
// window.location.reload();
// }
// else{ 
// toast(response.data.errorDesc)
// }
// })
// .catch(error => {
// toast("It's Time To Grab To Coffee")
// window.location.reload()
// })
 
// }
const SORTERS = {
 NUMBER_ASCENDING: mapper => (a, b) => mapper(a) - mapper(b),
 NUMBER_DESCENDING: mapper => (a, b) => mapper(b) - mapper(a),
 STRING_ASCENDING: mapper => (a, b) => mapper(a).localeCompare(mapper(b)),
 STRING_DESCENDING: mapper => (a, b) => mapper(b).localeCompare(mapper(a))
};

const getSorter = data => {
 const mapper = x => x[data.field];
 let sorter = SORTERS.STRING_ASCENDING(mapper);

 if (data.field === "policy_name") {
 sorter =
 data.direction === "ascending"
 ? SORTERS.STRING_ASCENDING(mapper)
 : SORTERS.STRING_DESCENDING(mapper);
 } 
 
 else if (data.field === "policy_description"){
 sorter =
 data.direction === "ascending"
 ? SORTERS.STRING_ASCENDING(mapper)
 : SORTERS.STRING_DESCENDING(mapper);
 }
 
 else if (data.field === "policy_type"){
 sorter =
 data.direction === "ascending"
 ? SORTERS.STRING_ASCENDING(mapper)
 : SORTERS.STRING_DESCENDING(mapper);
 }
 else if (data.field === "policy_note"){
 sorter =
 data.direction === "ascending"
 ? SORTERS.STRING_ASCENDING(mapper)
 : SORTERS.STRING_DESCENDING(mapper);
 }
 else if (data.field === "policy_data"){
 sorter =
 data.direction === "ascending"
 ? SORTERS.STRING_ASCENDING(mapper)
 : SORTERS.STRING_DESCENDING(mapper);
 }
 else if (data.field === "policy_audience"){
 sorter =
 data.direction === "ascending"
 ? SORTERS.STRING_ASCENDING(mapper)
 : SORTERS.STRING_DESCENDING(mapper);
 }
 else if (data.field === "created_by"){
 sorter =
 data.direction === "ascending"
 ? SORTERS.STRING_ASCENDING(mapper)
 : SORTERS.STRING_DESCENDING(mapper);
 }
 else if (data.field === "updated_by"){
 sorter =
 data.direction === "ascending"
 ? SORTERS.STRING_ASCENDING(mapper)
 : SORTERS.STRING_DESCENDING(mapper);
 }
 else if (data.field === "policy_date"){
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
 const task = tasks.find(t => t.policy_name === data.policy_name);
 window.responseload.responseloading();
 axios.post(APIData.api+'policies/', data, {headers:APIData.headers})
 .then(response => {
 if(response.data.status.toString().toLowerCase() =="success"){
 toast("Successfully updated the policy")

 task.policy_id = data.policy_id;
 task.policy_name = data.policy_name;
 task.policy_audience = data.policy_audience;
 task.policy_description = data.policy_description;
 task.policy_type = data.policy_type;
 task.policy_data = data.policy_data;
 task.policy_note = data.policy_note;
 task.updated_by = APIData.sessiondetails.user;
 task.created_by = data.created_by;
 task.created_date_time = data.created_date_time;
 task.updated_date_time = data.updated_date_time;
 task.policy_date = data.policy_date;
 task.admin_id = APIData.sessiondetails.user; 
 window.responseload.responseloading();
//  window.location.reload();

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
 return Promise.resolve(task);
 },
 delete: data => {
 const task = tasks.find(t => t.policy_name === data.policy_name);
 const url = APIData.api+'policies/' + data.policy_name;
 window.responseload.responseloading();
 axios.delete(url,{headers:APIData.headers}) 
 .then(response => {
 
 if(response.data.status.toString().toLowerCase() =="success"){
 toast(response.data.description)
 tasks = tasks.filter(t => t.policy_name !== task.policy_name);
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

const Course = () => (
 <div style={styles.container}>
{returntypebased()}
 </div>
)

class PolicyData extends Component {
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
 {this.state.loading ? <Loading/>: <Course/>}
 </div>
 </div>
 );
 }
 }
 export default PolicyData;