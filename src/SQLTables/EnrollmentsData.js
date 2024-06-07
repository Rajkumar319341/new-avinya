import React, { Component, Profiler } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { AiOutlineDownload, AiOutlineSortAscending, AiOutlineSortDescending, } from "react-icons/ai";
import { APIData, org } from '../Authentication/APIData';
import {
  Table, TableHead, TableBody, TableCell, TableRow, Button, Paper, Typography, Box, Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem
} from '@material-ui/core';
import Loading from "../Loading";
import { TablePagination } from '@mui/material';
import { withStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import { FormControl, InputLabel, Select } from "@mui/material";
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import IconButton from '@material-ui/core/IconButton';
import { FaEdit } from "react-icons/fa";

toast.configure();

let tasks = [];
const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
const fetchedDept = localStorage.getItem("Depart Details");
console.log("Fetched department:", fetchedDept);

let fetchedPrivileges = null;

if (sessiondetails !== null) {
  if(sessiondetails.userType==="employee"){
  sessiondetails.privileges.forEach(privilege => {
    if (privilege.dept === fetchedDept) {
      fetchedPrivileges = privilege.privileges;
      console.log("Privileges for department", fetchedDept, ":", fetchedPrivileges);
    }
  }); }
  else if(sessiondetails.userType==="user"){
    console.log("Privileges before setting user:", fetchedPrivileges);
    // console.log("Dept before setting user:", fetchedDept);
    fetchedPrivileges="1000";
    // fetchedDept="TECHNICAL"
    console.log("Privileges for user:", fetchedPrivileges);
    // console.log("Privileges for user:", fetchedDept);
    // this.function ()
  } 
  else if(sessiondetails.userType==="superadmin"){
    console.log("Privileges before setting superadmin:", fetchedPrivileges);
    fetchedPrivileges="1111";
    console.log("Privileges for superadmin:", fetchedPrivileges);

  }
}


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
    // background: 'grey',
    height: 15,
  },
  tableCell: {
    color: 'green',
    fontWeight: 'bold',
  },
  enrollmentsHeader: {
    letterSpacing: '4px',
    background: '#ffc14d',
    padding: '15px',
    fontWeight: 'bold',
    color: "green",
    fontSize: "25px"
  },
  smallScreenPagination: {
    "& .MuiTablePagination-root": {
      flexWrap: "wrap",
      justifyContent: "center",
    },
    "& .MuiTablePagination-toolbar": {
      flexBasis: "100%",
      flexDirection: "column",
      alignItems: "center",
    },
    "& .MuiTablePagination-caption": {
      order: 2,
      marginTop: theme.spacing(2),
    },
    "& .MuiTablePagination-actions": {
      order: 1,
      marginBottom: theme.spacing(2),
    },
  },
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.grey,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },

}));
class EnrollmentsData extends Component {
  state = {
    loading: false,
    sortField: "",
    sortDirection: "asc",
    currentPage: 1,
    itemsPerPage: 5,
    selectedTask: null,
    isDialogOpen: false,
    selectedStatus: "",
    isSmallScreen: window.matchMedia('(max-width: 600px)').matches,

  }
  handleChangeRowsPerPage = (event) => {
    this.setState({ itemsPerPage: parseInt(event.target.value, 10) });
  };
  function(){
    this.props.history.push("/")
  
  }
  

  constructor(props) {
    super(props);
    window.responseload = this;
    this.getTask(this.props.data);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
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
    this.setState({ currentPage: page + 1 });
  };
  handleStatusChange = (event) => {
    this.setState({ selectedStatus: event.target.value });
  };
  handleDialogClose = () => {
    this.setState({ isDialogOpen: false });
  };

  handleUpdate = (task) => {
    console.log(task);
    this.setState({ selectedTask: task, isDialogOpen: true });
  };



  handleUpdate2 = () => {
    // console.log(this.state.selectedTask);
    // console.log("Selected Task Details:", this.state.selectedTask.admin_id);
    const form = {
      admin_id: this.state.selectedTask.admin_id,
      branch: this.state.selectedTask.branch,
      course_id: '',
      designation: this.state.selectedTask.designation,
      job_id: this.state.selectedTask.job_id,
      enrolled_date: this.state.selectedTask.enrolled_date,
      enrollment_status: this.state.selectedStatus,
      enrollment_type: this.state.selectedTask.enrollment_type,
      followup_datetime: this.state.selectedTask.followup_datetime,
      office_email: this.state.selectedTask.office_email || "",
      user_email: this.state.selectedTask.user_email,
      user_name: this.state.selectedTask.user_name,
      role: this.state.selectedTask.role,
      dept: this.state.selectedTask.dept,
      supervisor: this.state.selectedTask.supervisor,
      user_phone_number: this.state.selectedTask.user_phone_number,
      org: org,
    }
    console.log("status form", form);


    const url = APIData.api + `enrollments/?orgId=${org}`

    console.log(url);
    axios.post(url, form, { headers: APIData.headers })

      .then(response => {

        if (response.status == 201 || response.status == "success") {
          console.log("Response:", response.data)
          toast('Updated successfully');
          // window.location.reload();
        }
        else {
          toast('Check With the Admin,failed')
        }
      })
      .catch(error => {
        console.log(error);
        toast("It's time To Grab A Coffeee")
      })
  }

  render() {
    const { loading, sortField, sortDirection, currentPage, itemsPerPage } = this.state;
    const { classes } = this.props;
    const { isSmallScreen } = this.state;

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

      <Box mt={4} display="flex" justifyContent="center">
                  <Box width="95%" border="2px solid black">
                  <Paper className={classes.root} >
            <Box p={2} >
          <Typography variant="h5" gutterBottom align="center" className={classes.enrollmentsHeader}>
            ENROLLMENTS
          </Typography>
              {loading ? <Loading /> :

                <div>
                  {isSmallScreen ? (

                    <Box>
                      {currentItems.map(task => (
                        <Paper key={task.id} style={{ marginBottom: "5px" }}>
                          <Typography variant="subtitle1">
                            User Email:{task.user_email}
                          </Typography>
                          <Typography variant="subtitle1">
                            Office Email: {task.office_email}
                          </Typography>
                          <Typography variant="subtitle1">
                            Enrollment Type: {task.enrollment_type}
                            <Typography variant="subtitle1">
                              Enrollment Status: {task.enrollment_status}
                            </Typography>
                            <Typography variant="subtitle1">
                              Role: {task.job_id}
                            </Typography>
                            <Typography variant="subtitle1">
                              User Name:{task.user_name}
                            </Typography>
                            <Typography variant="subtitle1">
                              Admin Id: {task.admin_id}
                            </Typography>
                            <Typography variant="subtitle1">
                              Follow up Date: {task.followup_datetime}
                            </Typography>
                          </Typography>
                          <Typography variant="subtitle1">
                            Enrolled Date: {task.enrolled_date}
                          </Typography>
                          <Typography variant="subtitle1">
                            Department: {task.dept}
                          </Typography>

                          {/* <IconButton style={{ color: "green", marginLeft: "10rem" }} onClick={() => this.handleUpdate(task)}>
                            <FaEdit />
                          </IconButton> */}
                            {sessiondetails !== null && fetchedPrivileges && (
                                  <>
                                    {fetchedPrivileges === "1111" && (
                                      <IconButton style={{ color: "green", marginLeft: "10rem" }} onClick={() => this.handleUpdate(task)}>
                                      <FaEdit />
                                    </IconButton>
                                    )}
                                  </>
                                )}
                        </Paper>
                      ))}
                    </Box>

                  ) : (
                    <Table
                      border="2px black solid"
                      className="table table-sm table-bordered table-striped"  >
                      <TableHead className={classes.tableHead}>
                        <TableRow>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                              Use Email
                              <Button onClick={() => this.handleSort("user_email")}>
                                {sortField === "user_email" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                              </Button>
                            </Typography>
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                              Office Email
                            </Typography>
                          </TableCell>

                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                              Enrollment Type
                            </Typography>
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                              Enrollment Status
                            </Typography>
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                              Role
                            </Typography>
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                              User Name
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
                                {sortField === "followup_datetime" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                              </Button>
                            </Typography>
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                              Enrolled Date
                              <Button onClick={() => this.handleSort("enrolled_date")}>
                                {sortField === "enrolled_date" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                              </Button>
                            </Typography>
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                              Dept
                            </Typography>
                          </TableCell>
                          <>
                            {sessiondetails !== null && fetchedPrivileges &&(
                              <>
                                {(fetchedPrivileges === "1111" || fetchedPrivileges === "1110") && (
                                  <TableCell className={classes.tableCell}>
                                    <Typography variant="subtitle1"
                                      style={{ fontWeight: "bold" }}
                                    >
                                      Action
                                    </Typography>
                                  </TableCell>)}

                              </>
                            )}
                          </>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {currentItems.map(task => (
                          <StyledTableRow key={task.id}>
                            <StyledTableCell>{task.user_email}</StyledTableCell>
                            <StyledTableCell>{task.office_email}</StyledTableCell>
                            {/* <TableCell>{task.branch}</TableCell> */}
                            <StyledTableCell>{task.enrollment_type}</StyledTableCell>
                            <StyledTableCell>{task.enrollment_status}</StyledTableCell>
                            <StyledTableCell>{task.job_id}</StyledTableCell>
                            <StyledTableCell>{task.user_name}</StyledTableCell>
                            <StyledTableCell>{task.admin_id}</StyledTableCell>
                            <StyledTableCell>{task.followup_datetime}</StyledTableCell>
                            <StyledTableCell>{task.enrolled_date}</StyledTableCell>
                            <StyledTableCell>{task.dept}</StyledTableCell>
                              <>
                                {sessiondetails !== null && fetchedPrivileges && (
                                  <>
                                    {fetchedPrivileges === "1111" || fetchedPrivileges==="1110" &&   (
                                        <StyledTableCell>

                                      <Button variant="contained" style={{ color: "greensuperAdminCoursesEnrolled" }} onClick={() => this.handleUpdate(task)}  >Update</Button>
                                      </StyledTableCell>

                                    )}
                                  </>
                                )}
                              </>
                          </StyledTableRow>
                        ))}
                      </TableBody>

                    </Table>
                  )}
                  <Box display="flex" justifyContent="center" mt={3}>
                    <TablePagination
                      component="div"
                      count={tasks.length}
                      page={currentPage - 1}
                      onPageChange={this.handlePageChange}
                      rowsPerPage={itemsPerPage}
                      onRowsPerPageChange={this.handleChangeRowsPerPage}
                      rowsPerPageOptions={[5, 10, 20, 30]}
                      className={isSmallScreen ? classes.smallScreenPagination : null} />

                  </Box>

                </div>
              }
            </Box>
          </Paper>
          <Dialog open={this.state.isDialogOpen} onClose={this.handleDialogClose}>
            <DialogTitle>Update Status Of Employee</DialogTitle>
            <DialogContent style={{ width: "90%", textAlign: "center" }}>
              {this.state.selectedTask && (
                <div>
                  <TextField
                    label="Email Id"
                    value={this.state.selectedTask ? this.state.selectedTask.user_email : ""}
                    variant="outlined"
                    InputProps={{ readOnly: true }}
                    fullWidth
                    style={{ marginBottom: '10px' }}
                    onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, user_email: e.target.value } })}
                  />
                  <FormControl variant="outlined" fullWidth style={{ marginBottom: '10px' }}>
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                      labelId="status-label"
                      value={this.state.selectedStatus}
                      onChange={this.handleStatusChange}
                      variant="outlined"
                      fullWidth
                    >
                      <MenuItem value="applied">Applied</MenuItem>
                      <MenuItem value="accepted">Accepted</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleDialogClose} color="primary">
                Close
              </Button>
              <Button color="secondary" onClick={this.handleUpdate2}>
                Submit
              </Button>
            </DialogActions>
          </Dialog>

        </Box>
      </Box>
    );
  }
}

export default withStyles(styles)(EnrollmentsData);
