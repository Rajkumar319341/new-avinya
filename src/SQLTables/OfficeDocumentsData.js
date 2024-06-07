import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
// import "../CRUDTable.css";
import { Component } from "react";
import * as AiIcons from "react-icons/ai";
import { AiOutlineDownload, AiFillDelete, AiOutlineSortAscending, AiOutlineSortDescending, AiOutlinePlusCircle } from "react-icons/ai";
import { APIData } from '../Authentication/APIData';
import { Table, TableHead, TableBody, TableCell, TableRow, Button, Paper, Typography, Box } from '@material-ui/core';
import Loading from "../Loading";
import { TablePagination } from '@mui/material';
import { withStyles } from '@material-ui/core/styles';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import 'react-toastify/dist/ReactToastify.css';


toast.configure()
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

    width: "100%"
  },
  buttonGroup: {
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  tableHead: {
    // background: "#808080",
    height: 10,
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
    fontSize: "25px",
    marginTop: '20px',
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
class OfficeDocumentsData extends Component {
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


  constructor(props) {
    super(props);
    window.responseload = this;
    this.getTask(this.props.data);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
  }
  function(){
    this.props.history.push("/")
  
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
    const url = APIData.api + 'office-file/' + data.id;
    window.location.href = url;
  };

  handleDelete = (data) => {
    const url = APIData.api + 'office-file/' + data.id;
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

    console.log("isSmallScreen:", isSmallScreen)

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
      <Box mt={4} display="flex" justifyContent="center" >
        <Box width="85%" border="2px solid black">
        <Paper className={classes.root} >
            <Box p={3} >

          <Typography variant="h5" gutterBottom align="center"
            className={classes.enrollmentsHeader}>
            OFFICE DOCUMENTS
          </Typography>
        
              {loading ? <Loading /> :
                <div className={classes.buttonGroup}>
                  <Link to="/uploadsingleoffice">
                    <Button startIcon={<AiOutlinePlusCircle style={{ color: "green" }} />} variant="contained" color="green">Upload</Button>
                  </Link>
                  {isSmallScreen ? (
                    <Box>
                      {currentItems.map(task => (
                        <Paper key={task.id} style={{ marginBottom: "5px" }}>
                          <Typography variant="subtitle1">
                            File Name: {task.fileName}
                          </Typography>
                          <Typography variant="subtitle1">
                            File Size: {task.file_size}
                          </Typography>
                          <Typography variant="subtitle1">
                            Date of Upload: {task.uploaded_date}
                          </Typography>
                          <Typography variant="subtitle1">
                            Uploaded By: {task.uploaded_by}
                          </Typography>
                          <Box display="flex" justifyContent="center" mt={1}>
                            {/* <Button variant="contained" style={{width:"40%",height:"15%", marginBottom:"5px"}} startIcon={<AiOutlineDownload style={{ color: "green", }} />} onClick={() => this.handleDownload(task)} />
                            <Button variant="contained" style={{width:"40%", height:"15%"}} startIcon={<AiFillDelete style={{ color: "red" }} />} onClick={() => this.handleDelete(task)} /> */}
                            {sessiondetails !== null && fetchedPrivileges && (
                              <>


                                {fetchedPrivileges === "1111" && (
                                  <>
                                    <Button variant="contained" style={{ width: "40%", height: "15%", marginBottom: "5px" }} startIcon={<AiOutlineDownload style={{ color: "green", }} />} onClick={() => this.handleDownload(task)} />
                                    <Button variant="contained" style={{ width: "40%", height: "15%" }} startIcon={<AiFillDelete style={{ color: "red" }} />} onClick={() => this.handleDelete(task)} />
                                  </>)}

                                {fetchedPrivileges === "1110" && (
                                  <Button variant="contained" style={{ width: "40%", height: "15%", marginBottom: "5px" }} startIcon={<AiOutlineDownload style={{ color: "green", }} />} onClick={() => this.handleDownload(task)} />
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
                      className={classes.table}>
                      <TableHead>
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
                              {/* <Button variant="contained" startIcon={<AiOutlineDownload style={{ color: "green", }} />} onClick={() => this.handleDownload(task)} />
                              <Button variant="contained" startIcon={<AiFillDelete style={{ color: "red" }} />} onClick={() => this.handleDelete(task)} /> */}
                              <>
                                {sessiondetails !== null && fetchedPrivileges && (
                                  <>


                                    {fetchedPrivileges === "1111" && (
                                      <>
                                        <Button variant="contained" startIcon={<AiOutlineDownload style={{ color: "green", }} />} onClick={() => this.handleDownload(task)} />
                                        <Button variant="contained" startIcon={<AiFillDelete style={{ color: "red" }} />} onClick={() => this.handleDelete(task)} />
                                      </>)}

                                    {fetchedPrivileges === "1110" && (
                                      <Button variant="contained" startIcon={<AiOutlineDownload style={{ color: "green", }} />} onClick={() => this.handleDownload(task)} />
                                    )}
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
      </Box>
    );
  }
}

export default withStyles(styles)(OfficeDocumentsData);

