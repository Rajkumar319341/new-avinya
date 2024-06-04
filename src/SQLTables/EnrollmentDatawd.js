import React, { Component } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { AiOutlineDownload, AiOutlineSortAscending, AiOutlineSortDescending, } from "react-icons/ai";
import { APIData } from '../Authentication/APIData';
import {
  Table, TableHead, TableBody, TableCell, TableRow, Button, Paper, Typography, Box, Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem
} from '@material-ui/core';
import Loading from "../Loading";
import Pagination from '@material-ui/lab/Pagination';
import { withStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";


toast.configure();

let tasks = [];
const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(1),
    overflowX: 'auto',
  },
  table: {
    minWidth: 750,
    width: "auto"
  },
  tableHead: {
    background: 'grey',
    height: 15,
  },
  tableCell: {
    color: 'white',
    fontWeight: 'bold',
  },
  enrollmentsHeader: {
    background: '#f57a7a',
    padding: '8px',
    fontWeight: 'bold',
    color: "whitesmoke"
  },

});

class EnrollmentsDatawd extends Component {
  state = {
    loading: false,
    sortField: "",
    sortDirection: "asc",
    currentPage: 1,
    itemsPerPage: 5,
    selectedTask: null,
    isDialogOpen: false,
    selectedStatus: "",
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

  handlePageChange = (event, page) => {
    this.setState({ currentPage: page });
  };


  handleUpdate = (task) => {
    console.log(task);
    this.setState({ selectedTask: task, isDialogOpen: true });
  };

  handleStatusChange = (event) => {
    this.setState({ selectedStatus: event.target.value });
  };

  handleUpdate2=()=>{
    console.log(this.state.selectedTask);
    console.log("Selected Task Details:", this.state.selectedTask.admin_id);
    const form={
      admin_id: this.state.selectedTask.admin_id,
      branch:this.state.selectedTask.branch ,
      course_id: this.state.selectedTask.course_id,
      enrolled_date: this.state.selectedTask. enrolled_date ,
      enrollment_status:this.state.selectedStatus ,
      enrollment_type: this.state.selectedTask.enrollment_type ,
      followup_datetime: this.state.selectedTask.followup_datetime ,
      office_email:  this.state.selectedTask.office_email || "defaultStringValue",
      user_email:this.state.selectedTask.user_email ,
      user_name: this.state.selectedTask.user_name ,
      user_phone_number: this.state.selectedTask. user_phone_number 
    }
    console.log(form);


    // const url = APIData.api +'enrollments/'
    // console.log(url);
    // axios.post(url,form,{ headers: APIData.headers } )

    //   .then(response => {

    //     if (response.status == 201||response.status =="success" ) {
    //       toast('Updated successfully')
    //       // window.location.reload("/");
    //     }
    //     else {
    //       toast('Check With the Admin,failed')
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     toast("It's time To Grab A Coffeee")
    //   })
  }


  handleDialogClose = () => {
    this.setState({ isDialogOpen: false });
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

      <Box mt={3} display="flex" justifyContent="center" >
        <Box width="100%" border="2px solid black">
          <Paper className={classes.root} >
            <Box p={2} >
              <Typography variant="h5" gutterBottom align="center" className={classes.enrollmentsHeader}>
                Enrollments
              </Typography>

              {loading ? <Loading /> :
                <div>
                  {/**/}
                  <Table className="table table-sm table-bordered table-striped"  >
                    <TableHead className={classes.tableHead}>
                      <TableRow>
                        <TableCell className={classes.tableCell}>
                          <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                            Use Email
                            <Button onClick={() => this.handleSort("user_email")}>
                              {sortField === "user_email" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "whitesmoke" }} /> : <AiOutlineSortDescending style={{ color: "whitesmoke" }} />}
                            </Button>
                          </Typography>
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                            Office Email
                            {/* <Button onClick={() => this.handleSort("file_size")}>
                              {sortField === "file_size" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "blue" }} /> : <AiOutlineSortDescending style={{ color: "blue" }} />}
                            </Button> */}
                          </Typography>
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                            Branch
                            {/* <Button onClick={() => this.handleSort("branch")}>
                              {sortField === "branch" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "blue" }} /> : <AiOutlineSortDescending style={{ color: "blue" }} />}
                            </Button> */}
                          </Typography>
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                            Enrollment Type
                            {/* <Button onClick={() => this.handleSort("uploaded_by")}>
                              {sortField === "uploaded_by" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "blue" }} /> : <AiOutlineSortDescending style={{ color: "blue" }} />}
                            </Button> */}
                          </Typography>
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                            Enrollment Status
                            {/* <Button onClick={() => this.handleSort("uploaded_by")}>
                              {sortField === "uploaded_by" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "blue" }} /> : <AiOutlineSortDescending style={{ color: "blue" }} />}
                            </Button> */}
                          </Typography>
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                            JobId
                            {/* <Button onClick={() => this.handleSort("course_id")}>
                              {sortField === "course_id" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "blue" }} /> : <AiOutlineSortDescending style={{ color: "blue" }} />}
                            </Button> */}
                          </Typography>
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                            User Name
                            {/* <Button onClick={() => this.handleSort("user_name")}>
                              {sortField === "user_name" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "blue" }} /> : <AiOutlineSortDescending style={{ color: "blue" }} />}
                            </Button> */}
                          </Typography>
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                            Admin ID

                          </Typography>
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                            Follow up Date
                            <Button onClick={() => this.handleSort("followup_datetime")}>
                              {sortField === "followup_datetime" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "white" }} /> : <AiOutlineSortDescending style={{ color: "white" }} />}
                            </Button>
                          </Typography>
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                            Enrolled Date
                            <Button onClick={() => this.handleSort("enrolled_date")}>
                              {sortField === "enrolled_date" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "white" }} /> : <AiOutlineSortDescending style={{ color: "white" }} />}
                            </Button>
                          </Typography>
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                            Action
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {currentItems.map(task => (
                        <TableRow key={task.id}>
                          <TableCell>{task.user_email}</TableCell>
                          <TableCell>{task.office_email}</TableCell>
                          <TableCell>{task.branch}</TableCell>
                          <TableCell>{task.enrollment_type}</TableCell>
                          <TableCell>{task.enrollment_status}</TableCell>
                          <TableCell>{task.course_id}</TableCell>
                          <TableCell>{task.user_name}</TableCell>
                          <TableCell>{task.admin_id}</TableCell>
                          <TableCell>{task.followup_datetime}</TableCell>
                          <TableCell>{task.enrolled_date}</TableCell>
                          <TableCell>

                            <Button variant="contained" style={{ color: "red" }} onClick={() => this.handleUpdate(task)}  >Update</Button>
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
          <Dialog open={this.state.isDialogOpen} onClose={this.handleDialogClose}>
            <DialogTitle>Update Status Of Employee</DialogTitle>
            <DialogContent>
              {this.state.selectedTask && (
                <div>
                  <p>User Email: {this.state.selectedTask.user_email}</p>
                  <TextField
                  select
                  label="Status of Completeing journey"
                  value={this.state.selectedStatus}
                  onChange={this.handleStatusChange}
                  variant="outlined"
                  fullWidth
                >
                 
                  <MenuItem value="applied">Applied</MenuItem>
                  <MenuItem value="accepted	">Accepted</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </TextField>

                </div>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleDialogClose} color="primary">
                Close
              </Button>
              <Button color="Secondary" onClick={this.handleUpdate2}
               >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    );
  }
}

export default withStyles(styles)(EnrollmentsDatawd);
