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
  CreateForm,
  UpdateForm,
  DeleteForm,
  Pagination,
} from "react-crud-table";
import Loading from "../Loading";
import { Link } from "react-router-dom";
import DownloadLink from "react-download-link";
const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
var today = new Date(),
  date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

toast.configure();

// Component's Base CSS
//import "./index.css";

function returntypebased() {
  if (sessiondetails) {
    if (sessiondetails.userType === "superadmin") {
      return (
        <div>
          <Link to="createTimeTable">
            <div className="Upload01">
              <AiIcons.AiOutlinePlusCircle />
            </div>
          </Link>
          <Link to="viewTimeTable">
            <div className="Upload01">
              <AiIcons.AiOutlineEye />
            </div>
          </Link>
          <CRUDTable
            caption="TIME TABLE"
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
                hideFromTable
              />
              <Field
                name="day"
                label="Day"
                placeholder="Day"
                type=""
                readOnly
              />
              <Field name="time" label="Time" placeholder="Time"  />
              <Field name="subject" label="Subject" placeholder="Subject" />
              <Field
                name="facultyname"
                label="Faculty Name"
                placeholder="Faculty Name"
              />

              <Field
                name="course"
                label="Course"
                placeholder="Course"
                readOnly
              />
              <Field
                name="createdDate"
                label="Created Date"
                placeholder="Created Date"
                type="date"
                hideInCreateForm
                hideInUpdateForm
                hideFromTable
              />
            </Fields>
            {/* <CreateForm
            title="Time Table Creation"
            message="Create a new Time Table!"
            trigger={<AiIcons.AiOutlinePlusCircle />}
            onSubmit={(task) => service.create(task)}
            submitText="Create"
            validate={(values) => {
              const errors = {};
              //     if (!values.id) {
              //   errors.id = "Please, provide Time Table ID";
              // }

              if (!values.day) {
                errors.day = "Please, provide Day";
              }

              if (!values.subject) {
                errors.subject = "Please, provide Subject";
              }

              if (!values.facultyname) {
                errors.facultyname = "Please, provide Faculty Name";
              }
              if (!values.time) {
                errors.time = "Please, provide Time";
              }
              if (!values.course) {
                errors.course = "Please, provide course";
              }
              // if(values.createdDate){
              //   errors.createdDate=""
              // }

              return errors;
            }}
          /> */}

            <UpdateForm
              title="TimeTable Update Process"
              message="Update Course"
              trigger={<AiIcons.AiFillEdit />}
              onSubmit={(task) => service.update(task)}
              submitText="Update"
              validate={(values) => {
                const errors = {};

                if (!values.id) {
                  errors.id = "Please, provide Course ID";
                }

                if (!values.day) {
                  errors.day = "Please, provide Course Description";
                }

                if (!values.subject) {
                  errors.subject = "Please, provide Course Type";
                }

                if (!values.facultyname) {
                  errors.facultyname = "Please, provide Course SubType";
                }
                if (!values.time) {
                  errors.time = "Please, provide Course Fees";
                }
                if (!values.course) {
                  errors.course = "Please, provide Course Duration";
                }
                // if (!values.createdDate) {
                //   errors.createdDate = "Please, provide Admin ID";
                // }

                return errors;
              }}
            />
            <DeleteForm
              title="TimeTable Delete Process"
              message="Are you sure you want to delete the Course?"
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
    } else if (sessiondetails.userType === "admin") {
      return (
        <div>
          <Link to="createTimeTable">
            <div className="Upload01">
              <AiIcons.AiOutlinePlusCircle />
            </div>
          </Link>
          <Link to="viewTimeTable">
            <div className="Upload01">
              <AiIcons.AiOutlineEye />
            </div>
          </Link>

          <CRUDTable
            caption="TIME TABLE"
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
              <Field
                name="day"
                label="Day"
                placeholder="Day"
                type=""
                readOnly
              />
              <Field name="time" label="Time" placeholder="Time" readOnly />
              <Field name="subject" label="Subject" placeholder="Subject" />
              <Field
                name="facultyname"
                label="Faculty Name"
                placeholder="Faculty Name"
              />

              <Field
                name="course"
                label="Course"
                placeholder="Course"
                readOnly
              />
              <Field
                name="createdDate"
                label="Created Date"
                placeholder="Created Date"
                type="date"
                hideInCreateForm
                hideInUpdateForm
              />
            </Fields>
            {/* <CreateForm
            title="Time Table Creation"
            message="Create a new Time Table!"
            trigger={<AiIcons.AiOutlinePlusCircle />}
            onSubmit={(task) => service.create(task)}
            submitText="Create"
            validate={(values) => {
              const errors = {};
              //     if (!values.id) {
              //   errors.id = "Please, provide Time Table ID";
              // }

              if (!values.day) {
                errors.day = "Please, provide Day";
              }

              if (!values.subject) {
                errors.subject = "Please, provide Subject";
              }

              if (!values.facultyname) {
                errors.facultyname = "Please, provide Faculty Name";
              }
              if (!values.time) {
                errors.time = "Please, provide Time";
              }
              if (!values.course) {
                errors.course = "Please, provide course";
              }
              // if(values.createdDate){
              //   errors.createdDate=""
              // }

              return errors;
            }}
          /> */}

            <UpdateForm
              title="TimeTable Update Process"
              message="Update Course"
              trigger={<AiIcons.AiFillEdit />}
              onSubmit={(task) => service.update(task)}
              submitText="Update"
              validate={(values) => {
                const errors = {};

                if (!values.id) {
                  errors.id = "Please, provide Course ID";
                }

                if (!values.day) {
                  errors.day = "Please, provide Course Description";
                }

                if (!values.subject) {
                  errors.subject = "Please, provide Course Type";
                }

                if (!values.facultyname) {
                  errors.facultyname = "Please, provide Course SubType";
                }
                if (!values.time) {
                  errors.time = "Please, provide Course Fees";
                }
                if (!values.course) {
                  errors.course = "Please, provide Course Duration";
                }
                // if (!values.createdDate) {
                //   errors.createdDate = "Please, provide Admin ID";
                // }

                return errors;
              }}
            />
            <DeleteForm
              title="TimeTable Delete Process"
              message="Are you sure you want to delete the Course?"
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
    } else if (sessiondetails.userType === "student") {
      return (
        <div>
          <Link to="viewTimeTable">
            <div className="Upload01">
              <AiIcons.AiOutlineEye />
            </div>
          </Link>
          <CRUDTable
            caption="TIME TABLE"
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
                hideFromTable
              />
              <Field name="day" label="Day" placeholder="Day" type="" readOnly />
              <Field name="subject" label="Subject" placeholder="Subject" />
              <Field
                name="facultyname"
                label="Faculty Name"
                placeholder="Faculty Name"
              />
      
              <Field name="course" label="course" placeholder="course" readOnly />
              <Field
                name="createdDate"
                label="Created Date"
                placeholder="Created Date"
                type="date"
                hideInCreateForm
                hideInUpdateForm
              />
            </Fields>
            {/* <CreateForm
        title="Time Table Creation"
        message="Create a new Time Table!"
        trigger={<AiIcons.AiOutlinePlusCircle/>}
        onSubmit={task => service.create(task)}
        submitText="Create"
        validate={values => {
          const errors = {};
          //     if (!values.id) {
          //   errors.id = "Please, provide Time Table ID";
          // }
          if (!values.day) {
            errors.day = "Please, provide Day";
          }
          if (!values.subject) {
            errors.subject = "Please, provide Subject";
          }
          if (!values.facultyname) {
            errors.facultyname = "Please, provide Faculty Name";
          }
          if (!values.time) {
            errors.time = "Please, provide Time";
          }
          if (!values.course) {
            errors.course = "Please, provide course";
          }
          // if(values.createdDate){
          //   errors.createdDate=""
          // }
          return errors;
        }}
      />
      <UpdateForm
        title="TimeTable Update Process"
        message="Update Course"
        trigger= {<AiIcons.AiFillEdit />}
        onSubmit={task => service.update(task)}
        submitText="Update"
        validate={values => {
          const errors = {};
          if (!values.id) {
            errors.id = "Please, provide Course ID";
          }
          if (!values.day) {
            errors.day = "Please, provide Course Description";
          }
          if (!values.subject) {
            errors.subject = "Please, provide Course Type";
          }
          if (!values.facultyname) {
            errors.facultyname = "Please, provide Course SubType";
          }
          if (!values.time) {
            errors.time = "Please, provide Course Fees";
          }
          if (!values.course) {
            errors.course = "Please, provide Course Duration";
          }
          // if (!values.createdDate) {
          //   errors.createdDate = "Please, provide Admin ID";
          // }
          return errors;
        }}
      />
      <DeleteForm
        title="TimeTable Delete Process"
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
              itemsPerPage={7}
              activePage={1}
              fetchTotalOfItems={(payload) => service.fetchTotal(payload)}
            />
          </CRUDTable>
        </div>
      );
    } 
    
    else if (sessiondetails.userType === "employee") {
      return (
        <div>
          <Link to="viewTimeTable">
            <div className="Upload01">
              <AiIcons.AiOutlineEye />
            </div>
          </Link>
          <CRUDTable
            caption="TIME TABLE"
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
              <Field name="day" label="Day" placeholder="Day" type="" readOnly />
              <Field name="subject" label="Subject" placeholder="Subject" />
              <Field
                name="facultyname"
                label="Faculty Name"
                placeholder="Faculty Name"
              />
      
              <Field name="course" label="course" placeholder="course" readOnly />
              <Field
                name="createdDate"
                label="Created Date"
                placeholder="Created Date"
                type="date"
                hideInCreateForm
                hideInUpdateForm
              />
            </Fields>
            {/* <CreateForm
          title="Time Table Creation"
          message="Create a new Time Table!"
          trigger={<AiIcons.AiOutlinePlusCircle/>}
          onSubmit={task => service.create(task)}
          submitText="Create"
          validate={values => {
            const errors = {};
            //     if (!values.id) {
            //   errors.id = "Please, provide Time Table ID";
            // }
            if (!values.day) {
              errors.day = "Please, provide Day";
            }
            if (!values.subject) {
              errors.subject = "Please, provide Subject";
            }
            if (!values.facultyname) {
              errors.facultyname = "Please, provide Faculty Name";
            }
            if (!values.time) {
              errors.time = "Please, provide Time";
            }
            if (!values.course) {
              errors.course = "Please, provide course";
            }
            // if(values.createdDate){
            //   errors.createdDate=""
            // }
            return errors;
          }}
        />
      //   <UpdateForm
      //     title="TimeTable Update Process"
      //     message="Update Course"
      //     trigger= {<AiIcons.AiFillEdit />}
      //     onSubmit={task => service.update(task)}
      //     submitText="Update"
      //     validate={values => {
      //       const errors = {};
      //       if (!values.id) {
      //         errors.id = "Please, provide Course ID";
      //       }
      //       if (!values.day) {
      //         errors.day = "Please, provide Course Description";
      //       }
      //       if (!values.subject) {
      //         errors.subject = "Please, provide Course Type";
      //       }
      //       if (!values.facultyname) {
      //         errors.facultyname = "Please, provide Course SubType";
      //       }
      //       if (!values.time) {
      //         errors.time = "Please, provide Course Fees";
      //       }
      //       if (!values.course) {
      //         errors.course = "Please, provide Course Duration";
      //       }
      //       // if (!values.createdDate) {
      //       //   errors.createdDate = "Please, provide Admin ID";
      //       // }
      //       return errors;
      //     }}
      //   />
      //   <DeleteForm
      //     title="TimeTable Delete Process"
      //     message="Are you sure you want to delete the Course?"
      //     trigger={<AiIcons.AiFillDelete />}
      //     onSubmit={task => service.delete(task)}
      //     submitText="Delete"
      //     validate={values => {
      //       const errors = {};
      //           if (!values.id) {
      //         errors.id = "Please, provide Course ID";
      //       }
      //       return errors;
      //     }}
      //   /> */}
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

console.log();
let tasks = [];

function getTask(data) {
  tasks = data;
  var startTime, endTime;
  if(!tasks[0].time.includes("T"))
  {

  }
  else {
  for (var key in tasks) {
    startTime = String(new Date(tasks[key].time.split(",")[0]));
    endTime = String(new Date(tasks[key].time.split(",")[1]));
    startTime =
      String(new Date(startTime).getHours()) +
      String(":") +
      String(new Date(startTime).getMinutes());
    endTime =
      String(new Date(endTime).getHours()) +
      String(":") +
      String(new Date(endTime).getMinutes());
    tasks[key].time = startTime + " - " + endTime;
  }
}
console.log(tasks)
}
// function PostTimeTable(AdminTimeTable){

//   var senddata={
//     day : AdminTimeTable.day,
//     subject : AdminTimeTable.subject,
//     facultyname : AdminTimeTable.facultyname,
//     time : AdminTimeTable.time,
//     course : AdminTimeTable.course,
//     createdDate : APIData.date
//   }
// axios
//       .post(APIData.api+'timetable/', senddata, {headers:APIData.headers})
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
//         console.log(error)
//         toast("It's Time To Grab A Coffee")
//       })
// }

// function deleteTimeTable(AdminTimeTable){
//   const url = APIData.api+'timetable/' + AdminTimeTable.id;
//   axios
//               .delete(url,{headers:APIData.headers})

//         .then(response => {
//           if(response.status==200){
//             toast("Deleted")
//             window.location.reload();
//            }
//            else{
//              toast('Check With the courses,failed')
//            }
//         })
//         .catch(error => {
//           toast("It's Time To Grab A Coffeee")
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

  if (data.field === "time") {
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  } else if (data.field === "day") {
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  } else if (data.field === "subject") {
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  } else if (data.field === "facultyname") {
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  } else if (data.field === "course") {
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  } else if (data.field === "createdDate") {
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

// let count = tasks.length;
// console.log(count);
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
    var timetable = {
      day: task.day,
      subject: task.subject,
      facultyname: task.facultyname,
      time: task.time,
      course: task.course,
      createdDate: APIData.date,
    };

    window.responseload.responseloading();
    axios
      .post(APIData.api + "timetable/", timetable, { headers: APIData.headers })
      .then((response) => {
        if (response.data.status.toString().toLowerCase() == "success") {
          tasks.push({
            ...task,
          });
          toast(response.data.description);
          window.responseload.responseloading();
          window.location.reload();
        } else {
          toast(response.data.errorDesc);
        }
      })
      .catch((error) => {
        console.log(error);
        toast("It's Time To Grab A Coffee");
      });

    return Promise.resolve(task);
  },
  update: (data) => {
    const task = tasks.find((t) => t.id === data.id);
    var timetable = {
      id: data.id,
      day: data.day,
      subject: data.subject,
      facultyname: data.facultyname,
      time: data.time,
      course: data.course,
      createdDate: APIData.date,
    };
    window.responseload.responseloading();
    axios
      .post(APIData.api + "timetable/", timetable, { headers: APIData.headers })
      .then((response) => {
        if (response.data.status.toString().toLowerCase() == "success") {
          task.day = data.day;
          task.subject = data.subject;
          task.facultyname = data.facultyname;
          task.time = data.time;
          task.course = data.course;
          toast(response.data.description);
          window.responseload.responseloading();
        } else {
          toast(response.data.errorDesc);
          window.responseload.responseloading();
        }
      })
      .catch((error) => {
        window.responseload.responseloading();
        toast("It's Time To Grab A Coffee");
      });
    return Promise.resolve(task);
  },
  delete: (data) => {
    const task = tasks.find((t) => t.id === data.id);
    const url = APIData.api + "timetable/" + data.id;
    window.responseload.responseloading();
    axios
      .delete(url, { headers: APIData.headers })

      .then((response) => {
        if (response.data.status.toString().toLowerCase() == "success") {
          tasks = tasks.filter((t) => t.id !== task.id);
          toast(response.data.description);
          window.responseload.responseloading();
        } else {
          toast(response.data.errorDesc);
          window.responseload.responseloading();
        }
      })
      .catch((error) => {
        window.responseload.responseloading();
        toast("It's Time To Grab A Coffee");
      });

    return Promise.resolve(task);
  },
};

const styles = {
  container: { margin: "auto", width: "fit-content" },
};

const TimeTable = () => <div style={styles.container}>{returntypebased()}</div>;

class TimeTableData2 extends Component {
  state = {
    loading: false,
  };
  constructor(props) {
    super(props);
    window.responseload = this;
    // console.log("Props",this.props.data)
    getTask(this.props.data);
  }
  async componentDidMount()
  {
    // console.log("Async",this.props.data)
  }
  responseloading() {
    this.setState({ loading: !this.state.loading });
  }
  render() {
    return (
      <div>
        <div>{this.state.loading ? <Loading /> : <TimeTable />}</div>
      </div>
    );
  }
}
export default TimeTableData2;
