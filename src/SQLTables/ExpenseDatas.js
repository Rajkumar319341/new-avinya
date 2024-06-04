
import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineDownload, AiFillDelete, AiOutlineSortAscending, AiOutlineSortDescending, AiOutlinePlusCircle } from "react-icons/ai";
import { APIData } from "../Authentication/APIData";
import {
  Table, TableHead, TableBody, TableCell, TableRow, Button, Paper, Typography, Box, Dialog, TextField,
  DialogTitle,
  DialogContent,
  DialogActions, InputLabel, Select, MenuItem, FormControl
} from "@material-ui/core";
import Loading from "../Loading";
import Pagination from "@material-ui/lab/Pagination";
import { withStyles } from "@material-ui/core/styles";
import { FaEdit } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

let tasks = [];
const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));

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
  tableCell: {
    color: 'whitesmoke',
    fontWeight: 'bold',
  },
  buttonGroup: {
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  tableHead: {
    background: 'grey',
    height: 15,
  },
  enrollmentsHeader: {
    background: '#f57a7a',
    padding: '8px',
    fontWeight: 'bold',
    color: "whitesmoke"
  },
});

class ExpenseDatas extends Component {
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
    console.log("Form Data:", form)

    const url = APIData.api + "expenses/"
    console.log(url);
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
    const task = tasks.find(t => t.id === data.id);
    const url = APIData.api + 'expenses/download/' + data.id;

    fetch(url, {
      method: 'GET',
      headers: {
        ...APIData.headers,
        'Accept': 'text/csv', // Set the desired Content-Type
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.blob();
    })
    .then(blob => {
      // Create a download link
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.download = 'expense.csv'; 
      // downloadLink.download = `${this.state.selectedTask.file_name}.csv`;

      downloadLink.click();
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  
    return Promise.resolve(task);
  };
  //   window.responseload.responseloading();
  //   axios
  //     .get(APIData.api + "expenses/download/" + data.id, {
  //       headers: {
  //         ...APIData.headers,
  //         'Accept': 'text/csv', // Set the desired Content-Type
  //       },
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
        window.responseload.responseloading();
      });

    return Promise.resolve(task);
  }


  handlePageChange = (event, page) => {
    this.setState({ currentPage: page });
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
                EXPENSE DOCUMENTS
              </Typography>
          <Paper className={classes.root}>
            <Box p={3} >
           

              {loading ? <Loading /> :
                <div className={classes.buttonGroup}>

                  <Link to="/addExpenses">
                    <Button startIcon={<AiOutlinePlusCircle style={{ color: "whitesmoke" }} />} variant="contained" color="primary" >Upload</Button>
                  </Link>

                  <Table className="table table-sm table-bordered table-striped">
                    <TableHead className={classes.tableHead}>


                      <TableRow>
                        <TableCell className={classes.tableCell}>
                          <Typography variant="subtitle1" style={{ color: "whitesmoke" }}>
                            Expense ID
                            <Button onClick={() => this.handleSort("id")}>
                              {sortField === "id" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "whitesmoke" }} /> : <AiOutlineSortDescending style={{ color: "whitesmoke" }} />}
                            </Button>
                          </Typography>
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          <Typography variant="subtitle1" style={{ color: "whitesmoke" }}>
                            Expense Date
                            <Button onClick={() => this.handleSort("exp_date")}>
                              {sortField === "exp_date" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "whitesmoke" }} /> : <AiOutlineSortDescending style={{ color: "whitesmoke" }} />}
                            </Button>
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle1" style={{ color: "whitesmoke" }}>
                            Expense Name
                            <Button onClick={() => this.handleSort("exp_name")}>
                              {sortField === "exp_name" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "whitesmoke" }} /> : <AiOutlineSortDescending style={{ color: "whitesmoke" }} />}
                            </Button>
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle1" style={{ color: "whitesmoke" }}>
                            Expense Type
                            <Button onClick={() => this.handleSort("exp_type")}>
                              {sortField === "exp_type" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "whitesmoke" }} /> : <AiOutlineSortDescending style={{ color: "whitesmoke" }} />}
                            </Button>
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle1" style={{ color: "whitesmoke" }}>
                            Item Count
                            <Button onClick={() => this.handleSort("item_count")}>
                              {sortField === "item_count" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "whitesmoke" }} /> : <AiOutlineSortDescending style={{ color: "whitesmoke" }} />}
                            </Button>
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle1" style={{ color: "whitesmoke" }}>
                            Cost
                            <Button onClick={() => this.handleSort("cost")}>
                              {sortField === "cost" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "whitesmoke" }} /> : <AiOutlineSortDescending style={{ color: "whitesmoke" }} />}
                            </Button>
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle1" style={{ color: "whitesmoke" }}>
                            Month
                            <Button onClick={() => this.handleSort("month")}>
                              {sortField === "month" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "whitesmoke" }} /> : <AiOutlineSortDescending style={{ color: "whitesmoke" }} />}
                            </Button>
                          </Typography>
                        </TableCell>
                        <TableCell>

                          <Typography variant="subtitle1" style={{ color: "whitesmoke" }}>
                            Status
                            <Button onClick={() => this.handleSort("status")}>
                              {sortField === "status" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "whitesmoke" }} /> : <AiOutlineSortDescending style={{ color: "whitesmoke" }} />}
                            </Button>
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle1" style={{ color: "whitesmoke" }}>
                            Reason
                            <Button onClick={() => this.handleSort("reason")}>
                              {sortField === "reason" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "whitesmoke" }} /> : <AiOutlineSortDescending style={{ color: "whitesmoke" }} />}
                            </Button>
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle1" style={{ color: "whitesmoke" }}>
                            Uploaded By
                            <Button onClick={() => this.handleSort("created_by")}>
                              {sortField === "created_by" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "whitesmoke" }} /> : <AiOutlineSortDescending style={{ color: "whitesmoke" }} />}
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
                        <TableRow key={task.id}>
                          <TableCell>{task.id}</TableCell>
                          <TableCell>{task.exp_date}</TableCell>
                          <TableCell>{task.exp_name}</TableCell>
                          <TableCell>{task.exp_type}</TableCell>
                          <TableCell>{task.item_count}</TableCell>
                          <TableCell>{task.cost}</TableCell>
                          <TableCell>{task.month}</TableCell>
                          <TableCell>{task.status}</TableCell>
                          <TableCell>{task.reason}</TableCell>
                          <TableCell>{task.created_by}</TableCell>
                          <TableCell>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <Button style={{ maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }} variant="contained" startIcon={<AiOutlineDownload style={{ color: "green" }} />} onClick={() => this.handleDownload(task)} />
                              <Button style={{ maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }} variant="contained" startIcon={<AiFillDelete style={{ color: "red" }} />} onClick={() => this.handleDelete(task)} />
                              <Button style={{ maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}} variant="contained" startIcon={<FaEdit style={{ color: "#1976d2" }} />} onClick={() => this.handleUpdate(task)} />
                            </div>
                            {/* ,backgroundColor:"#1976d2"  */}
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
          <Dialog open={this.state.isDialogOpen} onClose={this.handleDialogClose} style={{ textAlign: "center" }}>
            <DialogTitle>Update Expense</DialogTitle>
            <DialogContent style={{ width: "500px", textAlign: "center" }}>
              <TextField
                label="id"
                value={this.state.selectedTask ? this.state.selectedTask.id : ""}
                variant="outlined"
                fullWidth
                InputProps={{ readOnly: true }}
                style={{ width: '300px', marginTop: '5px', marginBottom: '5px' }}
              />
              <FormControl variant="outlined" fullWidth style={{ width: '300px', marginBottom: '10px' }}>
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
                style={{ width: '300px', marginBottom: '10px' }}
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

export default withStyles(styles)(ExpenseDatas);
