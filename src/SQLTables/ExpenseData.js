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
import { IconButton } from "@mui/material";
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
    padding: '10px',
    fontWeight: 'bold',
    color: "green",
    fontSize: "20px"
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
class ExpenseData extends Component {
  state = {
    loading: false,
    sortField: "",
    sortDirection: "asc",
    currentPage: 1,
    itemsPerPage: 5,
    isSmallScreen: window.matchMedia('(max-width: 600px)').matches,

  };

  
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
  };

  handleUpdate = (task) => {
    // console.log(task);
    this.setState({ selectedTask: task, isDialogOpen: true });
  };

  handleUpdate2 = () => {
    const { selectedTask } = this.state;
    const form = {
      id: selectedTask.id,
      cost: this.state.selectedTask.cost,
      status: this.state.selectedTask.status,
      reason: this.state.selectedTask.reason,
      created_by: this.state.selectedTask.created_by,
      exp_date: this.state.selectedTask.exp_date,
      exp_name: this.state.selectedTask.exp_name,
      exp_type: this.state.selectedTask.exp_type,
      file_name: this.state.selectedTask.file_name,
      item_count: this.state.selectedTask.item_count,
      month: this.state.selectedTask.month,
      reciept: this.state.selectedTask.reciept,

    }
    // console.log("Form Data:", form)

    const url = APIData.api + "expenses/"
    // console.log(url);
    axios.put(url, form, { headers: APIData.headers })
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

  handleDownload = (data) => {
    window.responseload.responseloading();
    axios
      .get(APIData.api + "expenses/download/" + data.id, {
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
    const url = APIData.api + "expenses/" + data.id;
    window.responseload.responseloading();
    axios
      .delete(url, { headers: APIData.headers })
      .then((response) => {
        if (response.status == 200) {
          toast("Expense Deleted");
          tasks = tasks.filter((t) => t.id !== task.id);
          window.responseload.responseloading();
        }
      })
      .catch((error) => {
        toast("It's time To Grab A Coffeee");
        console.error(error);
        window.responseload.responseloading();
      });

    return Promise.resolve(task);
  }

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
            <Box p={3} >
          <Typography variant="h5" gutterBottom align="center" className={classes.enrollmentsHeader}>
            EXPENSE DOCUMENTS
          </Typography>
         

              {loading ? <Loading /> :

                <div className={classes.buttonGroup}>
                  <Link to="/addExpenses">
                    <Button startIcon={<AiOutlinePlusCircle style={{ color: "green" }} />} variant="contained" color="success" >Upload</Button>
                  </Link>
                  {isSmallScreen ? (
                    <Box>
                      {currentItems.map(task => (
                        <Paper key={task.id} style={{ marginBottom: "5px", padding: "10px" }}>
                          <Typography variant="subtitle1">
                            Expense ID: {task.id}
                          </Typography>
                          <Typography variant="subtitle1">
                            Expense Date: {task.exp_date}
                          </Typography>
                          <Typography variant="subtitle1">
                            Expense Name: {task.exp_name}
                          </Typography>
                          <Typography variant="subtitle1">
                            Expense Type: {task.exp_type}
                          </Typography>
                          <Typography variant="subtitle1">
                            Item Count: {task.item_count}
                          </Typography>
                          <Typography variant="subtitle1">
                            Cost: {task.cost}
                          </Typography>
                          <Typography variant="subtitle1">
                            Month: {task.month}
                          </Typography>
                          <Typography variant="subtitle1">
                            Status: {task.status}
                          </Typography>
                          <Typography variant="subtitle1">
                            Reason: {task.reason}
                          </Typography>
                          <Typography variant="subtitle1">
                            Uploaded By: {task.created_by}
                          </Typography>

                          {/* <Box style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }} mt={2}>
                                <IconButton >
                                  <AiOutlineDownload onClick={() => this.handleDownload(task)} style={{ color: "green", marginRight: "2rem" }} />
                                  <FaEdit onClick={() => this.handleUpdate(task)} style={{ color: "green", marginRight: "2rem" }} />
                                  <AiFillDelete onClick={() => this.handleDelete(task)} style={{ color: "red" }} />
                                </IconButton>

                              </Box> */}
                          <Box style={{ display: "flex", flexDirection: "row" }} mt={2}>
                            {/* {(sessiondetails && (sessiondetails.userType === "admin")) && (
                              <>
                                <IconButton onClick={() => this.handleDelete(task)}>
                                  <AiFillDelete style={{ color: "red", marginRight: "3rem" }} />
                                </IconButton>
                                <IconButton onClick={() => this.handleDownload(task)}>
                                  <AiOutlineDownload style={{ color: "green", marginRight: "2rem" }} />
                                </IconButton>
                              </>
                            )}
                            {(sessiondetails && (sessiondetails.userType === "superadmin")) && (
                              <>
                                <IconButton onClick={() => this.handleUpdate(task)}>
                                  <FaEdit style={{ color: "green", marginRight: "2rem" }} />
                                </IconButton>
                                <IconButton onClick={() => this.handleDelete(task)}>
                                  <AiFillDelete style={{ color: "red", marginRight: "3rem" }} />
                                </IconButton>
                                <IconButton onClick={() => this.handleDownload(task)}>
                                  <AiOutlineDownload style={{ color: "green", marginRight: "2rem" }} />
                                </IconButton>
                              </>
                            )}
                            {(sessiondetails && (sessiondetails.userType === "employee")) && (

                              <IconButton onClick={() => this.handleDownload(task)}>
                                <AiOutlineDownload style={{ color: "green", marginRight: "2rem" }} />
                              </IconButton>

                            )} */}
                            {sessiondetails !== null && fetchedPrivileges && (
                              <>
                                {(fetchedPrivileges === "1110") && (
                                  <>
                                  <FaEdit style={{ color: "green" }} onClick={() => this.handleUpdate(task)} />
                                  <AiOutlineDownload style={{ color: "green", marginRight: "2rem" }} onClick={() => this.handleDownload(task)} />
                                  </>

                                )}

                                {fetchedPrivileges === "1111" && (
                                  <>
                                    <AiFillDelete style={{ color: "red" }} onClick={() => this.handleDelete(task)} />
                                    <FaEdit style={{ color: "green" }} onClick={() => this.handleUpdate(task)} />
                                    <AiOutlineDownload style={{ color: "green", marginRight: "2rem" }} onClick={() => this.handleDownload(task)} />
                                  </>
                                )}
                                 {(fetchedPrivileges === "1000") && (
                                  <>
                                  <AiOutlineDownload style={{ color: "green", marginRight: "2rem" }} onClick={() => this.handleDownload(task)} />
                                  </>

                                )}
                                 {(fetchedPrivileges === "1100") && (
                                  <>
                                  <AiOutlineDownload style={{ color: "green", marginRight: "2rem" }} onClick={() => this.handleDownload(task)} />
                                  </>

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
                        className="table table-sm table-bordered "
                      >
                        <TableHead className={classes.tableHead}
                        // border="2px solid black"
                        >
                          <TableRow>
                            <TableCell className={classes.tableCell}>
                              <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                                Expense ID
                                <Button onClick={() => this.handleSort("id")}>
                                  {sortField === "id" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "black" }} /> : <AiOutlineSortDescending style={{ color: "black" }} />}
                                </Button>
                              </Typography>
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                                Expense Date
                                <Button onClick={() => this.handleSort("exp_date")}>
                                  {sortField === "exp_date" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "black" }} /> : <AiOutlineSortDescending style={{ color: "black" }} />}
                                </Button>
                              </Typography>
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              <Typography variant="subtitle1"
                                style={{ fontWeight: "bold" }}
                              // style={{ color: "black" }}
                              >
                                Expense Name
                                <Button onClick={() => this.handleSort("exp_name")}>
                                  {sortField === "exp_name" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "black" }} /> : <AiOutlineSortDescending style={{ color: "black" }} />}
                                </Button>
                              </Typography>
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              <Typography variant="subtitle1"
                                style={{ fontWeight: "bold" }}
                              //  style={{ color: "black" }}
                              >
                                Expense Type
                                <Button onClick={() => this.handleSort("exp_type")}>
                                  {sortField === "exp_type" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "black" }} /> : <AiOutlineSortDescending style={{ color: "black" }} />}
                                </Button>
                              </Typography>
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              <Typography variant="subtitle1"
                                style={{ fontWeight: "bold" }}
                              // style={{ color: "black" }}
                              >
                                Item Count
                                <Button onClick={() => this.handleSort("item_count")}>
                                  {sortField === "item_count" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "black" }} /> : <AiOutlineSortDescending style={{ color: "black" }} />}
                                </Button>
                              </Typography>
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              <Typography variant="subtitle1"
                                style={{ fontWeight: "bold" }}
                              // style={{ color: "black" }}
                              >
                                Cost
                                <Button onClick={() => this.handleSort("cost")}>
                                  {sortField === "cost" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "black" }} /> : <AiOutlineSortDescending style={{ color: "black" }} />}
                                </Button>
                              </Typography>
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              <Typography variant="subtitle1"
                                style={{ fontWeight: "bold" }}
                              // style={{ color: "black" }}
                              >
                                Month
                                <Button onClick={() => this.handleSort("month")}>
                                  {sortField === "month" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "black" }} /> : <AiOutlineSortDescending style={{ color: "black" }} />}
                                </Button>
                              </Typography>
                            </TableCell>
                            <TableCell className={classes.tableCell}>

                              <Typography variant="subtitle1"
                                style={{ fontWeight: "bold" }}
                              // style={{ color: "green" }}
                              >
                                Status
                                <Button onClick={() => this.handleSort("status")}>
                                  {sortField === "status" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "black" }} /> : <AiOutlineSortDescending style={{ color: "black" }} />}
                                </Button>
                              </Typography>
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              <Typography variant="subtitle1"
                                style={{ fontWeight: "bold" }}
                              // style={{ color: "green" }}
                              >
                                Reason
                                <Button onClick={() => this.handleSort("reason")}>
                                  {sortField === "reason" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "black" }} /> : <AiOutlineSortDescending style={{ color: "black" }} />}
                                </Button>
                              </Typography>
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              <Typography variant="subtitle1"
                                style={{ fontWeight: "bold" }}
                              // style={{ color: "green" }}
                              >
                                Uploaded By
                                <Button onClick={() => this.handleSort("created_by")}>
                                  {sortField === "created_by" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "black" }} /> : <AiOutlineSortDescending style={{ color: "black" }} />}
                                </Button>
                              </Typography>
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              <Typography variant="subtitle1"
                                style={{ fontWeight: "bold" }}
                              //style={{ color: "green" }}
                              >
                                Action
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {currentItems.map(task => (
                            <StyledTableRow key={task.id}>
                              <StyledTableCell>{task.id}</StyledTableCell>
                              <StyledTableCell>{task.exp_date}</StyledTableCell>
                              <StyledTableCell>{task.exp_name}</StyledTableCell>
                              <StyledTableCell>{task.exp_type}</StyledTableCell>
                              <StyledTableCell>{task.item_count}</StyledTableCell>
                              <StyledTableCell>{task.cost}</StyledTableCell>
                              <StyledTableCell>{task.month}</StyledTableCell>
                              <StyledTableCell>{task.status}</StyledTableCell>
                              <StyledTableCell>{task.reason}</StyledTableCell>
                              <StyledTableCell>{task.created_by}</StyledTableCell>

                              <StyledTableCell>
                                {/* {(sessiondetails && (sessiondetails.userType === "admin")) && (
                                  <>
                                    <Button variant="contained" startIcon={<AiFillDelete style={{ color: "red" }} />} onClick={() => this.handleDelete(task)} />
                                    <Button variant="contained" startIcon={<AiOutlineDownload style={{ color: "green", }} />} onClick={() => this.handleDownload(task)} />
                                  </>
                                )}
                                {(sessiondetails && (sessiondetails.userType === "superadmin")) && (
                                  <>
                                    <Button variant="contained" startIcon={<AiFillDelete style={{ color: "red" }} />} onClick={() => this.handleDelete(task)} />
                                    <Button variant="contained" startIcon={<AiOutlineDownload style={{ color: "green", }} />} onClick={() => this.handleDownload(task)} />
                                    <Button variant="contained" startIcon={<FaEdit style={{ color: "#1976d2" }} />} onClick={() => this.handleUpdate(task)} />
                                  </>
                                )}
                                {(sessiondetails && (sessiondetails.userType === "employee")) && (
                                  <>
                                    <Button variant="contained" startIcon={<AiOutlineDownload style={{ color: "green", }} />} onClick={() => this.handleDownload(task)} />
                                  </>
                                )} */}
                                {sessiondetails !== null && fetchedPrivileges && (
                                  <>
                                    {(fetchedPrivileges === "1110") && (
                                      <>
                                        <Button variant="contained" startIcon={<FaEdit style={{ color: "green" }} />} onClick={() => this.handleUpdate(task)} />
                                        <Button variant="contained" startIcon={<AiOutlineDownload style={{ color: "green", }} />} onClick={() => this.handleDownload(task)} />
                                      </>
                                    )}

                                    {fetchedPrivileges === "1111" && (
                                      <>
                                        <Button variant="contained" startIcon={<AiFillDelete style={{ color: "red" }} />} onClick={() => this.handleDelete(task)} />
                                        <Button variant="contained" startIcon={<FaEdit style={{ color: "green" }} />} onClick={() => this.handleUpdate(task)} />
                                        <Button variant="contained" startIcon={<AiOutlineDownload style={{ color: "green", }} />} onClick={() => this.handleDownload(task)} />

                                      </>
                                    )}
                                    {fetchedPrivileges === "1000" && (
                                      <>
                                        <Button variant="contained" startIcon={<AiOutlineDownload style={{ color: "green", }} />} onClick={() => this.handleDownload(task)} />
                                      </>
                                    )}
                                    {fetchedPrivileges === "1100" && (
                                      <>

                                        <Button variant="contained" startIcon={<AiOutlineDownload style={{ color: "green", }} />} onClick={() => this.handleDownload(task)} />

                                      </>
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
            <DialogTitle>Update Expense</DialogTitle>
            <DialogContent style={{ width: isSmallScreen ? "100%" : "500px", textAlign: "center" }}>
              <TextField
                label="id"
                value={this.state.selectedTask ? this.state.selectedTask.id : ""}
                variant="outlined"
                fullWidth
                InputProps={{ readOnly: true }}
                style={{ width: isSmallScreen ? "100%" : "300px", marginTop: '5px', marginBottom: '5px' }}
              />
              <FormControl variant="outlined" fullWidth style={{ width: isSmallScreen ? "100%" : "300px", marginBottom: '10px' }}>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  value={this.state.selectedTask ? this.state.selectedTask.status : ""}
                  onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, status: e.target.value } })}
                  label="Status"
                >
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Description"
                value={this.state.selectedTask ? this.state.selectedTask.reason : ""}
                variant="outlined"
                fullWidth
                style={{ width: isSmallScreen ? "100%" : "300px", marginBottom: '10px' }}
                onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, reason: e.target.value } })}
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


export default withStyles(styles)(withRouter(ExpenseData));
