import React, { Component,useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { APIData,org} from ".././Authentication/APIData";
import { Link } from "react-router-dom";
import "../Navigation/Navbar.css";
import "../App.css";
import ReadMoreReact from 'read-more-react';
import UpdateHomepageCards from './AddComponents/UpdateHomepageCards';
import * as AiIcons from "react-icons/ai";

const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
class SuperAdminHomePageCard extends Component {
  constructor(props){
    super(props)
}
  state = {
    data: [],
    name: [],
    condition: true,
  };
  async componentDidMount() {
    const url = APIData.api +`org-placeholder/details?org=${org}`;
    const response = await fetch(url, { headers: APIData.headers });
    const jsonResponse = await response.json();
    this.setState({ data: jsonResponse }); 
  }
 

  handleInput(val) {
    console.log(val)
    this.setState({name: val})
    this.setState({condition: (!this.state.condition)})
    console.log(this.state.condition)
    
}

closeForm = () =>{
    this.setState({condition: (!this.state.condition)})
}
deleteCard(val) {
  const url = APIData.api+'org-placeholder/details/image?imageName='+val;
  axios
  .delete(url,{headers:APIData.headers})
  .then(response => {
    if(response.data.status.toString().toLowerCase() =="success"){
      toast(response.data.description)
      window.location.reload();
    }
    else{        
      toast(response.data.errorDesc)
      window.location.reload();
    }
  })
}
  render() {
    return (
    <div>
    {this.state.condition?
    <div>
            <Link to="/upload-image">
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
              <button className='CardButtonDelete' value={item.placeholderName} onClick={() => this.deleteCard(item.placeholderName)}><AiIcons.AiFillDelete /></button>
              </div>
              <hr></hr>
              <div>
                <h3 className="heading01"> {item.placeholderTitle}</h3>
              </div>
              <figure>
                <img src={item.placeholderImage} alt="IMAGES" />
              </figure>

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
    </div>}
    </div>   
    );
  }
}

export default SuperAdminHomePageCard;

