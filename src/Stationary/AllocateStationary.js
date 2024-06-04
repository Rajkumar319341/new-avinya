import React, { useState } from "react";
import { APIData } from "../Authentication/APIData";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Loading2 from "../Dashboard/Loading2";
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { MdArrowCircleLeft, MdStore } from "react-icons/md";


const AllocateStationary = () => {
  const [stationary, setstationary] = useState([]);
  const [returnstationary, setReturnStationary] = useState([]);
  const [loading, setLoading] = useState(true);
  const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
  // console.log(sessiondetails.userType);

  const fetchStationaryToAprove = () => {
    const url = APIData.api + `emp/stationary/status?status=Requested`;
    const data = axios
      .get(url, { headers: APIData.headers })
      .then((resp) => {
        setstationary(resp.data);
        setLoading(false);
      })
      .catch((err) => {
        toast("Unable to allocate")
      });
  };
  const fetchStationaryToReturn = () => {
    const url = APIData.api + `emp/stationary/status?status=Return Requested`;
    const data = axios
      .get(url, { headers: APIData.headers })
      .then((resp) => {
        setReturnStationary(resp.data);
        setLoading(false);
      })
      .catch((err) => {
        toast("No Return Request")
      });
  };

  function AllocateStationary(status,stationaryId){
    console.log(stationaryId,status);
    setLoading(true)
    const url = APIData.api+`emp/stationary?id=${stationaryId}&status=${status}&issuedBy=${sessiondetails.userName}`
    const data = axios.put(url,{},{headers:APIData.headers}).then((resp)=>{toast(`Successfully ${status} the stationary`);setLoading(false);fetchStationaryToAprove(); fetchStationaryToReturn()}).catch((err)=>{console.log(err);setLoading(false)}); 
  }
  useEffect(()=>{
    fetchStationaryToAprove()
    fetchStationaryToReturn()
  },[])
  // console.log(stationary);
  return (
    <>
      <Link
        to="/StationeryItems"
        style={{ fontSize: "2rem", float: "left", marginLeft: "4rem" }}
      >
        <MdArrowCircleLeft /> <MdStore />
      </Link>
      <br />
      
        <h2 style={{ marginTop: "2rem", color: " #00a3cc", textAlign:"center" }}>Approve Requests</h2>
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
        {stationary.length === 0 ? (
          <h2 style={{ marginTop: "2rem", color: " #00a3cc" }}>No Allocation Requests</h2>
        ) : (
            stationary &&
            stationary?.map((stationary) => (
            <div
              className="card"
              style={{
                height: "14.5rem",
                width: "40rem",
                backgroundColor: "aliceblue",
                borderRadius: "10px",
                boxShadow:"2px 2px  #007a99"
              }}
              key={stationary.id}
            >   
                {/* <div className="card" style={{width:"22.5rem",height:"17rem",borderRadius:"5px", borderTop:"3px solid grey", boxShadow:"2px 2px grey"}} key={stationary.asset_id}> */}
                        {/* {console.log(asset)} */}
                        <p className="title" style={{margin:0, padding:2,borderRadius:"5px", backgroundColor:" #f2f2f2", fontSize:"1.4rem"}}>
                        {stationary.id}
                        </p>
                        
                        <div className="assetId" style={{display:"flex", padding:"0.8rem 1.2rem"}}>
                            <div className="columnn" style={{flex:"50%", height:"1.5rem", fontSize:"1.2rem", fontWeight:'600', color:"#003380"}}>
                            <p className="columnn" >Stationary Id:</p>
                            <p className="columnn">Stationary Name:</p>
                            <p className="columnn">Status:</p>
                            <p className="columnn">count:</p>
                            <p className="columnn">EmpId:</p>
                            <p className="columnn">EmpMail:</p>
                            
                            </div>
                            <div className="columnn" style={{flex:"50%", height:"1.5rem", fontSize:"1.2rem", fontWeight:'500', color:"#001433", paddingLeft:"0.8rem"}}>
                            <p className="columnn" style={{fontFamily:"inherit"}}>{stationary.stationaryId}</p>
                            <p className="columnn" style={{fontFamily:"inherit"}}>{stationary.stationaryName}</p>
                            <p className="columnn" style={{fontFamily:"inherit"}}>{stationary.status}</p>
                            <p className="columnn" style={{fontFamily:"inherit"}}>{stationary.count}</p>
                            <p className="columnn" style={{fontFamily:"inherit"}}>{stationary.empId}</p>
                            <p className="columnn" style={{fontFamily:"inherit"}}>{stationary.empEmail}</p>
                          

                            </div>
                        </div>  
                        {stationary.empId !== sessiondetails.userName ?
                        <div style={{display:"flex", justifyContent:"center",alignItems:"center", gap:"1.2rem"}}>
                            <button style={{marginTop:"7rem"}} onClick={()=>{ AllocateStationary("Approved",stationary.id)}}>Approve</button>
                            <button style={{marginTop:"7rem", backgroundColor:"#e60000"}} onClick={()=>{ AllocateStationary("Rejected",stationary.id)}}>Reject</button>
                        </div>
                        :<p style={{marginTop:"7rem",textAlign:"center"}}>Kindly contact adminstartion for approval </p>
                        }

                  </div>    
            // </div>
          ))
        )}
        
        </>
        }
        
      </div>
      <h2 style={{ marginTop: "2rem", color: " #00a3cc",textAlign:"center" }}>Return Requests</h2>
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
        {returnstationary.length === 0 ? (
          <h2 style={{ marginTop: "1rem", color: " #00a3cc" }}>No Return Requests</h2>
          ) : (
            returnstationary &&
            returnstationary?.map((stationary) => (
              <div
              className="card"
              style={{
                height: "14.5rem",
                width: "40rem",
                backgroundColor: "aliceblue",
                borderRadius: "10px",
                boxShadow:"2px 2px  #007a99"
              }}
              key={stationary.id}
              >   
                {/* <div className="card" style={{width:"22.5rem",height:"17rem",borderRadius:"5px", borderTop:"3px solid grey", boxShadow:"2px 2px grey"}} key={stationary.asset_id}> */}
                        {/* {console.log(asset)} */}
                        <p className="title" style={{margin:0, padding:2,borderRadius:"5px", backgroundColor:" #f2f2f2", fontSize:"1.4rem"}}>
                        {stationary.id}
                        </p>
                        
                        <div className="assetId" style={{display:"flex", padding:"0.8rem 1.2rem"}}>
                            <div className="columnn" style={{flex:"50%", height:"1.5rem", fontSize:"1.2rem", fontWeight:'600', color:"#003380"}}>
                            <p className="columnn" style={{fontFamily:"inherit"}}>{stationary.stationaryId}</p>
                            <p className="columnn" style={{fontFamily:"inherit"}}>{stationary.stationaryName}</p>
                            <p className="columnn">Status:</p>
                            
                            </div>
                            <div className="columnn" style={{flex:"50%", height:"1.5rem", fontSize:"1.2rem", fontWeight:'500', color:"#001433", paddingLeft:"0.8rem"}}>
                            <p className="columnn" style={{fontFamily:"inherit"}}>{stationary.stationaryId}</p>
                            <p className="columnn" style={{fontFamily:"inherit"}}>{stationary.stationaryName}</p>
                          
                            </div>
                        </div>  
                        {stationary.emp_id !== sessiondetails.userName ?
                        <div style={{display:"flex", justifyContent:"center",alignItems:"center", gap:"1.2rem"}}>
                            <button style={{marginTop:"5.8rem"}} onClick={()=>{ AllocateStationary("Returned",stationary.stationaryId)}}>Approve Return</button>
                        </div>
                        :<p style={{marginTop:"7rem",textAlign:"center"}}>Kindly contact adminstartion for approval </p>
                      }
                  </div>    
            // </div>
          ))
        )}
        
        </>
        }
        
      </div>
             <Link to="/StationeryItems">
              <p style={{margin:"1rem 1rem", textAlign:"center", cursor:"pointer", fontSize:"1.5rem"}}>Go to Store</p>
              </Link>  
    </>
  );
};

export default AllocateStationary;

