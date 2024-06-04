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
import { FaEdit, FaIcons } from "react-icons/fa";
import { Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { withRouter } from 'react-router-dom';


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
class EmailData extends Component {
  state = {
    id: 0,
    loading: false,
    sortField: "",
    sortDirection: "asc",
    currentPage: 1,
    itemsPerPage: 5,
    selectedTask: null,
    isDialogOpen: false,
    // showPass: false,
    showPassword: false,
    isSmallScreen: window.matchMedia('(max-width: 600px)').matches,

  };

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

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

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
  handlePasscode = (task) => {
    // console.log(task);
    this.setState({ selectedTask: task });
  };

  handleUpdate2 = () => {
    const { selectedTask } = this.state;
    const form = {
      id: selectedTask.id,
      emailId: this.state.selectedTask.emailId,
      client: this.state.selectedTask.client,
      password: this.state.selectedTask.password,
      purpose: this.state.selectedTask.purpose,
      createdDate: this.state.createdDate,
      updatedBy: APIData.sessiondetails.user,
      updatedDate: '',
    }
    // console.log("Form Data:", form)

    const url = APIData.api + "asset-email/create/"
    // console.log(url);
    axios.post(url, form, { headers: APIData.headers })
      .then(response => {
        if (response.status == 201 || response.status == "success") {
          toast('Updated successfully');
          console.log('About to reload');
          window.location.reload();
        }
        else {
          toast('Check With the Admin,failed');
          this.handleDialogClose();
        }
      })
      .catch(error => {
        console.log(error);
        toast("It's time To Grab A Coffeee")
        this.handleDialogClose();
      })
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
    const url = APIData.api + "asset-email/delete-by-id?id=" + data.id;
    window.responseload.responseloading();
    axios
      .delete(url, { headers: APIData.headers })
      .then((response) => {
        if (response.status == 200) {
          toast("Email Deleted");
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
                EMAIL SERVICE
              </Typography>

              {loading ? <Loading /> :
                <div className={classes.buttonGroup}>
                  {sessiondetails !== null && fetchedPrivileges && (
                    <>
                      {(fetchedPrivileges === "1111" || fetchedPrivileges === "1110") && (
                        <Link to="/emailservice">
                          <Button startIcon={<AiOutlinePlusCircle style={{ color: "green" }} />} variant="contained" color="success" >Upload</Button>
                        </Link>)}
                    </>
                  )}

                  {isSmallScreen ? (
                    <Box>
                      {currentItems.map(task => (
                        <Paper key={task.id} style={{ marginBottom: "5px", padding: "10px" }}>
                          <Typography variant="subtitle1">
                            Id: {task.id}
                          </Typography>
                          <Typography variant="subtitle1">
                            Email Id: {task.emailId}
                          </Typography>
                          <Typography variant="subtitle1">
                            Client: {task.client}
                          </Typography>
                          {/* {sessiondetails && sessiondetails.userType === "superadmin" ? (
                            <StyledTableCell>
                              <TextField
                                type={this.state.showPassword ? 'text' : 'password'}
                                value={task.password}
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton onClick={this.handleClickShowPassword}>
                                        {this.state.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </StyledTableCell>

                          ) : (

                            <StyledTableCell>
                              {task.password}
                            </StyledTableCell>

                          )} */}

                          <>
                            {sessiondetails !== null && fetchedPrivileges && (
                              <>
                                {fetchedPrivileges === "1111" && (
                                  <StyledTableCell>
                                    {task.password}
                                  </StyledTableCell>
                                )}

                                {(fetchedPrivileges === "1100" || fetchedPrivileges === "1110" || fetchedPrivileges === "1000") && (

                                  <StyledTableCell>
                                    <TextField
                                      type={this.state.showPassword ? 'text' : 'password'}
                                      value={task.password}
                                      InputProps={{
                                        endAdornment: (
                                          <InputAdornment position="end">
                                            <IconButton onClick={this.handleClickShowPassword}>
                                              {this.state.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                          </InputAdornment>
                                        ),
                                      }}
                                    />
                                  </StyledTableCell>
                                )}

                              </>
                            )}
                          </>
                          <Typography variant="subtitle1">
                            Purpose: {task.purpose}
                          </Typography>
                          <Typography variant="subtitle1">
                            Date: {task.createdDate}
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
                      >
                        <TableRow>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                              ID
                              <Button onClick={() => this.handleSort("id")}>
                                {sortField === "id" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                              </Button>
                            </Typography>
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                              Email Id
                              <Button onClick={() => this.handleSort("emailId")}>
                                {sortField === "emailId" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                              </Button>
                            </Typography>
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1"
                              style={{ fontWeight: "bold" }}
                            >
                              Client
                              <Button onClick={() => this.handleSort("festival_name")}>
                                {sortField === "festival_name" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                              </Button>
                            </Typography>
                          </TableCell>
                          {(fetchedPrivileges === "1111") && (
                            <TableCell className={classes.tableCell}>
                              <Typography variant="subtitle1"
                                style={{ fontWeight: "bold" }}
                              >
                                Password
                              </Typography>
                            </TableCell>
                          )}

                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1"
                              style={{ fontWeight: "bold" }}
                            >
                              Purpose
                              <Button onClick={() => this.handleSort("purpose")}>
                                {sortField === "purpose" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                              </Button>
                            </Typography>
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1"
                              style={{ fontWeight: "bold" }}
                            >
                              Date
                              <Button onClick={() => this.handleSort("createdDate")}>
                                {sortField === "createdDate" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
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
                            <StyledTableCell>{task.emailId}</StyledTableCell>
                            <StyledTableCell>{task.client}</StyledTableCell>
                            {sessiondetails !== null && fetchedPrivileges && (
                              <>
                                {(fetchedPrivileges === "1100" || fetchedPrivileges === "1110" || fetchedPrivileges === "1000") && (
                                  <></>
                                )}


                                {fetchedPrivileges === "1111" && (
                                  <StyledTableCell>
                                    <TextField
                                      type={this.state.showPassword ? 'text' : 'password'}
                                      value={task.password}
                                      InputProps={{
                                        endAdornment: (
                                          <InputAdornment position="end">
                                            <IconButton onClick={this.handleClickShowPassword}>
                                              {this.state.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                          </InputAdornment>
                                        ),
                                      }}
                                    />
                                  </StyledTableCell>
                                )}

                              </>
                            )}
                            <StyledTableCell>{task.purpose}</StyledTableCell>
                            <StyledTableCell>{task.createdDate}</StyledTableCell>
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
            <DialogTitle>Update Email Service</DialogTitle>
            <DialogContent style={{ width: isSmallScreen ? "90%" : "500px", textAlign: "center" }}>
              <TextField
                label="id"
                value={this.state.selectedTask ? this.state.selectedTask.id : ""}
                variant="outlined"
                fullWidth
                InputProps={{ readOnly: true }}
                style={{ width: isSmallScreen ? "100%" : "300px", marginTop: '5px', marginBottom: '5px' }}
              />
              <TextField
                label="email Id"
                value={this.state.selectedTask ? this.state.selectedTask.emailId : ""}
                variant="outlined"
                fullWidth
                style={{ width: isSmallScreen ? "100%" : "300px", marginTop: '5px', marginBottom: '5px' }}
                onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, emailId: e.target.value } })}

              />
              <TextField
                label="client"
                value={this.state.selectedTask ? this.state.selectedTask.client : ""}
                variant="outlined"
                fullWidth
                style={{ width: isSmallScreen ? "100%" : "300px", marginTop: '5px', marginBottom: '5px' }}
                onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, client: e.target.value } })}

              />
              <TextField
                label="password"
                value={this.state.selectedTask ? this.state.selectedTask.password : ""}
                variant="outlined"
                fullWidth
                style={{ width: isSmallScreen ? "100%" : "300px", marginTop: '5px', marginBottom: '5px' }}
                onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, password: e.target.value } })}

              />
              <TextField
                label="purpose"
                value={this.state.selectedTask ? this.state.selectedTask.purpose : ""}
                variant="outlined"
                fullWidth
                style={{ width: isSmallScreen ? "100%" : "300px", marginTop: '5px', marginBottom: '5px' }}
                onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, purpose: e.target.value } })}

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

export default withStyles(styles)(withRouter(EmailData));
