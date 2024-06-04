import React from "react";
import axios from "axios";
import "../CRUDTable.css";
import { Component } from "react";
import { APIData } from "../Authentication/APIData";
import { toast } from "react-toastify";
import * as AiIcons from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";
import CRUDTable, {
  Fields,
  Field,
  // CreateForm,
  UpdateForm,
  DeleteForm,
  Pagination,
} from "react-crud-table";
import { Link } from "react-router-dom";
import Loading from "../Loading";
toast.configure();
// const DescriptionRenderer = ({ field }) => <button {...field} />;
var total = 0;
const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));

function returntypebased() {
  if (sessiondetails) {
    if (sessiondetails.userType === "superadmin") {
      return (
        <div>
          <div>
            <Link to="addExpenses">
              <div className="Upload">
                <AiIcons.AiOutlinePlusCircle />
              </div>
            </Link>

            <CRUDTable
              caption="EXPENSES"
              fetchItems={(payload) => service.fetchItems(payload)}
            >
              <Fields>
                <Field
                  name="id"
                  label="ID"
                  placeholder="Don't Enter the ID"
                  type="number"
                  readOnly
                  hideInCreateForm
                />
                <Field name="cost" label="cost" placeholder="cost" readOnly />
                <Field
                  name="exp_date"
                  label="Date"
                  placeholder="expense date"
                  type="date"
                  readOnly
                />
                <Field
                  name="exp_name"
                  label="Name"
                  placeholder="Expense Name"
                  readOnly
                />
                <Field
                  name="exp_type"
                  label="Type"
                  placeholder="Expense Type"
                  readOnly
                />
                <Field
                  name="item_count"
                  label="Item count"
                  placeholder="Item count"
                  readOnly
                />
                <Field
                  name="month"
                  label="Month"
                  placeholder="Month"
                  type="month"
                  readOnly
                />
                <Field name="status" label="Status" placeholder="Status" />
                <Field name="reason" label="Reason" placeholder="Reason" />
                <Field
                  name="created_by"
                  label="Uploaded By"
                  placeholder="Uploaded By"
                  readOnly
                  hideInCreateForm
                  hideInUpdateForm
                />
              </Fields>

              {/* 
            <CreateForm
        title="Expense Creation"
        message="Create a new Expense!"
        trigger={<AiIcons.AiOutlinePlusCircle/>}
        onSubmit={task => service.create(task)}
        submitText="Create"
        validate={values => {
          const errors = {};
          //     if (!values.id) {
          //   errors.id = "Please, provide exp_type Table ID";
          // }

          if (!values.cost) {
            errors.cost = "Please, provide cost";
          }

          if (!values.exp_date) {
            errors.exp_date = "Please, provide expense date";
          }

          if (!values.exp_name) {
            errors.exp_name = "Please, provide expense Name";
          }
          if (!values.exp_type) {
            errors.exp_type = "Please, provide expense type";
          }
          if (!values.month) {
            errors.month = "Please, provide Month";
          }
          if (!values.reciept) {
            errors.reciept = "Please, upload reciept";
          }
          if (!values.status) {
            errors.status = "Please, provide status";
          }
          if (values.status!=="pending" && values.status!=="completed" && values.status!=="rejected" ) {
            errors.status = "Please, provide status only as 'completed' or 'pending' or 'rejected'";
          }


          return errors;
        }}
      /> */}

              <UpdateForm
                title="Expense Download Process"
                message="Download Expense"
                trigger={<AiIcons.AiOutlineCloudDownload />}
                onSubmit={(task) => service.download(task)}
                submitText="Download"
                validate={(values) => {
                  const errors = {};
                  if (!values.cost) {
                    errors.cost = "Please, provide cost";
                  }

                  if (!values.exp_date) {
                    errors.exp_date = "Please, provide expense date";
                  }

                  if (!values.exp_name) {
                    errors.exp_name = "Please, provide expense Name";
                  }
                  if (
                    values.exp_type.toLowerCase() !== "personal" &&
                    values.exp_type.toLowerCase() !== "miscellaneous" &&
                    values.exp_type.toLowerCase() !== "office" &&
                    values.exp_type.toLowerCase() !== "travel"
                  ) {
                    errors.exp_type =
                      "Please, provide personal or office or travel or miscellaneous";
                  }
                  if (!values.exp_type) {
                    errors.exp_type = "Please, provide expense type";
                  }
                  if (!values.item_count) {
                    errors.item_count = "Please, provide item count";
                  }
                  if (!values.month) {
                    errors.month = "Please, provide Month";
                  }
                  if (!values.reciept) {
                    errors.reciept = "Please, provide reciept";
                  }
                  if (!values.status) {
                    errors.status = "Please, provide status";
                  }
                  if (
                    values.status !== "pending" &&
                    values.status !== "completed" &&
                    values.status !== "rejected"
                  ) {
                    errors.status =
                      "Please, provide status only as 'completed' or 'pending' or 'rejected'";
                  }

                  return errors;
                }}
              />
              <DeleteForm
                title="Expense Delete Process"
                message="Are you sure you want to delete the Expense?"
                trigger={<AiIcons.AiFillDelete />}
                onSubmit={(task) => service.delete(task)}
                submitText="Delete"
                validate={(values) => {
                  const errors = {};
                  if (!values.id) {
                    errors.id = "Please, provide Course ID";
                  }

                  return errors;
                }}
              />
              <Pagination
                itemsPerPage={7}
                activePage={1}
                fetchTotalOfItems={(payload) => service.fetchTotal(payload)}
              />
            </CRUDTable>
          </div>
          <div style={{ float: "right" }}>
            <div ><b>  &nbsp; Total:&nbsp;{'\u20B9'}{parseFloat(total)}</b></div>
          </div>
        </div>
      );
    } else if (sessiondetails.userType === "admin") {
      return (
        <div>
          <Link to="addExpenses">
            <div className="Upload">
              <AiIcons.AiOutlinePlusCircle />
            </div>
          </Link>
          <CRUDTable
            caption="EXPENSES"
            fetchItems={(payload) => service.fetchItems(payload)}
          >
            <Fields>
              <Field
                name="id"
                label="ID"
                placeholder="Don't Enter the ID"
                type="number"
                readOnly
                hideInCreateForm
              />
              <Field name="cost" label="cost" placeholder="cost" readOnly />
              <Field
                name="exp_date"
                label="Date"
                placeholder="expense date"
                type="date"
                readOnly
              />
              <Field
                name="exp_name"
                label="Name"
                placeholder="Expense Name"
                readOnly
              />
              <Field
                name="exp_type"
                label="Type"
                placeholder="Expense Type"
                readOnly
              />
              <Field
                name="item_count"
                label="Item count"
                placeholder="Item count"
                readOnly
              />
              <Field
                name="month"
                label="Month"
                placeholder="Month"
                type="month"
                readOnly
              />
              <Field
                name="reason"
                label="Reason"
                placeholder="Reason"
                readOnly
              />
              <Field
                name="status"
                label="Status"
                placeholder="Status"
                readOnly
              />
            </Fields>

            {/* 
            <CreateForm
        title="Expense Creation"
        message="Create a new Expense!"
        trigger={<AiIcons.AiOutlinePlusCircle/>}
        onSubmit={task => service.create(task)}
        submitText="Create"
        validate={values => {
          const errors = {};
          //     if (!values.id) {
          //   errors.id = "Please, provide exp_type Table ID";
          // }

          if (!values.cost) {
            errors.cost = "Please, provide cost";
          }

          if (!values.exp_date) {
            errors.exp_date = "Please, provide expense date";
          }

          if (!values.exp_name) {
            errors.exp_name = "Please, provide expense Name";
          }
          if (!values.exp_type) {
            errors.exp_type = "Please, provide expense type";
          }
          if (!values.month) {
            errors.month = "Please, provide Month";
          }
          if (!values.reciept) {
            errors.reciept = "Please, upload reciept";
          }
          if (!values.status) {
            errors.status = "Please, provide status";
          }
          if (values.status!=="pending" && values.status!=="completed" && values.status!=="rejected" ) {
            errors.status = "Please, provide status only as 'completed' or 'pending' or 'rejected'";
          }


          return errors;
        }}
      /> */}

            <UpdateForm
              title="Expense Download Process"
              message="Download Recipt"
              trigger={<AiIcons.AiOutlineDownload />}
              onSubmit={(task) => service.download(task)}
              submitText="Download"
              validate={(values) => {
                const errors = {};
                if (!values.cost) {
                  errors.cost = "Please, provide cost";
                }

                if (!values.exp_date) {
                  errors.exp_date = "Please, provide expense date";
                }

                if (!values.exp_name) {
                  errors.exp_name = "Please, provide expense Name";
                }
                if (
                  values.exp_type.toLowerCase() !== "personal" &&
                  values.exp_type.toLowerCase() !== "miscellaneous" &&
                  values.exp_type.toLowerCase() !== "office" &&
                  values.exp_type.toLowerCase() !== "travel"
                ) {
                  errors.exp_type =
                    "Please, provide personal or office or travel or miscellaneous";
                }
                if (!values.exp_type) {
                  errors.exp_type = "Please, provide expense type";
                }
                if (!values.item_count) {
                  errors.item_count = "Please, provide item count";
                }
                if (!values.month) {
                  errors.month = "Please, provide Month";
                }
                if (!values.reciept) {
                  errors.reciept = "Please, provide reciept";
                }
                if (!values.status) {
                  errors.status = "Please, provide status";
                }
                if (
                  values.status !== "pending" &&
                  values.status !== "completed" &&
                  values.status !== "rejected"
                ) {
                  errors.status =
                    "Please, provide status only as 'completed' or 'pending' or 'rejected'";
                }

                return errors;
              }}
            />
            <DeleteForm
              title="Expense Delete Process"
              message="Are you sure you want to delete the Expense?"
              trigger={<AiIcons.AiFillDelete />}
              onSubmit={(task) => service.delete(task)}
              submitText="Delete"
              validate={(values) => {
                const errors = {};
                if (!values.id) {
                  errors.id = "Please, provide Course ID";
                }

                return errors;
              }}
            />
            <Pagination
              itemsPerPage={7}
              activePage={1}
              fetchTotalOfItems={(payload) => service.fetchTotal(payload)}
            />
          </CRUDTable>
        </div>
      );
    }
    // else if(sessiondetails.userType==="student"){
    // }
    else if (sessiondetails.userType === "employee") {
      return (
        <div>
          <Link to="addExpenses">
            <div className="Upload">
              <AiIcons.AiOutlinePlusCircle />
            </div>
          </Link>

          <CRUDTable
            caption="EXPENSES"
            fetchItems={(payload) => service.fetchItems(payload)}
          >
            <Fields>
              <Field
                name="id"
                label="ID"
                placeholder="Don't Enter the ID"
                type="number"
                readOnly
                hideInCreateForm
              />
              <Field name="cost" label="cost" placeholder="cost" readOnly />
              <Field
                name="exp_date"
                label="Date"
                placeholder="expense date"
                type="date"
                readOnly
              />
              <Field
                name="exp_name"
                label="Name"
                placeholder="Expense Name"
                readOnly
              />
              <Field
                name="exp_type"
                label="Type"
                placeholder="Expense Type"
                readOnly
              />
              <Field
                name="item_count"
                label="Item count"
                placeholder="Item count"
                readOnly
              />
              <Field
                name="month"
                label="Month"
                placeholder="Month"
                type="month"
                readOnly
              />
              <Field
                name="reason"
                label="Reason"
                placeholder="Reason"
                readOnly
              />
              <Field
                name="status"
                label="Status"
                placeholder="Status"
                readOnly
              />
            </Fields>

            {/* 
     <CreateForm
 title="Expense Creation"
 message="Create a new Expense!"
 trigger={<AiIcons.AiOutlinePlusCircle/>}
 onSubmit={task => service.create(task)}
 submitText="Create"
 validate={values => {
   const errors = {};
   //     if (!values.id) {
   //   errors.id = "Please, provide exp_type Table ID";
   // }

   if (!values.cost) {
     errors.cost = "Please, provide cost";
   }

   if (!values.exp_date) {
     errors.exp_date = "Please, provide expense date";
   }

   if (!values.exp_name) {
     errors.exp_name = "Please, provide expense Name";
   }
   if (!values.exp_type) {
     errors.exp_type = "Please, provide expense type";
   }
   if (!values.month) {
     errors.month = "Please, provide Month";
   }
   if (!values.reciept) {
     errors.reciept = "Please, upload reciept";
   }
   if (!values.status) {
     errors.status = "Please, provide status";
   }
   if (values.status!=="pending" && values.status!=="completed" && values.status!=="rejected" ) {
     errors.status = "Please, provide status only as 'completed' or 'pending' or 'rejected'";
   }


   return errors;
 }}
/> */}

            <UpdateForm
              title="Expense Download Process"
              message="Download Recipt"
              trigger={<AiIcons.AiOutlineDownload />}
              onSubmit={(task) => service.download(task)}
              submitText="Download"
              validate={(values) => {
                const errors = {};
                if (!values.cost) {
                  errors.cost = "Please, provide cost";
                }

                if (!values.exp_date) {
                  errors.exp_date = "Please, provide expense date";
                }

                if (!values.exp_name) {
                  errors.exp_name = "Please, provide expense Name";
                }
                if (
                  values.exp_type.toLowerCase() !== "personal" &&
                  values.exp_type.toLowerCase() !== "miscellaneous" &&
                  values.exp_type.toLowerCase() !== "office" &&
                  values.exp_type.toLowerCase() !== "travel"
                ) {
                  errors.exp_type =
                    "Please, provide personal or office or travel or miscellaneous";
                }
                if (!values.exp_type) {
                  errors.exp_type = "Please, provide expense type";
                }
                if (!values.item_count) {
                  errors.item_count = "Please, provide item count";
                }
                if (!values.month) {
                  errors.month = "Please, provide Month";
                }
                if (!values.reciept) {
                  errors.reciept = "Please, provide reciept";
                }
                if (!values.status) {
                  errors.status = "Please, provide status";
                }
                if (
                  values.status !== "pending" &&
                  values.status !== "completed" &&
                  values.status !== "rejected"
                ) {
                  errors.status =
                    "Please, provide status only as 'completed' or 'pending' or 'rejected'";
                }

                return errors;
              }}
            />
            <DeleteForm
              title="Expense Delete Process"
              message="Are you sure you want to delete the Expense?"
              trigger={<AiIcons.AiFillDelete />}
              onSubmit={(task) => service.delete(task)}
              submitText="Delete"
              validate={(values) => {
                const errors = {};
                if (!values.id) {
                  errors.id = "Please, provide Course ID";
                }

                return errors;
              }}
            />
            <Pagination
              itemsPerPage={7}
              activePage={1}
              fetchTotalOfItems={(payload) => service.fetchTotal(payload)}
            />
          </CRUDTable>
        </div>
      );
    } else if (sessiondetails.userType === "user") {
    }
  }
}

let tasks = [];
function getTask(testTask) {
  testTask.forEach(function (item) {
    if (item.status.toLowerCase() == "completed") total += parseInt(item.cost);
  });
  if (sessiondetails.userType !== "superadmin") {
    testTask = testTask.filter(
      (element) => element.created_by == sessiondetails.user
    );
  }

  tasks = testTask;
}

// function PostExpense(AdminExpense){
//   var senddata={
//     id:AdminExpense.id,
//     cost : AdminExpense.cost,
//     exp_date : AdminExpense.exp_date,
//     exp_name : AdminExpense.exp_name,
//     exp_type : AdminExpense.exp_type,
//     item_count : AdminExpense.item_count,
//     month : AdminExpense.month,
//     status : AdminExpense.status,
//   }
//  axios
//       .post(APIData.api+'expenses/', senddata, {headers:APIData.headers})
//       .then(response => {
//        //console.log(response)
//         if(response.data.status.toString().toLowerCase() =="success"){
//           toast(response.data.description)
//           //window.location.reload();
//         }
//         else{
//           toast(response.data.errorDesc)
//           //window.location.reload()
//         }
//       })
//       .catch(error => {
//         console.log(error)
//         toast("It's time To Grab A Coffee")
//       })
// }

// function deleteExpense(AdminExpense){
//   //console.log(AdminExpense.id);
//   const url = APIData.api+'expenses/' + AdminExpense.id;
//   axios
//               .delete(url,{headers:APIData.headers})

//         .then(response => {
//           if(response.status==200){
//             window.location.reload("/");
//            }
//         })
//         .catch(error => {
//           toast("It's time To Grab A Coffeee")
//         })
//   }
const SORTERS = {
  NUMBER_ASCENDING: (mapper) => (a, b) => mapper(a) - mapper(b),
  NUMBER_DESCENDING: (mapper) => (a, b) => mapper(b) - mapper(a),
  STRING_ASCENDING: (mapper) => (a, b) => mapper(a).localeCompare(mapper(b)),
  STRING_DESCENDING: (mapper) => (a, b) => mapper(b).localeCompare(mapper(a)),
};

const getSorter = (data) => {
  const mapper = (x) => x[data.field];
  let sorter = SORTERS.STRING_ASCENDING(mapper);

  if (data.field === "exp_type") {
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  } else if (data.field === "cost") {
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  } else if (data.field === "exp_date") {
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  } else if (data.field === "exp_name") {
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  } else if (data.field === "item_count") {
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  } else if (data.field === "month") {
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  } else if (data.field === "reciept") {
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  } else if (data.field === "created_by") {
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  } else {
    sorter =
      data.direction === "ascending"
        ? SORTERS.NUMBER_ASCENDING(mapper)
        : SORTERS.NUMBER_DESCENDING(mapper);
  }

  return sorter;
};
const service = {
  fetchItems: (payload) => {
    const { activePage, itemsPerPage } = payload.pagination;
    const start = (activePage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    let result = Array.from(tasks);
    result = result.sort(getSorter(payload.sort));
    return Promise.resolve(result.slice(start, end));
  },
  fetchTotal: (payload) => {
    return Promise.resolve(tasks.length);
  },
  create: (task) => {
    tasks.push({});
    return Promise.resolve(task);
  },
  download: (data) => {
    window.responseload.responseloading();
    axios
      .get(APIData.api + "expenses/download/" + data.id, {
        headers: APIData.headers,
      })
      .then((response) => {
        window.responseload.responseloading();
        window.location.href = response.request.responseURL;
      })
      .catch((error) => {
        window.responseload.responseloading();
        toast("It's time To Grab A Coffee");
      });
    return Promise.resolve(data);
  },
  update: (data) => {
    const task = tasks.find((t) => t.id === data.id);
    var expensedata = {
      id: data.id,
      cost: data.cost,
      exp_date: data.exp_date,
      exp_name: data.exp_name,
      exp_type: data.exp_type,
      item_count: data.item_count,
      month: data.month,
      status: data.status,
    };
    window.responseload.responseloading();
    axios
      .post(APIData.api + "expenses/", expensedata, {
        headers: APIData.headers,
      })
      .then((response) => {
        if (response.data.status.toString().toLowerCase() == "success") {
          toast(response.data.description);
          task.cost = data.cost;
          task.exp_date = data.exp_date;
          task.exp_name = data.exp_name;
          task.exp_type = data.exp_type;
          task.item_count = data.item_count;
          task.month = data.month;
          task.reciept = data.reciept;
          task.status = data.status;
          window.responseload.responseloading();
        } else {
          toast(response.data.errorDesc);
          window.responseload.responseloading();
        }
      })
      .catch((error) => {
        window.responseload.responseloading();
        toast("It's time To Grab A Coffee");
      });
    return Promise.resolve(task);
  },
  delete: (data) => {
    const task = tasks.find((t) => t.id === data.id);
    const url = APIData.api + "expenses/" + data.id;
    window.responseload.responseloading();
    axios
      .delete(url, { headers: APIData.headers })
      .then((response) => {
        if (response.status == 200) {
          toast("Expense Deleted");
          tasks = tasks.filter((t) => t.id !== task.id);
          window.responseload.responseloading();
        }
      })
      .catch((error) => {
        toast("It's time To Grab A Coffeee");
        window.responseload.responseloading();
      });

    return Promise.resolve(task);
  },
};

const styles = {
  container: { margin: "auto", width: "fit-content" },
};

const Expense = () => <div style={styles.container}>{returntypebased()}</div>;

class ExpenseData extends Component {
  state = {
    loading: false,
  };
  constructor(props) {
    super(props);
    window.responseload = this;
    getTask(this.props.data);
  }
  responseloading() {
    this.setState({ loading: !this.state.loading });
  }
  render() {
    return (
      <div>
        <div>{this.state.loading ? <Loading /> : <Expense />}</div>
        <br />
        <br />
      </div>
    );
  }
}

export default ExpenseData;
