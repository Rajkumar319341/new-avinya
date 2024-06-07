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

class DocumentsData extends Component {
  state = {
    loading: false,
    sortField: "",
    sortDirection: "asc",
    currentPage: 1,
    itemsPerPage: 5,
    isSmallScreen: window.matchMedia('(max-width: 600px)').matches,
  }
  handleChangeRowsPerPage = (event) => {
    this.setState({ itemsPerPage: parseInt(event.target.value, 10) });
  };

  
function(){
  this.props.history.push("/")

}


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
  }

  handleSort = (field) => {
    let direction = "asc";
    if (this.state.sortField === field && this.state.sortDirection === "asc") {
      direction = "desc";
    }
    this.setState({ sortField: field, sortDirection: direction });
  }

  handleDownload = (data) => {
    const url = APIData.api + 'file/' + data.id;
    window.location.href = url;
  };

  handleDelete = (data) => {
    const url = APIData.api + 'file/' + data.id;
    axios.delete(url, { headers: APIData.headers })
      .then(response => {
        if (response.data.status.toLowerCase() === "success") {
          toast(response.data.description);
          tasks = tasks.filter(t => t.id !== data.id);
        } else {
          toast(response.data.errorDesc);
        }
      })
      .catch(error => {
        toast("Error occurred while deleting file.");
      });
  };

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
                DOCUMENTS
              </Typography>
              {loading ? <Loading /> :
                <div>
                  <Link to="/uploadsingle">
                    <Button startIcon={<AiOutlinePlusCircle style={{ color: "green", marginBottom: "0.5rem" }} />} variant="contained" color="green">Upload</Button>
                  </Link>
                  {isSmallScreen ? (
                    <Box>
                      {currentItems.map(task => (
                        <Paper key={task.id} style={{ marginBottom: "5px", padding: "10px" }}>
                          <Typography variant="subtitle1">
                            File Name: {task.fileName}
                          </Typography>
                          <Typography variant="subtitle1">
                            File Size: {task.file_size}
                          </Typography>
                          <Typography variant="subtitle1">
                            Uploaded Date: {task.uploaded_date}
                          </Typography>
                          <Typography variant="subtitle1">
                            Uploaded By: {task.uploaded_by}
                          </Typography>
                          <Box style={{ display: "flex", flexDirection: "row" }} mt={2}>
                            {/* <IconButton onClick={() => this.handleDownload(task)}>
                              <AiOutlineDownload style={{ color: "green", marginRight: "2rem" }} />
                            </IconButton>
                            {(sessiondetails && (sessiondetails.userType === "superadmin" || sessiondetails.userType === "admin")) && (
                              <IconButton onClick={() => this.handleDelete(task)}>
                                <AiFillDelete style={{ color: "red", marginRight: "3rem" }} />
                              </IconButton>
                            )} */}
                            {sessiondetails !== null && fetchedPrivileges && (
                              <>
                                {fetchedPrivileges === "1100" && (
                                  <IconButton onClick={() => this.handleDownload(task)}>
                                    <AiOutlineDownload style={{ color: "green", marginRight: "2rem" }} />
                                  </IconButton>
                                )}
                                {fetchedPrivileges === "1110" && (
                                  <IconButton onClick={() => this.handleDownload(task)}>
                                    <AiOutlineDownload style={{ color: "green", marginRight: "2rem" }} />
                                  </IconButton>
                                )}

                                {fetchedPrivileges === "1111" && (
                                  <>
                                    <IconButton onClick={() => this.handleDownload(task)}>
                                      <AiOutlineDownload style={{ color: "green", marginRight: "2rem" }} />
                                    </IconButton>
                                    <IconButton onClick={() => this.handleDelete(task)}>
                                      <AiFillDelete style={{ color: "red", marginRight: "3rem" }} />
                                    </IconButton>
                                  </>)}


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
                              File Name
                              <Button onClick={() => this.handleSort("fileName")}>
                                {sortField === "fileName" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                              </Button>
                            </Typography>
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1">
                              File Size
                              <Button onClick={() => this.handleSort("file_size")}>
                                {sortField === "file_size" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                              </Button>
                            </Typography>
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1">
                              Date of Upload
                              <Button onClick={() => this.handleSort("uploaded_date")}>
                                {sortField === "uploaded_date" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                              </Button>
                            </Typography>
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1">
                              Uploaded By
                              <Button onClick={() => this.handleSort("uploaded_by")}>
                                {sortField === "uploaded_by" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                              </Button>
                            </Typography>
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            <Typography variant="subtitle1">
                              Action
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {currentItems.map(task => (
                          <StyledTableRow key={task.id}>
                            <StyledTableCell>{task.fileName}</StyledTableCell>
                            <StyledTableCell>{task.file_size}</StyledTableCell>
                            <StyledTableCell>{task.uploaded_date}</StyledTableCell>
                            <StyledTableCell>{task.uploaded_by}</StyledTableCell>
                            <StyledTableCell >
                              {/* {sessiondetails && (sessiondetails.userType === "superadmin" || sessiondetails.userType === "admin") ? (
                                <>
                                  <Button variant="contained" startIcon={<AiOutlineDownload style={{ color: "green", }} />} onClick={() => this.handleDownload(task)} />
                                  <Button variant="contained" startIcon={<AiFillDelete style={{ color: "red" }} />} onClick={() => this.handleDelete(task)} />
                                </>
                              ) : (
                                <Button variant="contained" startIcon={<AiOutlineDownload style={{ color: "green", }} />} onClick={() => this.handleDownload(task)} />
                              )} */}
                              <>
                                {sessiondetails !== null && fetchedPrivileges && (
                                  <>
                                    {fetchedPrivileges === "1100" && (
                                      <Button variant="contained" startIcon={<AiOutlineDownload style={{ color: "green", }} />} onClick={() => this.handleDownload(task)} />
                                    )}
                                    {fetchedPrivileges === "1110" && (
                                      <Button variant="contained" startIcon={<AiOutlineDownload style={{ color: "green", }} />} onClick={() => this.handleDownload(task)} />
                                    )}

                                    {fetchedPrivileges === "1111" && (
                                      <>
                                        <Button variant="contained" startIcon={<AiOutlineDownload style={{ color: "green", }} />} onClick={() => this.handleDownload(task)} />
                                        <Button variant="contained" startIcon={<AiFillDelete style={{ color: "red" }} />} onClick={() => this.handleDelete(task)} />
                                      </>)}


                                  </>
                                )}
                              </>
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
        </Box>
      </Container>
    );
  }
}

export default withStyles(styles)(DocumentsData);
