import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import {
  Box, Typography, Paper,
  Table, TableHead,
  TableRow, TableCell,
  TableBody, Button,
  Dialog, TextField,
  Input, Grid,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { APIData, org } from '../Authentication/APIData';
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import Loading from "../Loading";
import { FaEdit } from 'react-icons/fa';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { IconButton } from '@mui/material';
import { TablePagination } from '@mui/material';

toast.configure();

let tasks = [];

const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
const fetchedDept = localStorage.getItem("Depart Details");
console.log("Fetched department:", fetchedDept);

let fetchedPrivileges = null;

if (sessiondetails !== null) {
  sessiondetails.privileges.forEach(privilege => {
    if (privilege.dept === fetchedDept) {
      fetchedPrivileges = privilege.privileges;
      console.log("Privileges for department", fetchedDept, ":", fetchedPrivileges);
    }
  });
}


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 750,
    width: "auto"
  },
  buttonGroup: {
    "& > *": {
      margin: theme.spacing(1),
      color: "green"
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
class StatusPage extends Component {
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


  responseloading() {
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

  handlePageChange = (event, page) => {
    this.setState({ currentPage: page + 1 });
  };

  handleUpdate = (task) => {
    // console.log(task);
    this.setState({ selectedTask: task, isDialogOpen: true });
  };

  handleUpdate2 = () => {
    const { selectedTask } = this.state;
    // console.log("Selected Task Details:", this.state.selectedTask.admin_id);
    const form = {

      username: this.state.selectedTask.username,
      password: this.state.selectedTask.password,
      status: this.state.selectedTask.status,
      role: this.state.selectedTask.role,
      email_id: this.state.selectedTask.email_id,
      phone_number: this.state.selectedTask.phone_number,
      updated_by: this.state.selectedTask.updated_by,
      org: org
    }
    // console.log(form);

    const url = APIData.api + 'login-type/user'
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
        <Box width="85%" border="2px solid black">
        <Paper className={classes.root}>
            <Box p={3} >
          <Typography variant="h5" gutterBottom align="center" className={classes.enrollmentsHeader}>
            STATUS
          </Typography>
        

              {loading ? <Loading /> :
                <div className={classes.buttonGroup}>
                  {isSmallScreen ? (
                    <Box>
                      {currentItems.map(task => (
                        <Paper key={task.username} style={{ marginBottom: "5px", padding: "10px" }}>
                          <Typography variant="subtitle1">
                            User Name: {task.username}
                          </Typography>
                          <Typography variant="subtitle1">
                            Status: {task.status}
                          </Typography>

                          <Box style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }} mt={2}>
                            {/* {(sessiondetails && (sessiondetails.userType === "superadmin" || sessiondetails.userType === "admin")) && (
                              <IconButton >
                                <FaEdit onClick={() => this.handleUpdate(task)} style={{ color: "green", marginRight: "2rem" }} />
                              </IconButton>
                            )} */}
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
                      className="table table-sm table-bordered table-striped">
                      <TableHead className={classes.tableHead}>
                        <TableRow>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1" style={{ color: "green" }}>
                              User Name <Button onClick={() => this.handleSort("username")}>
                                {sortField === "username" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                              </Button>
                            </Typography>
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1" style={{ color: "green" }}>
                              Status <Button onClick={() => this.handleSort("status")}>
                                {sortField === "status" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                              </Button>
                            </Typography>
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1" style={{ color: "green" }}>
                              Action
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {currentItems.map(task => (
                          <StyledTableRow key={task.username}>
                            <StyledTableCell>{task.username}</StyledTableCell>
                            <StyledTableCell>{task.status}</StyledTableCell>
                            <StyledTableCell>
                            {/* {(sessiondetails && (sessiondetails.userType === "superadmin" || sessiondetails.userType === "admin")) && (

                              <Button variant="contained" startIcon={<FaEdit style={{ color: "whitesmoke", }} />} onClick={() => this.handleUpdate(task)} />
                            )} */}
                            {sessiondetails !== null && fetchedPrivileges && (
                                  <>                                  
                                    {fetchedPrivileges === "1111" && (
                                       <Button variant="contained" startIcon={<FaEdit style={{ color: "whitesmoke", }} />} onClick={() => this.handleUpdate(task)} />
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
            <DialogTitle>Update Status Of Employee</DialogTitle>
            <DialogContent style={{ width: isSmallScreen ? "100%" : "500px", textAlign: "center" }}>
              <Grid container spacing={2}>

                <TextField
                  label="User Name"
                  InputProps={{ readOnly: true }}
                  inputComponent={Input}
                  value={this.state.selectedTask ? this.state.selectedTask.username : ""}
                  variant="outlined"
                  fullWidth
                  style={{ width: isSmallScreen ? "100%" : "300px", marginBottom: '10px' }}
                  onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, username: e.target.value } })}
                />


                <TextField
                  label="Status"
                  value={this.state.selectedTask ? this.state.selectedTask.status : ""}
                  variant="outlined"
                  fullWidth
                  style={{ width: isSmallScreen ? "100%" : "300px", marginBottom: '10px' }}
                  onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, status: e.target.value } })}
                />


                <TextField
                  label="Updated By"
                  InputProps={{ readOnly: true }}
                  inputComponent={Input}
                  style={{ width: isSmallScreen ? "100%" : "300px", marginBottom: '10px' }}
                  value={this.state.selectedTask ? this.state.selectedTask.updated_by : ""}
                  variant="outlined"
                  fullWidth
                  onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, updated_by: e.target.value } })}
                />



              </Grid>
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


export default withStyles(styles)(StatusPage);
