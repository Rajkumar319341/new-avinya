import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineDownload, AiFillDelete, AiOutlineSortAscending, AiOutlineSortDescending, AiOutlinePlusCircle } from "react-icons/ai";
import { APIData, org } from "../Authentication/APIData";
import { Table, TableHead, TableBody, TableCell, TableRow, Button, Paper, Typography, Box } from "@material-ui/core";
import Loading from "../Loading";
import { TablePagination } from '@mui/material';
import { withStyles } from "@material-ui/core/styles";
import { FaEdit } from "react-icons/fa";
import { Dialog,Input, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { IconButton } from "@mui/material";

toast.configure();

let tasks = [];
const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));

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
  // hide last border
  // '&:last-child td, &:last-child th': {
  //   border: 0,
  // },
}));

class JobsData extends Component {
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

  handleUpdate = (task) => {
    // console.log(task);
    this.setState({ selectedTask: task, isDialogOpen: true });
  };

  handleUpdate2 = () => {
    const { selectedTask } = this.state;
    const form = {
      course_id: selectedTask.course_id,
      course_description: this.state.selectedTask.course_description,
      course_type: this.state.selectedTask.course_type,
      course_sub_type: this.state.selectedTask.course_sub_type,
      course_fees: this.state.selectedTask.course_fees,
      course_duration: this.state.selectedTask.course_duration,
      admin_id: APIData.sessiondetails.user,
      org:org
    }
    // console.log("Form Data:", form)

    const url = APIData.api+'courses/'
    console.log(url);
    axios.post(url, form, { headers: APIData.headers })
      .then(response => {
        if (response.status == 201 || response.status == "success") {
          toast('Updated successfully');
          console.log('About to reload');
          window.location.reload();
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

  handleDelete = (data) => {
    const task = tasks.find(t => t.course_id === data.course_id);
       const url = APIData.api+'courses/' + data.course_id;
       window.responseload.responseloading();
 axios.delete(url,{headers:APIData.headers})     
  .then(response => {
    
    if(response.data.status.toString().toLowerCase() =="success"){
      toast(response.data.description)
      tasks = tasks.filter(t => t.course_id !== task.course_id);
      window.responseload.responseloading();  
    }
    else{        
      toast(response.data.errorDesc)
      window.responseload.responseloading();
    }
        })
        .catch(error => {
          toast("It's Time To Grab To Coffee")
          window.responseload.responseloading();
          
        })
     
     return Promise.resolve(task);
  }

  handlePageChange = (event, page) => {
    this.setState({ currentPage: page + 1 });
  };


  render() {
    const { classes } = this.props;
    const { isSmallScreen } = this.state;

    const { loading, sortField, sortDirection, currentPage, itemsPerPage } = this.state;

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
        <Typography variant="h5" gutterBottom align="center" className={classes.enrollmentsHeader}>
                JOBS 
              </Typography>
          <Paper className={classes.root}>
            <Box p={3} >
              

              {loading ? <Loading /> :
                <div className={classes.buttonGroup}>
                  <Link to="/addjobs">
                    <Button startIcon={<AiOutlinePlusCircle style={{ color: "green" }} />} variant="contained" color="green" >Create</Button>
                  </Link>
                  {isSmallScreen ? (
                    <Box>
                      {currentItems.map(task => (
                        <Paper key={task.id} style={{ marginBottom: "5px", padding: "10px" }}>
                          <Typography variant="subtitle1">
                            Job ID: {task.course_id}
                          </Typography>
                          <Typography variant="subtitle1">
                            Job Description: {task.course_description}
                          </Typography>
                          <Typography variant="subtitle1">
                            Job Type: {task.course_type}
                          </Typography>
                          <Typography variant="subtitle1">
                            Job Sub Type: {task.course_sub_type}
                          </Typography>
                          <Typography variant="subtitle1">
                            Salary: {task.course_fees}
                          </Typography>
                          <Typography variant="subtitle1">
                            Job Tenure: {task.course_duration}
                          </Typography>
                          <Typography variant="subtitle1">
                            Admin Id: {task.admin_id}
                          </Typography>
                          <Box style={{ display: "flex", flexDirection: "row" }} mt={2}>
                            {(sessiondetails && (sessiondetails.userType === "admin" || sessiondetails.userType==="superadmin")) && (
                              <>
                               <IconButton onClick={() => this.handleUpdate(task)}>
                                  <FaEdit style={{ color: "green", marginRight: "2rem" }} />
                                </IconButton>
                                <IconButton onClick={() => this.handleDelete(task)}>
                                  <AiFillDelete style={{ color: "red", marginRight: "3rem" }} />
                                </IconButton>
                               
                              </>
                            )}
                          </Box>
                          </Paper>
                        ))}
                      </Box>
                    ) :
                      (
                  <Table 
                  border="2px solid black"
                  className="table table-sm table-bordered table-striped">
                    <TableHead className={classes.tableHead}>
                      <TableRow>
                        <TableCell className={classes.tableCell}>
                          <Typography variant="subtitle1" style={{ color: "green" }}>
                            Job ID
                            <Button onClick={() => this.handleSort("course_id")}>
                              {sortField === "course_id" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                            </Button>
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle1" style={{ color: "green" }}>
                            Job Description
                            <Button onClick={() => this.handleSort("course_description")}>
                              {sortField === "course_description" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                            </Button>
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle1" style={{ color: "green" }}>
                            Job Type
                            <Button onClick={() => this.handleSort("course_type")}>
                              {sortField === "course_type" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                            </Button>
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle1" style={{ color: "green" }}>
                            Job Sub Type
                            <Button onClick={() => this.handleSort("course_sub_type")}>
                              {sortField === "course_sub_type" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                            </Button>
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle1" style={{ color: "green" }}>
                            Salary
                            <Button onClick={() => this.handleSort("course_fees")}>
                              {sortField === "course_fees" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                            </Button>
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle1" style={{ color: "green" }}>
                          Job Tenure                        
                              <Button onClick={() => this.handleSort("course_duration")}>
                              {sortField === "course_duration" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                            </Button>
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle1" style={{ color: "green" }}>
                          Admin ID                      
                              <Button onClick={() => this.handleSort("admin_id")}>
                              {sortField === "admin_id" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                            </Button>
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle1" style={{ color: "green" }}>
                            Action
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentItems.map(task => (
                        <StyledTableRow key={task.id}>
                          <StyledTableCell>{task.course_id}</StyledTableCell>
                          <StyledTableCell>{task.course_description}</StyledTableCell>
                          <StyledTableCell>{task.course_type}</StyledTableCell>
                          <StyledTableCell>{task.course_sub_type}</StyledTableCell>
                          <StyledTableCell>{task.course_fees}</StyledTableCell>
                          <StyledTableCell>{task.course_duration}</StyledTableCell>
                          <StyledTableCell>{task.admin_id}</StyledTableCell>
                          <StyledTableCell>
                          {(sessiondetails && (sessiondetails.userType === "superadmin" || sessiondetails.userType==="admin")) && (
                                  <>
                                    <Button variant="contained" startIcon={<AiFillDelete style={{ color: "red" }} />} onClick={() => this.handleDelete(task)} />
                                    <Button variant="contained" startIcon={<FaEdit style={{ color: "#1976d2" }} />} onClick={() => this.handleUpdate(task)} />
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
          <Dialog open={this.state.isDialogOpen} onClose={this.handleDialogClose} style={{ textAlign: "center" }} >
            <DialogTitle>Jobs Update Form</DialogTitle>
            <DialogContent style={{ width: "500px", textAlign: "center" }}>
              <TextField
                label="Course Id"
                value={this.state.selectedTask ? this.state.selectedTask.course_id : ""}
                variant="outlined"
                fullWidth
                InputProps={{ readOnly: true }}
                inputComponent={Input}
                style={{ width: '300px', marginTop: '5px', marginBottom: '5px' }}
                onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, course_id: e.target.value } })}
              />
              {/* <TextField
                label="course_type"
                value={this.state.course_type ? this.state.selectedTask.course_type : ""}
                variant="outlined"
                fullWidth
                InputProps={{ readOnly: true }}
                inputComponent={Input}
                style={{ width: '300px', marginBottom: '10px' }}
                onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, course_type: e.target.value } })}
              /> */}
              <TextField
                label="course_sub_type"
                value={this.state.selectedTask ? this.state.selectedTask.course_sub_type : ""}
                variant="outlined"
                fullWidth
                style={{ width: '300px', marginBottom: '10px' }}
                onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, course_sub_type: e.target.value } })}
              />
              <TextField
                label="course_description"
                value={this.state.selectedTask ? this.state.selectedTask.course_description : ""}
                variant="outlined"
                fullWidth
                multiline
                maxRows={5}
                // InputProps={{ readOnly: true }}
                // inputComponent={Input}
                style={{ width: '300px', marginBottom: '10px' }}
                onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, course_description: e.target.value } })}
              />
              <TextField
                label="course_fees"
                value={this.state.selectedTask ? this.state.selectedTask.course_fees : ""}
                variant="outlined"
                fullWidth
                style={{ width: '300px', marginBottom: '10px' }}
                onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, course_fees: e.target.value } })}
              />
              <TextField
                label="course_duration"
                value={this.state.selectedTask ? this.state.selectedTask.course_duration : ""}
                variant="outlined"
                fullWidth
                style={{ width: '300px', marginBottom: '10px' }}
                onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, course_duration: e.target.value } })}
              />


            </DialogContent>
            <DialogActions style={{ display: "flex", justifyContent: "center" }}>

              <Button color="inherit" variant="contained" 
              onClick={
                this.handleUpdate2
              }
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

export default withStyles(styles)(JobsData);
