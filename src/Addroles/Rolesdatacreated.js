import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineDownload, AiFillDelete, AiOutlineSortAscending, AiOutlineSortDescending, AiOutlinePlusCircle } from "react-icons/ai";
import { APIData, org } from "../Authentication/APIData";
import { Table, TableHead, TableBody, TableCell, TableRow, Button, Paper, Typography, Box } from "@material-ui/core";
import Loading from "../Loading";
import Pagination from "@material-ui/lab/Pagination";
import { withStyles } from "@material-ui/core/styles";
import { FaEdit } from "react-icons/fa";
import { Dialog, Input, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

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
    buttonGroup: {
        "& > *": {
            margin: theme.spacing(1)
        }
    },
    tableHead: {
        // background: "#808080",
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

class RolesDataCreated extends Component {
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
  
    getTasks = (testTask) => {
      if (Array.isArray(testTask)) {
        this.tasks = testTask;
      } else {
        console.error('Invalid tasks data format:', testTask);
      }
    };
  
    handleSort = (field) => {
      const direction = this.state.sortField === field && this.state.sortDirection === "asc"? "desc" : "asc";
      this.setState({ sortField: field, sortDirection: direction });
    };
  
    handleUpdate = (task) => {
      this.setState({ selectedTask: task, isDialogOpen: true });
    };
  
    handleUpdate2 = () => {
      const { selectedTask } = this.state;
      const form = {
        id: selectedTask.id,
        roles: selectedTask.roles,
        designated_person: selectedTask.designated_person,
        email_id: selectedTask.email_id,
        org,
      };
  
      axios.post(`${APIData.api}org-roles-head/`, form, { headers: APIData.headers })
       .then((response) => {
          if (response.status === 201 || response.status === "success") {
            toast('Updated successfully');
            window.location.reload();
          } else {
            toast('Check With the Admin, failed');
          }
        })
       .catch((error) => {
          console.log(error);
          toast("It's time To Grab A Coffeee");
        });
    };
  
    handleDialogClose = () => {
      this.setState({ isDialogOpen: false });
    };
  
    handleDelete = (data) => {
      const task = this.tasks.find((t) => t.id === data.id);
      const url = `${APIData.api}org-roles-head/?id=${data.id}`;
      axios.delete(url, { headers: APIData.headers })
       .then((response) => {
          if (response.data.status.toString().toLowerCase() === "success") {
            toast(response.data.description);
            this.tasks = this.tasks.filter((t) => t.course_id!== task.course_id);
            window.location.reload();
          } else {
            toast(response.data.errorDesc);
          }
        })
       .catch((error) => {
          toast("It's Time To Grab To Coffee");
        });
    };
  
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
                <Paper className={classes.root}>
                        <Box p={3} >
                    <Typography variant="h5" gutterBottom align="center" className={classes.enrollmentsHeader}>
                        Created Roles
                    </Typography>
                            {loading ? <Loading /> :
                                <div className={classes.buttonGroup}>
                                    <Link to="/rolecreation">
                                        <Button startIcon={<AiOutlinePlusCircle style={{ color: "green" }} />} variant="contained" color="green" >Create</Button>
                                    </Link>

                                    <Table
                                        border="2px solid black"
                                        className="table table-sm table-bordered table-striped">
                                        <TableHead className={classes.tableHead}>
                                            <TableRow>
                                                <TableCell className={classes.tableCell}>
                                                    <Typography variant="subtitle1" style={{ color: "green" }}>
                                                        Sl no
                                                        <Button onClick={() => this.handleSort("course_id")}>
                                                            {sortField === "course_id" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                                                        </Button>
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle1" style={{ color: "green" }}>
                                                        Roles
                                                        <Button onClick={() => this.handleSort("course_description")}>
                                                            {sortField === "course_description" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                                                        </Button>
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle1" style={{ color: "green" }}>
                                                        Profile
                                                        <Button onClick={() => this.handleSort("course_type")}>
                                                            {sortField === "course_type" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                                                        </Button>
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle1" style={{ color: "green" }}>
                                                        Accesslevel
                                                        <Button onClick={() => this.handleSort("course_sub_type")}>
                                                            {sortField === "course_sub_type" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                                                        </Button>
                                                    </Typography>
                                                </TableCell>

                                                <TableCell>
                                                    <Typography variant="subtitle1" style={{ color: "green" }}>
                                                        Action
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {currentItems.map(task => (
                                                <StyledTableRow key={task.id}>
                                                    <StyledTableCell>{task.id}</StyledTableCell>
                                                    <StyledTableCell>{task.roles}</StyledTableCell>
                                                    <StyledTableCell>{task.profile}</StyledTableCell>
                                                    <StyledTableCell>{task.access_level}</StyledTableCell>

                                                    <StyledTableCell>
                                                        <Button variant="contained" startIcon={<FaEdit style={{ color: "green", }} />} onClick={() => this.handleUpdate(task)} />
                                                        <Button variant="contained" startIcon={<AiFillDelete style={{ color: "red" }} />} onClick={() => this.handleDelete(task)} />
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    <Box display="flex" justifyContent="center" mt={3}>
                                        <Pagination count={Math.ceil(sortedTasks.length / itemsPerPage)} page={currentPage} onChange={this.handlePageChange} />
                                    </Box>
                                </div>
                            }
                        </Box>
                    </Paper>
                    <Dialog open={this.state.isDialogOpen} onClose={this.handleDialogClose} style={{ textAlign: "center" }} >
                        <DialogTitle>Jobs Update Form</DialogTitle>
                        <DialogContent style={{ width: "500px", textAlign: "center" }}>
                            <TextField
                                label="Email Id"
                                value={this.state.selectedTask ? this.state.selectedTask.email_id : ""}
                                variant="outlined"
                                fullWidth

                                inputComponent={Input}
                                style={{ width: '300px', marginTop: '5px', marginBottom: '5px' }}
                                onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, email_id: e.target.value } })}
                            />

                            <TextField
                                label="Role"
                                value={this.state.selectedTask ? this.state.selectedTask.roles : ""}
                                variant="outlined"
                                fullWidth
                                style={{ width: '300px', marginBottom: '10px' }}
                                onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, roles: e.target.value } })}
                            />
                            <TextField
                                label="Name"
                                value={this.state.selectedTask ? this.state.selectedTask.designated_person : ""}
                                variant="outlined"
                                fullWidth
                                multiline
                                maxRows={5}
                                // InputProps={{ readOnly: true }}
                                // inputComponent={Input}
                                style={{ width: '300px', marginBottom: '10px' }}
                                onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, designated_person: e.target.value } })}
                            />


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

export default withStyles(styles)(RolesDataCreated);
