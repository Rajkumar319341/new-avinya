import React from "react";
import "../CRUDTable.css";
import { Component } from "react";
import Loading from "../Loading";
import { APIData } from '../Authentication/APIData';
import MarksData from "../SQLTables/MarksData";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as AiIcons from "react-icons/ai";
import Policy from '../Policy'
import PolicyData from "../SQLTables/PolicyData";

const sessiondetails=JSON.parse(localStorage.getItem("sessiondetails"));

var a =[]
class AdminPolicy extends Component {
    state={
        loading: true,
        user:null,
        policy:null,
        displayPolicy: false,
        filterValue:"Filter Policies"
    };
    async componentDidMount(){
    try{
        const url = APIData.api+"policies/fetch/Admin-policy?orgType=Organization-policy";
        const response = await fetch(url,{headers:APIData.headers});
          const daata = await response.json();
          this.setState({user: daata,loading:false});
    }
    catch(err){
        console.log(err)
    }
    }
    filterPolicy = (e) => {
      if(e.target.value === "My"){
        console.log(e.target.value)
        this.setState({ loading: true })
        const url = APIData.api+"policies/fetch/Admin-policy?orgType=Organization-policy";
        axios.get(url, { headers: APIData.headers })
          .then((response) => {
            this.setState({ user: response.data, loading: false, displayData: false });
            this.setState({ displayPolicy: false,filterValue:"My Policies" });
            console.log(this.state.displayPolicy)
          })
      }
        else if (e.target.value !== "all") {
          this.setState({ loading: true })
          const url = APIData.api + "policies/"+e.target.value;
          axios.get(url, { headers: APIData.headers })
            .then((response) => {
              this.setState({ policy: response.data, loading: false,displayPolicy: !this.state.displayPolicy,filterValue:"My Policies"});
            })
        }
        else {
          this.setState({ loading: true })
          const url = APIData.api + "policies";
          axios.get(url, { headers: APIData.headers })
            .then((response) => {
              this.setState({ user: response.data, loading: false, displayData: false,filterValue:"All Policies" });
              this.setState({ displayPolicy: false });
              console.log(this.state.displayPolicy)
            })
        }
      }
      displayClose = (e) => {

        console.log(this.state.displayPolicy);
        this.setState({ displayPolicy: !this.state.displayPolicy})
      }
  render() {
    return (
        <div className="marks">
        {this.state.loading || !this.state.user ? <Loading /> :
          <p>
            <div className="carrybox">
              {/* Selecting each policy */}

              {this.state.displayPolicy ? null :<div >
                <div className="Filter">
                <p style={{color:'rgb(255, 136, 25'}}>To View or Download each policy individually, please select from the dropdown given below:</p>
                </div>
                <br></br>
                <div className="Filter">

                  <select name="selectList" id="selectList" onChange={this.filterPolicy} >
                    <option value="" selected>Select the Policy to view individually</option>
                    {/* <option value="all" >All</option> */}
                    {/* <option value="My" >My Policies</option> */}
                    {a = [...new Set(this.state.user.map(item => item.policy_name))]}
                    {a.map((item, index) => {
                      return (
                        <option value={item}>{item}</option>
                      );
                    })}
                  </select>
                  
                </div></div>}

                {this.state.displayPolicy ? null :<div >
                {/* <div className="Filter">
                <p style={{color:'rgb(255, 136, 25'}}>Filter Policies</p>
                </div> */}
                <br></br>
                <div className="Filter">

                <select name="selectList" id="selectList" onChange={this.filterPolicy} >
                    <option value="" selected>{this.state.filterValue}</option>
                    <option value="all" >All Policies</option>
                    <option value="My" >My Policies</option>
                    
                  </select>
                  
                </div></div>}




                {this.state.displayPolicy?
                <Link><AiIcons.AiFillCloseCircle onClick={this.displayClose} /></Link>
                  :null}

              <div>
                {this.state.displayPolicy ? 
                <Policy d={this.state.policy}/> 
                : <div><br/><br/><PolicyData data={this.state.user} /></div>}
              </div>
            </div>
          </p>}
      </div>
    )
  }
}

export default AdminPolicy