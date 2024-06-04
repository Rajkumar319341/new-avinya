import React, { useEffect, useState } from "react";
import { APIData } from "../Authentication/APIData";
import axios from "axios";
import Loading2 from "../Dashboard/Loading2";
import { toast } from "react-toastify";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { InputLabel, MenuItem, Select } from "@material-ui/core";
import { MdArrowCircleLeft, MdStore } from "react-icons/md";

const EmpStationeryList = () => {
  const [stationary, setstationary] = useState([]);
  const [userNames, setUserNames] = useState([]);
  const [userSelected, setUserSelected] = useState("");
  const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
  const [loading, setLoading] = useState(true);
  // sessiondetails.userName
  const fetchStationaryGroup = () => {
    const url = APIData.api + `emp/stationary/empId?empId=${userSelected}`;
    const data = axios
      .get(url, { headers: APIData.headers })
      .then((resp) => {
        setstationary(resp.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("No items present");
        setstationary([]);
      });
  };
  const fetchEmployeeUserNames = () => {
    const url = APIData.api + `employee/username`;
    const data = axios
      .get(url, { headers: APIData.headers })
      .then((resp) => {
        setUserNames(resp.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("No items present");
      });
  };
  //   fetchAssetGroup()
  useEffect(() => {
    fetchEmployeeUserNames();
    if (userSelected !== "") {
        fetchStationaryGroup();
    }
  }, [userSelected]);

  return (
    <>
      <Link
        to="/StationeryItems"
        style={{ fontSize: "2rem", float: "left", marginLeft: "4rem" }}
      >
        <MdArrowCircleLeft /> <MdStore />
      </Link>
      <br />
      <br />
      <br />
      <>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <InputLabel id="select-label2" style={{ marginTop: "1.5rem" }}>
            Select Employee
          </InputLabel>
          <Select
            labelId="select-label2"
            id="demo-simple-select"
            value={userSelected}
            onChange={(e) => {
              setUserSelected(e.target.value);
            }}
            style={{ width: "50%" }}
            required
          >
            {userNames &&
              userNames?.map((name) => (
                <MenuItem value={name} key={name}>
                  {name}
                </MenuItem>
              ))}
          </Select>
        </div>
        <div
          className="card-container"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.8rem",
          }}
        >
          {stationary.length === 0 ? (
            <h2 style={{ marginTop: "2rem", color: " #00a3cc" }}>No Items</h2>
          ) : (
            <>
              {loading ? (
                <Loading2 />
              ) : (
                <>
                  {stationary.length === 0 ? (
                    <h2 style={{ marginTop: "2rem", color: " #00a3cc" }}>
                      No Items
                    </h2>
                  ) : (
                    stationary &&
                    stationary?.map((stationary) => (
                      <div
                        className="card"
                        style={{
                          height: "13rem",
                          width: "40rem",
                          backgroundColor: "aliceblue",
                          borderRadius: "10px",
                          boxShadow: "2px 2px  #007a99",
                        }}
                        key={stationary.asset_id}
                      >
                        <p
                          className="title"
                          style={{
                            margin: 0,
                            padding: 2,
                            borderRadius: "5px",
                            backgroundColor: " #f2f2f2",
                            fontSize: "1.4rem",
                          }}
                        >
                          {stationary.emp_id}
                        </p>

                        <div
                          className="assetId"
                          style={{ display: "flex", padding: "0.8rem 1.2rem" }}
                        >
                          <div
                            className="columnn"
                            style={{
                              flex: "50%",
                              height: "1.5rem",
                              fontSize: "1.2rem",
                              fontWeight: "600",
                              color: "#003380",
                            }}
                          >
                            <p className="columnn">Stationary Id:</p>
                            <p className="columnn">Stationary Name:</p>
                            <p className="columnn">Status:</p>
                            <p className="columnn">Requestes Date:</p>
                            <p className="columnn">Approved Date:</p>
                          </div>
                          <div
                            className="columnn"
                            style={{
                              flex: "50%",
                              height: "1.5rem",
                              fontSize: "1.2rem",
                              fontWeight: "500",
                              color: "#001433",
                              paddingLeft: "0.8rem",
                            }}
                          >
                            <p
                              className="columnn"
                              style={{ fontFamily: "inherit" }}
                            >
                              {stationary.stationaryId}
                            </p>
                            <p
                              className="columnn"
                              style={{ fontFamily: "inherit" }}
                            >
                              {stationary.stationaryName}
                            </p>
                            <p
                              className="columnn"
                              style={{ fontFamily: "inherit" }}
                            >
                              {stationary.status}
                            </p>
                            <p
                                className="columnn"
                                style={{ fontFamily: "inherit" }}
                              >
                                {stationary.requestedDate}
                              </p>
                            <p
                              className="columnn"
                              style={{
                                fontFamily: "inherit",
                                fontSize: "0.9rem",
                              }}
                            >
                              {stationary.updatedDate}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </>
              )}
            </>
          )}
        </div>
      </>
      <Link to="/StationeryItems">
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

export default EmpStationeryList;

// import React from 'react'

// const EmpStationeryList = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default EmpStationeryList
