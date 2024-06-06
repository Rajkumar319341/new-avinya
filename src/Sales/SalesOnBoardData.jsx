import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableBody, TableCell, TableRow, Button, Paper, Typography, Container, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import { APIData, org } from '../Authentication/APIData';
import { Link } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import { Select, MenuItem } from '@mui/material';

const SalesOnBoardData = () => {
    const [salesData, setSalesData] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState("");
    const [updatedTask, setUpdatedTask] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const url = APIData.api + `customer-sales/?org=${org}`;
            const response = await fetch(url, { headers: APIData.headers });
            const data = await response.json();
            setSalesData(data);
        };
        fetchData();
    }, []);

    const handleEdit = (index) => {
        setSelectedTask(salesData[index]);
        setUpdatedTask(salesData[index]);
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    const handleUpdate = async () => {
        try {
            const url = APIData.api + `customer-sales/emailid`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...APIData.headers
                },
                body: JSON.stringify({
                    ...selectedTask,
                    ...updatedTask
                })
            });
            if (response.ok || response.status === 200) {
                toast.success("Updated Successfully");
                setIsDialogOpen(false);
            } else {
                console.error('Update failed');
            }
        } catch (error) {
            console.error('Update failed:', error);
            console.log(error);
        }
    };

    const handleChange = (field, value) => {
        setUpdatedTask(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const handleSalesTypeChange = (event) => {
        handleChange('salesType', event.target.value);
    };

    return (
        <Container maxWidth="lg">
            <Link to="/customersalesonboard">
                <Button startIcon={<AiOutlinePlusCircle style={{ color: "green" }} />} variant="contained" color="success">Upload</Button>
            </Link>
            <Typography variant="h5" gutterBottom style={{ textAlign: "center" }}>
                Sales Data
            </Typography>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Customer Name</TableCell>
                            <TableCell>Customer Email</TableCell>
                            <TableCell>Customer Address</TableCell>
                            <TableCell>Customer GST</TableCell>
                            <TableCell>Customer Mobile Number</TableCell>
                            <TableCell>Sales Type</TableCell>
                            <TableCell>Organization</TableCell>
                            <TableCell>Organization Name</TableCell>
                            <TableCell>Month</TableCell>
                            <TableCell>Sales Year</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {salesData.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.customerName}</TableCell>
                                <TableCell>{row.customerEmail}</TableCell>
                                <TableCell>{row.customerAddress}</TableCell>
                                <TableCell>{row.customerGST}</TableCell>
                                <TableCell>{row.customerMobileNum}</TableCell>
                                <TableCell>{row.salesType}</TableCell>
                                <TableCell>{row.org}</TableCell>
                                <TableCell>{row.org_name}</TableCell>
                                <TableCell>{row.month}</TableCell>
                                <TableCell>{row.salesYear}</TableCell>
                                <TableCell>
                                    <Button variant="contained" startIcon={<FaEdit style={{ color: "green" }} />} onClick={() => handleEdit(index)} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <ToastContainer />
                </Table>
            </Paper>
            <Dialog open={isDialogOpen} onClose={handleDialogClose} style={{ textAlign: "center" }}>
                <DialogTitle>Update Sales Data</DialogTitle>
                <DialogContent style={{ width: "300px", textAlign: "center" }}>
                    <TextField
                        label="Customer Name"
                        value={updatedTask ? updatedTask.customerName : selectedTask ? selectedTask.customerName : ""}
                        variant="outlined"
                        fullWidth
                        style={{ marginTop: '5px', marginBottom: '5px' }}
                        onChange={(e) => handleChange('customerName', e.target.value)}
                    />
                    <TextField
                        label="Customer Address"
                        value={updatedTask ? updatedTask.customerAddress : selectedTask ? selectedTask.customerAddress : ""}
                        variant="outlined"
                        fullWidth
                        style={{ marginTop: '5px', marginBottom: '5px' }}
                        onChange={(e) => handleChange('customerAddress', e.target.value)}
                    />
                    <TextField
                        label="Customer Email"
                        value={updatedTask ? updatedTask.customerEmail : selectedTask ? selectedTask.customerEmail : ""}
                        variant="outlined"
                        fullWidth
                        style={{ marginTop: '5px', marginBottom: '5px' }}
                        onChange={(e) => handleChange('customerEmail', e.target.value)}
                    />
                    <TextField
                        label="Customer Ph No"
                        value={updatedTask ? updatedTask.customerMobileNum : selectedTask ? selectedTask.customerMobileNum : ""}
                        variant="outlined"
                        fullWidth
                        style={{ marginTop: '5px', marginBottom: '5px' }}
                        onChange={(e) => handleChange('customerMobileNum', e.target.value)}
                    />
                    <TextField
                        label="Org Name"
                        value={updatedTask ? updatedTask.org_name : selectedTask ? selectedTask.org_name : ""}
                        variant="outlined"
                        fullWidth
                        style={{ marginTop: '5px', marginBottom: '5px' }}
                        onChange={(e) => handleChange('org_name', e.target.value)}
                    />
                    <Select
                        value={updatedTask ? updatedTask.salesType : selectedTask ? selectedTask.salesType : ""}
                        variant="outlined"
                        fullWidth
                        style={{ marginTop: '5px', marginBottom: '5px' }}
                        onChange={handleSalesTypeChange}
                    >
                        <MenuItem value="">Select</MenuItem>
                        <MenuItem value="PROSPECT">PROSPECT</MenuItem>
                        <MenuItem value="LEAD">LEAD</MenuItem>
                        <MenuItem value="OPPORTUNITY">OPPORTUNITY</MenuItem>
                    </Select>
                </DialogContent>
                <DialogActions style={{ display: "flex", justifyContent: "center" }}>
                    <Button color="primary" variant="contained" onClick={handleUpdate}>
                        Submit
                    </Button>
                    <Button onClick={handleDialogClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default SalesOnBoardData;

