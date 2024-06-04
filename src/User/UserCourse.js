import React from "react";
import "../CRUDTable.css";
import { Component } from "react";
import Loading from "../Loading";
import {APIData} from '../Authentication/APIData';
import ApplyCourseData from "../SQLTables/ApplyCourseData";
class UserCourse extends Component {
   state={
    loading: true,
    user:null
};
async componentDidMount(){
  const url = APIData.api+"courses/course/";
  const response = await fetch(url,{headers:APIData.headers});
    const daata = await response.json();
    this.setState({user: daata,loading:false});
} 


  render() { 
    return ( 
      <div className="usercourses">
      <div>
      {this.state.loading || !this.state.user? <Loading /> : 
        <p>
<div className="carrybox">
<ApplyCourseData data={this.state.user}/>
</div>
        </p>}
        </div>
        </div>
    );
  }
}
 
export default UserCourse;