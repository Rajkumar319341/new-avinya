import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { APIData, org } from '../Authentication/APIData';

import axios from 'axios';
import Loading2 from '../Dashboard/Loading2';

const StationeryItems = () => {
  const [stationeryItems, setStationeryItems] = useState([]);
  // const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const roles = ["superadmin", "admin"];
  const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
  const fetchStationeryItems = ()=>{
    const url = APIData.api+`stationary?org=${org}`
    const data = axios.get(url,{headers:APIData.headers}).then((resp)=>{setStationeryItems(resp.data);setLoading(false)}).catch((err)=>{console.log(err)});  
  }
  useEffect(()=>{
    fetchStationeryItems()
  },[])
  return (
    <>
    <div className="cover" style={{display:"flex",justifyContent:"center",alignItems:"center",}}>

        <div className="coantainer"  style={{width:"90%"}}>
            <h2 style={{textAlign:"center", fontFamily:"sans-serif", fontWeight:"bold"}}>{APIData.orgName}- Store</h2>
            {roles.includes(sessiondetails.userType) ?
            <div style={{display:"flex", justifyContent:"center", marginTop:"1rem",flexWrap:"wrap",gap:"1.2rem"}}>
              <Link to="/Addstationary">
              <button style={{margin:"0rem 0.5rem"}}>Add Stationry-Group/Items</button>
              </Link>
              <Link to="/allocateStationay">
              <button style={{margin:"0rem 0.5rem"}}>Verify Allocation Request</button>
              </Link>
              <Link to="/C4eStationary">
              <button style={{margin:"0rem 0.5rem"}}>My Stationary</button>
              </Link>
              <Link to="/EmpStationeryList">
              <button style={{margin:"0rem 0.5rem"}}>Employee Stationary</button>
              </Link>
              {/* <Link to="/procurement/approve">
              <button style={{margin:"0rem 0.5rem"}}>Procurements</button>
              </Link> */}
              <Link to="/procurement/request">
              <button style={{margin:"0rem 0.5rem"}}>Request for procurement</button>
              </Link>
              {/* <input type="text" style={{padding:"0", border:"1px solid grey", height:"1.9rem", paddingLeft:"8px"}} placeholder="Search"
              value={search}
              onChange={(e)=>{ setSearch(e.target.value); search === ""?fetchAssetGroup():searchAssetGroup()}}
              />
              <button style={{margin:"0rem 0rem"}} onClick={()=>(search === ""?fetchAssetGroup():searchAssetGroup())}>Search</button> */}
            </div> :
            <>
            <div style={{display:"flex", justifyContent:"center", marginTop:"1rem", flexWrap:"wrap"}}>
              <Link to="/C4eStationary">
              <button style={{margin:"0rem 1rem"}}>My Stationary</button>
              </Link>
              <Link to="/procurement/request">
              <button style={{margin:"0rem 1rem"}}>Request for procurement</button>
              </Link>
              {/* <input type="text" style={{padding:"0", border:"1px solid grey", height:"1.9rem", paddingLeft:"8px"}} placeholder="Search"
               value={search}
              onChange={(e)=>{ setSearch(e.target.value); search === ""?fetchAssetGroup():searchAssetGroup()}}
              />
              <button style={{margin:"0rem 1rem"}} onClick={()=>(search === ""?fetchAssetGroup():searchAssetGroup())}>Search</button> */}
            </div>
           </>              
          }
    <div className="card-container" style={{display:'flex', flexWrap:"wrap", justifyContent:"center", alignItems:"center", gap:"0.8rem"}}>
            {loading ? <Loading2 /> :
        <>
                { stationeryItems.length === 0 ? <h2 style={{marginTop:"2rem", color:" #00a3cc"}}>No Items</h2>:
                  stationeryItems&&stationeryItems?.map((stationeryItems)=>(
                    <div className="card" style={{height:"13rem",width:"11rem",backgroundColor:"aliceblue", borderRadius:"10px"}} key={stationeryItems.id}>
                   <Link to={`/EmpStationaryAllocation/${stationeryItems.id}/${stationeryItems.name}`} >
                    <img src={stationeryItems.imageUrl} alt="AVINYA ACADEMY" style={{height:"60%",width:"100%", objectFit:"contain", borderRadius:"10px",border:"1px solid gray" }}/>
                    <p style={{textAlign:"center", fontSize:"1.2rem", fontFamily:"monospace"}}>
                      {(stationeryItems.name).toString().substring(0,13)}
                      </p>
                      </Link>
                    <div className="textcontainer"  style={{display:"flex", alignItems:"center", justifyContent:"center",textAlign:"center", padding:"1px 10px"}}>
                    <p style={{fontWeight:"revert",textAlign:"center"}}>Available</p>
                    {/* <p style={{fontWeight:"revert"}}>Total</p> */}
                    </div>
                    <div className="textcontainer" style={{display:"flex", alignItems:"center", justifyContent:"center",textAlign:"center", padding:"0px 0.6rem"}}>
                    <p style={{backgroundColor:"Highlight", borderRadius:"5px",textAlign:"center",  padding:"0.2rem", color:"white",fontWeight:"bold"}}>{stationeryItems.count}</p>
                    {/* <p style={{backgroundColor:"grey", borderRadius:"5px", padding:"0.2rem", color:"white"}}>{stationeryItems.count}</p> */}
                    </div>
                    {/* <> {stationeryItems.available_quantity>0?<Button>Checkout</Button>:<></>}</> */}
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

export default StationeryItems

