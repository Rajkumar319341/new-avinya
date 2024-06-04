import React from 'react'
import * as HiIcons from "react-icons/hi";
import { Link } from 'react-router-dom';

function QueriesUser() {
    return (
        
        <div className="queries">
              <div className="carrybox">
             <div >
      <h2 className="mainheading01">Queries</h2>
    </div>
        
           <div className="carrybox">
            <label className="heading02" htmlFor="name"><HiIcons.HiUserCircle/> Name:</label><br/>
            <input placeholder="Name" className="inputfield" type="text" />
           </div>
           <div className="carrybox">
            <label className="heading02" htmlFor="email"><HiIcons.HiOutlineMail/> Email:</label><br/>
            <input placeholder="Email" className="inputfield" type="email"  />
            </div>
            <div className="carrybox">
            <label className="heading02" htmlFor="Queries"><HiIcons.HiOutlineQuestionMarkCircle/>Queries:</label><br/>
            <textarea placeholder="Your Queries" className="inputfield" />
            </div>
         <div className="submitcarry">
             <Link to="/"><button className="Submit" type="submit" >Submit</button>
</Link>
         </div>
        </div>
        </div>
    )
}

export default QueriesUser;
