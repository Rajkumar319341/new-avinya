import React, { useEffect, useState } from 'react';
import { APIData, org } from '../Authentication/APIData';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Container,
  FormControl,
  Select,
  MenuItem,
  Button
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ReleaseStatus = () => {
  const [data, setData] = useState([]);
  const sessiondata = JSON.parse(localStorage.getItem("sessiondetails"));
  const supervisorEmail = sessiondata.email;
  console.log("Supervisor email:", supervisorEmail);

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    const url = APIData.api + `enrollments/prev-dept-supervisor/release-status?PrevDeptSupervisor=${supervisorEmail}&&ReleaseStatus=PENDING&org=${org}`;
    console.log("Url:", url);
    const response = await axios.get(url, { headers: APIData.headers });
    setData(response.data);
    console.log("Release status data:", response.data);
  };

  const handleStatusChange = (email, newStatus) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.user_email === email ? { ...row, release_status: newStatus } : row
      )
    );
  };

  const handleSubmit = async (email, currentStatus) => {
    try {
      const url = APIData.api + `enrollments/release-status?User_email=${email}&org=${org}&release_status=${currentStatus}`;
      console.log("PUT Url:", url);
      const response = await axios.put(url, {}, { headers: APIData.headers });
      console.log("PUT response:", response);

      toast.success(`Status successfully updated to ${currentStatus}`);

      setData((prevData) => prevData.filter((row) => row.user_email !== email));
    } catch (error) {
      console.error("Error updating release status:", error);
      toast.error("Failed to update status");
    }
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom style={{ textAlign: "center" }}>
        Release Status
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User Email</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>User Phone Number</TableCell>
              <TableCell>Applied For (Role)</TableCell>
              <TableCell>Release Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.user_email}>
                <TableCell>{row.user_email}</TableCell>
                <TableCell>{row.user_name}</TableCell>
                <TableCell>{row.user_phone_number}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <Select
                      value={row.release_status}
                      onChange={(e) => handleStatusChange(row.user_email, e.target.value)}
                    >
                      <MenuItem value="PENDING">PENDING</MenuItem>
                      <MenuItem value="RELEASED">RELEASE</MenuItem>
                      <MenuItem value="REJECTED">REJECT</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSubmit(row.user_email, row.release_status)}
                  >
                    Submit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer />
    </Container>
  );
};
