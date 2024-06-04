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
import {IconButton} from "@mui/material";
import { TablePagination } from '@mui/material';

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

class Rolesdata extends Component {
    state = {
        loading: false,
        sortField: "",
        sortDirection: "asc",
        currentPage: 1,
        itemsPerPage: 5,
        selectedTask: null,
        isDialogOpen: false,
        selectedStatus: "",
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
            roles: this.state.selectedTask.roles,
            designated_person: this.state.selectedTask.designated_person,
            email_id: this.state.selectedTask.email_id,
            org: org
        }
        console.log("Form Data:", form)

        const url = APIData.api + 'org-roles-head/'
        console.log(url);
        axios.post(url, form, { headers: APIData.headers })
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

    handleDelete = (data) => {
        const task = tasks.find(t => t.id === data.id);
        console.log(data.id);
        const url = APIData.api + 'org-roles-head/?id=' + data.id;
        console.log(url);
        // window.responseload.responseloading();
        axios.delete(url, { headers: APIData.headers })
            .then(response => {

                if (response.data.status.toString().toLowerCase() == "success") {
                    toast(response.data.description)
                    tasks = tasks.filter(t => t.course_id !== task.course_id);
                    window.location.reload()
                }
                else {
                    toast(response.data.errorDesc)
                    // window.responseload.responseloading();
                }
            })
            .catch(error => {
                toast("It's Time To Grab To Coffee")
                window.responseload.responseloading();

            })

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
                <Box width="100%" border="2px solid black">
                <Paper className={classes.root}>
                        <Box p={3} >
                    <Typography variant="h5" gutterBottom align="center" className={classes.enrollmentsHeader}>
                        Allocated Roles
                    </Typography>
                   

                            {loading ? <Loading /> :
                                <div className={classes.buttonGroup}>
                                    <Link to="/rolesallocate">
                                        <Button startIcon={<AiOutlinePlusCircle style={{ color: "green" }} />} variant="contained" color="green" >Create</Button>
                                    </Link>
                                    {isSmallScreen ? (
                        <Box>
                          {currentItems.map(task => (
                            <Paper key={task.id} style={{ marginBottom: "5px", padding: "10px" }}>
                               <Typography variant="subtitle1">
                               Sl No: {task.id}
                              </Typography>
                              <Typography variant="subtitle1">
                                Designated Person: {task.designated_person}
                              </Typography>
                              <Typography variant="subtitle1">
                                Email: {task.email_id}
                              </Typography>
                              <Typography variant="subtitle1">
                                Role: {task.roles}
                              </Typography>
                             
                              <Box style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }} mt={2}>
                                <IconButton >
                                  <FaEdit onClick={() => this.handleUpdate(task)} style={{ color: "green", marginRight: "2rem" }} />
                                  <AiFillDelete  onClick={() => this.handleDelete(task)} style={{ color: "red", marginRight: "2rem" }} />
                                </IconButton>

                              </Box>
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
                                                    <Typography variant="subtitle1" style={{ color: "green" }}>
                                                        Sl no
                                                        <Button onClick={() => this.handleSort("id")}>
                                                            {sortField === "id" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                                                        </Button>
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle1" style={{ color: "green" }}>
                                                        User Name
                                                        <Button onClick={() => this.handleSort("designated_person")}>
                                                            {sortField === "designated_person" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                                                        </Button>
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle1" style={{ color: "green" }}>
                                                        Email
                                                        <Button onClick={() => this.handleSort("email_id")}>
                                                            {sortField === "email_id" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                                                        </Button>
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle1" style={{ color: "green" }}>
                                                        Role
                                                        <Button onClick={() => this.handleSort("roles")}>
                                                            {sortField === "roles" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
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
                                                    <StyledTableCell>{task.supervisor}</StyledTableCell>
                                                    <StyledTableCell>{task.email_id}</StyledTableCell>
                                                    <StyledTableCell>{task.roles}</StyledTableCell>

                                                    <StyledTableCell>
                                                        <Button variant="contained" startIcon={<FaEdit style={{ color: "green", }} />} onClick={() => this.handleUpdate(task)} />
                                                        <Button variant="contained" startIcon={<AiFillDelete style={{ color: "red" }} />} onClick={() => this.handleDelete(task)} />
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
                          rowsPerPageOptions={[5,10,20,30]} 
                          className={isSmallScreen ? classes.smallScreenPagination : null}                        />

                      </Box>
                                </div>
                            }
                        </Box>
                    </Paper>
                    <Dialog open={this.state.isDialogOpen} onClose={this.handleDialogClose} style={{ textAlign: "center" }} >
                        <DialogTitle>Jobs Update Form</DialogTitle>
                        <DialogContent style={{ width: isSmallScreen?"100%" : "500px", textAlign: "center" }}>
                            <TextField
                                label="Email Id"
                                value={this.state.selectedTask ? this.state.selectedTask.email_id : ""}
                                variant="outlined"
                                fullWidth
                            
                                inputComponent={Input}
                                style={{ width: isSmallScreen ? "100%" : "300px", marginBottom: '10px' }}
                                onChange={(e) => this.setState({ selectedTask: { ...this.state.selectedTask, email_id: e.target.value } })}
                            />

                            <TextField
                                label="Role"
                                value={this.state.selectedTask ? this.state.selectedTask.roles : ""}
                                variant="outlined"
                                fullWidth
                                style={{ width: isSmallScreen ? "100%" : "300px", marginBottom: '10px' }}
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
                                style={{ width: isSmallScreen ? "100%" : "300px", marginBottom: '10px' }}
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

export default withStyles(styles)(Rolesdata);
