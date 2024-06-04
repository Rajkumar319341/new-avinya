import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { APIData, org } from '../Authentication/APIData';
import Loading from "../Loading";
import { FaEdit } from 'react-icons/fa';
import { TablePagination } from '@mui/material';
import { IconButton } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { Table, TableHead, TableBody, TableCell, TableRow, Button, Paper, Typography, Box } from "@material-ui/core";
import { styled } from '@mui/material/styles';
import { Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Input, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { AiOutlineDownload, AiFillDelete, AiOutlineSortAscending, AiOutlineSortDescending, AiOutlinePlusCircle } from "react-icons/ai";
toast.configure();

const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
let tasks = [];

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
  tableHead: {
    // background: "#808080",
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

}));
class StudentData extends Component {
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
      student_id: selectedTask.student_id,
      name: this.state.selectedTask.name,
      email: this.state.selectedTask.email,
      phone_number: this.state.selectedTask.phone_number,
      fathers_name: this.state.selectedTask.fathers_name,
      mother_name: this.state.selectedTask.mother_name,
      address: this.state.selectedTask.address,
      gender: this.state.selectedTask.gender,
      alt_number: this.state.selectedTask.alt_number,
      institution: this.state.selectedTask.institution,
      educational_qualification: this.state.selectedTask.educational_qualification,
      photo: this.state.selectedTask.photo,
      professional_exp: this.state.selectedTask.professional_exp,
      dob: this.state.selectedTask.dob,
      created_date_time: selectedTask.created_date_time,
      createdBy: selectedTask.createdBy,
      updated_date_time: APIData.date,
      updatedBy: sessiondetails.user,
      org: org
      // branch: this.state.selectedTask.branch||""


    }
    console.log(form);


    const url = APIData.api + 'students/'
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
    //window.responseload.responseloading();
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
      <Box mt={4} display="flex" justifyContent="center">
        <Box width="95%" border="2px solid black">
        <Paper className={classes.root}>
            <Box p={3}
            // border={1}
            >

          <Typography variant="h5" gutterBottom align="center" className={classes.enrollmentsHeader}>
            STUDENTS
          </Typography>
              {loading ? <Loading /> :
                <div className={classes.buttonGroup}>
                  {isSmallScreen ? (
                    <Box>
                      {currentItems.map(task => (
                        <Paper key={task.student_id} style={{ marginBottom: "5px", padding: "10px" }}>
                          <Typography variant="subtitle1">
                            Student Id: {task.student_id}
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
                            Gender: {task.gender}
                          </Typography>
                          <Typography variant="subtitle1">
                            Institution: {task.institution}
                          </Typography>
                          <Typography variant="subtitle1">
                            Updated By: {task.updatedBy}
                          </Typography>
                          <Box style={{ display: "flex", flexDirection: "row" }} mt={2}>
                            {(sessiondetails && (sessiondetails.userType === "superadmin" || sessiondetails.userType === "admin")) && (
                              <IconButton >
                                <FaEdit onClick={() => this.handleUpdate(task)} style={{ color: "green", marginRight: "2rem" }} />
                              </IconButton>

                            )}

                          </Box>
                        </Paper>
                      ))}
                    </Box>
                  ) : (
                    <Table
                      border="2px solid black"
                      className="table table-sm table-bordered table-striped">
                      <TableHead className={classes.tableHead}>
                        <TableRow>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                              Student Id
                              <Button onClick={() => this.handleSort("student_id")}>
                                {sortField === "student_id" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                              </Button>
                            </Typography></TableCell>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                              Name
                              <Button onClick={() => this.handleSort("name")}>
                                {sortField === "name" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                              </Button>
                            </Typography></TableCell>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                              Email
                              <Button onClick={() => this.handleSort("email")}>
                                {sortField === "email" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                              </Button>
                            </Typography></TableCell>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                              Phone Number
                              <Button onClick={() => this.handleSort("phone_number")}>
                                {sortField === "phone_number" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                              </Button>
                            </Typography></TableCell>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                              Gender
                              <Button onClick={() => this.handleSort("gender")}>
                                {sortField === "gender" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                              </Button>
                            </Typography></TableCell>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                              Institution
                              <Button onClick={() => this.handleSort("institution")}>
                                {sortField === "institution" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                              </Button>
                            </Typography></TableCell>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                              Updated By
                              <Button onClick={() => this.handleSort("updatedBy")}>
                                {sortField === "updatedBy" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                              </Button>
                            </Typography></TableCell>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                              Action
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {currentItems.map(task => (
                          <StyledTableRow key={task.student_id}>
                            <TableCell>{task.student_id}</TableCell>
                            <TableCell>{task.name}</TableCell>
                            <TableCell>{task.email}</TableCell>
                            <TableCell>{task.phone_number}</TableCell>
                            <TableCell>{task.gender}</TableCell>
                            <TableCell>{task.institution}</TableCell>
                            <TableCell>{task.updatedBy}</TableCell>
                            <TableCell>
                            {(sessiondetails && (sessiondetails.userType === "superadmin" || sessiondetails.userType === "admin")) && (

                              <Button
                                variant="contained" startIcon={<FaEdit style={{ color: "#1976d2" }} />}
                                onClick={() => this.handleUpdate(task)} />
                            )}
                            </TableCell>
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
          <Dialog open={this.state.isDialogOpen} onClose={this.handleDialogClose} style={{ textAlign: "center" }} >
            <DialogTitle>Student Update Form</DialogTitle>
            <DialogContent style={{ width: isSmallScreen ? "100%" : "500px", textAlign: "center" }}>

              <TextField
                label="Id"
                value={this.state.selectedTask ? this.state.selectedTask.student_id : ""}
                variant="outlined"
                fullWidth
                InputProps={{ readOnly: true }}
                inputComponent={Input}
                style={{ width: isSmallScreen ? "100%" : "300px", marginBottom: '10px' }}
                onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, student_id: e.target.value } })}
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
                label="Father name"
                value={this.state.selectedTask ? this.state.selectedTask.fathers_name : ""}
                variant="outlined"
                fullWidth
                InputProps={{ readOnly: true }}
                inputComponent={Input}
                style={{ width: isSmallScreen ? "100%" : "300px", marginBottom: '10px' }}
                onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, fathers_name: e.target.value } })}
              />
              <TextField
                label="Mother name"
                value={this.state.selectedTask ? this.state.selectedTask.mother_name : ""}
                variant="outlined"
                fullWidth
                style={{ width: isSmallScreen ? "100%" : "300px", marginBottom: '10px' }}
                onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, mother_name: e.target.value } })}
              />
              <TextField
                label="Address"
                value={this.state.selectedTask ? this.state.selectedTask.address : ""}
                variant="outlined"
                fullWidth
                style={{ width: isSmallScreen ? "100%" : "300px", marginBottom: '10px' }}
                onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, address: e.target.value } })}
              />
              <TextField
                label="institution"
                value={this.state.selectedTask ? this.state.selectedTask.institution : ""}
                variant="outlined"
                fullWidth
                style={{ width: isSmallScreen ? "100%" : "300px", marginBottom: '10px' }}
                onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, institution: e.target.value } })}
              />
              <TextField
                label="Professional exp"
                value={this.state.selectedTask ? this.state.selectedTask.professional_exp : ""}
                variant="outlined"
                fullWidth
                style={{ width: isSmallScreen ? "100%" : "300px", marginBottom: '10px' }}
                onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, professional_exp: e.target.value } })}
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
export default withStyles(styles)(StudentData);
