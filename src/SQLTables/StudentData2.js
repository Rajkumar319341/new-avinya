import React from "react";
import axios from 'axios';
import "../CRUDTable.css";
import { Component } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {APIData} from '../Authentication/APIData';
import * as FaIcons from "react-icons/fa";


import CRUDTable, {
  Fields,
  Field,
  // CreateForm,
  // DeleteForm,
  UpdateForm,
  Pagination
} from "react-crud-table";
import Loading from "../Loading";

toast.configure()
const sessiondetails=JSON.parse(localStorage.getItem("sessiondetails"));

function returntypebased(){
  if(sessiondetails){

  if(sessiondetails.userType==="superadmin")
  {   
      return (<div>
          <CRUDTable
      caption="STUDENTS"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field name="student_id" label="Student ID" placeholder="Student ID" readOnly/>
        <Field name="name" label="Name" placeholder="Name"  />
        <Field name="email" label="Email" placeholder="Email" readOnly />
        <Field name="phone_number" label="Phone Number" placeholder="Phone Number" type="number" />
        <Field name="fathers_name" label="Father's Name" placeholder="Father's Name" hideFromTable />
        <Field name="mother_name" label="Mother's Name" placeholder="Mother's Name" hideFromTable/>
        <Field name="address" label="Address" placeholder="Address" hideFromTable/>
        <Field name="gender" label="Gender" placeholder="Gender" />
        <Field name="dob" label="Date Of Birth" placeholder="Date Of Birth" hideFromTable/>
        <Field name="alt_number" label="Alternate Number" placeholder="Alternate Number" type="number" hideFromTable/>
        <Field name="institution" label="Institution" placeholder="Institution" />
        <Field name="educational_qualification" label="Educational qualification" placeholder="Educational Qualification" hideFromTable/>
        <Field name="photo" label="Photo" placeholder="Photo" hideFromTable/>
        <Field name="professional_exp" label="Professional Experience" placeholder="Professional Experience"hideFromTable type="number" />
        <Field name="created_date_time" label="Created Date And Time" placeholder="Created Date And Time" hideFromTable readOnly type="date" />
        <Field name="updated_date_time" label="Updated Date And Time" placeholder="Updated Date And Time" hideFromTable readOnly type="date"/>
        <Field name="updatedBy" label="Updated By" placeholder="Updated By" readOnly />
        <Field name="createdBy" label="Created By" placeholder="Created By" hideFromTable readOnly/>

      </Fields>
      {/* <CreateForm
        title="Student Creation"
        message="Create a new Student!"
        trigger="Create Student"
        onSubmit={task => service.create(task)}
        submitText="Create"
        validate={values => {
          const errors = {};
              if (!values.student_id) {
            errors.student_id = "Please, provide Student ID";
          }

          if (!values.name) {
            errors.student_id = "Please, provide Course Description";
          }

          if (!values.email) {
            errors.email = "Please, provide Course Type";
          }

          if (!values.phone_number) {
            errors.phone_number = "Please, provide Course SubType";
          }
          if (!values.fathers_name) {
            errors.fathers_name = "Please, provide Course Fees";
          }
          if (!values.mother_name) {
            errors.mother_name = "Please, provide Course Duration";
          }
          if (!values.address) {
            errors.address = "Please, provide Admin ID";
          }


          return errors;
        }}
      /> */}

      <UpdateForm
        title="Student Update Process"
        message="Update Student"
        trigger= {
        <FaIcons.FaEdit/>
        
        }
        onSubmit={task => service.update(task)}
        submitText="Update"
        validate={values => {
          const errors = {};

          if (!values.student_id) {
            errors.student_id = "Please, provide Student ID";
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
          if (!values.fathers_name) {
            errors.fathers_name = "Please, provide Father's Name";
          }
          if (!values.mother_name) {
            errors.mother_name = "Please, provide Mother's Name";
          }
          if (!values.address) {
            errors.address = "Please, provide Address";
          }
          if (!values.gender) {
            errors.gender = "Please, provide Gender";
          }
          if (!values.dob) {
            errors.dob = "Please, provide Date Of Birth";
          }
          if (!values.alt_number) {
            errors.alt_number = "Please, provide Alternate Number";
          }
          if (!values.institution) {
            errors.institution = "Please, provide Institution Details";
          }
          if (!values.educational_qualification) {
            errors.educational_qualification = "Please, provide Qualification Details";
          }
          if (!values.photo) {
            errors.photo = "Please, provide Photo";
          }
          if (!values.professional_exp) {
            errors.professional_exp = "Please, provide Experience Details";
          }



          return errors;
        }}
      />
      {/* <DeleteForm
        title="Student Delete Process"
        message="Are you sure you want to delete the Student?"
        trigger="Delete"
        onSubmit={task => service.delete(task)}
        submitText="Delete"
        validate={values => {
          const errors = {};
          if (!values.student_id) {
            errors.student_id = "Please, provide Student ID";
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
          return errors;
        }}
      /> */}
      <Pagination
        itemsPerPage={7}
        activePage = {1}
        fetchTotalOfItems={payload => service.fetchTotal(payload)}
      />
    </CRUDTable>
      </div>)
}
  else if(sessiondetails.userType==="admin")
  {    
      return (<div> <CRUDTable
      caption="STUDENTS"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field name="student_id" label="Student ID" placeholder="Student ID" readOnly/>
        <Field name="name" label="Name" placeholder="Name"  />
        <Field name="email" label="Email" placeholder="Email" readOnly />
        <Field name="phone_number" label="Phone Number" placeholder="Phone Number" type="number" />
        <Field name="fathers_name" label="Father's Name" placeholder="Father's Name" hideFromTable />
        <Field name="mother_name" label="Mother's Name" placeholder="Mother's Name" hideFromTable/>
        <Field name="address" label="Address" placeholder="Address" hideFromTable/>
        <Field name="gender" label="Gender" placeholder="Gender" />
        <Field name="dob" label="Date Of Birth" placeholder="Date Of Birth" hideFromTable/>
        <Field name="alt_number" label="Alternate Number" placeholder="Alternate Number" type="number" hideFromTable/>
        <Field name="institution" label="Institution" placeholder="Institution" />
        <Field name="educational_qualification" label="Educational qualification" placeholder="Educational Qualification" hideFromTable/>
        <Field name="photo" label="Photo" placeholder="Photo" hideFromTable hideInUpdateFrom/>
        <Field name="professional_exp" label="Professional Experience" placeholder="Professional Experience" hideFromTable type="number" />
      </Fields>
      {/* <CreateForm
        title="Student Creation"
        message="Create a new Student!"
        trigger="Create Student"
        onSubmit={task => service.create(task)}
        submitText="Create"
        validate={values => {
          const errors = {};
              if (!values.student_id) {
            errors.student_id = "Please, provide Student ID";
          }

          if (!values.name) {
            errors.student_id = "Please, provide Course Description";
          }

          if (!values.email) {
            errors.email = "Please, provide Course Type";
          }

          if (!values.phone_number) {
            errors.phone_number = "Please, provide Course SubType";
          }
          if (!values.fathers_name) {
            errors.fathers_name = "Please, provide Course Fees";
          }
          if (!values.mother_name) {
            errors.mother_name = "Please, provide Course Duration";
          }
          if (!values.address) {
            errors.address = "Please, provide Admin ID";
          }


          return errors;
        }}
      /> */}

      <UpdateForm
        title="Student Update Process"
        message="Update Student"
        trigger= {
        <FaIcons.FaEdit/>
        
        }
        onSubmit={task => service.update(task)}
        submitText="Update"
        validate={values => {
          const errors = {};

          if (!values.student_id) {
            errors.student_id = "Please, provide Student ID";
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
          if (!values.fathers_name) {
            errors.fathers_name = "Please, provide Father's Name";
          }
          if (!values.mother_name) {
            errors.mother_name = "Please, provide Mother's Name";
          }
          if (!values.address) {
            errors.address = "Please, provide Address";
          }
          if (!values.gender) {
            errors.gender = "Please, provide Gender";
          }
          if (!values.dob) {
            errors.dob = "Please, provide Date Of Birth";
          }
          if (!values.alt_number) {
            errors.alt_number = "Please, provide Alternate Number";
          }
          if (!values.institution) {
            errors.institution = "Please, provide Institution Details";
          }
          if (!values.educational_qualification) {
            errors.educational_qualification = "Please, provide Qualification Details";
          }
          if (!values.photo) {
            errors.photo = "Please, provide Photo";
          }
          if (!values.professional_exp) {
            errors.professional_exp = "Please, provide Experience Details";
          }



          return errors;
        }}
      />
      {/* <DeleteForm
        title="Student Delete Process"
        message="Are you sure you want to delete the Student?"
        trigger="Delete"
        onSubmit={task => service.delete(task)}
        submitText="Delete"
        validate={values => {
          const errors = {};
          if (!values.student_id) {
            errors.student_id = "Please, provide Student ID";
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
          return errors;
        }}
      /> */}
      <Pagination
        itemsPerPage={7}
        activePage = {1}
        fetchTotalOfItems={payload => service.fetchTotal(payload)}
      />
    </CRUDTable></div>)
}
  else if(sessiondetails.userType==="employee")
  {    
      return (<div><CRUDTable
      caption="STUDENTS"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field name="student_id" label="student_id" placeholder="student_id" readOnly />
        <Field name="name" label="name" placeholder="name" readOnly/>
        <Field name="email" label="Email" placeholder="Email" readOnly/>
      </Fields>
      <Pagination
        itemsPerPage={7}
        activePage = {1}
        fetchTotalOfItems={payload => service.fetchTotal(payload)}
      />
    </CRUDTable>
</div>)
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

// // Component's Base CSS
// //import "./index.css";
// const DescriptionRenderer = ({ field }) => <textarea {...field} />;
// // console.log();

// function deletestudent(AdminStudentsRow){
//   const url = APIData.api+'students/' + AdminStudentsRow.student_id;  
//   axios
//         .delete(url)
//         .then(response => {
//           if(response.status==200){
//             window.location.reload("/");
//            }
//            else{
//              toast('Delete Failed')
//            }
//         })
//         .catch(error => {
//           toast("It's Time To Grab A coffee")
//         })
// }

let tasks = [];

function getTask(testTask){
   // console.log(testTask);
    tasks = testTask;
}

// function PostUpdateStudent(AdminStudentsRow){
//     //console.log(AdminStudentsRow);
// axios.post(APIData.api+'students/', AdminStudentsRow, {headers:APIData.headers})
//       .then(response => {
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
  
    if (data.field === "student_id") {
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
    else if (data.field === "fathers_name"){
      sorter =
        data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
    }
    else if (data.field === "mother_name"){
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
      else if (data.field === "educational_qualification"){
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
    return Promise.resolve(task);
  },
  update: data => {
    const task = tasks.find(t => t.student_id === data.student_id);
    data.updatedBy = sessiondetails.user;
    window.responseload.responseloading();
    axios.post(APIData.api+'students/', data, {headers:APIData.headers})
      .then(response => {
        if(response.data.status.toString().toLowerCase() =="success"){
          toast(response.data.description)
          task.name = data.name;
          task.phone_number = data.phone_number;
          task.fathers_name = data.fathers_name;
          task.mother_name = data.mother_name;
          task.address = data.address;
          task.gender = data.gender;
          task.alt_number = data.alt_number;
          task.institution = data.institution;
          task.educational_qualification = data.educational_qualification;
          task.photo = data.photo;
          task.professional_exp = data.professional_exp;
          task.updated_date_time = APIData.date;
          task.dob = data.dob;
          task.updatedBy = sessiondetails.user;  
          window.responseload.responseloading();
        }
        else{        
          toast(response.data.errorDesc)
          window.responseload.responseloading();
        }
      })
      .catch(error => {
        window.responseload.responseloading();
        toast('Update Failed')
      })
    return Promise.resolve(task);
  },
  delete: data => {
     const task = tasks.find(t => t.student_id === data.student_id);
     tasks = tasks.filter(t => t.student_id !== task.student_id);
     return Promise.resolve(task);
   }
};

const styles = {
  container: { margin: "auto", width: "fit-content" }
};

const Students = () => (        
   <div style={styles.container}>
            {returntypebased()}
  </div>
)


class StudentData extends Component {
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
        {this.state.loading ? <Loading/>: <Students />}
      </div>
      </div>
      );
    }
  }
   
  export default StudentData;