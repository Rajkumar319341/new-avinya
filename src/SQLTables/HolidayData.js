import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import {
  Box, Typography,
  Paper, Table, TableHead,
  TableRow, TableCell,
  TableBody, Button,
  Dialog, TextField, Grid,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { APIData } from '../Authentication/APIData';
import { AiFillDelete, AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import Loading from "../Loading";
import { FaEdit } from 'react-icons/fa';
import { TablePagination } from '@mui/material';
import SuperAdmin from '../Super_Admin/SuperAdmin';
import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import {Container} from '@mui/material';

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
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 750,
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

class HolidayData extends Component {
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
      id: this.state.selectedTask.id,
      holiday_name: this.state.selectedTask.holiday_name,
      holiday_date: this.state.selectedTask.holiday_date,
      description: this.state.selectedTask.description,
      org: this.state.selectedTask.org
    }
    console.log(form);


    const url = APIData.api + `holidays/${selectedTask.id}`
    console.log(url);
    axios.put(url, form, { headers: APIData.headers })

      .then(response => {

        if (response.status == 201 || response.status == "success") {
          toast('Updated successfully')
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


  handleDelete = (data) => {
    const task = tasks.find((t) => t.id === data.id);
    const id = data.id
    // const formData = new FormData();
    // formData.append(
    //   "id",
    //  id
    // );
    console.log(id);
    const url = APIData.api + `holidays/?id=${id}`
    console.log(url);
    axios.delete(url, { headers: APIData.headers })

      .then(response => {

        if (response.status == 200 || response.status == "success") {
          toast('Deleted successfully')
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
      <Container maxWidth="lg">
        <Box mt={4}>
          <Paper className={classes.root}>
            <Box p={3} border="2px solid black">
            <Typography variant="h5" gutterBottom align="center" className={classes.enrollmentsHeader}>
              Holiday Details
            </Typography>

              {loading ? <Loading /> :
                <div className={classes.buttonGroup}>
                  {isSmallScreen ? (
                    <Box>
                      {currentItems.map(task => (
                        <Paper key={task.id} style={{ marginBottom: "5px", padding: "10px" }}>
                          <Typography variant="subtitle1">
                            Name: {task.holiday_name}
                          </Typography>
                          <Typography variant="subtitle1">
                            Date: {task.holiday_date}
                          </Typography>
                          <Typography variant="subtitle1">
                            Description: {task.description}
                          </Typography>

                          <Box style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }} mt={2}>
                            {/* <IconButton >
                              <FaEdit onClick={() => this.handleUpdate(task)} style={{ color: "green", marginRight: "2rem" }} />
                              <AiFillDelete onClick={() => this.handleDelete(task)} style={{ color: "red" }} />
                            </IconButton> */}
                            {sessiondetails !== null && fetchedPrivileges && (
                              <>
                                {fetchedPrivileges === "1111" && (
                                  <>
                                    <FaEdit onClick={() => this.handleUpdate(task)} style={{ color: "green", marginRight: "2rem" }} />
                                    <AiFillDelete onClick={() => this.handleDelete(task)} style={{ color: "red" }} />
                                  </>)}

                                {fetchedPrivileges === "1110" && (
                                  <FaEdit onClick={() => this.handleUpdate(task)} style={{ color: "green", marginRight: "2rem" }} />
                                )}
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
                      className="table table-sm table-bordered table-striped"
                    >
                      <TableHead className={classes.tableHead}
                      // border="2px solid black"
                      >
                          <TableRow>
                          <TableCell className={classes.tableCell}>
                              <Typography variant="subtitle1" >
                               Holiday Name
                                <Button onClick={() => this.handleSort("holiday_name")}>
                                  {sortField === "holiday_name" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                                </Button>
                              </Typography>
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              <Typography variant="subtitle1" >
                              Holiday Date 
                                <Button onClick={() => this.handleSort("holiday_date")}>
                                  {sortField === "holiday_date" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                                </Button>
                              </Typography>
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              <Typography variant="subtitle1" >
                                Description
                                {/* <Button onClick={() => this.handleSort("email")}>
                              {sortField === "email" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "whitesmoke" }} /> : <AiOutlineSortDescending style={{ color: "whitesmoke" }} />}
                            </Button> */}
                              </Typography>
                            </TableCell>
                            {/* {sessiondetails.userType === "superadmin" || sessiondetails.userType === "admin" ?
                              <TableCell>
                                <Typography variant="subtitle1" style={{ color: "whitesmoke" }}>
                                  Action
                                </Typography>
                              </TableCell> : null} */}
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
                          <StyledTableCell>{task.holiday_name}</StyledTableCell>
                              <StyledTableCell>{task.holiday_date}</StyledTableCell>
                              <StyledTableCell>{task.description}</StyledTableCell>

                              {/* {sessiondetails.userType === "superadmin" || sessiondetails.userType === "admin" ? <TableCell>
                                <Button variant="contained" startIcon={<FaEdit style={{ color: "whitesmoke", }} />} onClick={() => this.handleUpdate(task)} />
                                <Button variant="contained" startIcon={<AiFillDelete style={{ color: "red", }} />} onClick={() => this.handleDelete(task)} />

                              </TableCell> : null} */}
                                <>
                                  {sessiondetails !== null && fetchedPrivileges && (
                                    <>
                                      {fetchedPrivileges === "1111" && (
                                     <StyledTableCell>
                                        <>
                                          <Button variant="contained" startIcon={<FaEdit style={{ color: "whitesmoke", }} />} onClick={() => this.handleUpdate(task)} />
                                          <Button variant="contained" startIcon={<AiFillDelete style={{ color: "red", }} />} onClick={() => this.handleDelete(task)} />
                                        </>
                                        </StyledTableCell>
                                        )}

                                      {fetchedPrivileges === "1110" && (
                                       <StyledTableCell>
                                        <Button variant="contained" startIcon={<FaEdit style={{ color: "whitesmoke", }} />} onClick={() => this.handleUpdate(task)} />
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
          <Dialog open={this.state.isDialogOpen} onClose={this.handleDialogClose} style={{ textAlign: "center" }}>
            <DialogTitle>Update Status Of Employee</DialogTitle>
            <DialogContent style={{ width: isSmallScreen ? "100%" : "500px", textAlign: "center" }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Holiday Name"
                    readOnly
                    value={this.state.selectedTask ? this.state.selectedTask.holiday_name : ""}
                    variant="outlined"
                    fullWidth
                    style={{ marginTop: '5px', width: isSmallScreen ? "100%" : "" }}
                    onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, holiday_name: e.target.value } })}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Date"
                    value={this.state.selectedTask ? this.state.selectedTask.holiday_date : ""}
                    variant="outlined"
                    fullWidth
                    style={{ marginTop: '5px', width: isSmallScreen ? "100%" : "" }}
                    onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, holiday_date: e.target.value } })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    value={this.state.selectedTask ? this.state.selectedTask.description : ""}
                    variant="outlined"
                    fullWidth
                    style={{ marginTop: '5px', width: isSmallScreen ? "100%" : "" }}
                    onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, description: e.target.value } })}
                  />
                </Grid>
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

          </Box >
      </Container >
    );
  }
}

export default withStyles(styles)(HolidayData);

