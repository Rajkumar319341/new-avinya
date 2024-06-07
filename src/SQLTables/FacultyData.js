import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { Box, Input, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton, TableContainer, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { APIData, org } from '../Authentication/APIData';
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import Loading from "../Loading";
import { FaEdit } from 'react-icons/fa';
import { TablePagination } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';


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
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 750,
    width: "auto"
  },
  buttonGroup: {
    "& > *": {
      margin: theme.spacing(1)
    }
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
    letterSpacing: '3px',
    background: '#ffc14d',
    padding: '5px',
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
  // hide last border
  // '&:last-child td, &:last-child th': {
  //   border: 0,
  // },
}));

class FacultyData extends Component {
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

  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ itemsPerPage: parseInt(event.target.value, 10) });
  };

  constructor(props) {
    super(props);
    window.responseload = this;
    this.getTask(this.props.data);
    // console.log("data employee:",this.props.data)
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
  }


  responseloading = () => {
    this.setState({ loading: !this.state.loading });
  }

  getTask = (testTask) => {
    tasks = testTask;
  };

  
function(){
  this.props.history.push("/")

}



  handleSort = (field) => {
    let direction = "asc";
    if (this.state.sortField === field && this.state.sortDirection === "asc") {
      direction = "desc";
    }
    this.setState({ sortField: field, sortDirection: direction });
  };

  handleUpdate = (task) => {
    // console.log(task);
    this.setState({ selectedTask: task, isDialogOpen: true });
  };

  handleUpdate2 = () => {
    const { selectedTask } = this.state;
    // console.log("Selected Task Details:", this.state.selectedTask.admin_id);
    const form = {

      employee_id: selectedTask.employee_id,
      name: this.state.selectedTask.name,
      email: this.state.selectedTask.email,
      phone_number: this.state.selectedTask.phone_number,
      address: this.state.selectedTask.address,
      gender: this.state.selectedTask.gender,
      DOB: this.state.selectedTask.DOB,
      year_of_appointment: this.state.selectedTask.year_of_appointment,
      salary: this.state.selectedTask.salary,
      exp: this.state.selectedTask.exp,
      qualification: this.state.selectedTask.qualification,
      emy_type: this.state.selectedTask.emy_type,
      created_date_time: selectedTask.created_date_time,
      updated_date_time: selectedTask.updated_date_time,
      created_by: selectedTask.created_by,
      updated_by: selectedTask.updated_by,
      access_profiles: this.state.selectedTask.access_profiles,
      designation: this.state.selectedTask.designation,
      role_privileges: this.state.selectedTask.role_privileges,
      org: org
    }
    console.log(form);


    const url = APIData.api + 'employee/'
    // console.log(url);
    axios.post(url, form, { headers: APIData.headers })

      .then(response => {

        if (response.status == 201 || response.status == "success") {
          toast('Updated successfully')
          // window.location.reload();
          // window.location.reload("/");
        }
        else {
          toast('Check With the Admin,failed')
        }
      })
      .catch(error => {
        console.log(error);
        toast("It's time To Grab A Coffeee")
      })

    //window.responseload.responseloading();
  }

  handleDialogClose = () => {
    this.setState({ isDialogOpen: false });
  };

  handlePageChange = (event, page) => {
    this.setState({ currentPage: page + 1 });
  };


  // fetchData = () => {
  //   axios.get(APIData.api + 'users/unregistered', { headers: APIData.headers })
  //     .then(response => {
  //       this.setState({ tasks: response.data, loading: false });
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //       this.setState({ loading: false });
  //     });
  // }
  render() {
    const { classes } = this.props;
    const { loading, sortField, sortDirection, currentPage, itemsPerPage } = this.state;
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
        <Box width="100%" border="2px solid black">
        <Paper className={classes.root}>
            <Box p={4} >
          <Typography
            style={{
              marginLeft: "0.5rem",
              letterSpacing: "4px",
              fontSize: "25px"
              //padding:"0.5rem"
            }}
            variant="h5" gutterBottom align="center" className={classes.enrollmentsHeader}>
            EMPLOYEE
          </Typography>
        

              {loading ? <Loading /> :
                <div className={classes.buttonGroup}>
                  {isSmallScreen ? (
                    <Box>
                      {currentItems.map(task => (
                        <Paper key={task.employee_id} style={{ marginBottom: "5px", padding: "10px" }}>
                          <Typography variant="subtitle1">
                            Employee ID: {task.employee_id}
                          </Typography>
                          <Typography variant="subtitle1">
                            Name: {task.name}
                          </Typography>
                          <Typography variant="subtitle1">
                            Email: {task.email}
                          </Typography>
                          <Typography variant="subtitle1">
                            Phone Number: {task.phone_number}
                          </Typography>
                          <Typography variant="subtitle1">
                            Designation: {task.designation}
                          </Typography>
                          <Typography variant="subtitle1">
                            Role: {task.profile}
                          </Typography>
                          {/* <Typography variant="subtitle1">
                            Gender: {task.gender}
                          </Typography> */}
                          <Typography variant="subtitle1">
                            Updated By: {task.updated_by}
                          </Typography>

                          {/* {sessiondetails && (sessiondetails.userType === "superadmin") && (
                            <Box style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }} mt={2}>
                              <IconButton >
                                <FaEdit onClick={() => this.handleUpdate(task)} style={{ color: "green", marginRight: "2rem" }} />
                              </IconButton>
                            </Box>
                          )} */}
                          <Box style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }} mt={2}>
                          {sessiondetails !== null && fetchedPrivileges && (
                                <>
                                  {fetchedPrivileges === "1111" && (
                                    <IconButton >
                                    <FaEdit onClick={() => this.handleUpdate(task)} style={{ color: "green", marginRight: "2rem" }} />
                                  </IconButton>
                                  )}
                                </>
                              )}
                          </Box>
                        </Paper>
                      ))}
                    </Box>
                  ) : (
                    <Table
                      border="2px black solid"
                      className="table table-sm table-bordered table-striped"
                    >
                      <TableHead className={classes.tableHead}>
                        <TableRow>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                              Employee Id<Button onClick={() => this.handleSort("employee_id")}>
                                {sortField === "employee_id" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                              </Button>
                            </Typography>
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                              Name <Button onClick={() => this.handleSort("name")}>
                                {sortField === "name" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                              </Button>
                            </Typography>
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                              Email <Button onClick={() => this.handleSort("email")}>
                                {sortField === "email" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                              </Button>
                            </Typography>
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                              Phone Number <Button onClick={() => this.handleSort("phone_number")}>
                                {sortField === "phone_number" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                              </Button>
                            </Typography>
                          </TableCell>
                          {/* <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                              Gender <Button onClick={() => this.handleSort("gender")}>
                                {sortField === "gender" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                              </Button>
                            </Typography>
                          </TableCell> */}
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                              Updated By <Button onClick={() => this.handleSort("updated_by")}>
                                {sortField === "updated_by" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                              </Button>
                            </Typography>
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                              Designation <Button onClick={() => this.handleSort("designation")}>
                                {sortField === "designation" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                              </Button>
                            </Typography>
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                              Role<Button onClick={() => this.handleSort("profile")}>
                                {sortField === "profile" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                              </Button>
                            </Typography>
                          </TableCell>
                          {sessiondetails && (sessiondetails.userType === "superadmin") && (

                            <TableCell className={classes.tableCell}>
                              <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                                Action
                              </Typography>
                            </TableCell>
                          )}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {currentItems.map(task => (
                          <StyledTableRow key={task.employee_id}>
                            <StyledTableCell>{task.employee_id}</StyledTableCell>
                            <StyledTableCell>{task.name}</StyledTableCell>
                            <StyledTableCell>{task.email}</StyledTableCell>
                            <StyledTableCell>{task.phone_number}</StyledTableCell>
                            {/* <StyledTableCell>{task.gender}</StyledTableCell> */}
                            <StyledTableCell>{task.updated_by}</StyledTableCell>
                            <StyledTableCell>
                              {task.designation && task.designation.length > 0 && (
                                <div>
                                  {task.designation.map((designation, index) => (
                                    <span key={index}>{designation}{index !== task.designation.length - 1 && ", "}</span>
                                  ))}
                                </div>
                              )}
                            </StyledTableCell>
                            <StyledTableCell>
                              {task.access_profiles && task.access_profiles.length > 0 && (
                                <div>
                                  {task.access_profiles.map((profile, index) => (
                                    <span key={index}>{profile}{index !== task.access_profiles.length - 1 && ", "}</span>
                                  ))}
                                </div>
                              )}
                            </StyledTableCell>

                            {/* {sessiondetails && (sessiondetails.userType === "superadmin") && (
                            <StyledTableCell>
                              <Button variant="contained" startIcon={<FaEdit style={{ color: "whitesmoke", }} />}
                                onClick={() => this.handleUpdate(task)} />
                            </StyledTableCell>
                            )} */}
                            <StyledTableCell>
                              {sessiondetails !== null && fetchedPrivileges && (
                                <>
                                  {fetchedPrivileges === "1111" && (
                                    <Button variant="contained" startIcon={<FaEdit style={{ color: "whitesmoke", }} />}
                                      onClick={() => this.handleUpdate(task)} />
                                  )}
                                </>
                              )}
                            </StyledTableCell>
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
          <Dialog open={this.state.isDialogOpen} onClose={this.handleDialogClose} style={{ textAlign: "center" }}>
            <DialogTitle>Faculty Update Form</DialogTitle>
            <DialogContent style={{ width: isSmallScreen ? "100%" : "500px", textAlign: "center" }}>

              <TextField
                label="Id"
                value={this.state.selectedTask ? this.state.selectedTask.faculty_id : ""}
                variant="outlined"
                fullWidth
                InputProps={{ readOnly: true }}
                inputComponent={Input}
                style={{ width: isSmallScreen ? "100%" : "300px", marginTop: '5px', marginBottom: '5px' }}
                onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, faculty_id: e.target.value } })}
              />
              <TextField
                label="Name"
                value={this.state.selectedTask ? this.state.selectedTask.name : ""}
                variant="outlined"
                fullWidth
                style={{ width: isSmallScreen ? "100%" : "300px", marginBottom: '10px' }}
                onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, name: e.target.value } })}
              />
              <TextField
                label="Phone Number"
                value={this.state.selectedTask ? this.state.selectedTask.phone_number : ""}
                variant="outlined"
                fullWidth
                style={{ width: isSmallScreen ? "100%" : "300px", marginBottom: '10px' }}
                onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, phone_number: e.target.value } })}
              />

              <TextField
                label="Email"
                value={this.state.selectedTask ? this.state.selectedTask.email : ""}
                variant="outlined"
                fullWidth
                InputProps={{ readOnly: true }}
                inputComponent={Input}
                style={{ width: isSmallScreen ? "100%" : "300px", marginBottom: '10px' }}
                onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, email: e.target.value } })}
              />
              <TextField
                label="Experience"
                value={this.state.selectedTask ? this.state.selectedTask.exp : ""}
                variant="outlined"
                fullWidth
                style={{ width: isSmallScreen ? "100%" : "300px", marginBottom: '10px' }}
                onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, exp: e.target.value } })}
              />
              <TextField
                label="Qualification"
                value={this.state.selectedTask ? this.state.selectedTask.qualification : ""}
                variant="outlined"
                fullWidth
                style={{ width: isSmallScreen ? "100%" : "300px", marginBottom: '10px' }}
                onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, qualification: e.target.value } })}
              />
            </DialogContent>
            <DialogActions style={{ display: "flex", justifyContent: "center" }}>

              <Button color="inherit" variant="contained" onClick={this.handleUpdate2}>
                Submit
              </Button>
              <Button onClick={this.handleDialogClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>

        </Box>
      </Box>
    );
  }
}

export default withStyles(styles)(FacultyData);

