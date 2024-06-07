import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import {
  Box, Typography,
  Input, Paper,
  Table, TableHead,
  TableRow, TableCell,
  TableBody, Button,
  Dialog, TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { IconButton } from '@mui/material';
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
    color: 'whitesmoke',
    fontWeight: 'bold',
  },
  enrollmentsHeader: {
    letterSpacing: '4px',
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

class AdminData extends Component {
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
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
  }
  function(){
    this.props.history.push("/")
  
  }
  

  responseloading = () => {
    this.setState({ loading: !this.state.loading });
  }

  getTask = (testTask) => {
    tasks = testTask;
  };

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

      admin_id: selectedTask.admin_id,
      admin_name: this.state.selectedTask.admin_name,
      admin_email: this.state.selectedTask.admin_email,
      admin_phone_number: this.state.selectedTask.admin_phone_number,
      admin_permissions: this.state.selectedTask.admin_permissions,
      admin_photo: this.state.selectedTask.admin_photo || "",
      branch: this.state.selectedTask.branch || "",
      org: org
    }
    console.log(form);


    const url = APIData.api + 'admins/'
    console.log(url);
    axios.post(url, form, { headers: APIData.headers })

      .then(response => {

        if (response.status == 201 || response.status == "success") {
          toast('Updated successfully')
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
  }

  handleDialogClose = () => {
    this.setState({ isDialogOpen: false });
  };


  handlePageChange = (event, page) => {
    this.setState({ currentPage: page + 1 });
  };

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
      <Box mt={3} display="flex" justifyContent="center">
        <Box width="100%" border="2px solid black">
        <Paper className={classes.root}>
            <Box p={3} >
          <Typography variant="h5" gutterBottom align="center" className={classes.enrollmentsHeader}>
            ADMINS
          </Typography>
        
              {loading ? <Loading /> :
                <div className={classes.buttonGroup}>
                  {isSmallScreen ? (
                    <Box>
                      {currentItems.map(task => (
                        <Paper key={task.admin_id} style={{ marginBottom: "5px", padding: "10px" }}>
                          <Typography variant="subtitle1">
                            Admin Id: {task.admin_id}
                          </Typography>
                          <Typography variant="subtitle1">
                            Name: {task.admin_name}
                          </Typography>
                          <Typography variant="subtitle1">
                            Email: {task.admin_email}
                          </Typography>
                          <Typography variant="subtitle1">
                            Phone Number: {task.admin_phone_number}
                          </Typography>
                          <Box style={{ display: "flex", flexDirection: "row" }} mt={2}>

                            {/* {(sessiondetails && (sessiondetails.userType === "superadmin")) && (
                              <IconButton onClick={() => this.handleUpdate(task)}>
                                <FaEdit style={{ color: "green", marginRight: "3rem" }} />
                              </IconButton>
                            )} */}
                            {sessiondetails !== null && fetchedPrivileges && (
                              <>

                                {fetchedPrivileges === "1111" && (
                                  <IconButton onClick={() => this.handleUpdate(task)}>
                                    <FaEdit style={{ color: "green", marginRight: "3rem" }} />
                                  </IconButton>
                                )}

                                {fetchedPrivileges === "1110" && (
                                  <IconButton onClick={() => this.handleUpdate(task)}>
                                    <FaEdit style={{ color: "green", marginRight: "3rem" }} />
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
                      className="table table-sm table-bordered table-striped">
                      <TableHead className={classes.tableHead}>
                        <TableRow>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1" style={{ color: "green" }}>
                              Admin Id
                              <Button onClick={() => this.handleSort("admin_id")}>
                                {sortField === "admin_id" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "whitesmoke" }} /> : <AiOutlineSortDescending style={{ color: "whitesmoke" }} />}
                              </Button>
                            </Typography></TableCell>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1" style={{ color: "green" }}>
                              Name
                              <Button onClick={() => this.handleSort("admin_name")}>
                                {sortField === "admin_name" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "whitesmoke" }} /> : <AiOutlineSortDescending style={{ color: "whitesmoke" }} />}
                              </Button>
                            </Typography></TableCell>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1" style={{ color: "green" }}>
                              Email
                              <Button onClick={() => this.handleSort("admin_email")}>
                                {sortField === "admin_email" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "whitesmoke" }} /> : <AiOutlineSortDescending style={{ color: "whitesmoke" }} />}
                              </Button>
                            </Typography></TableCell>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1" style={{ color: "green" }}>
                              Phone Number
                              <Button onClick={() => this.handleSort("admin_phone_number")}>
                                {sortField === "admin_phone_number" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "whitesmoke" }} /> : <AiOutlineSortDescending style={{ color: "whitesmoke" }} />}
                              </Button>
                            </Typography></TableCell>

                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1" style={{ color: "green" }}>
                              Action </Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {currentItems.map(task => (
                          <StyledTableRow key={task.admin_id}>
                            <TableCell>{task.admin_id}</TableCell>
                            <TableCell>{task.admin_name}</TableCell>
                            <TableCell>{task.admin_email}</TableCell>
                            <TableCell>{task.admin_phone_number}</TableCell>
                            {(sessiondetails && (sessiondetails.userType === "superadmin")) && (

                              <TableCell>
                                {/* <Button variant="contained" startIcon={<FaEdit style={{ color: "whitesmoke", }} />}
                                  onClick={() => this.handleUpdate(task)} /> */}
                                {sessiondetails !== null && fetchedPrivileges && (
                                  <>

                                    {fetchedPrivileges === "1111" && (
                                      <Button variant="contained" startIcon={<FaEdit style={{ color: "whitesmoke", }} />}
                                        onClick={() => this.handleUpdate(task)} />
                                    )}

                                    {fetchedPrivileges === "1110" && (
                                      <Button variant="contained" startIcon={<FaEdit style={{ color: "whitesmoke", }} />}
                                        onClick={() => this.handleUpdate(task)} />
                                    )}
                                  </>
                                )}
                              </TableCell>
                            )}
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
            <DialogTitle>Update Status Of Employee</DialogTitle>
            <DialogContent style={{ width: isSmallScreen ? "100%" : "500px", textAlign: "center" }}>
              <TextField
                label="Admin Id"
                value={this.state.selectedTask ? this.state.selectedTask.admin_id : ""}
                variant="outlined"
                fullWidth
                InputProps={{ readOnly: true }}
                inputComponent={Input}
                style={{ width: isSmallScreen ? "100%" : "300px", marginTop: '5px', marginBottom: '5px' }}
                onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, admin_id: e.target.value } })}
              />
              <TextField
                label="Phone Number"
                value={this.state.selectedTask ? this.state.selectedTask.admin_phone_number : ""}
                variant="outlined"
                fullWidth
                style={{ width: isSmallScreen ? "100%" : "300px", marginBottom: '10px' }}
                onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, admin_phone_number: e.target.value } })}
              />
              <TextField
                label="Name"
                value={this.state.selectedTask ? this.state.selectedTask.admin_name : ""}
                variant="outlined"
                fullWidth
                style={{ width: isSmallScreen ? "100%" : "300px", marginBottom: '10px' }}
                onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, admin_name: e.target.value } })}
              />
              <TextField
                label="Email"
                value={this.state.selectedTask ? this.state.selectedTask.admin_email : ""}
                variant="outlined"
                fullWidth
                style={{ width: isSmallScreen ? "100%" : "300px", marginBottom: '10px' }}
                onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, admin_email: e.target.value } })}
              />
              <TextField
                label="Permissions"
                value={this.state.selectedTask ? this.state.selectedTask.admin_permissions : ""}
                variant="outlined"
                fullWidth
                style={{ width: isSmallScreen ? "100%" : "300px", marginBottom: '10px' }}
                onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, admin_permissions: e.target.value } })}
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


export default withStyles(styles)(AdminData);