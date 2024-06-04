import React, { Component,useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { APIData, org } from "../Authentication/APIData";
import { Link } from "react-router-dom";
import "../Navigation/Navbar.css";
import "../App.css";
import ReadMoreReact from 'read-more-react';
import UpdateHomepageCards from '../Super_Admin/AddComponents/UpdateHomepageCards';
import * as AiIcons from "react-icons/ai";


const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));

class HomepageCardAdmin extends Component {
  constructor(props){
    super(props)
}
  state = {
    data: [],
    name: [],
    condition: true,
  };
  async componentDidMount() {
    const url = APIData.api + `org-placeholder/details?org=${org}`;
    const response = await fetch(url, { headers: APIData.headers });
    const jsonResponse = await response.json();
    this.setState({ data: jsonResponse });

   

  }
 


// handleInput(e) {
//     // this.state.name=(e.target.value);
//     this.setState({name: (e.target.value)})
//     console.log(this.state.name);
//     // this.state.condition =!this.state.condition;
//     this.setState({condition: (!this.state.condition)})
//     console.log(this.state.condition)
//     e.preventDefault()

// }

handleInput(val) {
  console.log(val)
  this.setState({name: val})
  // console.log(this.state.name);
  // this.state.condition =!this.state.condition;
  this.setState({condition: (!this.state.condition)})
  console.log(this.state.condition)
 
}
closeForm = () =>{
    this.setState({condition: (!this.state.condition)})
}
// deleteCard = (e) =>{
//   const url = APIData.api+'org-placeholder/details/image?imageName=' + e.target.value;
//   axios
//   .delete(url,{headers:APIData.headers})
//   .then(response => {
//     if(response.data.status.toString().toLowerCase() =="success"){
//       toast(response.data.description)
//       window.location.reload();
//     }
//     else{        
//       toast(response.data.errorDesc)
//       window.location.reload();
//     }
//   })
// }

  render() {
    return (
    <div>

    {this.state.condition?<div>
      <Link to="createHomepageCards">
            <div className="Upload01">
              Create Card
              <AiIcons.AiOutlinePlusCircle />
            </div>
          </Link>
    <div className="webpage">
        <ul>
         {
          this.state.data.map((item,index) => {
            return(  
              <li>
                <div className="cardDivButton">
                <button className='CardButtonEdit' value={item.placeholderName} onClick={() => this.handleInput(item.placeholderName)}><AiIcons.AiFillEdit/></button>

              {/* <button className='CardButtonEdit' value={item.placeholderName} onClick={e => this.handleInput(e, "value")}><AiIcons.AiFillEdit/></button> */}
              </div>
              <hr></hr>
              <div>
                <h3 className="heading01"> {item.placeholderTitle}</h3>
              </div>
              <figure>
                <img src={item.placeholderImage} alt="IMAGES" />
              </figure>
              {/* <ReadMore> */}
                {/* {item.placeholderDesc} */}
              {/* </ReadMore> */}
              <ReadMoreReact text={item.placeholderDesc}
                min={0}
                ideal={100}
                max={150}
                readMoreText="...read more"/>

               
 
            </li>
            );
          })
        }
        </ul>     
    </div></div>
    :<div>
    <AiIcons.AiFillCloseCircle onClick={this.closeForm}/>
        <UpdateHomepageCards data={this.state.name}/>
         {/* <button className='btn' value="item.placeholderName" onClick={e => this.handleInput(e, "value")}>Edit</button>  */}
    </div>}

    </div> 
    //  
    //     {this.state.condition ? <updateHomepageCards /> :
    //     <div>
    //     
    //     </div>}
    //   </div>
     
    );
  }
}

export default HomepageCardAdmin;

