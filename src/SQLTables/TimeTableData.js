import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineDownload, AiFillDelete, AiOutlineSortAscending, AiOutlineSortDescending, AiOutlinePlusCircle } from "react-icons/ai";
import { APIData } from "../Authentication/APIData";
import { Table, TableHead, TableBody, TableCell, TableRow, Button, Paper, Typography, Box } from "@material-ui/core";
import { tableCellClasses } from '@mui/material/TableCell';
import Loading from "../Loading";
import { TablePagination } from '@mui/material';
import { withStyles } from "@material-ui/core/styles";
import { styled } from '@mui/material/styles';
import { FaEdit } from "react-icons/fa";
import { Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import {IconButton} from "@mui/material";

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
class TimeTableData extends Component {
  state = {
    loading: false,
    sortField: "",
    sortDirection: "asc",
    currentPage: 1,
    itemsPerPage: 5,
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
      id: selectedTask.id,
      day: this.state.selectedTask.day,
      subject: this.state.selectedTask.subject,
      facultyname: this.state.selectedTask.facultyname,
      time: this.state.selectedTask.time,
      course: this.state.selectedTask.course,
      createdDate: this.state.selectedTask.createdDate,

    }
    console.log("Form Data:", form)

    const url = APIData.api + "timetable/"
    console.log(url);
    axios.post

      (url, form, { headers: APIData.headers })
      .then(response => {
        if (response.status == 201 || response.status == "success") {
          toast('Updated successfully');
          console.log('About to reload');

        }
        else {
          toast('Check With the Admin,failed')
        }
      })
      .catch(error => {
        console.log(error);
        toast("It's time To Grab A Coffeee")
      })
    window.location.reload();
  }

  handleDialogClose = () => {
    this.setState({ isDialogOpen: false });
  };



  // handleDownload = (data) => {
  //   window.responseload.responseloading();
  //   axios
  //     .get(APIData.api + "expenses/download/" + data.id, {
  //       headers: APIData.headers,
  //     })
  //     .then((response) => {
  //       window.responseload.responseloading();
  //       window.location.href = response.request.responseURL;
  //     })
  //     .catch((error) => {
  //       window.responseload.responseloading();
  //       toast("Failed to download. Please try again later.");
  //     });
  // }

  handleDelete = (data) => {
    const task = tasks.find((t) => t.id === data.id);
    const url = APIData.api + "timetable/" + data.id;
    window.responseload.responseloading();
    axios
      .delete(url, { headers: APIData.headers })
      .then((response) => {
        if (response.status == 200) {
          toast("Timetable Deleted");
          toast(response.data.description);
          tasks = tasks.filter((t) => t.id !== task.id);
          window.responseload.responseloading();
        }
      })
      .catch((error) => {
        toast("It's time To Grab A Coffeee");
        window.responseload.responseloading();
      });

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
            <Box width="95%" border="2px solid black">
              <Paper className={classes.root}>
                <Box p={3} >
                  <Typography variant=
                    "h5" gutterBottom align="center"
                    className={classes.enrollmentsHeader}>
                    TIME TABLE
                  </Typography>

                  {loading ? <Loading /> :
                    <div className={classes.buttonGroup}>

                      <Link to="/createTimeTable">
                        <Button startIcon={<AiOutlinePlusCircle style={{ color: "green" }} />} variant="contained" >Upload</Button>
                      </Link>
                      {isSmallScreen ? (
                    <Box>
                      {currentItems.map(task => (
                        <Paper key={task.id} style={{ marginBottom: "5px", padding: "10px" }}>
                          <Typography variant="subtitle1">
                            Day: {task.day}
                          </Typography>
                          <Typography variant="subtitle1">
                            Start Time: {task.time.substring(11, 17)}
                          </Typography>
                          <Typography variant="subtitle1">
                            End Time: {task.time.substring(28, 33)}
                          </Typography>
                          <Typography variant="subtitle1">
                            Subject: {task.subject}
                          </Typography>
                          <Typography variant="subtitle1">
                            Faculty Name: {task.facultyname}
                          </Typography>
                          <Typography variant="subtitle1">
                            Course: {task.course}
                          </Typography>
                          
                          <Box style={{ display: "flex", flexDirection: "row" }} mt={2}>
                            {sessiondetails && sessiondetails.userType === "superadmin" && (
                              <>
                                <IconButton onClick={() => this.handleUpdate(task)}>
                                  <FaEdit style={{ color: "green", marginRight: "3rem" }} />
                                </IconButton>
                                <IconButton onClick={() => this.handleDelete(task)}>
                                  <AiFillDelete style={{ color: "red",marginRight:"3rem" }} />
                                </IconButton>
                              </>
                            )}
                            {sessiondetails && sessiondetails.userType === "admin" && (
                              <IconButton onClick={() => this.handleUpdate(task)}>
                                <FaEdit style={{ color: "green" }} />
                              </IconButton>
                            )}
                           
                          </Box>
                        </Paper>
                      ))}

                    </Box>
                  ) : (
                      <Table
                        border="2px solid black"
                        className="table table-sm table-bordered table-striped"
                      >
                        <TableHead className={classes.tableHead}
                        // border="2px solid black"
                        >
                          <TableRow>
                            <TableCell className={classes.tableCell}>
                              <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                                Day
                                <Button onClick={() => this.handleSort("day")}>
                                  {sortField === "day" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                                </Button>
                              </Typography>
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              <Typography variant="subtitle1" style={{ fontWeight: "bold"  }}>
                                Start Time
                                {/* <Button onClick={() => this.handleSort("exp_date")}>
                              {sortField === "exp_date" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "whitesmoke" }} /> : <AiOutlineSortDescending style={{ color: "whitesmoke" }} />}
                            </Button> */}
                              </Typography>
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              <Typography variant="subtitle1" style={{ fontWeight: "bold"  }}>
                                End Time
                                {/* <Button onClick={() => this.handleSort("exp_date")}>
                              {sortField === "exp_date" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "whitesmoke" }} /> : <AiOutlineSortDescending style={{ color: "whitesmoke" }} />}
                            </Button> */}
                              </Typography>
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              <Typography variant="subtitle1" style={{fontWeight: "bold" }}>
                                Subject
                                <Button onClick={() => this.handleSort("subject")}>
                                  {sortField === "subject" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                                </Button>
                              </Typography>
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              <Typography variant="subtitle1" style={{fontWeight: "bold" }}>
                                Faculty name
                                <Button onClick={() => this.handleSort("facultyname")}>
                                  {sortField === "facultyname" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                                </Button>
                              </Typography>
                            </TableCell>

                            <TableCell className={classes.tableCell}>
                              <Typography variant="subtitle1" style={{fontWeight: "bold" }}>
                                Course
                                <Button onClick={() => this.handleSort("course")}>
                                  {sortField === "course" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                                </Button>
                              </Typography>
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              <Typography variant="subtitle1" style={{fontWeight: "bold" }}>
                                Action
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {currentItems.map(task => (
                            <StyledTableRow key={task.id}>
                              <StyledTableCell>{task.day}</StyledTableCell>
                              <StyledTableCell>{task.time.substring(11, 17)}</StyledTableCell>
                              <StyledTableCell>{task.time.substring(28, 33)}</StyledTableCell>
                              <StyledTableCell>{task.subject}</StyledTableCell>
                              <StyledTableCell>{task.facultyname}</StyledTableCell>
                              <StyledTableCell>{task.course}</StyledTableCell>

                              <StyledTableCell>
                              {sessiondetails && sessiondetails.userType === "superadmin" && (
                                <>
                                <Button
                                  variant="contained" startIcon={<FaEdit style={{ color: "#1976d2" }} />} onClick={() => this.handleUpdate(task)} />
                                <Button variant="contained" startIcon={<AiFillDelete style={{ color: "red" }} />} onClick={() => this.handleDelete(task)} />
                                </>
                              )}
                               {sessiondetails && sessiondetails.userType === "admin" && (
                                
                                <Button
                                  variant="contained" startIcon={<FaEdit style={{ color: "#1976d2" }} />} onClick={() => this.handleUpdate(task)} />
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
                          rowsPerPageOptions={[5,10,20,30]} 
                          className={isSmallScreen ? classes.smallScreenPagination : null}                        />

                      </Box>
                    </div>
                  }
                </Box>
              </Paper>
              <Dialog open={this.state.isDialogOpen} onClose={this.handleDialogClose} style={{ textAlign: "center" }}>
                <DialogTitle>Update TimeTable</DialogTitle>
                <DialogContent style={{ width: isSmallScreen ? "100%" : "500px", textAlign: "center" }}>
                  <TextField
                    label="ID"
                    value={this.state.selectedTask ? this.state.selectedTask.id : ""}
                    variant="outlined"
                    fullWidth
                    InputProps={{ readOnly: true }}
                    style={{ width: isSmallScreen ? "100%" : "300px", marginTop: '5px', marginBottom: '5px' }}
                    />
                  <FormControl variant="outlined" fullWidth style={{ width: isSmallScreen ? "100%" : "300px", marginTop: '5px', marginBottom: '5px' }}>
                    <InputLabel id="day-label">Status</InputLabel>
                    <Select
                      labelId="day-label"
                      value={this.state.selectedTask ? this.state.selectedTask.day : ""}
                      onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, day: e.target.value } })}
                      label="Day"
                    >
                      <MenuItem value="Mon">Monday </MenuItem>
                      <MenuItem value="Tue">Tuesday</MenuItem>
                      <MenuItem value="Wed">Wednesday</MenuItem>
                      <MenuItem value="Thur">Thursday</MenuItem>
                      <MenuItem value="Fri">Friday</MenuItem>
                      <MenuItem value="Sat">Saturday</MenuItem>
                      <MenuItem value="Sun">Sunday</MenuItem>
                    </Select>
                  </FormControl>
                  {/* <TextField
                label="Time"
                value={this.state.selectedTask ? this.state.selectedTask.time : ""}
                variant="outlined"
                fullWidth
                style={{ width: '300px', marginBottom: '10px' }}
                onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, time: e.target.value } })}
              /> */}
                  <TextField
                    label="Subject"
                    value={this.state.selectedTask ? this.state.selectedTask.subject : ""}
                    variant="outlined"
                    fullWidth
                    style={{ width: isSmallScreen ? "100%" : "300px", marginTop: '5px', marginBottom: '5px' }}
                    onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, subject: e.target.value } })}
                  />
                  <TextField
                    label="Faculty Name"
                    value={this.state.selectedTask ? this.state.selectedTask.facultyname : ""}
                    variant="outlined"
                    fullWidth
                    style={{ width: isSmallScreen ? "100%" : "300px", marginTop: '5px', marginBottom: '5px' }}
                    onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, facultyname: e.target.value } })}
                  />
                  <TextField
                    label="Course"
                    value={this.state.selectedTask ? this.state.selectedTask.course : ""}
                    variant="outlined"
                    fullWidth
                    style={{ width: isSmallScreen ? "100%" : "300px", marginTop: '5px', marginBottom: '5px' }}
                    onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, course: e.target.value } })}
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

export default withStyles(styles)(TimeTableData);
