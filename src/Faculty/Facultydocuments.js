import React, { Component } from 'react';
import Loading from '../Loading';
import { APIData, org } from "../Authentication/APIData";
import DocumentsData from '../SQLTables/DocumentsData';
class Facultydocuments extends Component {
  state={
      loading: true,
      Files: null
  };
 async componentDidMount(){
  const url = APIData.api+`file/no-doc?org=${org}`;
  const response = await fetch(url,{headers:APIData.headers});
      const daata = await response.json();
      this.setState({Files: daata, loading: false});
  }       
  render() {
  return (
    <div className="facultydocuments">
   
              {this.state.loading || !this.state.Files ? <Loading />: 
              <p>
    <div className="carrybox">
    <DocumentsData data={this.state.Files}/>
    </div>
              </p>}
           
  </div>
  );
  }
 }
export default Facultydocuments;