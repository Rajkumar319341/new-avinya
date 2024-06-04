import React, { useState } from "react";
import { APIData, org } from "../Authentication/APIData";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Loading2 from "../Dashboard/Loading2";
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { MdArrowCircleLeft, MdStore } from "react-icons/md";


const AllocateAsset = () => {
  const [assets, setAssets] = useState([]);
  const [returnassets, setReturnAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
  // console.log(sessiondetails.userType);

  const fetchAssetsToAprove = () => {
    const url = APIData.api + `employee-assets/status?status=requested&org=${org}`;
    const data = axios
      .get(url, { headers: APIData.headers })
      .then((resp) => {
        setAssets(resp.data);
        setLoading(false);
      })
      .catch((err) => {
        toast("Unable to allocate")
      });
  };
  const fetchAssetsToReturn = () => {
    const url = APIData.api + `employee-assets/status?status=Return Requested&org=${org}`;
   
    const data = axios
      .get(url, { headers: APIData.headers })
      .then((resp) => {
        setReturnAssets(resp.data);
        setLoading(false);
      })
      .catch((err) => {
        toast("Unable to allocate")
      });
  };

  function allocateAsset(status,asset_id){
    setLoading(true)
    const url = APIData.api+`employee-assets/?asset_id=${asset_id}&allocation_status=${status}&issuedBy=${sessiondetails.userName}`
    const data = axios.put(url,{},{headers:APIData.headers}).then((resp)=>{toast(`Successfully ${status} the asset`);setLoading(false);fetchAssetsToAprove();fetchAssetsToReturn()}).catch((err)=>{console.log(err);setLoading(false)}); 
  }
  useEffect(()=>{
    fetchAssetsToAprove()
    fetchAssetsToReturn()
  },[])
  // console.log(assets);
  return (
    <>
      <Link
        to="/assets"
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
        {assets.length === 0 ? (
          <h2 style={{ marginTop: "2rem", color: " #00a3cc" }}>No Allocation Requests</h2>
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
                boxShadow:"2px 2px  #007a99"
              }}
              key={assets.id}
            >   
                {/* <div className="card" style={{width:"22.5rem",height:"17rem",borderRadius:"5px", borderTop:"3px solid grey", boxShadow:"2px 2px grey"}} key={assets.asset_id}> */}
                        {/* {console.log(asset)} */}
                        <p className="title" style={{margin:0, padding:2,borderRadius:"5px", backgroundColor:" #f2f2f2", fontSize:"1.4rem"}}>
                            {assets.emp_id}
                        </p>
                        
                        <div className="assetId" style={{display:"flex", padding:"0.8rem 1.2rem"}}>
                            <div className="columnn" style={{flex:"50%", height:"1.5rem", fontSize:"1.2rem", fontWeight:'600', color:"#003380"}}>
                            <p className="columnn" >Asset Id:</p>
                            <p className="columnn">Asset Name:</p>
                            <p className="columnn">Allocation:</p>
                            <p className="columnn">Description:</p>
                            </div>
                            <div className="columnn" style={{flex:"50%", height:"1.5rem", fontSize:"1.2rem", fontWeight:'500', color:"#001433", paddingLeft:"0.8rem"}}>
                            <p className="columnn" style={{fontFamily:"inherit"}}>{assets.asset_id}</p>
                            <p className="columnn" style={{fontFamily:"inherit"}}>{assets.asset_name}</p>
                            <p className="columnn" style={{fontFamily:"inherit"}}>{assets.allocation}</p>
                            <p className="columnn" style={{fontFamily:"inherit"}}>{assets.description}</p>

                            </div>
                        </div>  
                        {assets.emp_id !== sessiondetails.userName ?
                        <div style={{display:"flex", justifyContent:"center",alignItems:"center", gap:"1.2rem"}}>
                            <button style={{marginTop:"5.8rem"}} onClick={()=>{ allocateAsset("Allocated",assets.asset_id)}}>Approve</button>
                            <button style={{marginTop:"5.8rem", backgroundColor:"#e60000"}} onClick={()=>{ allocateAsset("Rejected",assets.asset_id)}}>Reject</button>
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
        {returnassets.length === 0 ? (
          <h2 style={{ marginTop: "2rem", color: " #00a3cc" }}>No Return Requests</h2>
          ) : (
            returnassets &&
            returnassets?.map((assets) => (
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
                {/* <div className="card" style={{width:"22.5rem",height:"17rem",borderRadius:"5px", borderTop:"3px solid grey", boxShadow:"2px 2px grey"}} key={assets.asset_id}> */}
                        {/* {console.log(asset)} */}
                        <p className="title" style={{margin:0, padding:2,borderRadius:"5px", backgroundColor:" #f2f2f2", fontSize:"1.4rem"}}>
                            {assets.emp_id}
                        </p>
                        
                        <div className="assetId" style={{display:"flex", padding:"0.8rem 1.2rem"}}>
                            <div className="columnn" style={{flex:"50%", height:"1.5rem", fontSize:"1.2rem", fontWeight:'600', color:"#003380"}}>
                            <p className="columnn" >Asset Id:</p>
                            <p className="columnn">Asset Name:</p>
                            <p className="columnn">Allocation:</p>
                            <p className="columnn">Description:</p>
                            </div>
                            <div className="columnn" style={{flex:"50%", height:"1.5rem", fontSize:"1.2rem", fontWeight:'500', color:"#001433", paddingLeft:"0.8rem"}}>
                            <p className="columnn" style={{fontFamily:"inherit"}}>{assets.asset_id}</p>
                            <p className="columnn" style={{fontFamily:"inherit"}}>{assets.asset_name}</p>
                            <p className="columnn" style={{fontFamily:"inherit"}}>{assets.allocation}</p>
                            <p className="columnn" style={{fontFamily:"inherit"}}>{assets.description}</p>

                            </div>
                        </div>  
                        {assets.emp_id !== sessiondetails.userName ?
                        <div style={{display:"flex", justifyContent:"center",alignItems:"center", gap:"1.2rem"}}>
                            <button style={{marginTop:"5.8rem"}} onClick={()=>{ allocateAsset("Returned",assets.asset_id)}}>Approve Return</button>
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
             <Link to="/assets">
              <p style={{margin:"1rem 1rem", textAlign:"center", cursor:"pointer", fontSize:"1.5rem"}}>Go to Store</p>
              </Link>  
    </>
  );
};

export default AllocateAsset;

