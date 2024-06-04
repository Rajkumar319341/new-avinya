import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom";
import { APIData } from "../Authentication/APIData";
import "./AssetGroup.css"
import { Button } from "@material-ui/core";
import { toast } from "react-toastify";
import Loading2 from "../Dashboard/Loading2";
import { MdAcUnit, MdAccessible, MdArrowCircleLeft, MdBackHand, MdBackup, MdDelete, MdDeleteForever, MdFreeBreakfast, MdStore, MdStoreMallDirectory } from "react-icons/md";
import { logDOM } from "@testing-library/react";
const AssetList = () => {
  const { id } = useParams();
  const [assetList, setAssetList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteAsset, setDeleteAsset] = useState(false);
  const roles = ["superadmin", "admin"];
  const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
  const fetchAssetGroupList = () => {
    const url = APIData.api + `asset-list/asset-group-id?assetGroupId=${id}`;
    const data = axios
      .get(url, { headers: APIData.headers })
      .then((resp) => {
        setAssetList(resp.data);
        setLoading(false)
      })
      .catch((err) => {
        toast.error("Unable to fetch");
      });
    setLoading(false);
  };
 
  const handleDelete = (id)=>{
    if (window.confirm(`Are you sure want to delete ${id}`)) {
      setLoading(true)
      const url = APIData.api + `asset-list/id?assetListId=${id}`;
      const data = axios
        .delete(url, { headers: APIData.headers })
        .then((resp) => {
          setLoading(false)
          toast.success(resp);
          fetchAssetGroupList();
        })
        .catch((err) => {
          toast.error("Unable to delete");
          setLoading(false)
        });
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchAssetGroupList();
  }, []);
  return (
    <>
        <Link to="/assets" style={{ fontSize:"2rem", float:"left", marginLeft:"4rem"}}>
            <MdArrowCircleLeft/>  <MdStore />
        </Link>  
        <br />
        <br />
        <br />
        <h2 style={{textAlign:"center", fontFamily:"sans-serif", fontWeight:"bold"}}>Assets</h2>
      <div
        className="cover"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="coantainer" style={{ width: "100%", display:"flex", justifyContent:"center", alignItems:"center", gap:"0.2rem", flexWrap:"wrap", padding:"0.2rem 0.5rem" }}>
        {loading ? <Loading2 /> :
        <>
            {assetList&&assetList?.map((asset)=>(
                  <div className="card" style={{width: "40rem",height:"20rem",borderRadius:"5px", borderTop:"3px solid grey", boxShadow:"2px 2px grey"}} key={asset.asset_id}>
                        {/* {console.log(asset)} */}
                        <p className="title" style={{margin:0, padding:2,borderRadius:"5px", backgroundColor:" #f2f2f2", fontSize:"1.4rem"}}>
                            {asset.asset_name}
                            <>
                            {asset.allocation ==="Not Allocated" && roles.includes(sessiondetails.userType) ? <MdDelete style={{float:"right", cursor:"pointer"}} onClick={()=>{handleDelete(asset.asset_id)}}/>:""}
                            </>
                        </p>
                        
                        <div className="assetId" style={{display:"flex", padding:"0.8rem 1.2rem"}}>
                            <div className="columnn" style={{flex:"50%", height:"1.5rem", fontSize:"1.2rem", fontWeight:'600', color:"#003380"}}>
                            <p className="columnn" >Asset Id:</p>
                            <p className="columnn">Asset Group Id:</p>
                            <p className="columnn">Asset Status:</p>
                            <p className="columnn">Cost:</p>
                            <p className="columnn">Type:</p>
                            <p className="columnn">Asset Owner:</p>
                            <p className="columnn">Allocation:</p>
                            <p className="columnn">Product Id:</p>
                            </div>
                            <div className="columnn" style={{flex:"50%", height:"1.5rem", fontSize:"1.2rem", fontWeight:'500', color:"#001433", paddingLeft:"0.8rem"}}>
                            <p className="columnn" style={{fontFamily:"inherit"}}>{asset.asset_id}</p>
                            <p className="columnn" style={{fontFamily:"inherit"}}>{asset.asset_group_id}</p>
                            <p className="columnn" style={{fontFamily:"inherit"}}>{asset.asset_status}</p>
                            <p className="columnn" style={{fontFamily:"inherit"}}>{asset.cost}</p>
                            <p className="columnn" style={{fontFamily:"inherit"}}>{asset.type}</p>
                            <p className="columnn" style={{fontFamily:"inherit"}}>{(asset.asset_owner_name)}</p>
                            <p className="columnn" style={{fontFamily:"inherit"}}>{asset.allocation}</p>
                            <p className="columnn" style={{fontFamily:"inherit"}}>{asset.product_id}</p>
                            </div>
                        </div>  
                        <div style={{display:"flex", justifyContent:"center",}}>
                        {asset.allocation === "Not Allocated"? <Link to={`/employeeAssetAllocation/${asset.asset_id}/${asset.asset_name}`}><button className="assetButton" style={{marginTop:"12.5rem", padding:"0.1rem 3rem", fontSize:"1rem"}}>Get This</button> </Link> : <></>}
                        </div>
                  </div>    
                                 
            ))}
            </>}
        </div>
      </div>
      <Link to="/assets">
              <p style={{margin:"1rem 1rem", textAlign:"center", cursor:"pointer", fontSize:"1.5rem"}}>Go to Store</p>
      </Link>  
    </>
  );
};

export default AssetList;
