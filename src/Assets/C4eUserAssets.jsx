import React, { useEffect, useState } from "react";
import { APIData } from "../Authentication/APIData";
import axios from "axios";
import Loading2 from "../Dashboard/Loading2";
import { toast } from "react-toastify";
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { MdArrowCircleLeft, MdStore } from "react-icons/md";


const C4eUserAssets = () => {
    const [assets, setAssets] = useState([]);
    const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
    const [loading, setLoading] = useState(true);
    // sessiondetails.userName
    const fetchAssetGroup = ()=>{
        const url = APIData.api+`employee-assets/id?empid=${sessiondetails.userName}`
        const data = axios.get(url,{headers:APIData.headers}).then((resp)=>{setAssets(resp.data);setLoading(false)}).catch((err)=>{toast.error("No items present")});  
      }
      useEffect(()=>{
        fetchAssetGroup()
      },[])
      const returnAsset = (status, asset_id)=>{
        setLoading(true)
        const url = APIData.api+`employee-assets/return-asset/?asset_id=${asset_id}&allocation_status=${status}`
        const data = axios.put(url,{},{headers:APIData.headers}).then((resp)=>{toast(`Successfully ${status} the asset`);setLoading(false);fetchAssetGroup()}).catch((err)=>{console.log(err);setLoading(false)}); 
      }
  return (
    <>
          <Link
        to="/assets"
        style={{ fontSize: "2rem", float: "left", marginLeft:"4rem"}}
      >
        <MdArrowCircleLeft /> <MdStore />
      </Link>
      <br />  
      <br />
      <br />
      <>
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
          { assets.length === 0 ? <h2 style={{marginTop:"2rem", color:" #00a3cc"}}>No Items</h2>:<>
        {loading? <Loading2 /> :
        <>
          {assets.length === 0 ? (
            <h2 style={{ marginTop: "2rem", color: " #00a3cc" }}>No Items</h2>
          ) : (
            assets &&
            assets?.map((assets) => (
              <div
                className="card"
                style={{
                    height: "15rem",
                    width: "40rem",
                  backgroundColor: "aliceblue",
                  borderRadius: "10px",
                  boxShadow:"2px 2px  #007a99"
                }}
                key={assets.asset_id}
              >
                <p className="title" style={{margin:0, padding:2,borderRadius:"5px", backgroundColor:" #f2f2f2", fontSize:"1.4rem"}}>
                            {assets.emp_id}
                        </p>
                        
                        <div className="assetId" style={{display:"flex", padding:"0.8rem 1.2rem"}}>
                            <div className="columnn" style={{flex:"50%", height:"1.5rem", fontSize:"1.2rem", fontWeight:'600', color:"#003380"}}>
                            <p className="columnn" >Asset Id:</p>
                            <p className="columnn">Asset Name:</p>
                            <p className="columnn">Allocation:</p>
                            <p className="columnn">Issued By:</p>
                            <p className="columnn">Description:</p>
                            </div>
                            <div className="columnn" style={{flex:"50%", height:"1.5rem", fontSize:"1.2rem", fontWeight:'500', color:"#001433", paddingLeft:"0.8rem"}}>
                            <p className="columnn" style={{fontFamily:"inherit"}}>{assets.asset_id}</p>
                            <p className="columnn" style={{fontFamily:"inherit"}}>{assets.asset_name}</p>
                            <p className="columnn" style={{fontFamily:"inherit"}}>{assets.allocation}</p>
                            <p className="columnn" style={{fontFamily:"inherit"}}>{assets.issued_by}</p>
                            <p className="columnn" style={{fontFamily:"inherit", fontSize:"0.9rem"}}>{assets.description}</p>
                            </div>
                        </div>  
                        <div style={{display:"flex", justifyContent:"center",alignItems:"center", gap:"1.2rem"}}>
                          {
                            assets.allocation === "Returned" ? "":
                            <button style={{marginTop:"7.8rem"}} onClick={()=>{ returnAsset("Return Requested",assets.asset_id)}}>Return</button>
                          }
                        </div>
              </div>
            ))
          )}</>}</>}
        </div>
      </>
      {/* <Link to="/assets">
              <p style={{margin:"1rem 1rem", textAlign:"center", cursor:"pointer", fontSize:"1.5rem"}}>Go to Store</p>
              </Link>   */}
    </>
  );
};

export default C4eUserAssets;
