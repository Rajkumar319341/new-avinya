import { InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import {
  Link,
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom";
import { APIData, org } from "../Authentication/APIData";
import axios from "axios";
import { toast } from "react-toastify";
import { MdArrowCircleLeft, MdStore } from "react-icons/md";

const Procurement = () => {
  const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));

  const [description, setDescription] = useState("");
  const [assetName, setAssetName] = useState("");
  const [assetListType, setAssetListType] = useState("");

  let history = useHistory();

  // console.log(employeeAssetData);
  const postEmployeeAssetRequest = () => {
    const employeeAssetData = {
      asset_name: assetName,
      asset_description: description,
      emp_id: sessiondetails.userName,
      type: assetListType,
      status: "Initiated",
      id: 0,
      org:org
    };
    const url = APIData.api + "procurement/";
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
      <Link
        to="/assets"
        style={{ fontSize: "2rem", float: "left", marginLeft: "4rem" }}
      >
        <MdArrowCircleLeft /> <MdStore />
      </Link>
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
                // alignItems: "center",
                // height: "16rem",
                padding: "2rem 5rem",
                backgroundColor: "#ccf2ff",
              }}
            >
              <TextField
                id="standard-basic"
                label="Employee Id"
                value={sessiondetails.userName}
                style={{ marginBottom: "1.2rem", width: "16rem" }}
              />

              <TextField
                id="standard-basic"
                label="Asset Name"
                value={assetName}
                onChange={(e) => {
                  setAssetName(e.target.value);
                }}
                style={{ marginBottom: "1.2rem", width: "16rem" }}
                multiline
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "start",
                }}
              >
                <InputLabel id="select-label" style={{ marginTop: "1.5rem" }}>
                  Select Asset Type
                </InputLabel>
              </div>
              <Select
                labelId="select-label"
                id="demo-simple-select"
                value={assetListType}
                onChange={(e) => {
                  setAssetListType(e.target.value);
                }}
                fullWidth
                required
              >
                <MenuItem value={"Hardware"}>Hardware</MenuItem>
                <MenuItem value={"Software"}>Software</MenuItem>
                <MenuItem value={"Stationary"}>Stationary</MenuItem>
              </Select>
              <br />
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
      <Link to="/assets">
        <p
          style={{
            margin: "1rem 1rem",
            textAlign: "center",
            cursor: "pointer",
            fontSize: "1.5rem",
          }}
        >
          Go to Store
        </p>
      </Link>
    </>
  );
};

export default Procurement;
