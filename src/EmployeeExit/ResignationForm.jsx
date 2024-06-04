import { Button, TextField, Typography } from "@material-ui/core";
import { Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { APIData, exitKeyWord, org } from "../Authentication/APIData";
import axios from "axios";
import { toast } from "react-toastify";
import Loading2 from "../Dashboard/Loading2";

const ResignationForm = () => {
  const user = APIData.sessiondetails;
  const [lifecycleStatus, setLifecycleStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState("");
  const fetchExitLifeCycleStatuses = async () => {
    const url = APIData.api + `employee/life-cycle/type?type=${exitKeyWord}&org=${org}`;
    const data = await axios
      .get(url, { headers: APIData.headers })
      .then((resp) => {
        setLifecycleStatus(resp.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Unable to fetch");
      });
    setLoading(false);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (description.length > 30) {
        const url = APIData.api + `employee/exit`;
        // lifecycleStatus&&lifecycleStatus.forEach(element => {
        //     console.log(element.statusName);
        // });
      const formBody = {
        id: 0,
        empEmail: user.email,
        empUserName: user.userName,
        description: description,
        status: "Resignation letter",
        approvedBy: "",
        type: exitKeyWord,
        createdTime: "",
        updatedTime: "",
        org:org
      };
      console.log(formBody);
      setLoading(true)
      await axios.post(url,formBody,{ headers: APIData.headers }).then((resp)=>{
        console.log(resp);
        toast.success("Submitted successfully")
        // window.location.reload();
        setLoading(false)
      }).catch(err =>{
        console.log(err);
        toast.error("Unable to submit kindly submit after sometime");
        setLoading(false);

      })
    }
    else{
        toast.error("Description must be of atleast 20 words");
        return;
    }
  };

  useEffect(() => {
    fetchExitLifeCycleStatuses();
  }, []);
  return (
    <>
    {
        loading ? <Loading2/> :
    
      <Paper elevation={3} style={{ padding: "1.2rem 0.8rem" }}>
        <Typography
          variant="h6"
          component="h1"
          style={{
            fontFamily: "monospace",
            color: "#1098AD",
          }}
          align="center"
        >
          Fill this form to initiate your exit process
        </Typography>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "1.5rem",
              gap: "1.2rem",
            }}
          >
            <TextField
              id="standard-basic"
              label="User Name"
              value={user.userName}
              readOnly
            />
            <TextField
              id="standard-basic"
              label="Email"
              value={user.email}
              readOnly
            />
            <TextField
              id="outlined-multiline-static"
              label="Enter resignation details"
              style={{ textAlign: "center" }}
              multiline
              rows={5}
              autoFocus
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <Button
              variant="contained"
              style={{ color: "aliceblue", backgroundColor: "#1098AD" }}
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </Paper>
}
    </>
  );
};

export default ResignationForm;
