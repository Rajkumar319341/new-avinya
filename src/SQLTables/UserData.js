import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton, TablePagination, TableContainer } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { APIData } from '../Authentication/APIData';
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import Loading from "../Loading";
import { FaEdit } from 'react-icons/fa';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

toast.configure();

const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
let tasks = [];

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
  tableHead: {
    // background: 'grey',
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

class UserData extends Component {
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
      <Box mt={3} display="flex" justifyContent="center">
        <Box width="100%" border="2px solid black">
        <Paper className={classes.root}>
            <Box p={3}
            // border={1}
            >
          <Typography variant="h5" gutterBottom align="center" className={classes.enrollmentsHeader}>
            USERS
          </Typography>
         
              {loading ? <Loading /> :
                <div className={classes.buttonGroup}>
                 {isSmallScreen ? (
                        <Box>
                          {currentItems.map(task => (
                            <Paper key={task.user_email} style={{ marginBottom: "5px", padding: "10px" }}>
                               <Typography variant="subtitle1">
                                Email: {task.user_email}
                              </Typography>
                              <Typography variant="subtitle1">
                                Name: {task.user_name}
                              </Typography>
                             
                              <Typography variant="subtitle1">
                                Phone Number: {task.user_phone_number}
                              </Typography>
                            </Paper>
                          ))}
                        </Box>
                      ) :(
                  <Table
                    border="2px solid black"
                    className="table table-sm table-bordered table-striped">
                    <TableHead className={classes.tableHead}>
                      <TableRow>
                        <TableCell className={classes.tableCell}>
                          <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                            Email
                            <Button onClick={() => this.handleSort("user_email")}>
                              {sortField === "user_email" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                            </Button>
                          </Typography></TableCell>
                        <TableCell className={classes.tableCell}>
                          <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                            Name
                            <Button onClick={() => this.handleSort("user_name")}>
                              {sortField === "user_name" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                            </Button>
                          </Typography></TableCell>
                        <TableCell className={classes.tableCell}>
                          <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                            Phone Number
                            <Button onClick={() => this.handleSort("user_phone_number")}>
                              {sortField === "user_phone_number" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                            </Button>
                          </Typography></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentItems.map(task => (
                        <StyledTableRow key={task.user_email}>
                          <StyledTableCell>{task.user_email}</StyledTableCell>
                          <StyledTableCell>{task.user_name}</StyledTableCell>
                          <StyledTableCell>{task.user_phone_number}</StyledTableCell>
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
        </Box>
      </Box>
    );
  }
}
export default withStyles(styles)(UserData);
