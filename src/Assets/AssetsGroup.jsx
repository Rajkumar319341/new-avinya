import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { APIData, org } from '../Authentication/APIData';
import "./AssetGroup.css";
import Loading2 from '../Dashboard/Loading2';
const AssetsGroup = () => {
  const [assetGroup, setAssetGrop] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const roles = ["superadmin", "admin"];
  const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
  // console.log(sessiondetails.userType);
  const fetchAssetGroup = ()=>{
    const url = APIData.api+`assetgroup/?org=${org}`
    const data = axios.get(url,{headers:APIData.headers}).then((resp)=>{setAssetGrop(resp.data);setLoading(false)}).catch((err)=>{console.log(err)});  
  }
  const searchAssetGroup = async()=>{
    const url = APIData.api+`assetgroup/search?query=${search}&org=${org}`
  
    const data = await axios.get(url,{headers:APIData.headers}).then((resp)=>{setAssetGrop(resp.data);setLoading(false)}).catch((err)=>{console.log(err)});  
  }
  useEffect(()=>{
    fetchAssetGroup()
  },[])
  return (
    <>
    <div className="cover" style={{display:"flex",justifyContent:"center",alignItems:"center",}}>

        <div className="coantainer"  style={{width:"90%"}}>
            <h2 style={{textAlign:"center", fontFamily:"sans-serif", fontWeight:"bold"}}>{APIData.orgName}- Store</h2>
            {roles.includes(sessiondetails.userType) ?
            <div style={{display:"flex", justifyContent:"center", marginTop:"1rem",flexWrap:"wrap",gap:"1.2rem"}}>
              <Link to="/addAsset">
              <button style={{margin:"0rem 0.5rem"}}>Add Asset-Group/Asset</button>
              </Link>
              <Link to="/allocateAsset">
              <button style={{margin:"0rem 0.5rem"}}>Verify Allocation Request</button>
              </Link>
              <Link to="/myAssets">
              <button style={{margin:"0rem 0.5rem"}}>My Assets</button>
              </Link>
              <Link to="/employeeAssets">
              <button style={{margin:"0rem 0.5rem"}}>Employee Assets</button>
              </Link>
              <Link to="/procurement/approve">
              <button style={{margin:"0rem 0.5rem"}}>Procurements</button>
              </Link>
              <Link to="/procurement/request">
              <button style={{margin:"0rem 0.5rem"}}>Request for procurement</button>
              </Link>
              <input type="text" style={{padding:"0", border:"1px solid grey", height:"1.9rem", paddingLeft:"8px"}} placeholder="Search"
              value={search}
              onChange={(e)=>{ setSearch(e.target.value); search === ""?fetchAssetGroup():searchAssetGroup()}}
              />
              <button style={{margin:"0rem 0rem"}} onClick={()=>(search === ""?fetchAssetGroup():searchAssetGroup())}>Search</button>
            </div> :
            <>
            <div style={{display:"flex", justifyContent:"center", marginTop:"1rem", flexWrap:"wrap"}}>
              <Link to="/myAssets">
              <button style={{margin:"0rem 1rem"}}>My Assets</button>
              </Link>
              <Link to="/procurement/request">
              <button style={{margin:"0rem 1rem"}}>Request for procurement</button>
              </Link>
              <input type="text" style={{padding:"0", border:"1px solid grey", height:"1.9rem", paddingLeft:"8px"}} placeholder="Search"
               value={search}
              onChange={(e)=>{ setSearch(e.target.value); search === ""?fetchAssetGroup():searchAssetGroup()}}
              />
              <button style={{margin:"0rem 1rem"}} onClick={()=>(search === ""?fetchAssetGroup():searchAssetGroup())}>Search</button>
            </div>
           </>              
          }
            <div className="card-container" style={{display:'flex', flexWrap:"wrap", justifyContent:"center", alignItems:"center", gap:"0.8rem"}}>
            {loading ? <Loading2 /> :
        <>
                { assetGroup.length === 0 ? <h2 style={{marginTop:"2rem", color:" #00a3cc"}}>No Items</h2>:
                  assetGroup&&assetGroup?.map((assetgroup)=>(
                    <div className="card" style={{height:"13rem",width:"11rem",backgroundColor:"aliceblue", borderRadius:"10px"}} key={assetgroup.asset_group_id}>
                    <Link to={`/assetsList/${assetgroup.asset_group_id}`}>
                    <img src={assetgroup.asset_group_imageUrl} alt="AVINYA ACADEMY" style={{height:"60%",width:"100%", objectFit:"contain", borderRadius:"10px",border:"1px solid gray" }}/>
                    <p style={{textAlign:"center", fontSize:"1.2rem", fontFamily:"monospace"}}>
                      {(assetgroup.asset_group_name).toString().substring(0,13)}
                      </p>
                    </Link> 
                    <div className="textcontainer" style={{display:"flex", alignItems:"center", justifyContent:"space-between", padding:"1px 10px"}}>
                    <p style={{fontWeight:"revert"}}>Available</p>
                    <p style={{fontWeight:"revert"}}>Total</p>
                    </div>
                    <div className="textcontainer" style={{display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0px 0.6rem"}}>
                    <p style={{backgroundColor:"Highlight", borderRadius:"5px", padding:"0.2rem", color:"white",fontWeight:"bold"}}>{assetgroup.available_quantity}</p>
                    <p style={{backgroundColor:"grey", borderRadius:"5px", padding:"0.2rem", color:"white"}}>{assetgroup.quantity}</p>
                    </div>
                    {/* <> {assetgroup.available_quantity>0?<Button>Checkout</Button>:<></>}</> */}
                </div>       
                
                  ))
                }
            </>}                           
            </div>
        </div>
    </div>
    </>
  )
}

export default AssetsGroup

{/* <div className="card" style={{height:"12rem",width:"11rem",backgroundColor:"aliceblue", borderRadius:"10px"}}>
<img src={about1} alt="" style={{height:"8.2rem",width:"11rem", borderRadius:"10px"}}/>
<div className="textcontainer" style={{display:"flex", alignItems:"center", justifyContent:"space-between", padding:"1px 10px"}}>
<p style={{fontWeight:"revert"}}>Total</p>
<p style={{fontWeight:"revert"}}>Available</p>
</div>
<div className="textcontainer" style={{display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0px 0.6rem"}}>
<p style={{backgroundColor:"Highlight", borderRadius:"5px", padding:"0.2rem", color:"white"}}>1000</p>
<p style={{backgroundColor:"Highlight", borderRadius:"5px", padding:"0.2rem", color:"white"}}>6000</p>
</div>
</div>  */}