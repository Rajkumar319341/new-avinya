

import React from "react";
import "../CRUDTable.css";
import { Component } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import CRUDTable, {
  Fields,
  Field,
  // CreateForm,
  // UpdateForm,
  // DeleteForm,
  Pagination
} from "react-crud-table";

toast.configure()
const sessiondetails=JSON.parse(localStorage.getItem("sessiondetails"));

function returntypebased(){
if(sessiondetails){

  if(sessiondetails.userType==="superadmin")
  {   
      return (<div><CRUDTable
      caption="COURSES ENROLLED"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
      <Field name="id" label="ID" placeholder="ID" readOnly />
        <Field name="course_id" label="Course ID" placeholder="Course ID" readOnly />
        <Field name="student_id" label="student ID " placeholder="student ID"  readOnly />
      </Fields>
      <Pagination
        itemsPerPage={7}
        activePage = {1}
        fetchTotalOfItems={payload => service.fetchTotal(payload)}
      />
    </CRUDTable></div>)
}
  else if(sessiondetails.userType==="admin")
  {    
      return (<div> <CRUDTable
      caption="COURSES ENROLLED"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
      <Field name="id" label="ID" placeholder="ID" readOnly />
        <Field name="course_id" label="Course ID" placeholder="Course ID" readOnly />
        <Field name="student_id" label="student ID " placeholder="student ID"  readOnly />
      </Fields>
      <Pagination
        itemsPerPage={7}
        activePage = {1}
        fetchTotalOfItems={payload => service.fetchTotal(payload)}
      />
    </CRUDTable></div>)
}
  else if(sessiondetails.userType==="employee")
  {    
    return(<div> 
      {console.log(tasks,sessiondetails)}
      <CRUDTable
    caption="COURSES ENROLLED"
    fetchItems={payload => service.fetchItems(payload)}
  >
    <Fields>
    <Field name="id" label="ID" placeholder="ID" readOnly />
      <Field name="course_id" label="Course ID" placeholder="Course ID" readOnly />
      <Field name="student_id" label="student ID " placeholder="student ID"  readOnly />
    </Fields>
    <Pagination
      itemsPerPage={7}
      activePage = {1}
      fetchTotalOfItems={payload => service.fetchTotal(payload)}
    />
  </CRUDTable></div>
    )
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
// const DescriptionRenderer = ({ field }) => <textarea {...field} />;
console.log();
let tasks = [];

function  getTask(testTask){
  tasks = testTask;
  // console.log(tasks);
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

  if (data.field === "course_id") {
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  } 
  else if (data.field === "student_id"){
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
    const task = tasks.find(t => (t.course_id === data.course_id && t.student_id === data.student_id) );
    task.course_id = data.course_id;
    task.student_id = data.student_id;
    //Postcourse(task);
    return Promise.resolve(task);
  },
   delete: data => {
     const task = tasks.find(t => (t.course_id === data.course_id && t.student_id === data.student_id));
     //deletecourse(task);
     tasks = tasks.filter(t => t.course_id !== task.course_id);
     return Promise.resolve(task);
  }
};

const styles = {
  container: { margin: "auto", width: "fit-content" }
};

const Enrolled = () => (
 <div style={styles.container}>
{returntypebased()}
  </div>
)


class CourseEnrolledData extends Component {
    constructor(props) {
        super(props); 
        getTask(this.props.data);
        }
    render() { 
      return ( <div>
      <Enrolled/> 
      </div>
      );
    }
  }
   
  export default CourseEnrolledData;
