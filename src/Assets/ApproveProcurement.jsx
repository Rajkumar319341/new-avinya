import React, { useEffect, useState } from "react";
import { APIData, org } from "../Authentication/APIData";
import axios from "axios";
import Loading2 from "../Dashboard/Loading2";
import { toast } from "react-toastify";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { MdArrowCircleLeft, MdStore } from "react-icons/md";

const ApproveProcurement = () => { 
  const [assets, setAssets] = useState([]);
  const [allAssets, setAllAssets] = useState([]);
  const [loading, setLoading] = useState([]);
  const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));

  const fetchAssets = () => {
    const url = APIData.api + `procurement/status?status=Initiated`;
   
    const data = axios
      .get(url, { headers: APIData.headers })
      .then((resp) => {
        setAssets(resp.data);
        setLoading(false);
      })
      .catch((err) => {
        toast("Unable to Fetch1");
      });
  };
  const fetchAllAssets = () => {
    const url = APIData.api + `procurement/?org=${org}`;
    const data = axios
      .get(url, { headers: APIData.headers })
      .then((resp) => {
        setAllAssets(resp.data);
        // console.log(resp.data);
        setLoading(false);
      })
      .catch((err) => {
        toast("Unable to Fetch2");
      });
  };

  function allocateAsset(status, asset_id) {
    setLoading(true);
    const url =
      APIData.api +
      `procurement/?procurementId=${parseInt(asset_id)}&status=${status}&org=${org}`;
    const data = axios
      .put(url, {}, { headers: APIData.headers })
      .then((resp) => {
        toast(`Successfully ${status} the asset`);
        setLoading(false);
        fetchAssets();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  useEffect(() => {
    fetchAssets();
    fetchAllAssets();
  }, []);
  return (
    <>
      <Link
        to="/assets"
        style={{ fontSize: "2rem", float: "left", marginLeft: "4rem" }}
      >
        <MdArrowCircleLeft /> <MdStore />
      </Link>
      <br />
      <h2 style={{ marginTop: "2rem", color: " #00a3cc", textAlign: "center" }}>
        Approve Procurement Requests
      </h2>
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
        {loading ? (
          <Loading2 />
        ) : (
          <>
            {assets.length === 0 ? (
              <h2 style={{ marginTop: "2rem", color: " #00a3cc" }}>
                No Procurement Requests
              </h2>
            ) : (
              assets &&
              assets?.map((assets) => (
                <div
                  className="card"
                  style={{
                    height: "14.5rem",
                    width: "40rem",
                    backgroundColor: "aliceblue",
                    borderRadius: "10px",
                    boxShadow: "2px 2px  #007a99",
                  }}
                  key={assets.id}
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
                      <p className="columnn">Asset Name:</p>
                      <p className="columnn">Type:</p>
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
                      <p className="columnn" style={{ fontFamily: "inherit" }}>
                        {assets.asset_name}
                      </p>
                      <p className="columnn" style={{ fontFamily: "inherit" }}>
                        {assets.type}
                      </p>
                      <p
                        className="columnn"
                        style={{ fontFamily: "inherit", fontSize: "1rem" }}
                      >
                        {assets.asset_description}
                      </p>
                    </div>
                  </div>
                  {assets.emp_id !== sessiondetails.userName ?
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "1.2rem",
                    }}
                  >
                    <button
                      style={{ marginTop: "5.8rem" }}
                      onClick={() => {
                        allocateAsset("Procured", assets.id);
                      }}
                    >
                      Approve
                    </button>
                    <button
                      style={{
                        marginTop: "5.8rem",
                        backgroundColor: "#e60000",
                      }}
                      onClick={() => {
                        allocateAsset("Rejected", assets.id);
                      }}
                    >
                      Reject
                    </button>
                  </div>
                  :<p style={{marginTop:"7rem",textAlign:"center"}}>Kindly contact adminstartion for approval </p>
                }
                </div>
                // </div>
              ))
            )}
          </>
        )}
      </div>
      <h2 style={{ marginTop: "2rem", color: " #00a3cc", textAlign:"center" }}>All Procurements </h2>
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
        {
        loading? <Loading2 /> :
        <>
        {allAssets.length === 0 ? (
          <h2 style={{ marginTop: "2rem", color: " #00a3cc" }}>No Procurements</h2>
        ) : (
          allAssets &&
          allAssets?.map((assets) => (
            <div
              className="card"
              style={{
                height: "14.5rem",
                width: "40rem",
                backgroundColor: "aliceblue",
                borderRadius: "10px",
                boxShadow:"2px 2px  #007a99"
              }}
              key={assets.id}
            >   
                        <p className="title" style={{margin:0, padding:2,borderRadius:"5px", backgroundColor:" #f2f2f2", fontSize:"1.4rem"}}>
                            {assets.emp_id}
                        </p>
                        
                        <div className="assetId" style={{display:"flex", padding:"0.8rem 1.2rem"}}>
                            <div className="columnn" style={{flex:"50%", height:"1.5rem", fontSize:"1.2rem", fontWeight:'600', color:"#003380"}}>
                            <p className="columnn">Asset Name:</p>
                            <p className="columnn">Type:</p>
                            <p className="columnn">Status:</p>
                            <p className="columnn">Description:</p>
                            </div>
                            <div className="columnn" style={{flex:"50%", height:"1.5rem", fontSize:"1.2rem", fontWeight:'500', color:"#001433", paddingLeft:"0.8rem"}}>
                            <p className="columnn" style={{fontFamily:"inherit"}}>{assets.asset_name}</p>
                            <p className="columnn" style={{fontFamily:"inherit"}}>{assets.type}</p>
                            <p className="columnn" style={{fontFamily:"inherit"}}>{assets.status}</p>
                            <p className="columnn" style={{fontFamily:"inherit", fontSize:"1rem"}}>{assets.asset_description}</p>

                            </div>
                        </div>  
                  </div>    
            // </div>
          ))
        )}
        
        </>
        }
        
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

export default ApproveProcurement;
