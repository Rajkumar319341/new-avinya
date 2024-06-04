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
import { IoMdMail } from "react-icons/io";
import { AiOutlineDownload, AiFillDelete, AiOutlineSortAscending, AiOutlineSortDescending, AiOutlinePlusCircle } from "react-icons/ai";
import CRUDTable, {
    CreateForm,
    DeleteForm,
    UpdateForm,
} from "react-crud-table";
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { IconButton } from "@mui/material";

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
        maxWidth: 1050,
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

class MarksData extends Component {
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
    reload = () => {
        window.responseload.responseloading();
    }
    handleUpdate = (data) => {
        // const url = APIData.api + 'file/' + data.id;
        // window.location.href = url;
        const task = tasks.find((t) => t.id === data.id);

        window.responseload.responseloading();
        axios
            .post(APIData.api + "marks/email/", task, { headers: APIData.headers })
            .then((response) => {
                task.grade = data.grade;
                task.name = data.name;
                task.test_type = data.test_type;
                task.science = data.science;
                task.social = data.social;
                task.mathematics = data.mathematics;
                task.first_language = data.first_language;
                task.second_language = data.second_language;
                task.third_language = data.third_language;
                task.max_score = data.max_score;
                task.total = data.total;
                task.test_date = data.test_date;
                task.percentage = data.percentage;
                task.email_id = data.email_id;
                task.months = data.months;
                toast("Email sent Successfully");
                window.responseload.responseloading();
            })
            .catch((error) => {
                toast("Its Time to Grab A coffee");
                window.responseload.responseloading();
            });
    };

    handleDelete = (data) => {
        const url = APIData.api + 'marks/' + data.id;
        axios.delete(url, { headers: APIData.headers })
            .then(response => {
                if (response.data.status.toLowerCase() === "success") {
                    toast(response.data.description);
                    tasks = tasks.filter(t => t.id !== data.id);
                    // window.responseload.responseloading();
                } else {
                    toast(response.data.errorDesc);
                    window.responseload.responseloading();
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
            <Box mt={4} display="flex" justifyContent="center" >
                <Box width="100%" border="2px solid black">
                    <Typography
                        style={{ margin: "1rem" }}
                        variant="h5" gutterBottom align="center"
                        className={classes.enrollmentsHeader}>
                        MARKS
                    </Typography>
                    <Paper className={classes.root} >

                        <Box  >
                            {loading ? <Loading /> :
                                <div className={classes.buttonGroup}>
                                    <Link to="/createMarks">
                                        <Button
                                            // onClick={this.reload()}
                                            startIcon={<AiOutlinePlusCircle style={{ color: "green" }} />} variant="contained" color="green">Upload
                                        </Button>
                                    </Link>
                                    {isSmallScreen ? (
                                        <Box>
                                            {currentItems.map(task => (
                                                <Paper key={task.id} style={{ marginBottom: "5px", padding: "10px" }}>
                                                    <Typography variant="subtitle1">
                                                        Student ID: {task.student_id}
                                                    </Typography>
                                                    <Typography variant="subtitle1">
                                                        Grade: {task.grade}
                                                    </Typography>
                                                    <Typography variant="subtitle1">
                                                        Name: {task.name}
                                                    </Typography>
                                                    <Typography variant="subtitle1">
                                                        Type: {task.test_type}
                                                    </Typography>
                                                    <Typography variant="subtitle1">
                                                        Science: {task.science}
                                                    </Typography>
                                                    <Typography variant="subtitle1">
                                                        Social: {task.social}
                                                    </Typography>
                                                    <Typography variant="subtitle1">
                                                        Maths: {task.mathematics}
                                                    </Typography>
                                                    <Typography variant="subtitle1">
                                                        First Language: {task.first_language}
                                                    </Typography>
                                                    <Typography variant="subtitle1">
                                                        Second Language: {task.second_language}
                                                    </Typography>
                                                    <Typography variant="subtitle1">
                                                        Third Language: {task.third_language}
                                                    </Typography>
                                                    <Typography variant="subtitle1">
                                                        Max Score: {task.max_score}
                                                    </Typography>
                                                    <Typography variant="subtitle1">
                                                        Total Score: {task.total}
                                                    </Typography>
                                                    <Typography variant="subtitle1">
                                                        Date: {task.test_date}
                                                    </Typography>
                                                    <Typography variant="subtitle1">
                                                        Percentage: {task.percentage}
                                                    </Typography>
                                                    <Typography variant="subtitle1">
                                                        Months: {task.months}
                                                    </Typography>
                                                    <Typography variant="subtitle1">
                                                        Email: {task.email_id}
                                                    </Typography>
                                                    <Box style={{ display: "flex", flexDirection: "row" }} mt={2}>

                                                    {(sessiondetails && (sessiondetails.userType === "superadmin")) && (
                                                        <>
                                                            <IconButton>
                                                                <IoMdMail style={{ color: "green", marginRight: "3rem" }} onClick={() => this.sendEmail(task)} />
                                                            </IconButton>
                                                            <IconButton>
                                                                <AiFillDelete style={{ color: "red" }} onClick={() => this.handleDelete(task)} />

                                                            </IconButton>
                                                        </>

                                                    )}
                                                    {(sessiondetails && (sessiondetails.userType === "admin")) && (
                                                        <IconButton>
                                                            <IoMdMail style={{ color: "green", }} onClick={() => this.sendEmail(task)} />
                                                        </IconButton>
                                                    )}
                                                    {(sessiondetails && (sessiondetails.userType === "employee")) && (
                                                        <IconButton>
                                                            <IoMdMail style={{ color: "green", }} onClick={() => this.sendEmail(task)} />
                                                        </IconButton>
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
                                                            Student ID
                                                            <Button onClick={() => this.handleSort("fileName")}>
                                                                {sortField === "student_id" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                                                            </Button>
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell className={classes.tableCell}>
                                                        <Typography variant="subtitle1">
                                                            Grade
                                                            <Button onClick={() => this.handleSort("grade")}>
                                                                {sortField === "grade" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                                                            </Button>
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell className={classes.tableCell}>
                                                        <Typography variant="subtitle1">
                                                            Name
                                                            <Button onClick={() => this.handleSort("name")}>
                                                                {sortField === "name" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                                                            </Button>
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell className={classes.tableCell}>
                                                        <Typography variant="subtitle1">
                                                            Type
                                                            <Button onClick={() => this.handleSort("test_type")}>
                                                                {sortField === "test_type" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                                                            </Button>
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell className={classes.tableCell}>
                                                        <Typography variant="subtitle1">
                                                            Sci
                                                            <Button onClick={() => this.handleSort("science")}>
                                                                {sortField === "science" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                                                            </Button>
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell className={classes.tableCell}>
                                                        <Typography variant="subtitle1">
                                                            Social
                                                            <Button onClick={() => this.handleSort("social")}>
                                                                {sortField === "social" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                                                            </Button>
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell className={classes.tableCell}>
                                                        <Typography variant="subtitle1">
                                                            Maths
                                                            <Button onClick={() => this.handleSort("mathematics")}>
                                                                {sortField === "mathematics" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                                                            </Button>
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell className={classes.tableCell}>
                                                        <Typography variant="subtitle1">
                                                            FL
                                                            <Button onClick={() => this.handleSort("first_language")}>
                                                                {sortField === "first_language" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                                                            </Button>
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell className={classes.tableCell}>
                                                        <Typography variant="subtitle1">
                                                            SL
                                                            <Button onClick={() => this.handleSort("second_language")}>
                                                                {sortField === "second_language" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                                                            </Button>
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell className={classes.tableCell}>
                                                        <Typography variant="subtitle1">
                                                            TL
                                                            <Button onClick={() => this.handleSort("third_language")}>
                                                                {sortField === "third_language" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                                                            </Button>
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell className={classes.tableCell}>
                                                        <Typography variant="subtitle1">
                                                            Max
                                                            <Button onClick={() => this.handleSort("max_score")}>
                                                                {sortField === "max_score" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                                                            </Button>
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell className={classes.tableCell}>
                                                        <Typography variant="subtitle1">
                                                            Total
                                                            <Button onClick={() => this.handleSort("total")}>
                                                                {sortField === "total" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                                                            </Button>
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell className={classes.tableCell}>
                                                        <Typography variant="subtitle1">
                                                            Date
                                                            <Button onClick={() => this.handleSort("test_date")}>
                                                                {sortField === "test_date" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                                                            </Button>
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell className={classes.tableCell}>
                                                        <Typography variant="subtitle1">
                                                            %
                                                            <Button onClick={() => this.handleSort("percentage")}>
                                                                {sortField === "percentage" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                                                            </Button>
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell className={classes.tableCell}>
                                                        <Typography variant="subtitle1">
                                                            Months
                                                            <Button onClick={() => this.handleSort("months")}>
                                                                {sortField === "months" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
                                                            </Button>
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell className={classes.tableCell}>
                                                        <Typography variant="subtitle1">
                                                            Email
                                                            <Button onClick={() => this.handleSort("email_id")}>
                                                                {sortField === "email_id" && sortDirection === "asc" ? <AiOutlineSortAscending style={{ color: "green" }} /> : <AiOutlineSortDescending style={{ color: "green" }} />}
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
                                                        <TableCell>{task.student_id}</TableCell>
                                                        <TableCell>{task.grade}</TableCell>
                                                        <TableCell>{task.name}</TableCell>
                                                        <TableCell>{task.test_type}</TableCell>
                                                        <TableCell>{task.science}</TableCell>

                                                        <TableCell>{task.social}</TableCell>
                                                        <TableCell>{task.mathematics}</TableCell>
                                                        <TableCell>{task.first_language}</TableCell>
                                                        <TableCell>{task.second_language}</TableCell>
                                                        <TableCell>{task.third_language}</TableCell>
                                                        <TableCell>{task.max_score}</TableCell>
                                                        <TableCell>{task.total}</TableCell>
                                                        <TableCell>{task.test_date}</TableCell>
                                                        <TableCell>{task.percentage}</TableCell>
                                                        <TableCell>{task.months}</TableCell>
                                                        <TableCell>{task.email_id}</TableCell>
                                                        {(sessiondetails && (sessiondetails.userType === "superadmin")) && (
                                                            <TableCell >
                                                                <Button variant="contained" startIcon={<IoMdMail style={{ color: "green", }} />} onClick={() => this.sendEmail(task)} />
                                                                <Button variant="contained" startIcon={<AiFillDelete style={{ color: "red" }} />} onClick={() => this.handleDelete(task)} />
                                                            </TableCell>
                                                        )}
                                                        {(sessiondetails && (sessiondetails.userType === "admin")) && (
                                                            <TableCell >
                                                                <Button variant="contained" startIcon={<IoMdMail style={{ color: "green", }} />} onClick={() => this.sendEmail(task)} />
                                                            </TableCell>
                                                        )}
                                                        {(sessiondetails && (sessiondetails.userType === "employee")) && (
                                                            <TableCell >
                                                                <Button variant="contained" startIcon={<IoMdMail style={{ color: "green", }} />} onClick={() => this.sendEmail(task)} />
                                                            </TableCell>
                                                        )}
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
                                    <DeleteForm
                                        title="Marks Delete Process"
                                        message="Are you sure you want to delete the Marks?"
                                        trigger={<AiIcons.AiFillDelete />}
                                        onSubmit={(task) => this.handleDelete(task)}
                                        submitText="Delete"
                                        validate={(values) => {
                                            const errors = {};
                                            if (!values.student_id) {
                                                errors.student_id = "Please, provide Student ID";
                                            }
                                            return errors;
                                        }}
                                    />
                                </div>
                            }
                        </Box>
                    </Paper>
                </Box>
            </Box>
        )
    }

}

export default withStyles(styles)(MarksData);