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
  DeleteForm,
  // CreateForm,
  // UpdateForm,
  Pagination
} from "react-crud-table";
// import CreateInvoice from "../Admin/CreateInvoice";
// import { AiOutlineCodeSandbox } from "react-icons/ai";
import { Link } from "react-router-dom";
import Loading from "../Loading";

toast.configure()
// const DescriptionRenderer = ({ field }) => <textarea {...field} />;
// console.log();
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

  if (data.field === "student_id") {
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  } 
  else if (data.field === "email_id"){
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
  else if (data.field === "test_date"){
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
    tasks.push({...task,
     });
    return Promise.resolve(task);
  },
  update: data => {
    const task = tasks.find(t => t.idinvoices === data.idinvoices);
    window.responseload.responseloading();
axios.post(APIData.api + 'invoices/',data , {headers:APIData.headers})
     .then(response => {
       if(response.data.status.toString().toLowerCase()=="success"){
         toast("Invoice Updated")
       task.student_id = data.student_id;
       task.email_id = data.email_id;
       task.paid = data.paid;
       task.date = data.date;
       task.due_date = data.due_date;
       task.course = data.course;
       task.balance = data.balance;
       window.responseload.responseloading(); 
      }
      else{
        toast("Update Failed")
        window.responseload.responseloading();
      }
     })
     .catch(error => {
       toast("It's Time to Grab A coffee")
     })
    return Promise.resolve(task);
  },
  delete: data => {
    const task = tasks.find(t => t.idinvoices == data.idinvoices);
    const url = APIData.api+"invoices/"+data.idinvoices;
    window.responseload.responseloading();
    axios.delete(url,{headers:APIData.headers})
          .then(response =>{
              if(response.data.status.toString().toLowerCase()==="success"){
              tasks = tasks.filter(t => t.idinvoices != task.idinvoices);
              toast(response.data.description)
              window.responseload.responseloading();
              }
              else{
                toast(response.data.errorDesc)
                window.responseload.responseloading();
              }
          })
          .catch(error=>{
            window.responseload.responseloading();
            toast("It's Time To Grab A Coffee")
          })
    return Promise.resolve(task);
  }
};

const styles = {
  container: { margin: "auto", width: "fit-content" }
};

const Invoice  = () => (
  
  
  <div style={styles.container}>
    <Link to = '/createInvoice'><div className="Upload"><AiIcons.AiFillPlusSquare /></div></Link>
    <CRUDTable
      caption="Invoices"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field name="idinvoices" label="ID" placeholder="ID" type="number" hideInCreateForm readOnly />
        <Field name="student_id" label="Student ID" placeholder="Student ID" />
        <Field name="email_id" label="email_id" placeholder="email_id" />
        <Field name="paid" label="paid" placeholder="paid" />
        <Field name="date" label="date" placeholder="date" type="date" />
        <Field name="due_date" label="due_date" placeholder="due_date" type="date"  />
        <Field name="course" label="course" placeholder="course" />
        <Field name="balance" label="balance" placeholder="balance" />
      </Fields>
      {/* <CreateForm
        title="Invoice Creation"
        message="Create a new Invoice!"
        trigger= {<FaIcons.FaPlusCircle/>}
        onSubmit={task => service.create(task)}
        submitText="Create"
        validate={values => {
          const errors = {};
          if (!values.student_id) {
            errors.student_id = "Please, provide Student ID";
          }

          if (!values.email_id) {
            errors.email_id = "Please, provide email id";
          }

          if (!values.paid) {
            errors.paid = "Please, provide amount paid";
          }
          if (!values.date) {
            errors.date = "Please, provide the date";
          }
          if (!values.due_date) {
            errors.due_date = "Please, provide duedate ";
          }
          if (!values.course) {
            errors.course = "Please, provide course name";
          }
          if (!values.balance) {
            errors.balance = "Please, provide balance amount";
          }
          

          return errors;
        }} 
      /> */}
      
{/* <UpdateForm
        title="Invoice  Process"
        message="update"
        trigger= {

<FaIcons.FaEdit/>


        }
        onSubmit={task => service.test(task)}
        submitText="Update"
        validate={values => {
          const errors = {};

          if (!values.student_id) {
            errors.student_id = "Please, provide Student ID";
          }

          if (!values.email_id) {
            errors.email_id = "Please, provide email id";
          }

          if (!values.paid) {
            errors.paid = "Please, provide amount paid";
          }
          if (!values.date) {
            errors.date = "Please, provide the date";
          }
          if (!values.due_date) {
            errors.due_date = "Please, provide duedate ";
          }
          if (!values.course) {
            errors.course = "Please, provide course name";
          }
          if (!values.balance) {
            errors.balance = "Please, provide balance amount";
          }
          

          return errors;
        }}
        /> */}
    <DeleteForm
        title="Invoice Delete Process"
        message="Are you sure you want to delete the Invoice?"
        trigger={<AiIcons.AiFillDelete/>        }
        onSubmit={task => service.delete(task)}
        submitText="Delete"
        validate={values => {
          const errors = {};
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


class InvoiceData extends Component {
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
        {this.state.loading ? <Loading/>: <Invoice />}
      </div>
      </div>
      );
    }
  }
   
  export default InvoiceData;