// import React, { useState, useEffect } from 'react';
// import { Table, TableHead, TableBody, TableCell, TableRow, Button, Paper, Typography, Box, Container, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
// import { Link } from "react-router-dom";
// import { AiOutlinePlusCircle } from "react-icons/ai";
// import { FaEdit } from "react-icons/fa";
// import { toast, ToastContainer } from 'react-toastify';
// import axios from 'axios';
// import { APIData } from '../Authentication/APIData';

// export const MdmData = () => {
//     const [data, setData] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [formData, setFormData] = useState({});
//     const [editIndex, setEditIndex] = useState(null);
//     const [orgId,setOrgId]=useState("");
//     const [orgName,setOrgName]=useState("")
//     const [orgShortName,setOrgShortName]=useState("")
//     const [orgEmailId,setOrgEmailId]=useState("")
//     const [orgMob,setOrgMob]=useState("")
//     const [orgEmpCode,setOrgEmpCode]=useState("")
//     const [orgStatus,setOrgStatus]=useState("")
//     const [orgSpocName,setOrgSpocName]=useState("")
//     const [orgSpocEmailId,setOrgSpocEmailId]=useState("")
//     const [orgURL,setOrgURL]=useState("")
//     const [orgAddress,setOrgAddress]=useState("")
//     const [orgGST,setOrgGST]=useState("")
//     const [orgAccountNuber,setorgAccountNuber]=useState("")




//     useEffect(() => {
//         fetchData();
//     }, []);
    

//     const fetchData = async () => {
//         try {
//             // const response = await axios.get(APIData.api + 'org-mdm/', { headers: APIData.headers });
//             const url = APIData.api + 'org-mdm/';
//             const response = await fetch(url, { headers: APIData.headers });
//             const data = await response.json();
//             setData(data);
//         } catch (error) {
//             console.error('Error fetching data: ', error);
//         }
//     };

//     const handleEdit = (index) => {
//         setEditIndex(index);
//         const selectedData = data[index];

//         console.log("Selected Data:",selectedData)
//         // setOrgId(selectedData.orgId); 
//         setOrgName(selectedData.orgName); 
//         setOrgEmailId(selectedData.orgEmailId)
        
//         setFormData({
//             ...selectedData,
//         });
//         setOpen(true);
//     };
    

//     const handleClose = () => {
//         setOpen(false);
//         setFormData({});
//         setEditIndex(null);
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

   
//     const handleUpdate = () => {
//         const updatedData = new FormData();
    
//         updatedData.append('org_id', formData.orgId);
//         updatedData.append('orgName', orgName);
//         updatedData.append('org_short_name', formData.orgShortName);
//         updatedData.append('org_emp_code', formData.orgEmpCode);
//         updatedData.append('org_email_id', orgEmailId);
//         updatedData.append('org_mob', formData.orgMob);
//         updatedData.append('updated_by', "raj");
//         updatedData.append('org_spoc_name', formData.orgSpocName);
//         updatedData.append('org_spoc_email_id', formData.orgSpocEmailId);
//         updatedData.append('org_spoc_mob', formData.orgSpocMob);
//         updatedData.append('org_status', formData.orgStatus);
//         updatedData.append('org_address', formData.orgAddress);
//         updatedData.append('orgurl', formData.orgURL);
//         updatedData.append('org_account_number', formData.orgAccountNuber);
//         updatedData.append('orggst', formData.orgGST);
    
//         if (formData.orgLogo) {
//             updatedData.append('image', "uploadedImage");
//         }
//         for (const [key, value] of updatedData.entries()) {
//             console.log(`${key}: ${value}`);
//         }
//         console.log("Updated Data:", updatedData);
    
//         const url = `${APIData.api}org-mdm/?`;
    
//         // axios.put(url, updatedData, {
//         //     headers: { ...APIData.headers, 'Content-Type': 'multipart/form-data' }
//         // })
//         //     .then(response => {
//         //         console.log("Response:", response);
//         //         if (response.status === 201 || response.status === "success") {
//         //             console.log("Updated successfully");
//         //             toast('Updated successfully');
//         //             handleClose();
//         //             fetchData();
//         //         } else {
//         //             console.log("Check with the admin");
//         //             toast("Error updating data");
//         //         }
//         //     })
//         //     .catch(error => {
//         //         console.error(error);
//         //         toast("Error updating data");
//         //     });
//     };


import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableBody, TableCell, TableRow, Button, Container, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography } from '@material-ui/core';
import { Link } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { APIData } from '../Authentication/APIData';

export const MdmData = () => {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = async () => {
        try {
            const url = APIData.api + 'org-mdm/';
            const response = await fetch(url, { headers: APIData.headers });
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        const selectedData = data[index];
        setFormData({ ...selectedData });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormData({});
        setEditIndex(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async () => {
        const updatedData = new FormData();
        updatedData.append('org_id', formData.orgId);
        updatedData.append('org_name', formData.orgName);
        updatedData.append('org_short_name', formData.orgShortName);
        updatedData.append('org_emp_code', formData.orgEmpCode);
        updatedData.append('org_email_id', formData.orgEmailId);
        updatedData.append('org_mob', formData.orgMob);
        updatedData.append('updated_by', "raj");
        updatedData.append('org_spoc_name', formData.orgSpocName);
        updatedData.append('org_spoc_email_id', formData.orgSpocEmailId);
        updatedData.append('org_spoc_mob', formData.orgSpocMob);
        updatedData.append('org_status', formData.orgStatus);
        updatedData.append('org_address', formData.orgAddress);
        updatedData.append('orgurl', formData.orgURL);
        updatedData.append('org_account_number', formData.orgAccountNuber);
        updatedData.append('orggst', formData.orgGST);

        for (const [key, value] of updatedData.entries()) {
                       console.log(`${key}: ${value}`);
        }
        if (formData.orgLogo) {
            updatedData.append('image', formData.orgLogo);
        }

        const url = `${APIData.api}org-mdm/`;

        try {
            const response = await axios.put(url, updatedData, {
                headers: { ...APIData.headers, 'Content-Type': 'multipart/form-data' }
            });

            if (response.status === 201 || response.status === 200) {
                toast('Updated successfully');
                handleClose();
                fetchData();
            } else {
                toast("Error updating data");
            }
        } catch (error) {
            console.error('Error updating data: ', error);
            toast("Error updating data");
        }
    };
    
    return (
        <div>
            <Container>
            <Link to="/customermdm">
                <Button startIcon={<AiOutlinePlusCircle style={{ color: "green" }} />} variant="contained" color="success">Upload</Button>
            </Link>
                <Typography variant="h5" style={{textAlign:"center"}}>MdmData</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Org Name</TableCell>
                            <TableCell>Org Email</TableCell>
                            <TableCell>Org Ph No</TableCell>
                            <TableCell>Org Emp Code</TableCell>
                            <TableCell>Org Id</TableCell>
                            <TableCell>Org Url</TableCell>
                            {/* <TableCell>Org Name</TableCell> */}

                            <TableCell>Org Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>

                    </TableHead>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.orgName}</TableCell>
                                <TableCell>{item.orgEmailId}</TableCell>
                                <TableCell>{item.orgMob}</TableCell>
                                <TableCell>{item.orgEmpCode}</TableCell>
                                <TableCell>{item.orgId}</TableCell>
                                <TableCell>{item.orgURL}</TableCell>
                                <TableCell>{item.orgStatus}</TableCell>

                                {/* <TableCell>{item.orgStatus}</TableCell> */}
                                <TableCell>
                                    <Button variant="contained" startIcon={<FaEdit style={{ color: "green" }} />} onClick={() => handleEdit(index)} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Container>

         
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Data</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Org Name"
                        type="text"
                        fullWidth
                        name="orgName"
                        value={formData.orgName || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        label="Org Email"
                        type="email"
                        fullWidth
                        name="orgEmailId"
                        value={formData.orgEmailId || ''}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleUpdate} color="primary">Update</Button>
                </DialogActions>
            </Dialog>
            <ToastContainer />
        
        </div>
    );
};
