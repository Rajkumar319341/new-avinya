import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { Box, Input, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton, TablePagination, TableContainer, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit } from 'react-icons/fa';
import Loading from "../Loading";
import { APIData, org } from '../Authentication/APIData';
import { AiOutlinePlusCircle, AiOutlineSortAscending, AiOutlineSortDescending, } from "react-icons/ai";
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { withRouter } from 'react-router-dom';

// import dayjs from 'dayjs';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';


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
    letterSpacing: '3px',
    background: '#ffc14d',
    padding: '5px',
    fontWeight: 'bold',
    color: "green",
    fontSize: "25px"
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
  // // hide last border
  // '&:last-child td, &:last-child th': {
  //   border: 0,
  //},
}));
class QueryData extends Component {
  state = {
    loading: false,
    sortField: "",
    sortDirection: "asc",
    currentPage: 0,
    itemsPerPage: 5,
    data: [],
    page: 0,
    rowsPerPage: 5,
    isSmallScreen: window.matchMedia('(max-width: 600px)').matches,

  };

  // componentDidMount() {
  //   this.fetchAdmins();
  // }

  function(){
    this.props.history.push("/")
  
  }
  
  componentDidMount() {
    const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
    if (sessiondetails === null) {
      this.props.history.push('/institutionalSignIn');
    }
    else {
      const sessionpriviliges = sessiondetails.privileges;
      this.fetchAdmins();

      console.log("session previliges:", sessionpriviliges)

    }
  }
  fetchAdmins = () => {
    this.setState({ loading: true });
    axios.get(APIData.api + `queries?org=${org}`, { headers: APIData.headers })
      .then(response => {
        this.setState({
          data: response.data,
          loading: false
        });
        // console.log(response);
      })
      .catch(error => {
        toast.error('Error fetching data');
        console.error(error);
        this.setState({ loading: false });
      });
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

      id: selectedTask.id,
      course: this.state.selectedTask.course,
      date: this.state.selectedTask.date,
      name: this.state.selectedTask.name,
      phone_number: this.state.selectedTask.phone_number,
      query: this.state.selectedTask.query,
      org: org
    }
    console.log(form);


    const url = APIData.api + 'queries/'
    console.log(url);
    axios.post(url, form, { headers: APIData.headers })

      .then(response => {

        if (response.status == 201 || response.status == "success") {
          toast('Updated successfully')
          // window.location.reload("/");
        }
        else {
          console.log(response);
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

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10), page: 0 });
  };


  render() {
    const { loading, data, sortField, sortDirection, page, rowsPerPage } = this.state;
    const { classes } = this.props;
    const { isSmallScreen } = this.state;

    const sortedTasks = [...data].sort((a, b) => {
      const aValue = typeof a[sortField] === 'string' ? a[sortField].toLowerCase() : a[sortField];
      const bValue = typeof b[sortField] === 'string' ? b[sortField].toLowerCase() : b[sortField];

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, sortedTasks.length - page * rowsPerPage);
    const currentItems = sortedTasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
      <Box mt={3} display="flex" justifyContent="center">
        <Box width="100%" border="2px solid black">
          <Paper className={classes.root}>
            <Box p={3}
            >
              <Typography
                style={{ fontSize: "25px", fontWeight: "bold", letterSpacing: "4px", padding: "5px" }}
                variant="h5" gutterBottom align="center" className={classes.enrollmentsHeader}>
                QUERIES
              </Typography>

              {loading ? <Loading /> :
                <div>

                  <Button
                    onClick={() => this.handleUpdate()}
                    startIcon={<AiOutlinePlusCircle style={{ color: "white" }} />} variant="contained" color="primary">Upload</Button>
                  <div className={classes.buttonGroup}>
                    {isSmallScreen ? (
                      <Box>
                        {currentItems.map(task => (
                          <Paper key={task.id} style={{ marginBottom: "5px", padding: "10px" }}>
                            <Typography variant="subtitle1">
                              Id: {task.id}
                            </Typography>
                            <Typography variant="subtitle1">
                              Course: {task.course}
                            </Typography>
                            <Typography variant="subtitle1">
                              Date: {task.date}
                            </Typography>
                            <Typography variant="subtitle1">
                              Name: {task.name}
                            </Typography>
                            <Typography variant="subtitle1">
                              Phone Number: {task.phone_number}
                            </Typography>
                            <Typography variant="subtitle1">
                              Query: {task.query}
                            </Typography>

                            <Box style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }} mt={2}>
                              {/* <IconButton >
                                  <FaEdit onClick={() => this.handleUpdate(task)} style={{ color: "green", marginRight: "2rem" }} />
                                </IconButton> */}
                              {sessiondetails !== null && fetchedPrivileges && (
                                <>
                                  {(fetchedPrivileges === "1111" || fetchedPrivileges === "1110") && (
                                    <FaEdit style={{ color: "green" }} onClick={() => this.handleUpdate(task)} />
                                  )}

                                </>
                              )}

                            </Box>
                          </Paper>
                        ))}
                      </Box>
                    ) : (
                      <Table
                        style={{ marginTop: "1rem" }}
                        border="2px solid black"
                        className="table table-sm table-bordered table-striped">
                        <TableHead className={classes.tableHead}>
                          <TableRow>
                            <TableCell className={classes.tableCell}>
                              <Typography variant="subtitle1" style={{ fontWeight: "bold", color: "green" }}>
                                Id
                                <Button onClick={() => this.handleSort("id")}>
                                  {sortField === "id" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "whitesmoke" }} /> : <AiOutlineSortDescending style={{ color: "whitesmoke" }} />}
                                </Button>
                              </Typography></TableCell>
                            <TableCell className={classes.tableCell}>
                              <Typography variant="subtitle1" style={{ fontWeight: "bold", color: "green" }}>
                                Course
                                <Button onClick={() => this.handleSort("course")}>
                                  {sortField === "course" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "whitesmoke" }} /> : <AiOutlineSortDescending style={{ color: "whitesmoke" }} />}
                                </Button>
                              </Typography></TableCell>
                            <TableCell className={classes.tableCell}>
                              <Typography variant="subtitle1" style={{ fontWeight: "bold", color: "green" }}>
                                Date
                                <Button onClick={() => this.handleSort("date")}>
                                  {sortField === "date" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "whitesmoke" }} /> : <AiOutlineSortDescending style={{ color: "whitesmoke" }} />}
                                </Button>
                              </Typography></TableCell>
                            <TableCell className={classes.tableCell}>
                              <Typography variant="subtitle1" style={{ fontWeight: "bold", color: "green" }}>
                                Name
                                <Button onClick={() => this.handleSort("name")}>
                                  {sortField === "name" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "whitesmoke" }} /> : <AiOutlineSortDescending style={{ color: "whitesmoke" }} />}
                                </Button>
                              </Typography></TableCell>
                            <TableCell className={classes.tableCell}>
                              <Typography variant="subtitle1" style={{ fontWeight: "bold", color: "green" }}>
                                Phone Number
                                <Button onClick={() => this.handleSort("phone_number")}>
                                  {sortField === "phone_number" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "whitesmoke" }} /> : <AiOutlineSortDescending style={{ color: "whitesmoke" }} />}
                                </Button>
                              </Typography></TableCell>
                            <TableCell className={classes.tableCell}>
                              <Typography variant="subtitle1" style={{ fontWeight: "bold", color: "green" }}>
                                Query
                                <Button onClick={() => this.handleSort("query")}>
                                  {sortField === "query" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "whitesmoke" }} /> : <AiOutlineSortDescending style={{ color: "whitesmoke" }} />}
                                </Button>
                              </Typography></TableCell>
                            <>
                              {sessiondetails !== null && fetchedPrivileges && (
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
                              <StyledTableCell>{task.id}</StyledTableCell>
                              <StyledTableCell>{task.course}</StyledTableCell>
                              <StyledTableCell>{task.date}</StyledTableCell>
                              <StyledTableCell>{task.name}</StyledTableCell>
                              <StyledTableCell>{task.phone_number}</StyledTableCell>
                              <StyledTableCell>{task.query}</StyledTableCell>
                              {/* <Button variant="contained" color='primary' startIcon={<FaEdit style={{ color: "whitesmoke", }} />}
                              onClick={() => this.handleUpdate(task)} /> */}
                              <>
                                {sessiondetails !== null && fetchedPrivileges && (
                                  <>
                                    {(fetchedPrivileges === "1111" || fetchedPrivileges === "1110") && (
                                      <StyledTableCell>
                                        <Button variant="contained" startIcon={<FaEdit style={{ color: "green" }} />} onClick={() => this.handleUpdate(task)} />
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
                  </div>
                </div>
              }
            </Box>
          </Paper>
          <Dialog open={this.state.isDialogOpen} onClose={this.handleDialogClose} style={{ textAlign: "center" }} >
            <DialogTitle>Query Form</DialogTitle>
            <DialogContent style={{ width: isSmallScreen ? "100%" : "500px", textAlign: "center" }}>

              <TextField
                label="Course"
                value={this.state.selectedTask ? this.state.selectedTask.course : ""}
                variant="outlined"
                fullWidth
                style={{ width: isSmallScreen ? "100%" : "300px", marginBottom: '10px' }}
                onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, course: e.target.value } })}
              />
              <TextField
                label="Phone Number"
                value={this.state.selectedTask ? this.state.selectedTask.phone_number : ""}
                variant="outlined"
                type='number'
                fullWidth
                style={{ width: isSmallScreen ? "100%" : "300px", marginBottom: '10px' }}
                onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, phone_number: e.target.value } })}
              />

              <TextField
                label="Date"
                value={this.state.selectedTask ?
                  this.state.selectedTask.date : "" || ""}
                variant="outlined"
                fullWidth
                InputLabelProps={{ shrink: true }}
                type="date"
                style={{ width: isSmallScreen ? "100%" : "300px", marginBottom: '10px' }}
                onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, date: e.target.value } })}
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
                label="Query"
                value={this.state.selectedTask ? this.state.selectedTask.query : ""}
                variant="outlined"
                fullWidth
                style={{ width: isSmallScreen ? "100%" : "300px", marginBottom: '10px' }}
                onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, query: e.target.value } })}
              />
            </DialogContent>
            <DialogActions style={{ display: "flex", justifyContent: "center" }}>

              <Button color="inherit" variant="contained" onClick={this.handleUpdate2}
              >
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

export default withStyles(styles)(withRouter(QueryData));
