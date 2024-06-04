import React from "react";
import axios from "axios";
import "../CRUDTable.css";
import { Component } from "react";
import { toast } from "react-toastify";
import * as AiIcons from "react-icons/ai";
import { APIData } from "../Authentication/APIData";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Table, TableHead, TableBody, TableCell, TableRow, Button, Paper, Typography, Box } from '@material-ui/core';
import Loading from "../Loading";
import Pagination from '@material-ui/lab/Pagination';
import { withStyles } from '@material-ui/core/styles';
import { AiOutlineDownload, AiFillDelete, AiOutlineSortAscending, AiOutlineSortDescending, AiOutlinePlusCircle } from "react-icons/ai";
// import CRUDTable, {
//   Fields,
//   Field,
//   // CreateForm,
//   UpdateForm,
//   DeleteForm,
//   Pagination,
// } from "react-crud-table";


toast.configure();

let tasks = [];

const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});
class DocumentsData extends Component {
  state = {
    loading: false,
    sortField: "",
    sortDirection: "asc",
    currentPage: 1,
    itemsPerPage: 5
  }

  constructor(props) {
    super(props);
    window.responseload = this;
    this.getTask(this.props.data);
  }

  responseloading() {
    this.setState({ loading: !this.state.loading });
  }

  getTask = (testTask) => {
    tasks = testTask;
  }

  handleSort = (field) => {
    let direction = "asc";
    if (this.state.sortField === field && this.state.sortDirection === "asc") {
      direction = "desc";
    }
    this.setState({ sortField: field, sortDirection: direction });
  }

  handleDownload = (data) => {
    const url = APIData.api + 'file/' + data.id;
    window.location.href = url;
  };

  handleDelete = (data) => {
    const url = APIData.api + 'file/' + data.id;
    axios.delete(url, { headers: APIData.headers })
      .then(response => {
        if (response.data.status.toLowerCase() === "success") {
          toast(response.data.description);
          tasks = tasks.filter(t => t.id !== data.id);
        } else {
          toast(response.data.errorDesc);
        }
      })
      .catch(error => {
        toast("Error occurred while deleting file.");
      });
  };

  handlePageChange = (event, page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { loading, sortField, sortDirection, currentPage, itemsPerPage } = this.state;
    const { classes } = this.props;

    const sortedTasks = [...tasks].sort((a, b) => {
      const aValue = typeof a[this.state.sortField] === 'string' ? a[this.state.sortField].toLowerCase() : a[this.state.sortField];
      const bValue = typeof b[this.state.sortField] === 'string' ? b[this.state.sortField].toLowerCase() : b[this.state.sortField];

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentItems = sortedTasks.slice(firstIndex, lastIndex);

    return (
      <Box mt={4} display="flex" justifyContent="center" >
        <Box width="95%">
          <Paper className={classes.root} >
            <Box p={3} border="2px solid black">
              <Typography variant="h5" gutterBottom align="center">
              DOCUMENTS
              </Typography>
              {loading ? <Loading /> :
                <div>
                  <Link to="/uploadsingleoffice">
                    <Button startIcon={<AiOutlinePlusCircle style={{ color: "white" }} />} variant="contained" color="primary">Upload</Button>
                  </Link>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Typography variant="subtitle1">
                            File Name
                            <Button onClick={() => this.handleSort("fileName")}>
                              {sortField === "fileName" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "blue" }} /> : <AiOutlineSortDescending style={{ color: "blue" }} />}
                            </Button>
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle1">
                            File Size
                            <Button onClick={() => this.handleSort("file_size")}>
                              {sortField === "file_size" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "blue" }} /> : <AiOutlineSortDescending style={{ color: "blue" }} />}
                            </Button>
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle1">
                            Date of Upload
                            <Button onClick={() => this.handleSort("uploaded_date")}>
                              {sortField === "uploaded_date" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "blue" }} /> : <AiOutlineSortDescending style={{ color: "blue" }} />}
                            </Button>
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle1">
                            Uploaded By
                            <Button onClick={() => this.handleSort("uploaded_by")}>
                              {sortField === "uploaded_by" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "blue" }} /> : <AiOutlineSortDescending style={{ color: "blue" }} />}
                            </Button>
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle1">
                            Action
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentItems.map(task => (
                        <TableRow key={task.id}>
                          <TableCell>{task.fileName}</TableCell>
                          <TableCell>{task.file_size}</TableCell>
                          <TableCell>{task.uploaded_date}</TableCell>
                          <TableCell>{task.uploaded_by}</TableCell>
                          <TableCell >
                            <Button variant="contained" startIcon={<AiOutlineDownload style={{color: "green", }} />} onClick={() => this.handleDownload(task)} />
                            <Button  variant="contained" startIcon={<AiFillDelete style={{ color: "red" }} />} onClick={() => this.handleDelete(task)} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Box display="flex" justifyContent="center" mt={3}>
                    <Pagination count={Math.ceil(sortedTasks.length / itemsPerPage)} page={currentPage} onChange={this.handlePageChange} color="primary" size="small" />
                  </Box>
                </div>
              }
            </Box>
          </Paper>
        </Box>
      </Box>
    );
  }
}

export default withStyles(styles)(DocumentsData);
// function returntypebased() {
//   if (sessiondetails) {
//     if (sessiondetails.userType === "superadmin") {
//       return (
//         <div>
//           <Link to="/uploadsingle">
//             <div className="Upload">
//               <AiIcons.AiOutlinePlusCircle />
//             </div>
//           </Link>

//           <CRUDTable
//             caption="DOCUMENTS"
//             fetchItems={(payload) => service.fetchItems(payload)}
//           >
//             <Fields>
//               {/* <Field name="id" label="File ID" placeholder="File ID" readOnly /> */}
//               <Field
//                 name="fileName"
//                 label="File Name"
//                 placeholder="File Name"
//                 readOnly
//               />
//               <Field
//                 name="file_size"
//                 label="File Size"
//                 placeholder="File Size"
//                 readOnly
//               />
//               <Field
//                 name="uploaded_date"
//                 label="Date OF Uploade"
//                 placeholder="Date OF Uplode"
//                 readOnly
//               />
//               <Field
//                 name="course_type"
//                 label="Course"
//                 placeholder="Course"
//                 readOnly
//               />
//               <Field
//                 name="uploaded_by"
//                 label="Uploaded By"
//                 placeholder="Uploaded By"
//                 readOnly
//                 hideInUpdateFrom
//               />
//             </Fields>

//             <UpdateForm
//               title="File Download "
//               message="File Details"
//               trigger={<AiIcons.AiOutlineDownload />}
//               onSubmit={(task) => service.download(task)}
//               submitText="Download"
//               validate={(values) => {
//                 const errors = {};

//                 if (!values.id) {
//                   errors.id = "File Corrupted , Contact admin";
//                 }
//                 return errors;
//               }}
//             />
//             <DeleteForm
//               title="File Delete Process"
//               message="Are you sure you want to delete the File?"
//               trigger={<AiIcons.AiFillDelete />}
//               onSubmit={(task) => service.delete(task)}
//               submitText="Delete"
//               validate={(values) => {
//                 const errors = {};
//                 return errors;
//               }}
//             />
//             <Pagination
//               itemsPerPage={7}
//               activePage={1}
//               fetchTotalOfItems={(payload) => service.fetchTotal(payload)}
//             />
//           </CRUDTable>
//         </div>
//       );
//     } else if (sessiondetails.userType === "admin") {
//       return (
//         <div>
//           <Link to="/uploadsingle">
//             <div className="Upload">
//               <AiIcons.AiOutlinePlusCircle />
//             </div>
//           </Link>
//           <CRUDTable
//             caption="DOCUMENTS"
//             fetchItems={(payload) => service.fetchItems(payload)}
//           >
//             <Link to="/uploadsingle">
//               <div className="Upload">
//                 <AiIcons.AiOutlinePlusCircle />
//               </div>
//             </Link>

//             <Fields>
//               {/* <Field name="id" label="File ID" placeholder="File ID" readOnly /> */}
//               <Field
//                 name="fileName"
//                 label="File Name"
//                 placeholder="File Name"
//                 readOnly
//               />
//               <Field
//                 name="file_size"
//                 label="File Size"
//                 placeholder="File Size"
//                 readOnly
//               />
//               <Field
//                 name="uploaded_date"
//                 label="Date OF Uploade"
//                 placeholder="Date OF Uplode"
//                 readOnly
//               />
//               <Field
//                 name="course_type"
//                 label="Course"
//                 placeholder="Course"
//                 readOnly
//               />
//               <Field
//                 name="uploaded_by"
//                 label="Uploaded By"
//                 placeholder="Uploaded By"
//                 readOnly
//                 hideInUpdateFrom
//               />
//             </Fields>

//             <UpdateForm
//               title="File Download "
//               message="File Details"
//               trigger={<AiIcons.AiOutlineDownload />}
//               onSubmit={(task) => service.download(task)}
//               submitText="Download"
//               validate={(values) => {
//                 const errors = {};

//                 if (!values.id) {
//                   errors.id = "File Corrupted , Contact admin";
//                 }
//                 return errors;
//               }}
//             />
//             <DeleteForm
//               title="File Delete Process"
//               message="Are you sure you want to delete the File?"
//               trigger={<AiIcons.AiFillDelete />}
//               onSubmit={(task) => service.delete(task)}
//               submitText="Delete"
//               validate={(values) => {
//                 const errors = {};
//                 return errors;
//               }}
//             />
//             <Pagination
//               itemsPerPage={7}
//               activePage={1}
//               fetchTotalOfItems={(payload) => service.fetchTotal(payload)}
//             />
//           </CRUDTable>
//         </div>
//       );
//     } else if (sessiondetails.userType === "employee") {
//       return (
//         <div>
//           <Link to="/uploadsingle">
//             <div className="Upload">
//               <AiIcons.AiOutlinePlusCircle />
//             </div>
//           </Link>
//           <CRUDTable
//             caption="DOCUMENTS"
//             fetchItems={(payload) => service.fetchItems(payload)}
//           >
//             <Fields>
//               {/* <Field name="id" label="File ID" placeholder="File ID" readOnly /> */}
//               <Field
//                 name="fileName"
//                 label="File Name"
//                 placeholder="File Name"
//                 readOnly
//               />
//               <Field
//                 name="file_size"
//                 label="File Size"
//                 placeholder="File Size"
//                 readOnly
//               />
//               <Field
//                 name="uploaded_date"
//                 label="Date OF Uplode"
//                 placeholder="Date OF Uplode"
//                 readOnly
//               />
//             </Fields>

//             <UpdateForm
//               title="File Download "
//               message="File Details"
//               trigger={<AiIcons.AiOutlineDownload />}
//               onSubmit={(task) => service.download(task)}
//               submitText="Download"
//               validate={(values) => {
//                 const errors = {};

//                 if (!values.id) {
//                   errors.id = "File Corrupted , Contact admin";
//                 }
//                 return errors;
//               }}
//             />
//             <Pagination
//               itemsPerPage={7}
//               activePage={1}
//               fetchTotalOfItems={(payload) => service.fetchTotal(payload)}
//             />
//           </CRUDTable>
//         </div>
//       );
//     } else if (sessiondetails.userType === "student") {
//       return (
//         <CRUDTable
//           caption="DOCUMENTS"
//           fetchItems={(payload) => service.fetchItems(payload)}
//         >
//           <Fields>
//             {/* <Field name="id" label="File ID" placeholder="File ID" readOnly /> */}
//             <Field
//               name="fileName"
//               label="File Name"
//               placeholder="File Name"
//               readOnly
//             />
//             <Field
//               name="file_size"
//               label="File Size"
//               placeholder="File Size"
//               readOnly
//             />
//             <Field
//               name="uploaded_date"
//               label="Date OF Upload"
//               placeholder="Date OF Uplode"
//               readOnly
//             />
//             <Field
//               name="course_type"
//               label="course"
//               placeholder="Type"
//               readOnly
//             />
//           </Fields>

//           <UpdateForm
//             title="File Download "
//             message="File Details"
//             trigger={<AiIcons.AiOutlineDownload />}
//             onSubmit={(task) => service.download(task)}
//             submitText="Download"
//             validate={(values) => {
//               const errors = {};

//               if (!values.id) {
//                 errors.id = "File Corrupted , Contact admin";
//               }
//               return errors;
//             }}
//           />
//           <Pagination
//             itemsPerPage={7}
//             activePage={1}
//             fetchTotalOfItems={(payload) => service.fetchTotal(payload)}
//           />
//         </CRUDTable>
//       );
//     }
//   }
// }

// function getTask(testTask) {
//   tasks = testTask;
// }

// function DownloadFile(AdminDocumentsRow){
//   const url = APIData.api+'file/' +  AdminDocumentsRow.id;
//   window.location.href = url;
// }

//  function DeleteFile(AdminDocumentsRow){
//   const url = APIData.api+'file/' +  AdminDocumentsRow.id;
//    axios
//           .delete(url,{headers:APIData.headers})
//           .then(response => {
//             if(response.data.status.toString().toLowerCase() =="success"){
//               toast(response.data.description)
//               window.responseload.responseloading();;
//             }
//             else{
//               toast(response.data.errorDesc)
//               window.responseload.responseloading();
//             }
//          })
//          .catch(error => {
//            toast('OOPS ,Failed')
//          })
//    }

// const SORTERS = {
//   NUMBER_ASCENDING: (mapper) => (a, b) => mapper(a) - mapper(b),
//   NUMBER_DESCENDING: (mapper) => (a, b) => mapper(b) - mapper(a),
//   STRING_ASCENDING: (mapper) => (a, b) => mapper(a).localeCompare(mapper(b)),
//   STRING_DESCENDING: (mapper) => (a, b) => mapper(b).localeCompare(mapper(a)),
// };

// const getSorter = (data) => {
//   const mapper = (x) => x[data.field];
//   let sorter = SORTERS.STRING_ASCENDING(mapper);

//   if (data.field === "id") {
//     sorter =
//       data.direction === "ascending"
//         ? SORTERS.STRING_ASCENDING(mapper)
//         : SORTERS.STRING_DESCENDING(mapper);
//   } else if (data.field === "fileName") {
//     sorter =
//       data.direction === "ascending"
//         ? SORTERS.STRING_ASCENDING(mapper)
//         : SORTERS.STRING_DESCENDING(mapper);
//   } else if (data.field === "file_size") {
//     sorter =
//       data.direction === "ascending"
//         ? SORTERS.NUMBER_ASCENDING(mapper)
//         : SORTERS.NUMBER_DESCENDING(mapper);
//   } else if (data.field === "uploaded_date") {
//     sorter =
//       data.direction === "ascending"
//         ? SORTERS.STRING_ASCENDING(mapper)
//         : SORTERS.STRING_DESCENDING(mapper);
//   } else if (data.field === "uploaded_by") {
//     sorter =
//       data.direction === "ascending"
//         ? SORTERS.STRING_ASCENDING(mapper)
//         : SORTERS.STRING_DESCENDING(mapper);
//   } else if (data.field === "course_type") {
//     sorter =
//       data.direction === "ascending"
//         ? SORTERS.STRING_ASCENDING(mapper)
//         : SORTERS.STRING_DESCENDING(mapper);
//   } else {
//     sorter =
//       data.direction === "ascending"
//         ? SORTERS.NUMBER_ASCENDING(mapper)
//         : SORTERS.NUMBER_DESCENDING(mapper);
//   }

//   return sorter;
// };

// let count = tasks.length;
// console.log(count);
// const service = {
//   fetchItems: (payload) => {
//     const { activePage, itemsPerPage } = payload.pagination;
//     const start = (activePage - 1) * itemsPerPage;
//     const end = start + itemsPerPage;
//     let result = Array.from(tasks);
//     result = result.sort(getSorter(payload.sort));
//     return Promise.resolve(result.slice(start, end));
//   },
//   fetchTotal: (payload) => {
//     return Promise.resolve(tasks.length);
//   },
//   download: (data) => {
//     const task = tasks.find((t) => t.id === data.id);
//     const url = APIData.api + "file/" + data.id;
//     window.location.href = url;
//     return Promise.resolve(task);
//   },
//   delete: (data) => {
//     const task = tasks.find((t) => t.id === data.id);
//     window.responseload.responseloading();
//     const url = APIData.api + "file/" + data.id;
//     axios
//       .delete(url, { headers: APIData.headers })
//       .then((response) => {
//         if (response.data.status.toString().toLowerCase() == "success") {
//           toast(response.data.description);
//           tasks = tasks.filter((t) => t.id !== task.id);
//           window.responseload.responseloading();
//         } else {
//           toast(response.data.errorDesc);
//           window.responseload.responseloading();
//         }
//       })
//       .catch((error) => {
//         toast("It's Time To Grab A Coffee");
//         window.responseload.responseloading();
//       });

//     return Promise.resolve(task);
//   },
// };

// const styles = {
//   container: { margin: "auto", width: "fit-content" },
// };

// const Documents = () => <div style={styles.container}>{returntypebased()}</div>;

// class DocumentsData extends Component {
//   state = {
//     loading: false,
//   };
//   constructor(props) {
//     super(props);
//     window.responseload = this;
//     getTask(this.props.data);
//   }
//   responseloading() {
//     this.setState({ loading: !this.state.loading });
//   }
//   render() {
//     return (
//       <div>
//         <div>{this.state.loading ? <Loading /> : <Documents />}</div>
//       </div>
//     );
//   }
// }

// export default DocumentsData;


// import React from "react";
// import axios from "axios";
// import "../CRUDTable.css";
// import { Component } from "react";
// import { toast } from "react-toastify";
// import * as AiIcons from "react-icons/ai";
// import { APIData } from "../Authentication/APIData";
// import { Link } from "react-router-dom";
// import "react-toastify/dist/ReactToastify.css";
// import CRUDTable, {
//   Fields,
//   Field,
//   // CreateForm,
//   UpdateForm,
//   DeleteForm,
//   Pagination,
// } from "react-crud-table";
// import Loading from "../Loading";

// toast.configure();

// let tasks = [];

// const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));

// function returntypebased() {
//   if (sessiondetails) {
//     if (sessiondetails.userType === "superadmin") {
//       return (
//         <div>
//           <Link to="/uploadsingle">
//             <div className="Upload">
//               <AiIcons.AiOutlinePlusCircle />
//             </div>
//           </Link>

//           <CRUDTable
//             caption="DOCUMENTS"
//             fetchItems={(payload) => service.fetchItems(payload)}
//           >
//             <Fields>
//               {/* <Field name="id" label="File ID" placeholder="File ID" readOnly /> */}
//               <Field
//                 name="fileName"
//                 label="File Name"
//                 placeholder="File Name"
//                 readOnly
//               />
//               <Field
//                 name="file_size"
//                 label="File Size"
//                 placeholder="File Size"
//                 readOnly
//               />
//               <Field
//                 name="uploaded_date"
//                 label="Date OF Uploade"
//                 placeholder="Date OF Uplode"
//                 readOnly
//               />
//               <Field
//                 name="course_type"
//                 label="Course"
//                 placeholder="Course"
//                 readOnly
//               />
//               <Field
//                 name="uploaded_by"
//                 label="Uploaded By"
//                 placeholder="Uploaded By"
//                 readOnly
//                 hideInUpdateFrom
//               />
//             </Fields>

//             <UpdateForm
//               title="File Download "
//               message="File Details"
//               trigger={<AiIcons.AiOutlineDownload />}
//               onSubmit={(task) => service.download(task)}
//               submitText="Download"
//               validate={(values) => {
//                 const errors = {};

//                 if (!values.id) {
//                   errors.id = "File Corrupted , Contact admin";
//                 }
//                 return errors;
//               }}
//             />
//             <DeleteForm
//               title="File Delete Process"
//               message="Are you sure you want to delete the File?"
//               trigger={<AiIcons.AiFillDelete />}
//               onSubmit={(task) => service.delete(task)}
//               submitText="Delete"
//               validate={(values) => {
//                 const errors = {};
//                 return errors;
//               }}
//             />
//             <Pagination
//               itemsPerPage={7}
//               activePage={1}
//               fetchTotalOfItems={(payload) => service.fetchTotal(payload)}
//             />
//           </CRUDTable>
//         </div>
//       );
//     } else if (sessiondetails.userType === "admin") {
//       return (
//         <div>
//           <Link to="/uploadsingle">
//             <div className="Upload">
//               <AiIcons.AiOutlinePlusCircle />
//             </div>
//           </Link>
//           <CRUDTable
//             caption="DOCUMENTS"
//             fetchItems={(payload) => service.fetchItems(payload)}
//           >
//             <Link to="/uploadsingle">
//               <div className="Upload">
//                 <AiIcons.AiOutlinePlusCircle />
//               </div>
//             </Link>

//             <Fields>
//               {/* <Field name="id" label="File ID" placeholder="File ID" readOnly /> */}
//               <Field
//                 name="fileName"
//                 label="File Name"
//                 placeholder="File Name"
//                 readOnly
//               />
//               <Field
//                 name="file_size"
//                 label="File Size"
//                 placeholder="File Size"
//                 readOnly
//               />
//               <Field
//                 name="uploaded_date"
//                 label="Date OF Uploade"
//                 placeholder="Date OF Uplode"
//                 readOnly
//               />
//               <Field
//                 name="course_type"
//                 label="Course"
//                 placeholder="Course"
//                 readOnly
//               />
//               <Field
//                 name="uploaded_by"
//                 label="Uploaded By"
//                 placeholder="Uploaded By"
//                 readOnly
//                 hideInUpdateFrom
//               />
//             </Fields>

//             <UpdateForm
//               title="File Download "
//               message="File Details"
//               trigger={<AiIcons.AiOutlineDownload />}
//               onSubmit={(task) => service.download(task)}
//               submitText="Download"
//               validate={(values) => {
//                 const errors = {};

//                 if (!values.id) {
//                   errors.id = "File Corrupted , Contact admin";
//                 }
//                 return errors;
//               }}
//             />
//             <DeleteForm
//               title="File Delete Process"
//               message="Are you sure you want to delete the File?"
//               trigger={<AiIcons.AiFillDelete />}
//               onSubmit={(task) => service.delete(task)}
//               submitText="Delete"
//               validate={(values) => {
//                 const errors = {};
//                 return errors;
//               }}
//             />
//             <Pagination
//               itemsPerPage={7}
//               activePage={1}
//               fetchTotalOfItems={(payload) => service.fetchTotal(payload)}
//             />
//           </CRUDTable>
//         </div>
//       );
//     } else if (sessiondetails.userType === "employee") {
//       return (
//         <div>
//           <Link to="/uploadsingle">
//             <div className="Upload">
//               <AiIcons.AiOutlinePlusCircle />
//             </div>
//           </Link>
//           <CRUDTable
//             caption="DOCUMENTS"
//             fetchItems={(payload) => service.fetchItems(payload)}
//           >
//             <Fields>
//               {/* <Field name="id" label="File ID" placeholder="File ID" readOnly /> */}
//               <Field
//                 name="fileName"
//                 label="File Name"
//                 placeholder="File Name"
//                 readOnly
//               />
//               <Field
//                 name="file_size"
//                 label="File Size"
//                 placeholder="File Size"
//                 readOnly
//               />
//               <Field
//                 name="uploaded_date"
//                 label="Date OF Uplode"
//                 placeholder="Date OF Uplode"
//                 readOnly
//               />
//             </Fields>

//             <UpdateForm
//               title="File Download "
//               message="File Details"
//               trigger={<AiIcons.AiOutlineDownload />}
//               onSubmit={(task) => service.download(task)}
//               submitText="Download"
//               validate={(values) => {
//                 const errors = {};

//                 if (!values.id) {
//                   errors.id = "File Corrupted , Contact admin";
//                 }
//                 return errors;
//               }}
//             />
//             <Pagination
//               itemsPerPage={7}
//               activePage={1}
//               fetchTotalOfItems={(payload) => service.fetchTotal(payload)}
//             />
//           </CRUDTable>
//         </div>
//       );
//     } else if (sessiondetails.userType === "student") {
//       return (
//         <CRUDTable
//           caption="DOCUMENTS"
//           fetchItems={(payload) => service.fetchItems(payload)}
//         >
//           <Fields>
//             {/* <Field name="id" label="File ID" placeholder="File ID" readOnly /> */}
//             <Field
//               name="fileName"
//               label="File Name"
//               placeholder="File Name"
//               readOnly
//             />
//             <Field
//               name="file_size"
//               label="File Size"
//               placeholder="File Size"
//               readOnly
//             />
//             <Field
//               name="uploaded_date"
//               label="Date OF Upload"
//               placeholder="Date OF Uplode"
//               readOnly
//             />
//             <Field
//               name="course_type"
//               label="course"
//               placeholder="Type"
//               readOnly
//             />
//           </Fields>

//           <UpdateForm
//             title="File Download "
//             message="File Details"
//             trigger={<AiIcons.AiOutlineDownload />}
//             onSubmit={(task) => service.download(task)}
//             submitText="Download"
//             validate={(values) => {
//               const errors = {};

//               if (!values.id) {
//                 errors.id = "File Corrupted , Contact admin";
//               }
//               return errors;
//             }}
//           />
//           <Pagination
//             itemsPerPage={7}
//             activePage={1}
//             fetchTotalOfItems={(payload) => service.fetchTotal(payload)}
//           />
//         </CRUDTable>
//       );
//     }
//   }
// }

// function getTask(testTask) {
//   tasks = testTask;
// }

// // function DownloadFile(AdminDocumentsRow){
// //   const url = APIData.api+'file/' +  AdminDocumentsRow.id;
// //   window.location.href = url;
// // }

// //  function DeleteFile(AdminDocumentsRow){
// //   const url = APIData.api+'file/' +  AdminDocumentsRow.id;
// //    axios
// //           .delete(url,{headers:APIData.headers})
// //           .then(response => {
// //             if(response.data.status.toString().toLowerCase() =="success"){
// //               toast(response.data.description)
// //               window.responseload.responseloading();;
// //             }
// //             else{
// //               toast(response.data.errorDesc)
// //               window.responseload.responseloading();
// //             }
// //          })
// //          .catch(error => {
// //            toast('OOPS ,Failed')
// //          })
// //    }

// const SORTERS = {
//   NUMBER_ASCENDING: (mapper) => (a, b) => mapper(a) - mapper(b),
//   NUMBER_DESCENDING: (mapper) => (a, b) => mapper(b) - mapper(a),
//   STRING_ASCENDING: (mapper) => (a, b) => mapper(a).localeCompare(mapper(b)),
//   STRING_DESCENDING: (mapper) => (a, b) => mapper(b).localeCompare(mapper(a)),
// };

// const getSorter = (data) => {
//   const mapper = (x) => x[data.field];
//   let sorter = SORTERS.STRING_ASCENDING(mapper);

//   if (data.field === "id") {
//     sorter =
//       data.direction === "ascending"
//         ? SORTERS.STRING_ASCENDING(mapper)
//         : SORTERS.STRING_DESCENDING(mapper);
//   } else if (data.field === "fileName") {
//     sorter =
//       data.direction === "ascending"
//         ? SORTERS.STRING_ASCENDING(mapper)
//         : SORTERS.STRING_DESCENDING(mapper);
//   } else if (data.field === "file_size") {
//     sorter =
//       data.direction === "ascending"
//         ? SORTERS.NUMBER_ASCENDING(mapper)
//         : SORTERS.NUMBER_DESCENDING(mapper);
//   } else if (data.field === "uploaded_date") {
//     sorter =
//       data.direction === "ascending"
//         ? SORTERS.STRING_ASCENDING(mapper)
//         : SORTERS.STRING_DESCENDING(mapper);
//   } else if (data.field === "uploaded_by") {
//     sorter =
//       data.direction === "ascending"
//         ? SORTERS.STRING_ASCENDING(mapper)
//         : SORTERS.STRING_DESCENDING(mapper);
//   } else if (data.field === "course_type") {
//     sorter =
//       data.direction === "ascending"
//         ? SORTERS.STRING_ASCENDING(mapper)
//         : SORTERS.STRING_DESCENDING(mapper);
//   } else {
//     sorter =
//       data.direction === "ascending"
//         ? SORTERS.NUMBER_ASCENDING(mapper)
//         : SORTERS.NUMBER_DESCENDING(mapper);
//   }

//   return sorter;
// };

// // let count = tasks.length;
// // console.log(count);
// const service = {
//   fetchItems: (payload) => {
//     const { activePage, itemsPerPage } = payload.pagination;
//     const start = (activePage - 1) * itemsPerPage;
//     const end = start + itemsPerPage;
//     let result = Array.from(tasks);
//     result = result.sort(getSorter(payload.sort));
//     return Promise.resolve(result.slice(start, end));
//   },
//   fetchTotal: (payload) => {
//     return Promise.resolve(tasks.length);
//   },
//   download: (data) => {
//     const task = tasks.find((t) => t.id === data.id);
//     const url = APIData.api + "file/" + data.id;
//     window.location.href = url;
//     return Promise.resolve(task);
//   },
//   delete: (data) => {
//     const task = tasks.find((t) => t.id === data.id);
//     window.responseload.responseloading();
//     const url = APIData.api + "file/" + data.id;
//     axios
//       .delete(url, { headers: APIData.headers })
//       .then((response) => {
//         if (response.data.status.toString().toLowerCase() == "success") {
//           toast(response.data.description);
//           tasks = tasks.filter((t) => t.id !== task.id);
//           window.responseload.responseloading();
//         } else {
//           toast(response.data.errorDesc);
//           window.responseload.responseloading();
//         }
//       })
//       .catch((error) => {
//         toast("It's Time To Grab A Coffee");
//         window.responseload.responseloading();
//       });

//     return Promise.resolve(task);
//   },
// };

// const styles = {
//   container: { margin: "auto", width: "fit-content" },
// };

// const Documents = () => <div style={styles.container}>{returntypebased()}</div>;

// class DocumentsData extends Component {
//   state = {
//     loading: false,
//   };
//   constructor(props) {
//     super(props);
//     window.responseload = this;
//     getTask(this.props.data);
//   }
//   responseloading() {
//     this.setState({ loading: !this.state.loading });
//   }
//   render() {
//     return (
//       <div>
//         <div>{this.state.loading ? <Loading /> : <Documents />}</div>
//       </div>
//     );
//   }
// }

// export default DocumentsData;
