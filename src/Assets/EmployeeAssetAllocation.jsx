import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import { APIData } from "../Authentication/APIData";
import axios from "axios";
import { toast } from "react-toastify";
import { MdArrowCircleLeft, MdStore } from "react-icons/md";

const EmployeeAssetAllocation = () => {
  const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
  // console.log(sessiondetails.userName);
  const { assetId, assetName } = useParams();
  const [description, setDescription] = useState("");
  let history = useHistory();

  const employeeAssetData = {
    allocation: "Requested",
    asset_id: assetId,
    asset_name: assetName,
    description: description,
    emp_id: sessiondetails.userName,
    issued_by: "",
    issued_date: "",
    return_date: "",
    id: 0,
  };
  // console.log(employeeAssetData);
  const postEmployeeAssetRequest = () => {
    const url = APIData.api + "employee-assets/";
    const data = axios
      .post(url, employeeAssetData, { headers: APIData.headers })
      .then((resp) => {
        toast("Successfully Requested");
      })
      .catch((err) => {
        toast("Failed to request for allocation");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postEmployeeAssetRequest();
    setDescription("");
    history.push("/assets");
  };
  return (
    <>
    <div>
      <Link to="/assets" style={{ fontSize: "2rem", float: "left", marginLeft:"4rem" }}>
        <MdArrowCircleLeft /> <MdStore />
      </Link>
    </div>
      <br />  
      <br />
      <br />
      <div
        className="cover"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="coantainer">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                // height: "16rem",
                padding: "2rem 5rem",
                backgroundColor: "#ccf2ff",
              }}
            >
              <TextField
                id="standard-basic"
                label="Asset Id"
                value={assetId}
                style={{ marginBottom: "1.2rem", width: "16rem" }}
              />
              <TextField
                id="standard-basic"
                label="Asset Name"
                value={assetName}
                style={{ marginBottom: "1.2rem", width: "16rem" }}
                multiline
              />
              <TextField
                id="standard-basic"
                label="Employee Id"
                value={sessiondetails.userName}
                style={{ marginBottom: "1.2rem", width: "16rem" }}
              />
              <TextField
                id="standard-textarea"
                label="Reason for getting the asset"
                placeholder="Description"
                multiline
                required
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                maxRows={4}
                style={{ marginBottom: "1.2rem", width: "16rem" }}
              />
              <button
                style={{ padding: "0.5rem 3rem", fontSize: "1rem" }}
                type="submit"
                disabled={!description}
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EmployeeAssetAllocation;
