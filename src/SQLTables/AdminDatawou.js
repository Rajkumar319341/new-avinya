import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton, TablePagination, TableContainer } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit } from 'react-icons/fa';
import Loading from "../Loading";
import { APIData } from '../Authentication/APIData';
import {  AiOutlineSortAscending, AiOutlineSortDescending, } from "react-icons/ai";
import  { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';


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
    background: 'grey',
    height: 15,
  },
  tableCell: {
    color: 'white',
    fontWeight: 'bold',
  },
  enrollmentsHeader: {
    background: '#f57a7a',
    padding: '8px',
    fontWeight: 'bold',
    color: "whitesmoke"
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
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
class AdminData extends Component {
  state = {
    loading: false,
    sortField: "",
    sortDirection: "asc",
    currentPage: 0,
    itemsPerPage: 5,
    data: [],
    page: 0,
    rowsPerPage: 5,
  };

  componentDidMount() {
    this.fetchAdmins();
  }

  fetchAdmins = () => {
    this.setState({ loading: true });
    axios.get(APIData.api + 'admins/', { headers: APIData.headers })
      .then(response => {
        this.setState({
          data: response.data,
          loading: false
        });
      })
      .catch(error => {
        toast.error('Error fetching data');
        this.setState({ loading: false });
      });
  };

  handleSort = (field) => {
    let direction = "asc";
    if (this.state.sortField === field && this.state.sortDirection === "asc") {
      direction = "desc";
    }
    this.setState({ sortField: field, sortDirection: direction });
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10), page: 0 });
  };
  

  render() {
    const { loading, data, sortField, sortDirection, page, rowsPerPage } = this.state;
    const { classes } = this.props;

    const sortedTasks = [...data].sort((a, b) => {
      const aValue = typeof a[sortField] === 'string' ? a[sortField].toLowerCase() : a[sortField];
      const bValue = typeof b[sortField] === 'string' ? b[sortField].toLowerCase() : b[sortField];

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, sortedTasks.length - page * rowsPerPage);
    const currentItems = sortedTasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
      <Box mt={3} display="flex" justifyContent="center">
        <Box width="100%" border="2px solid black">
        <Typography variant="h5" gutterBottom align="center" className={classes.enrollmentsHeader}>
              Admins
            </Typography>
          <Paper className={classes.root}>
         

            {loading ? <Loading /> :

              <Table 
              border="2px solid black"
              className="table table-sm table-bordered table-striped">
                <TableHead className={classes.tableHead}>
                  <TableRow>
                    <TableCell className={classes.tableCell}>
                      <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                        Admin Id
                        <Button onClick={() => this.handleSort("admin_id")}>
                          {sortField === "admin_id" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "whitesmoke" }} /> : <AiOutlineSortDescending style={{ color: "whitesmoke" }} />}
                        </Button>
                      </Typography></TableCell>
                    <TableCell className={classes.tableCell}>
                      <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                        Name
                        <Button onClick={() => this.handleSort("admin_name")}>
                          {sortField === "admin_name" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "whitesmoke" }} /> : <AiOutlineSortDescending style={{ color: "whitesmoke" }} />}
                        </Button>
                      </Typography></TableCell>
                    <TableCell className={classes.tableCell}>
                      <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                        Email
                        <Button onClick={() => this.handleSort("admin_email")}>
                          {sortField === "admin_email" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "whitesmoke" }} /> : <AiOutlineSortDescending style={{ color: "whitesmoke" }} />}
                        </Button>
                      </Typography></TableCell>
                    <TableCell className={classes.tableCell}>
                      <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                        Phone Number
                        <Button onClick={() => this.handleSort("admin_phone_number")}>
                          {sortField === "admin_phone_number" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "whitesmoke" }} /> : <AiOutlineSortDescending style={{ color: "whitesmoke" }} />}
                        </Button>
                      </Typography></TableCell>

                    <TableCell className={classes.tableCell}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentItems.map(task => (
                    <StyledTableRow key={task.admin_id}>
                      <TableCell>{task.admin_id}</TableCell>
                      <TableCell>{task.admin_name}</TableCell>
                      <TableCell>{task.admin_email}</TableCell>
                      <TableCell>{task.admin_phone_number}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => this.handleUpdateClick(task)}>
                          <FaEdit />
                        </IconButton>
                      </TableCell>
                    </StyledTableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>

            }
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={sortedTasks.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={this.handleChangePage}
              onRowsPerPageChange={this.handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </Box>
    );
  }
}

export default withStyles(styles)(AdminData);
