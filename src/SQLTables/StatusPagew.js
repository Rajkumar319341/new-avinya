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
import Pagination from '@mui/material/Pagination'; 
import * as AiIcons from "react-icons/ai";
import  {
 
  // DeleteForm,
  UpdateForm,

} from "react-crud-table";
import { Dialog,Input, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";


toast.configure();

const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
let tasks = [];


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


class StatusPagew extends Component {
  state = {
    loading: false,
    sortField: "",
    sortDirection: "asc",
    currentPage: 1,
    itemsPerPage: 5,
    selectedTask: null,
    isDialogOpen: false,
    selectedStatus: "",
  };

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
    // console.log("Selected Task Details:", this.state.selectedTask.admin_id);
    const form = {
      username:selectedTask.username,
      status: selectedTask.status,
      updated_by: sessiondetails.user,
      
      // branch: this.state.selectedTask.branch||""


    }
    console.log(form);


    const url = APIData.api + 'login-type/user/'
    console.log(url);
    axios.post(url, form, { headers: APIData.headers })

      .then(response => {

        if (response.status == 201 || response.status == "success") {
          toast('Updated successfully')
          // window.location.reload("/");
        }
        else {
          console.log(response);
          toast('Check With the Admin,failed')
        }
      })
      .catch(error => {
        console.log(error);
        toast("It's time To Grab A Coffeee")
      })
      //window.responseload.responseloading();
  }

  handleDialogClose = () => {
    this.setState({ isDialogOpen: false });
  };

  handlePageChange = (event, page) => {
    this.setState({ currentPage: page });
  };

  handleEdit = (task) => {

  };

  render() {

    const { classes } = this.props;

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
        <Typography variant="h5" gutterBottom align="center" className={classes.enrollmentsHeader}>
                Status
              </Typography>
          <Paper className={classes.root}>
            <Box p={3} >
            
              {loading ? <Loading /> :
                <div className={classes.buttonGroup}>
                  <Table 
                  border="2px solid black"
                  className="table table-sm table-bordered table-striped">
                    <TableHead className={classes.tableHead}>
                      <TableRow>
                        <TableCell>
                          <Typography variant="subtitle1" style={{ color: "whitesmoke" }}>
                            User Name <Button onClick={() => this.handleSort("username")}>
                              {sortField === "username" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "whitesmoke" }} /> : <AiOutlineSortDescending style={{ color: "whitesmoke" }} />}
                            </Button>
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle1" style={{ color: "whitesmoke" }}>
                            Status <Button onClick={() => this.handleSort("status")}>
                              {sortField === "status" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "whitesmoke" }} /> : <AiOutlineSortDescending style={{ color: "whitesmoke" }} />}
                            </Button>
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle1" style={{ color: "whitesmoke" }}>
                          Updated By <Button onClick={() => this.handleSort("updated_by")}>
                              {sortField === "updated_by" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "whitesmoke" }} /> : <AiOutlineSortDescending style={{ color: "whitesmoke" }} />}
                            </Button>
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle1" style={{ color: "whitesmoke" }}>
                            Action
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentItems.map(task => (
                        <TableRow key={task.username}>
                          <TableCell>{task.username}</TableCell>
                          <TableCell>{task.status}</TableCell>
                          <TableCell>{task.updated_by}</TableCell>
                          <TableCell>
                          <Button variant="contained" startIcon={<AiIcons.AiFillEdit  style={{ color: "whitesmoke", }} />} onClick={() => this.handleUpdate(task)} />
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
          <Dialog open={this.state.isDialogOpen} onClose={this.handleDialogClose} style={{ textAlign: "center" }} >
            <DialogTitle>Faculty Update Form</DialogTitle>
            <DialogContent style={{ width: "500px", textAlign: "center" }}>

              <TextField
                label="User Id"
                value={this.state.selectedTask ? this.state.selectedTask.username : ""}
                variant="outlined"
                fullWidth
                InputProps={{ readOnly: true }}
                inputComponent={Input}
                style={{ width: '300px', marginTop: '5px', marginBottom: '5px' }}
                onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, username: e.target.value } })}
              />
              <FormControl variant="outlined" fullWidth style={{ width: '300px', marginBottom: '10px' }}>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  value={this.state.selectedTask ? this.state.selectedTask.status : ""}
                  onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, status: e.target.value } })}
                  label="Status"
                >
                  <MenuItem value="active">Active </MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
          
            </DialogContent>
            <DialogActions style={{ display: "flex", justifyContent: "center" }}>

              <Button color="inherit" variant="contained" 
              onClick={
                this.handleUpdate2
              }
              >
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

export default withStyles(styles)(StatusPagew);
