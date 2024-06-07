import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { APIData } from "../Authentication/APIData";
import { Link } from "react-router-dom";
import { Table, TableHead, TableBody, TableCell, TableRow, Button, Paper, Typography, Box, Container } from '@material-ui/core';
import Loading from "../Loading";
import { TablePagination } from '@mui/material';
import { withStyles } from '@material-ui/core/styles';
import { AiOutlineDownload, AiFillDelete, AiOutlineSortAscending, AiOutlineSortDescending, AiOutlinePlusCircle } from "react-icons/ai";
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { IconButton } from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { withRouter } from 'react-router-dom';

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
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 500,
  },
  buttonGroup: {
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  tableHead: {
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

class FestivalData extends Component {
  state = {
    loading: false,
    sortField: "",
    sortDirection: "asc",
    currentPage: 1,
    itemsPerPage: 5,
    isSmallScreen: window.matchMedia('(max-width: 600px)').matches,
  }

  
function(){
  this.props.history.push("/")

}

  componentDidMount() {
    const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
    if (sessiondetails === null) {
      this.props.history.push('/institutionalSignIn');
    }
    // else if(sessiondetails.userType==="user"){
    //   this.props.history.push('/');

    // }
    
    else {
      const sessionpriviliges = sessiondetails.privileges;
      console.log("session previliges:", sessionpriviliges)

    }
  }


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
  }
  handleUpdate = (task) => {
    // console.log(task);
    this.setState({ selectedTask: task, isDialogOpen: true });
  };
  handleUpdate2 = () => {
    const { selectedTask } = this.state;

    const url = `${APIData.api}festivals/updateFestivalImageDetails?id=${selectedTask.id}`;
    console.log("PUT URL:", url)

    const formData = new FormData();
    formData.append('fest_name', selectedTask.festival_name);
    formData.append('fest_date', selectedTask.festival_date);
    formData.append('des', selectedTask.description);
    formData.append('org', selectedTask.org);

    axios.put(url, formData, {
      headers: { ...APIData.headers, 'Content-Type': 'multipart/form-data' }
    })
      .then(response => {
        if (response.status === 201 || response.status === "success") {
          toast('Updated successfully');
          window.location.reload();
        } else {
          toast('Check with the Admin, failed');
        }
      })
      .catch(error => {
        console.log(error);
        toast("It's time to grab a coffee");
      });
  }


  handleDialogClose = () => {
    this.setState({ isDialogOpen: false });
  };


  handleDownload = (data) => {
    window.responseload.responseloading();
    axios
      .get(APIData.api + "festivals/download/" + data.id, {
        headers: APIData.headers,
      })
      .then((response) => {
        window.responseload.responseloading();
        window.location.href = response.request.responseURL;
      })
      .catch((error) => {
        window.responseload.responseloading();
        toast("Failed to download. Please try again later.");
      });
  }


  handleDelete = (data) => {
    const task = tasks.find((t) => t.id === data.id);
    const url = APIData.api + "festivals/?id=" + data.id;
    console.log(url);
    window.responseload.responseloading();
    axios
      .delete(url, { headers: APIData.headers })
      .then((response) => {
        if (response.status == 200) {
          toast("Festival Deleted");
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
      <Container maxWidth="lg">
        <Box mt={4}>
          <Paper className={classes.root}>
            <Box p={3} border="2px solid black">
              <Typography variant="h5" gutterBottom align="center" className={classes.enrollmentsHeader}>
                FESTIVALS
              </Typography>
              {loading ? <Loading /> :
                <div>
                  {/* <Link to="/uploadsingle">
                    <Button startIcon={<AiOutlinePlusCircle style={{ color: "green", marginBottom: "0.5rem" }} />} variant="contained" color="green">Upload</Button>
                  </Link> */}
                  {sessiondetails !== null && fetchedPrivileges && (
                    <>
                      {(fetchedPrivileges === "1111" || fetchedPrivileges === "1110") && (
                        <Link to="/uploadsingle">
                          <Button startIcon={<AiOutlinePlusCircle style={{ color: "green" }} />} variant="contained" color="success" >Upload</Button>
                        </Link>)}
                    </>
                  )}
                  {isSmallScreen ? (
                    <Box>
                      {currentItems.map(task => (
                        <Paper key={task.id} style={{ marginBottom: "5px", padding: "10px" }}>
                          <Typography variant="subtitle1">
                            Festival ID: {task.id}
                          </Typography>
                          <Typography variant="subtitle1">
                            Festival Name: {task.festival_name}
                          </Typography>
                          <Typography variant="subtitle1">
                            Festival Date: {task.festival_date}
                          </Typography>
                          <Typography variant="subtitle1">
                            Description: {task.description}
                          </Typography>
                          <Box style={{ display: "flex", flexDirection: "row" }} mt={2}>
                            {sessiondetails !== null && fetchedPrivileges && (
                              <>
                                {(fetchedPrivileges === "1110") && (
                                  <FaEdit style={{ color: "green" }} onClick={() => this.handleUpdate(task)} />
                                )}

                                {fetchedPrivileges === "1111" && (
                                  <>
                                    <AiFillDelete style={{ color: "red" }} onClick={() => this.handleDelete(task)} />
                                    <FaEdit style={{ color: "green" }} onClick={() => this.handleUpdate(task)} />
                                  </>
                                )}


                              </>
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
                            <Typography variant="subtitle1">
                              Festival ID
                              <Button onClick={() => this.handleSort("id")}>
                                {sortField === "id" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                              </Button>
                            </Typography>
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1">
                              Festival Date
                              <Button onClick={() => this.handleSort("festival_date")}>
                                {sortField === "festival_date" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                              </Button>
                            </Typography>
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1">
                              Festival Name
                              <Button onClick={() => this.handleSort("festival_name")}>
                                {sortField === "festival_name" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                              </Button>
                            </Typography>
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1">
                              Description
                              <Button onClick={() => this.handleSort("description")}>
                                {sortField === "description" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                              </Button>
                            </Typography>
                          </TableCell>
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
                            <StyledTableCell>{task.festival_date}</StyledTableCell>
                            <StyledTableCell>{task.festival_name}</StyledTableCell>
                            <StyledTableCell>{task.description}</StyledTableCell>
                            {/* {(sessiondetails && (sessiondetails.userType === "superadmin")) && (

                                <>
                                  <Button variant="contained" startIcon={<FaEdit style={{ color: "green" }} />} onClick={() => this.handleUpdate(task)} />
                                  <Button variant="contained" startIcon={<AiFillDelete style={{ color: "red" }} />} onClick={() => this.handleDelete(task)} />
                                </>
                            )} */}
                            <>
                              {sessiondetails !== null && fetchedPrivileges && (
                                <>
                                  {(fetchedPrivileges === "1110") && (
                                    <StyledTableCell>
                                      <Button variant="contained" startIcon={<FaEdit style={{ color: "green" }} />} onClick={() => this.handleUpdate(task)} />
                                    </StyledTableCell>

                                  )}

                                  {fetchedPrivileges === "1111" && (
                                    <StyledTableCell>
                                      <>
                                        <Button variant="contained" startIcon={<AiFillDelete style={{ color: "red" }} />} onClick={() => this.handleDelete(task)} />
                                        <Button variant="contained" startIcon={<FaEdit style={{ color: "green" }} />} onClick={() => this.handleUpdate(task)} />
                                      </>
                                    </StyledTableCell>

                                  )}


                                </>
                              )}
                            </>



                            {/* {(sessiondetails && (sessiondetails.userType === "admin")) && (

                                <Button variant="contained" startIcon={<FaEdit style={{ color: "green" }} />} onClick={() => this.handleDownload(task)} />
                              )} */}

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
          </Paper >
          <Dialog open={this.state.isDialogOpen} onClose={this.handleDialogClose} style={{ textAlign: "center" }}>
            <DialogTitle>Update Festival</DialogTitle>
            <DialogContent style={{ width: isSmallScreen ? "100%" : "300px", textAlign: "center" }}>
              <TextField
                label="id"
                value={this.state.selectedTask ? this.state.selectedTask.id : ""}
                variant="outlined"
                fullWidth
                InputProps={{ readOnly: true }}
                style={{ marginTop: '5px', marginBottom: '5px' }}
              />
              <TextField
                label="festival_name"
                value={this.state.selectedTask ? this.state.selectedTask.festival_name : ""}
                variant="outlined"
                fullWidth
                style={{ marginTop: '5px', marginBottom: '5px' }}
                onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, festival_name: e.target.value } })}
              />
              <TextField
                label="festival_date"
                type="date"
                value={this.state.selectedTask ? this.state.selectedTask.festival_date : ""}
                variant="outlined"
                fullWidth
                style={{ marginTop: '5px', marginBottom: '5px' }}
                onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, festival_date: e.target.value } })}
              />
              <TextField
                label="Description"
                value={this.state.selectedTask ? this.state.selectedTask.description : ""}
                variant="outlined"
                fullWidth
                style={{ marginBottom: '10px' }}
                onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, description: e.target.value } })}
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
        </Box >
      </Container >
    );
  }
}


export default withStyles(styles)(withRouter(FestivalData));