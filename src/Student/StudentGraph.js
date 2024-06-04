import React, { Component } from "react";
import Chart from "react-apexcharts";
import { Link } from 'react-router-dom';
import * as AiIcons from "react-icons/ai";
import Loading from "../Loading";
import {APIData} from '../Authentication/APIData';
class StudentGraph extends Component {
  async componentDidMount(){
    const url = APIData.api+"marks/student/"+APIData.sessiondetails.user;
    const response = await fetch(url,{headers:APIData.headers});
    const daata = await response.json();
    this.setState({graph: daata, loading: false});
} 
  constructor(props) {
    super(props);

    this.state = {
      graph: null, loading: true,
      options: {

        chart: {
          id: "basic-bar",
          dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
          },
          colors:'#ff831d'
        },
        colors: ['rgb(255, 136, 25)', '#545454'],
        dataLabels: {
          enabled: true,
        },
        
        title: {
          text: 'Performance Graph',
          align: 'center'
        },
        stroke: {
          curve: 'smooth',
        },
        markers: {
          size: 5,
      },
        xaxis: {
          categories: []
        }
      },
      series: [
        {
          name: "Total",
          data: []
        }
      ]
    };
  }

  Refresh = () => {
    window.location.reload("");
  };
   changedata = function(){
    var totalMarks=[]
    var testDate=[]
    for(let item of this.state.graph){
       totalMarks.push(item.percentage)
       testDate.push(item.test_date)
    }
    for(let i = 0; i<testDate.length-1; i++)   
{  
for (let j = i+1; j<testDate.length; j++)   
{  
//compares each elements of the array to all the remaining elements  
if((testDate[i]>testDate[j]))   
{  
let temptestDate = testDate[i];  
testDate[i] = testDate[j];  
testDate[j] = temptestDate;
let temptotalMarks = totalMarks[i];  
totalMarks[i] = totalMarks[j];  
totalMarks[j] = temptotalMarks;
}  
}  
}  

    this.state.series[0].data = totalMarks;
    this.state.options.xaxis.categories = testDate;
    }
 
  render() {
    return (
        <div className="studentGraph">
      <div >
        <div>
          <div className="mixed-chart">
          {this.state.loading || !this.state.graph ? <Loading /> : 
              <p className="graphs">
    <div className="carrybox">
        
    <Link to="students">
                  <AiIcons.AiFillCloseCircle />
                  </Link>
      
     {this.changedata()} 
    <Chart 
              options={this.state.options}
              series={this.state.series}
              type="line"
              width="80%"
            />  
    <button className="Upload" onClick={this.Refresh}>Refresh</button>
    </div>
              </p>}
            
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default StudentGraph;