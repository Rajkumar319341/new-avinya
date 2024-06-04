import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineDownload, AiFillDelete, AiOutlineSortAscending, AiOutlineSortDescending, AiOutlinePlusCircle } from "react-icons/ai";
import { APIData } from "../Authentication/APIData";
import { Table, TableHead, TableBody, TableCell, TableRow, Button, Paper, Typography, Box } from "@material-ui/core";
import { tableCellClasses } from '@mui/material/TableCell';
import Loading from "../Loading";
import { withStyles } from "@material-ui/core/styles";
import { styled } from '@mui/material/styles';
import { Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { IconButton } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import {TablePagination} from "@mui/material";
toast.configure();

let tasks = [];
const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));

function printPage() {
  var printContents = document.getElementById("invoicePrint").innerHTML;
  console.log(printContents);
  var originalContents = document.body.innerHTML;
  console.log(originalContents);
  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
}

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(1),
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
    //background: "#808080",
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
    color: "black",
    fontSize: "20px",
 
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
class InvoiceData extends Component {
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
  handleUpdate = (task) => {
    // console.log(task);
    this.setState({ selectedTask: task, isDialogOpen: true });
  };

  handleUpdate2 = () => {
    const { selectedTask } = this.state;
    const form = {
      idinvoices: selectedTask.idinvoices,
      student_id: selectedTask.student_id,
      email_id: selectedTask.email_id,
      course: selectedTask.course,
      date: selectedTask.date,
      due_date: selectedTask.due_date,
      balance: selectedTask.balance,
      paid: selectedTask.paid,
      // reciept: this.state.selectedTask.reciept,
    }
    console.log("Form Data:", form)

    const url = APIData.api + "invoices/"
    console.log(url);
    axios.post(url, form, { headers: APIData.headers })
      .then(response => {
        if (response.status == 201 || response.status == "success") {
          printPage();
          toast(response.data.description);
          var url;
          if (sessiondetails.userType == "superadmin")
            url = new URL(APIData.url + "superAdminInvoice");
          else if (sessiondetails.userType == "admin")
            url = new URL(APIData.url + "invoice");
          setTimeout(() => {
            window.location.assign(url);
          }, 2000);
          // toast('Updated successfully');
          // console.log('About to reload');
          // window.location.reload();
        }
        else {
          // toast('Check With the Admin,failed')
          toast(response.data.errorDesc);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      })
      .catch(error => {
        toast("Generation failed");
        console.log(error);
      })
  }

  handleDialogClose = () => {
    this.setState({ isDialogOpen: false });
  };

  handleDelete = (data) => {
    const task = tasks.find((t) => t.id === data.id);
    const url = APIData.api + "invoices/" + data.id;
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
        <Box width="100%" border="2px solid black">
        <Paper className={classes.root}>
            <Box p={3} >

          <Typography variant="h5" gutterBottom align="center" className={classes.enrollmentsHeader}>
            INVOICE DOCUMENTS
          </Typography>
        

              {loading ? <Loading /> :
                <div className={classes.buttonGroup}>

                  <Link to="/createInvoice">
                    <Button startIcon={<AiOutlinePlusCircle style={{ color: "green" }} />} variant="contained"> Upload</Button>
                  </Link>
                  {isSmallScreen ? (
                    <Box>
                      {currentItems.map(task => (
                        <Paper key={task.idinvoices} style={{ marginBottom: "5px", padding: "10px" }}>
                          <Typography variant="subtitle1">
                            ID: {task.idinvoices}
                          </Typography>
                          <Typography variant="subtitle1">
                            Student ID: {task.student_id}
                          </Typography>
                          <Typography variant="subtitle1">
                            Email ID: {task.email_id}
                          </Typography>
                          <Typography variant="subtitle1">
                            Paid: {task.paid}
                          </Typography>
                          <Typography variant="subtitle1">
                            Date: {task.date}
                          </Typography>
                          <Typography variant="subtitle1">
                            Due Date: {task.due_date}
                          </Typography>
                          <Typography variant="subtitle1">
                            Course: {task.course}
                          </Typography>
                          <Typography variant="subtitle1">
                            Balance: {task.balance}
                          </Typography>
                          <Box style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }} mt={2}>

                            {(sessiondetails && (sessiondetails.userType === "superadmin" || sessiondetails.userType === "admin")) ? (
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
                            ) :
                              (
                                <IconButton >
                                  <AiOutlineDownload onClick={() => this.handleDownload(task)} style={{ color: "green", marginRight: "2rem" }} />
                                  {/* <FaEdit onClick={() => this.handleUpdate(task)} style={{ color: "green", marginRight: "2rem" }} />
                              <AiFillDelete onClick={() => this.handleDelete(task)} style={{ color: "red" }} /> */}
                                </IconButton>
                              )
                            }

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
                              ID
                              <Button onClick={() => this.handleSort("idinvoices")}>
                                {sortField === "idinvoices" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "black" }} /> : <AiOutlineSortDescending style={{ color: "black" }} />}
                              </Button>
                            </Typography>
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                              Student Id
                              <Button onClick={() => this.handleSort("student_id")}>
                                {sortField === "student_id" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "black" }} /> : <AiOutlineSortDescending style={{ color: "black" }} />}
                              </Button>
                            </Typography>
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                              Email Id
                              <Button onClick={() => this.handleSort("exp_name")}>
                                {sortField === "email_id" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "black" }} /> : <AiOutlineSortDescending style={{ color: "black" }} />}
                              </Button>
                            </Typography>
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                              Paid
                              <Button onClick={() => this.handleSort("paid")}>
                                {sortField === "paid" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "black" }} /> : <AiOutlineSortDescending style={{ color: "black" }} />}
                              </Button>
                            </Typography>
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                              Date
                              <Button onClick={() => this.handleSort("date")}>
                                {sortField === "date" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "black" }} /> : <AiOutlineSortDescending style={{ color: "black" }} />}
                              </Button>
                            </Typography>
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                              Due Date
                              <Button onClick={() => this.handleSort("due_date")}>
                                {sortField === "due_date" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "black" }} /> : <AiOutlineSortDescending style={{ color: "black" }} />}
                              </Button>
                            </Typography>
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                              Course
                              <Button onClick={() => this.handleSort("course")}>
                                {sortField === "course" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "black" }} /> : <AiOutlineSortDescending style={{ color: "black" }} />}
                              </Button>
                            </Typography>
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                              Balance
                              <Button onClick={() => this.handleSort("balance")}>
                                {sortField === "balance" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "black" }} /> : <AiOutlineSortDescending style={{ color: "black" }} />}
                              </Button>
                            </Typography>
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                              Action
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {currentItems.map(task => (
                          <StyledTableRow key={task.idinvoices}>
                            <StyledTableCell>{task.idinvoices}</StyledTableCell>
                            <StyledTableCell>{task.student_id}</StyledTableCell>
                            <StyledTableCell>{task.email_id}</StyledTableCell>
                            <StyledTableCell>{task.paid}</StyledTableCell>
                            <StyledTableCell>{task.date}</StyledTableCell>
                            <StyledTableCell>{task.due_date}</StyledTableCell>
                            <StyledTableCell>{task.course}</StyledTableCell>
                            <StyledTableCell>{task.balance}</StyledTableCell>
                            {/* <StyledTableCell>{task.reason}</StyledTableCell>
                          <StyledTableCell>{task.created_by}</StyledTableCell> */}
                            {/* <StyledTableCell>

                              <Button variant="contained"
                                startIcon={<AiOutlineDownload style={{ color: "green", }} />}
                                onClick={() => this.handleUpdate(task)}
                              />

                              <Button variant="contained"
                                startIcon={<AiFillDelete style={{ color: "red" }} />}
                                onClick={() => this.handleDelete(task)} />
                            </StyledTableCell> */}
                            <StyledTableCell>
                              {(sessiondetails && (sessiondetails.userType === "superadmin" || sessiondetails.userType === "admin")) ? (
                                <>
                                  <Button variant="contained" startIcon={<FaEdit style={{ color: "#1976d2" }} />} onClick={() => this.handleUpdate(task)} />

                                  <Button variant="contained"
                                    startIcon={<AiFillDelete style={{ color: "red" }} />}
                                    onClick={() => this.handleDelete(task)} />

                                  <Button variant="contained"
                                    startIcon={<AiOutlineDownload style={{ color: "green", }} />}
                                    onClick={() => this.handleDownload(task)} />
                                </>
                              ) :
                                (
                                  <Button variant="contained"
                                  startIcon={<AiOutlineDownload style={{ color: "green", }} />}
                                  onClick={() => this.handleDownload(task)} />
                                )
                              }

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
            <DialogTitle>Print Invoice</DialogTitle>
            <DialogContent style={{ width: "500px", textAlign: "center" }}>
              <TextField
                label="id"
                value={this.state.selectedTask ? this.state.selectedTask.idinvoices : ""}
                variant="outlined"
                fullWidth
                InputProps={{ readOnly: true }}
                style={{ width: '300px', marginTop: '5px', marginBottom: '5px' }}
              />
              <TextField
                label="Student Id"
                value={this.state.selectedTask ? this.state.selectedTask.student_id : ""}
                variant="outlined"
                fullWidth
                InputProps={{ readOnly: true }}
                style={{ width: '300px', marginBottom: '10px' }}
              // onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, reason: e.target.value } })}
              />
              <TextField
                label="Email Id"
                value={this.state.selectedTask ? this.state.selectedTask.email_id : ""}
                variant="outlined"
                fullWidth
                InputProps={{ readOnly: true }}
                style={{ width: '300px', marginBottom: '10px' }}
              />
              <TextField
                label="Course"
                value={this.state.selectedTask ? this.state.selectedTask.course : ""}
                variant="outlined"
                fullWidth
                InputProps={{ readOnly: true }}
                style={{ width: '300px', marginBottom: '10px' }}
              />
              <TextField
                label="Date"
                value={this.state.selectedTask ? this.state.selectedTask.date : ""}
                variant="outlined"
                fullWidth
                InputProps={{ readOnly: true }}
                style={{ width: '300px', marginBottom: '10px' }}
              />
              <TextField
                label="Due Date"
                value={this.state.selectedTask ? this.state.selectedTask.due_date : ""}
                variant="outlined"
                fullWidth
                InputProps={{ readOnly: true }}
                style={{ width: '300px', marginBottom: '10px' }}
              />
              <TextField
                label="Balance"
                value={this.state.selectedTask ? this.state.selectedTask.balance : ""}
                variant="outlined"
                fullWidth
                InputProps={{ readOnly: true }}
                style={{ width: '300px', marginBottom: '10px' }}
              />
              <TextField
                label="Paid"
                value={this.state.selectedTask ? this.state.selectedTask.paid : ""}
                variant="outlined"
                fullWidth
                InputProps={{ readOnly: true }}
                style={{ width: '300px', marginBottom: '10px' }}
              />
            </DialogContent>
            <DialogActions style={{ display: "flex", justifyContent: "center" }}>
              <Button color="inherit" variant="contained" onClick={this.handleUpdate2}>
                Print
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

export default withStyles(styles)(InvoiceData);
