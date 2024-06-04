import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { TreeNode } from 'react-organizational-chart';
import styled from 'styled-components';
import { APIData, org } from '../Authentication/APIData';
import { CiCircleRemove } from 'react-icons/ci';
import { CiEdit } from 'react-icons/ci';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { TextField, MenuItem } from '@mui/material';


const StyledNode = styled.div`  padding: 2px;  border-radius: 5px;  display: inline-block;  border: 1px solid blue;`;

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[2],
    padding: theme.spacing(2, 4, 3),
  },
}));

const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
// console.log(sessiondetails.userType); 

const HirearchyNested = ({ supervisorEmail }) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [data, setData] = useState([]);
  const [email, setEmail] = useState(supervisorEmail);
  const [selectedPersonEmail, setSelectedPersonEmail] = useState("");
  const [selectedAnotherEmail, setSelectedAnotherEmail] = useState("");
  const [allEmails, setAllEmails] = useState([]);



  const fetchData = (email) => {
    const url = APIData.api + 'organization-hierarchy/supervisor?supervisorEmail=' + email;
    axios
      .get(url, { headers: APIData.headers })
      .then((resp) => setData(resp.data))
      .catch((err) => alert('Error fetching data'));
  };
  const fetchAllEmails = () => {
    const url = APIData.api + `organization-hierarchy?org=${org}`;
    axios
      .get(url, { headers: APIData.headers })
      .then((resp) => setAllEmails(resp.data),)
      .catch((err) => alert('Error fetching emails'));
  };



  const handleOpen = (email) => {
    setSelectedPersonEmail(email);
    setOpen(true);
  };

  const handleOpend = (email) => {
    const personDetails = data.find((org) => org.email === email);
    // console.log("Details of selected person:", personDetails);
    setSelectedPersonEmail(email);
    setOpen2(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpen2(false);
    setSelectedAnotherEmail("");
  };

  const handlesubmit = () => {
    if (selectedAnotherEmail.trim() === "") {
      alert("Please select another email");
      return;
    }

    const url = APIData.api + `organization-hierarchy/update-supervisor/delete/id?emailId=${selectedPersonEmail}&newSupervisorEmail=${selectedAnotherEmail}`;
    const requestData = {
      emailId: selectedPersonEmail,
      newSupervisorEmail: selectedAnotherEmail
    };
    axios
      .delete(url, { data: requestData, headers: APIData.headers })
      .then((resp) => {
        // console.log("Delete successful", resp.data);
        alert("Deleted successful")

      })
      .catch((err) => {
        // console.error('Error deleting data', err);
        alert("Error in Deleting")
      })
      .finally(() => {
        handleClose();
      });
  };

  const handlesubmit2 = () => {
    if (selectedAnotherEmail.trim() === "") {
      alert("Please select another email");
      return;
    }

    const personDetails = data.find((org) => org.email === selectedPersonEmail);

    const url = APIData.api + 'organization-hierarchy';
    const requestData = {
      email: personDetails.email,
      designation: personDetails.designation,
      entity: personDetails.entity,
      image: personDetails.image,
      name: personDetails.name,
      supervisorEmail: selectedAnotherEmail,
      username: personDetails.username,
      org:org
    };
    console.log(requestData);
    axios
      .put(url, requestData, { headers: APIData.headers })
      .then((resp) => {
        // console.log("Update successful", resp.data);
        alert("Update successful");
      })
      .catch((err) => {
        // console.error('Error updating data', err);
        alert("Error in Updating");
      })
      .finally(() => {
        handleClose();
      });
  };

  const body = (
    <div style={modalStyle} className={classes.paper}   >

      <h5 id="simple-modal-title" >Remove from Hierarchy</h5>
      <br />
      <p>Email: {selectedPersonEmail}</p>
      <br />
      <TextField
        label="Select NewSupervisor Email"
        select
        value={selectedAnotherEmail}
        onChange={(e) => setSelectedAnotherEmail(e.target.value)}
        fullWidth
      >
        {allEmails.map((org) => (
          <MenuItem key={email} value={org.email}>
            {org.email}
          </MenuItem>
        ))}
      </TextField>
      <br />
      <button onClick={handlesubmit} >Remove</button>

    </div>
  );

  const body2 = (
    <div style={modalStyle} className={classes.paper}   >

      <h5 id="simple-modal-title" >Update Hierarchy</h5>
      <br />
      <p>Email: {selectedPersonEmail}</p>
      <br />
      <TextField
        label="Select Supervisor Email"
        select
        value={selectedAnotherEmail}
        onChange={(e) => setSelectedAnotherEmail(e.target.value)}
        fullWidth
      >
        {allEmails.map((org) => (
          <MenuItem key={email} value={org.email}>
            {org.email}
          </MenuItem>
        ))}
      </TextField>
      <br />
      <button onClick={handlesubmit2} >Update</button>

    </div>
  );

  useEffect(() => {
    fetchData(email);
    fetchAllEmails()

  }, [email]);

  return (
    <>
      {data.length === 0 || data === null ? (
        <></>
      ) : (
        <>
          {data &&
            data.map((org) => (
              <TreeNode
                label={
                  <StyledNode>
                    {sessiondetails.userType==="superadmin"?  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <CiEdit onClick={() => handleOpend(org.email)} />
                    <CiCircleRemove onClick={() => handleOpen(org.email)} />
                  </div>: null }
                   
                    <img src={org.image} alt="" height={80} width={80} />
                    <p>{org.name}</p>
                    <p>{org.designation}</p>
                  </StyledNode>
                }
                key={org.email}
              >
                <HirearchyNested supervisorEmail={org.email} />
              </TreeNode>
            ))}
        </>
      )}
      <Modal
        open={open2}
        onClose={handleClose}

      >
        {body2}
      </Modal>
      <Modal
        open={open}
        onClose={handleClose}

      >
        {body}
      </Modal>
    </>
  );
};

export default HirearchyNested;
