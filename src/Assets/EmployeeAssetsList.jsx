import React, { useEffect, useState } from "react";
import { APIData, org } from "../Authentication/APIData";
import axios from "axios";
import Loading2 from "../Dashboard/Loading2";
import { toast } from "react-toastify";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { InputLabel, MenuItem, Select } from "@material-ui/core";
import { MdArrowCircleLeft, MdStore } from "react-icons/md";

const EmployeeAssetsList = () => {
  const [assets, setAssets] = useState([]);
  const [userNames, setUserNames] = useState([]);
  const [userSelected, setUserSelected] = useState("");
  const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
  const [loading, setLoading] = useState(true);
  // sessiondetails.userName
  const fetchAssetGroup = () => {
    const url = APIData.api + `employee-assets/id?empid=${userSelected}`;
    const data = axios
      .get(url, { headers: APIData.headers })
      .then((resp) => {
        setAssets(resp.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("No items present");
        setAssets([]);
      });
  };
  const fetchEmployeeUserNames = () => {
    const url = APIData.api + `employee/username?org=${org}`;
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
      fetchAssetGroup();
    }
  }, [userSelected]);

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
          {assets.length === 0 ? (
            <h2 style={{ marginTop: "2rem", color: " #00a3cc" }}>No Items</h2>
          ) : (
            <>
              {loading ? (
                <Loading2 />
              ) : (
                <>
                  {assets.length === 0 ? (
                    <h2 style={{ marginTop: "2rem", color: " #00a3cc" }}>
                      No Items
                    </h2>
                  ) : (
                    assets &&
                    assets?.map((assets) => (
                      <div
                        className="card"
                        style={{
                          height: "13rem",
                          width: "40rem",
                          backgroundColor: "aliceblue",
                          borderRadius: "10px",
                          boxShadow: "2px 2px  #007a99",
                        }}
                        key={assets.asset_id}
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
                          {assets.emp_id}
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
                            <p className="columnn">Asset Id:</p>
                            <p className="columnn">Asset Name:</p>
                            <p className="columnn">Allocation:</p>
                            <p className="columnn">Issued By:</p>
                            <p className="columnn">Description:</p>
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
                              {assets.asset_id}
                            </p>
                            <p
                              className="columnn"
                              style={{ fontFamily: "inherit" }}
                            >
                              {assets.asset_name}
                            </p>
                            <p
                              className="columnn"
                              style={{ fontFamily: "inherit" }}
                            >
                              {assets.allocation}
                              <p
                                className="columnn"
                                style={{ fontFamily: "inherit" }}
                              >
                                {assets.issued_by}
                              </p>
                            </p>
                            <p
                              className="columnn"
                              style={{
                                fontFamily: "inherit",
                                fontSize: "0.9rem",
                              }}
                            >
                              {assets.description}
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

export default EmployeeAssetsList;
