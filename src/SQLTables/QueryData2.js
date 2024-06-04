import React from "react";
import axios from 'axios';
import "../CRUDTable.css";
import { Component } from "react";
import {APIData} from '../Authentication/APIData';
import { toast } from 'react-toastify';
import * as AiIcons from "react-icons/ai";
import 'react-toastify/dist/ReactToastify.css';
import CRUDTable, {
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm,
  Pagination
} from "react-crud-table";
import Loading from "../Loading";

toast.configure()
const sessiondetails=JSON.parse(localStorage.getItem("sessiondetails"));

function returntypebased(){
  if(sessiondetails){
  if(sessiondetails.userType==="superadmin")
  {   
      return (<div>    <CRUDTable
      caption="QUERIES"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field name="id" label="ID" placeholder="Don't Enter the ID" type="number" readOnly hideInCreateForm />
        <Field name="course" label="Course" placeholder="Course"  />
        <Field name="date" label="date" placeholder="date" type="date" />
        <Field name="name" label="Name" placeholder="Name" />
        <Field name="phone_number" label="Phone Number" placeholder="Phone Number" />
        <Field name="query" label="query" placeholder="query" />
      </Fields>
      <CreateForm
        title="Query Creation"
        message="Create a new query!"
        trigger={<AiIcons.AiOutlinePlusCircle/>}
        onSubmit={task => service.create(task)}
        submitText="Create"
        validate={values => {
          const errors = {};
          //     if (!values.id) {
          //   errors.id = "Please, provide phone_number Table ID";
          // }

          if (!values.course) {
            errors.course = "Please, provide course";
          }

          if (!values.date) {
            errors.date = "Please, provide date";
          }

          if (!values.name) {
            errors.name = "Please, provide Name";
          }
          if (!values.phone_number) {
            errors.phone_number = "Please, provide phone number";
          }
          if (!values.query) {
            errors.query = "Please, provide query";
          }

          return errors;
        }}
      />

      <UpdateForm
        title="Query Update Process"
        message="Update Query"
        trigger= {<AiIcons.AiFillEdit />}
        onSubmit={task => service.update(task)}
        submitText="Update"
        validate={values => {
          const errors = {};

          if (!values.course) {
            errors.course = "Please, provide course";
          }

          if (!values.date) {
            errors.date = "Please, provide date";
          }

          if (!values.name) {
            errors.name = "Please, provide Name";
          }
          if (!values.phone_number) {
            errors.phone_number = "Please, provide phone number";
          }
          if (!values.query) {
            errors.query = "Please, provide query";
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
              if (!values.id) {
            errors.id = "Please, provide Course ID";
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
      return (<div>    <CRUDTable
      caption="QUERIES"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field name="id" label="ID" placeholder="Don't Enter the ID" type="number" readOnly hideInCreateForm />
        <Field name="course" label="Course" placeholder="Course"  />
        <Field name="date" label="date" placeholder="date" type="date" />
        <Field name="name" label="Name" placeholder="Name" />
        <Field name="phone_number" label="Phone Number" placeholder="Phone Number" />
        <Field name="query" label="Query" placeholder="query" />
      </Fields>
      <CreateForm
        title="Query Creation"
        message="Create a new query!"
        trigger={<AiIcons.AiOutlinePlusCircle/>}
        onSubmit={task => service.create(task)}
        submitText="Create"
        validate={values => {
          const errors = {};
          //     if (!values.id) {
          //   errors.id = "Please, provide phone_number Table ID";
          // }

          if (!values.course) {
            errors.course = "Please, provide course";
          }

          if (!values.date) {
            errors.date = "Please, provide date";
          }

          if (!values.name) {
            errors.name = "Please, provide Name";
          }
          if (!values.phone_number) {
            errors.phone_number = "Please, provide phone number";
          }
          if (!values.query) {
            errors.query = "Please, provide query";
          }

          return errors;
        }}
      />

      <UpdateForm
        title="Query Update Process"
        message="Update Query"
        trigger= {<AiIcons.AiFillEdit />}
        onSubmit={task => service.update(task)}
        submitText="Update"
        validate={values => {
          const errors = {};

          if (!values.course) {
            errors.course = "Please, provide course";
          }

          if (!values.date) {
            errors.date = "Please, provide date";
          }

          if (!values.name) {
            errors.name = "Please, provide Name";
          }
          if (!values.phone_number) {
            errors.phone_number = "Please, provide phone number";
          }
          if (!values.query) {
            errors.query = "Please, provide query";
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
              if (!values.id) {
            errors.id = "Please, provide Course ID";
          }
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
// console.log();
let tasks = [];

function  getTask(testTask){
  tasks = testTask;
  //console.log(tasks);
}

// function PostQuery(AdminQuery){
//   var senddata={
//     id:AdminQuery.id,
//     course : AdminQuery.course,
//     date : AdminQuery.date,
//     name : AdminQuery.name,
//     phone_number : AdminQuery.phone_number,
//     query : AdminQuery.query
//   }
// axios
//       .post(APIData.api+'queries/', senddata, {headers:APIData.headers})
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
//         console.log(error)
//         toast("It's time To Grab A Coffee")
//       })
// }

// function deletephone_numberTable(AdminQuery){
//   //console.log(AdminQuery.id);
//   const url = APIData.api+'queries/' + AdminQuery.id;
//   axios
//               .delete(url,{headers:APIData.headers})

//         .then(response => {
//           if(response.status==200){
//             window.location.reload("/");
//            }
//            else{
//              toast('Check With the courses,failed')
//            }
//         })
//         .catch(error => {
//           toast("It's time To Grab A Coffeee")
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

  if (data.field === "phone_number") {
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  } 
  else if (data.field === "course"){
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }
  else if (data.field === "date"){
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }
  else if (data.field === "name"){
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }
  else if (data.field === "query"){
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
  window.responseload.responseloading();
  axios
        .post(APIData.api+'queries/', task, {headers:APIData.headers})
        .then(response => {
          
          if(response.data.status.toString().toLowerCase() =="success"){
            toast(response.data.description)  
            tasks.push({...task,
            });
            window.responseload.responseloading();
            window.location.reload();
          }
          else{        
            toast(response.data.errorDesc)
            window.responseload.responseloading();
          }
        })
        .catch(error => {
          window.responseload.responseloading();
          toast("It's time To Grab A Coffee")
        })
    
    return Promise.resolve(task);
  },
  update: data => {
    const task = tasks.find(t => t.id === data.id);
    window.responseload.responseloading();
    axios.post(APIData.api+'queries/', data, {headers:APIData.headers})
          .then(response => {            
            if(response.data.status.toString().toLowerCase() =="success"){
              toast(response.data.description)  
              task.course = data.course;
              task.date = data.date;
              task.name = data.name;
              task.phone_number = data.phone_number;
              task.query = data.query;
              window.responseload.responseloading();
            }
            else{        
              toast(response.data.errorDesc)
              window.responseload.responseloading();
            }
          })
          .catch(error => {
            window.responseload.responseloading();
            toast("It's time To Grab A Coffee")
          })

    return Promise.resolve(task);
  },
   delete: data => {
    const task = tasks.find(t => t.id === data.id);
     const url = APIData.api+'queries/' + data.id;
     window.responseload.responseloading();
     axios.delete(url,{headers:APIData.headers})
          .then(response => {
            if(response.data.status.toString().toLowerCase() =="success"){
              toast(response.data.description)
              tasks = tasks.filter(t => t.id !== task.id);  
              window.responseload.responseloading();   
            }
            else{        
              toast(response.data.errorDesc)
              window.responseload.responseloading();
            }
          })
          .catch(error => {
            window.responseload.responseloading();
            toast("It's time To Grab A Coffee")
          })
     
     return Promise.resolve(task);
  }
};

const styles = {
  container: { margin: "auto", width: "fit-content" }
};

const Query  = () => (
<div style={styles.container}>
{returntypebased()}
  </div>
)


class QueryData extends Component {
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
        {this.state.loading ? <Loading/>: <Query/>}
      </div>
      </div>
      );
    }
  }
   
  export default QueryData;