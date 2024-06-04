import React from "react";
import "../CRUDTable.css";
import {APIData, org} from '../Authentication/APIData';
import { Component } from "react";
import Loading2 from "./Loading2"



let tasks = null;
class CoursesCount extends Component {
   state={
    loading: true,
    length:null
};
async componentDidMount(){
  try{
    const url = APIData.api+`courses/course?org=${org}`;
    const response = await fetch(url,{headers:APIData.headers});
    const daata = await response.json();
    this.setState({length: daata.length , loading:false});
  }
  catch(err){
    console.log(err)
}
}


  render() { 

    return ( 
      <div>
      {this.state.loading ? <Loading2 />: <p>

  {this.state.length+1-1}
  </p>
  }

</div>
    );
    }
   }
export default CoursesCount;