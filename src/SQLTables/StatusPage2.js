import React from "react";
import axios from 'axios';
import "../CRUDTable.css";
import { Component } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {APIData} from '../Authentication/APIData';
import * as AiIcons from "react-icons/ai";


import CRUDTable, {
  Fields,
  Field,
  // DeleteForm,
  UpdateForm,
  Pagination
} from "react-crud-table";
import Loading from "../Loading";

toast.configure()


function returntypebased(){
if(sessiondetails){

  if(sessiondetails.userType==="superadmin")
  {   
      return (<div><CRUDTable
      caption="MEMBERS"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field name="username" label="Username" placeholder="Username" readOnly />
        <Field name="status" label="Status" placeholder="Status" />
        <Field name="updated_by" label="Updated by" placeholder="Updated by" readOnly />
      </Fields>
 <UpdateForm
        title="Active Members"
        message="Active Members"
        trigger= {<AiIcons.AiFillEdit />}
        onSubmit={task => service.update(task)}
        submitText="Update"
        validate={values => {
          const errors = {};

          if (values.status.toLowerCase()!=="active" && values.status.toLowerCase()!=="inactive") {
            errors.status = "Please, provide Active or Inactive";
          }


          return errors;
        }}
        />
      <Pagination
        itemsPerPage={10}
        activePage = {1}
        fetchTotalOfItems={payload => service.fetchTotal(payload)}
      />
    </CRUDTable></div>)
}
  else if(sessiondetails.userType==="admin")
  {    
      return (<div><CRUDTable
      caption="MEMBERS"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field name="username" label="Username" placeholder="Username" readOnly />
        <Field name="status" label="Status" placeholder="Status" />
        {/* <Field name="updated_by" label="Updated by" placeholder="Updated by" readOnly /> */}
      </Fields>
 <UpdateForm
        title="Active Members"
        message="Active Members"
        trigger= {<AiIcons.AiFillEdit />}
        onSubmit={task => service.update(task)}
        submitText="Update"
        validate={values => {
          const errors = {};

          if (values.status.toLowerCase()!=="active" && values.status.toLowerCase()!=="inactive") {
            errors.status = "Please, provide Active or Inactive";
          }


          return errors;
        }}
        />
      <Pagination
        itemsPerPage={10}
        activePage = {1}
        fetchTotalOfItems={payload => service.fetchTotal(payload)}
      />
    </CRUDTable></div>)
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

const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));

// Component's Base CSS
//import "./index.css";
// const DescriptionRenderer = ({ field }) => <textarea {...field} />;
// console.log();
let tasks = [];

function  getTask(testTask){
  tasks = testTask;
  // console.log(tasks);
}

function PostUppdateStatus(StatusRow){
axios
      .post(APIData.api + 'login-type/user/', StatusRow , {headers:APIData.headers})
      .then(response => {
        //response);
        if(response.data.status.toString().toLowerCase()=="success"){
            toast(response.data.description)
        }
        else{
          toast(response.data.errorDesc)
          //window.location.reload();
        }
        
      })
      .catch(error => {
        toast('Its Time to Grab A coffee')
        window.location.reload()
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

  if (data.field === "username") {
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  } 
  else if (data.field === "status"){
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }  else if (data.field === "updated_by"){
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
  update: data => {
    const task = tasks.find(t => t.username === data.username);
    data.updated_by = sessiondetails.user;
    window.responseload.responseloading();
    axios
      .post(APIData.api + 'login-type/user/', data , {headers:APIData.headers})
      .then(response => {
        task.status = data.status;
        if(response.data.status.toString().toLowerCase()=="success"){
          task.status = data.status;
          task.updated_by = sessiondetails.user;
            toast(response.data.description)
            window.responseload.responseloading();
        }
        else{
          toast(response.data.errorDesc)
          window.responseload.responseloading();
          
        }
        
      })
      .catch(error => {
        toast('Its Time to Grab A coffee')
        window.responseload.responseloading();
      })
    return Promise.resolve(task);
  },
  delete: data => {
    const task = tasks.find(t => t.username === data.username);
    tasks = tasks.filter(t => t.username !== task.username);
    return Promise.resolve(task);
  }
};

const styles = {
  container: { margin: "auto", width: "fit-content" }
};

const Status  = () => (
<div style={styles.container}>
{returntypebased()}
  </div>
  )


class StatusPage extends Component {
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
        {this.state.loading ? <Loading/>: <Status />}
      </div>
      </div>
      );
    }
  }
  export default StatusPage;