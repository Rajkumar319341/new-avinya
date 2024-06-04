import React from "react";
import axios from "axios";
import "../CRUDTable.css";
import { Component } from "react";
import { toast } from "react-toastify";
import * as AiIcons from "react-icons/ai";
import { APIData } from "../Authentication/APIData";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Table, TableHead, TableBody, TableCell, TableRow, Button, Paper, Typography, Box } from '@material-ui/core';
import Loading from "../Loading";
import { TablePagination } from '@mui/material';
import { withStyles } from '@material-ui/core/styles';
import { AiOutlineDownload, AiFillDelete, AiOutlineSortAscending, AiOutlineSortDescending, AiOutlinePlusCircle } from "react-icons/ai";
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

toast.configure();

let tasks = [];

const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    // marginRight: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 1200,
    width: "auto",
    paddingRight:"20px"
  },
  buttonGroup: {
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  tableHead: {
    // background: "#808080",
    height: 15,
    fontWeight: 'bold',
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
class CoursesEnrolledData extends Component {
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

  // handleDelete = (data) => {
  //   const task = tasks.find(t => (t.course_id === data.course_id && t.student_id === data.student_id));
  //    //deletecourse(task);
  //    tasks = tasks.filter(t => t.course_id !== task.course_id);
  //    return Promise.resolve(task);
  //   // const url = APIData.api + 'file/' + data.id;
  //   // axios.delete(url, { headers: APIData.headers })
  //   //   .then(response => {
  //   //     if (response.data.status.toLowerCase() === "success") {
  //   //       toast(response.data.description);
  //   //       tasks = tasks.filter(t => t.id !== data.id);
  //   //     }
  //   //      else {
  //   //       toast(response.data.errorDesc);
  //   //     }
  //   //   })
  //   //   .catch(error => {
  //   //     toast("Error occurred while deleting file.");
  //   //   });
  // };

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
      <Box mt={4} display="flex" justifyContent="center" >
        <Box width="80%">
          <Paper className={classes.root} >
            <Box p={3} border="2px solid black">
              <Typography variant="h5" gutterBottom align="center"
              className={classes.enrollmentsHeader}>
              COURSES ENROLLED
              </Typography>
              {loading ? <Loading /> :
                <div 
                // className={classes.buttonGroup}
                >
                  {/* <Link to="/uploadsingle
                  ">
                    <Button startIcon={<AiOutlinePlusCircle style={{ color: "white" }} />} variant="contained" color="primary">Upload</Button>
                  </Link> */}
               {isSmallScreen ? (
                    <Box>
                      {currentItems.map(task => (
                        <Paper key={task.id} style={{ marginBottom: "5px", padding: "10px" }}>
                          <Typography variant="subtitle1">
                             ID: {task.id}
                          </Typography>
                          <Typography variant="subtitle1">
                            Course Id: {task.course_id}
                          </Typography>
                          <Typography variant="subtitle1">
                            Student Id: {task.student_id}
                          </Typography>
                         
                        </Paper>
                      ))}
                    </Box>
                  ) :
                    (
                  
                  <Table
                  style={{ marginRight: '20px' }} 
                  border="2px solid black"
                  className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.tableCell}>
                          <Typography variant="subtitle1">
                            Id
                            <Button onClick={() => this.handleSort("id")}>
                              {sortField === "fileName" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                            </Button>
                          </Typography>
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          <Typography variant="subtitle1">
                            Course Id
                            <Button onClick={() => this.handleSort("course_id")}>
                              {sortField === "file_size" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                            </Button>
                          </Typography>
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          <Typography variant="subtitle1" >
                            Student Id
                            <Button onClick={() => this.handleSort("student_id")}>
                              {sortField === "uploaded_date" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                            </Button>
                          </Typography>
                        </TableCell>
                        {/* <TableCell>
                          <Typography variant="subtitle1">
                            Uploaded By
                            <Button onClick={() => this.handleSort("uploaded_by")}>
                              {sortField === "uploaded_by" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "blue" }} /> : <AiOutlineSortDescending style={{ color: "blue" }} />}
                            </Button>
                          </Typography>
                        </TableCell> */}
                        {/* <TableCell>
                          <Typography variant="subtitle1">
                            Action
                          </Typography>
                        </TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentItems.map(task => (
                        <StyledTableRow key={task.id}>
                          <StyledTableCell>{task.id}</StyledTableCell>
                          <StyledTableCell>{task.course_id}</StyledTableCell>
                          <StyledTableCell>{task.student_id}</StyledTableCell>
                          {/* <TableCell >
                            <Button variant="contained" startIcon={<AiOutlineDownload style={{color: "green", }} />} onClick={() => this.handleDownload(task)} />
                            <Button  variant="contained" startIcon={<AiFillDelete style={{ color: "red" }} />} onClick={() => this.handleDelete(task)} />
                          </TableCell> */}
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

export default withStyles(styles)(CoursesEnrolledData);