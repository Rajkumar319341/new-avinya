import React from "react";
import axios from 'axios';
import "../CRUDTable.css";
import { Component } from "react";
import { toast } from 'react-toastify';
import * as AiIcons from "react-icons/ai";
import {APIData} from '../Authentication/APIData';
// import * as IoIcons from "react-icons/io";
import 'react-toastify/dist/ReactToastify.css';

import CRUDTable, {
  Fields,
  Field,
  UpdateForm,
  Pagination
} from "react-crud-table";
import Loading from "../Loading";

const sessiondetails=JSON.parse(localStorage.getItem("sessiondetails"));
toast.configure()

function returntypebased(){
if(sessiondetails){
    if(sessiondetails.userType==="superadmin")
    {    return (<CRUDTable
        caption="Faculty"
        fetchItems={payload => service.fetchItems(payload)}
      >
        <Fields>
          <Field name="faculty_id" label="Faculty ID" placeholder="Faculty ID" readOnly />
          <Field name="name" label="Name" placeholder="Name"  />
          <Field name="email" label="Email" placeholder="Email" type="email" readOnly/>
          <Field name="phone_number" label="Phone Number" placeholder="Phone Number" type="number" />
          <Field name="address" label="Address" placeholder="Address" hideFromTable />
          <Field name="gender" label="Gender" placeholder="Gender" />
          <Field name="DOB" label="Date Of Birth" placeholder="Date Of Birth" hideFromTable type="date" />
          <Field name="year_of_appointment" label="Year Of Appointment" placeholder="Year Of Appointment" type = "date" hideFromTable/>
          <Field name="salary" label="Salary" placeholder="Salary" type = "number" hideFromTable />
          <Field name="exp" label="Experience" placeholder="Experience" type = "number" hideFromTable />
          <Field name="qualification" label="Qualification" placeholder="Qualification"  hideFromTable />
          <Field name="emy_type" label="Employee Type" placeholder="Employee Type" hideFromTable  /> 
          <Field name="created_date_time" label="Created Date & Time" placeholder="Created Date Time"  hideFromTable type="date" readOnly />
          <Field name="updated_date_time" label="Updata Data & time" placeholder="Updata Data & time"  hideFromTable type="date" readOnly/>
          <Field name="created_by" label="Created By" placeholder="Created By"  hideFromTable readOnly/>
          <Field name="updated_by" label="Updated By" placeholder="Updated By"  readOnly/>
        </Fields>
      
        <UpdateForm
          title="Faculty Update Process"
          message="Update Faculty"
          trigger= {<AiIcons.AiFillEdit />}
          onSubmit={task => service.update(task)}
          submitText="Update"
          validate={values => {
            const errors = {};
  
            if (!values.faculty_id) {
              errors.faculty_id = "Please, provide Faculty ID";
            }
  
            if (!values.name) {
              errors.name = "Please, provide Name";
            }
  
            if (!values.email) {
              errors.email = "Please, provide Email";
            }
  
            if (!values.phone_number) {
              errors.phone_number = "Please, provide Phone Number";
            }
            if (!values.gender) {
              errors.gender = "Please, provide Gender";
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
    )
    }
    else if(sessiondetails.userType==="admin"){
        return ( <CRUDTable
            caption="Faculty"
            fetchItems={payload => service.fetchItems(payload)}
          >
            <Fields>
              <Field name="faculty_id" label="Faculty ID" placeholder="Faculty ID" readOnly />
              <Field name="name" label="Name" placeholder="Name"  />
              <Field name="email" label="Email" placeholder="Email" type="email" readOnly/>
              <Field name="phone_number" label="Phone Number" placeholder="Phone Number" type="number" />
              <Field name="address" label="Address" placeholder="Address" hideFromTable />
              <Field name="gender" label="Gender" placeholder="Gender" />
              <Field name="DOB" label="Date Of Birth" placeholder="Date Of Birth" hideFromTable type="date" />
              <Field name="year_of_appointment" label="Year Of Appointment" placeholder="Year Of Appointment" type = "date" hideFromTable/>
              <Field name="salary" label="Salary" placeholder="Salary" type = "number" hideFromTable />
              <Field name="exp" label="Experience" placeholder="Experience" type = "number" hideFromTable />
              <Field name="qualification" label="Qualification" placeholder="Qualification"  hideFromTable />
              <Field name="emy_type" label="Employee Type" placeholder="Employee Type" hideFromTable  /> 
              <Field name="created_date_time" label="Created Date & Time" placeholder="Created Date Time"  hideFromTable type="date" readOnly />
              <Field name="updated_date_time" label="Updata Data & time" placeholder="Updata Data & time"  hideFromTable type="date" readOnly/>
              <Field name="created_by" label="Created By" placeholder="Created By"  hideFromTable readOnly/>
              <Field name="updated_by" label="Updated By" placeholder="Updated By"  readOnly/>
            </Fields>
          
            <UpdateForm
              title="Faculty Update Process"
              message="Update Faculty"
              trigger= {<AiIcons.AiFillEdit />}
              onSubmit={task => service.update(task)}
              submitText="Update"
              validate={values => {
                const errors = {};
      
                if (!values.faculty_id) {
                  errors.faculty_id = "Please, provide Faculty ID";
                }
      
                if (!values.name) {
                  errors.name = "Please, provide Name";
                }
      
                if (!values.email) {
                  errors.email = "Please, provide Email";
                }
      
                if (!values.phone_number) {
                  errors.phone_number = "Please, provide Phone Number";
                }
                if (!values.gender) {
                  errors.gender = "Please, provide Gender";
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

        )
        }
        else if(sessiondetails.userType==="employee"){

        }
        else if(sessiondetails.userType==="student"){

        }
          
      
}}

  
// Component's Base CSS
//import "./index.css";
// const DescriptionRenderer = ({ field }) => <textarea {...field} />;
// console.log();
let tasks = [];

function  getTask(testTask){
  tasks = testTask;
  // console.log(tasks);
}

// function PostFaculty(AdminFacultysRow){
// axios
//       .post(APIData.api+'employee/', AdminFacultysRow, {headers:APIData.headers})
//       .then(response => {
//         if(response.data.status.toString().toLowerCase() =="success"){
//           toast(response.data.description)  
//           setTimeout(()=>{window.location.reload()},2000);;
//         }
//         else{        
//           toast(response.data.errorDesc)
//           setTimeout(()=>{window.location.reload()},2000);
//         }
//       })
//       .catch(error => {
//         toast('Update Failed')
//       })
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

  if (data.field === "faculty_id") {
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
  else if (data.field === "email"){
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }
  else if (data.field === "address"){
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }
  else if (data.field === "gender"){
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }
  else if (data.field === "qualification"){
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }
  else if (data.field === "qualification"){
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }
  else if (data.field === "emy_type"){
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
    //  PostFaculty(task);
    return Promise.resolve(task);
  },
  update: data => {
    const task = tasks.find(t => t.faculty_id === data.faculty_id);
    window.responseload.responseloading();
    axios
      .post(APIData.api+'employee/', data, {headers:APIData.headers})
      .then(response => {
        if(response.data.status.toString().toLowerCase() =="success"){
            task.name = data.name;
            task.email = data.email;
            task.phone_number = data.phone_number;
            task.address = data.address;
            task.gender = data.gender;
            task.dob = data.dob;
            task.year_of_appointment = data.year_of_appointment;
            task.salary = data.salary;
            task.exp = data.exp;
            task.qualification = data.qualification;
            task.photo = data.photo;
            task.emy_type = data.emy_type;
            task.updated_date_time = APIData.date;
            task.updated_by = APIData.sessiondetails.user;
          toast(response.data.description)  
          window.responseload.responseloading();
        }
        else{        
          toast(response.data.errorDesc)
          window.responseload.responseloading();
        }
      })
      .catch(error => {
        toast('Update Failed')
        window.responseload.responseloading();
      })

    return Promise.resolve(task);
  }
};

const styles = {
  container: { margin: "auto", width: "fit-content" }
};

const Faculty = () => (
  
  
  <div style={styles.container}>
   {returntypebased()}
  </div>

)


class FacultyData extends Component {
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
        {this.state.loading ? <Loading/>: <Faculty />}
      </div>
      </div>
      );
    }
  }
   
  export default FacultyData;