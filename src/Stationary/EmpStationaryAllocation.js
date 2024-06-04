import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import { APIData } from "../Authentication/APIData";
import axios from "axios";
import { toast } from "react-toastify";
import { MdArrowCircleLeft, MdStore } from "react-icons/md";

const EmpStationaryAllocation = () => {
    const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
    // console.log(sessiondetails.userName);
    const {id, name} = useParams();
    // console.log(stationaryId, stationaryName)
    const [count,setCount] = useState("");
    const [email,setEmail] = useState("");
    const [empid,setempid] = useState("");
    // const [stationaryName,setstationaryName] = useState("");
    const [Requested,setRequested] = useState("");
    // const [ id, setid]=useState("")
    let history = useHistory();

    const employeeStationaryData = {
        count: count,
        empEmail:sessiondetails.email,
        empId: sessiondetails.user,
        id: 0,
        requestedDate: "",
        stationaryId: id,
        stationaryName: name,
        status: "Requested",
        updatedBy: "",
        updatedDate: ""
    };
    // console.log( employeeStationaryData );
    const postEmployeeStaionRequest = () => {
        const url = APIData.api + "emp/stationary";
        const data = axios
            .post(url, employeeStationaryData, { headers: APIData.headers })
            .then((resp) => {
                toast("Successfully Requested");
            })
            .catch((err) => {
                toast("Failed to request for allocation");
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postEmployeeStaionRequest();
        history.push("/StatioItems");
    };
    return (
        <>
            <div>
                <Link to="/StationeryItems" style={{ fontSize: "2rem", float: "left", marginLeft: "4rem" }}>
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
                                label="stationeryItem Id"
                                value={id}
                                style={{ marginBottom: "1.2rem", width: "16rem" }}
                            />
                            <TextField
                                id="standard-basic"
                                label="stationeryItem Name"
                                value={name}
                                style={{ marginBottom: "1.2rem", width: "16rem" }}
                                multiline
                            />
                            <TextField
                                id="standard-basic"
                                label="EmployeeId"
                                value={sessiondetails.user}
                                onChange={(e) => {
                                    setempid(e.target.value);
                                  }}
                                style={{ marginBottom: "1.2rem", width: "16rem" }}
                            />
                            <TextField
                                id="standard-basic"
                                label="EmployeeEmail"
                                value={sessiondetails.email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                  }}
                                style={{ marginBottom: "1.2rem", width: "16rem" }}
                            />
                             <TextField
                                id="standard-basic"
                                label="count"
                                value={count}
                                onChange={(e) => {
                                    setCount(e.target.value);
                                  }}
                                style={{ marginBottom: "1.2rem", width: "16rem" }}

                            />
                            {/* <TextField
                                id="standard-basic"
                                label="Status"
                                value={Requested}
                                onChange={(e) => {
                                    setRequested(e.target.value);
                                  }}
                                style={{ marginBottom: "1.2rem", width: "16rem" }}
                            /> */}
                            <button
                                style={{ padding: "0.5rem 3rem", fontSize: "1rem" }}
                                type="submit"
                              
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

export default EmpStationaryAllocation;
