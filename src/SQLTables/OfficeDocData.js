import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { AiOutlineDownload, AiFillDelete, AiOutlineSortAscending, AiOutlineSortDescending, AiOutlinePlusCircle } from "react-icons/ai";
import { APIData } from '../Authentication/APIData';
import { Table, TableHead, TableBody, TableCell, TableRow, Button, Paper, Typography, Box } from '@material-ui/core';
import Loading from "../Loading";
import Pagination from '@material-ui/lab/Pagination';
import { withStyles } from '@material-ui/core/styles';

toast.configure();

let tasks = [];
const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});

class OfficeDocumentsData extends Component {
  state = {
    loading: false,
    sortField: "",
    sortDirection: "asc",
    currentPage: 1,
    itemsPerPage: 5
  }

  constructor(props) {
    super(props);
    window.responseload = this;
    this.getTask(this.props.data);
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
    this.setState({ currentPage: page });
  };

  render() {
    const { loading, sortField, sortDirection, currentPage, itemsPerPage } = this.state;
    const { classes } = this.props;

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
        <Box width="95%">
          <Paper className={classes.root} >
            <Box p={3} border="2px solid black">
              <Typography variant="h5" gutterBottom align="center">
               OFFICE DOCUMENTS
              </Typography>
              {loading ? <Loading /> :
                <div>
                  <Link to="/uploadsingleoffice">
                    <Button startIcon={<AiOutlinePlusCircle style={{ color: "white" }} />} variant="contained" color="primary">Upload</Button>
                  </Link>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Typography variant="subtitle1">
                            File Name
                            <Button onClick={() => this.handleSort("fileName")}>
                              {sortField === "fileName" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "blue" }} /> : <AiOutlineSortDescending style={{ color: "blue" }} />}
                            </Button>
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle1">
                            File Size
                            <Button onClick={() => this.handleSort("file_size")}>
                              {sortField === "file_size" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "blue" }} /> : <AiOutlineSortDescending style={{ color: "blue" }} />}
                            </Button>
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle1">
                            Date of Upload
                            <Button onClick={() => this.handleSort("uploaded_date")}>
                              {sortField === "uploaded_date" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "blue" }} /> : <AiOutlineSortDescending style={{ color: "blue" }} />}
                            </Button>
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle1">
                            Uploaded By
                            <Button onClick={() => this.handleSort("uploaded_by")}>
                              {sortField === "uploaded_by" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "blue" }} /> : <AiOutlineSortDescending style={{ color: "blue" }} />}
                            </Button>
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle1">
                            Action
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentItems.map(task => (
                        <TableRow key={task.id}>
                          <TableCell>{task.fileName}</TableCell>
                          <TableCell>{task.file_size}</TableCell>
                          <TableCell>{task.uploaded_date}</TableCell>
                          <TableCell>{task.uploaded_by}</TableCell>
                          <TableCell >
                            <Button variant="contained" startIcon={<AiOutlineDownload style={{color: "green", }} />} onClick={() => this.handleDownload(task)} />
                            <Button  variant="contained" startIcon={<AiFillDelete style={{ color: "red" }} />} onClick={() => this.handleDelete(task)} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Box display="flex" justifyContent="center" mt={3}>
                    <Pagination count={Math.ceil(sortedTasks.length / itemsPerPage)} page={currentPage} onChange={this.handlePageChange} color="primary" size="small" />
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
