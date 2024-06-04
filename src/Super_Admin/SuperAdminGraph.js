import React, { Component } from "react";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import Loading from "../Loading";
import { APIData } from "../Authentication/APIData";
class SuperAdminGraph extends Component {
  async componentDidMount() {
    const url = APIData.api + "perf/metrics";
    const response = await fetch(url, { headers: APIData.headers });
    const daata = await response.json();
    this.setState({ graph: daata, loading: false });
  }
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      graph: null,
      options: {
        colors: ["rgb(255, 136, 25)", "#545454"],
        stroke: {
          curve: "smooth",
        },
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: [],
        },
      },
      series: [
        {
          name: "series-1",
          data: [],
        },
      ],
    };
  }

  Refresh = () => {
    window.location.reload("");
  };
  changedata = () => {
    for (var inst in this.state.graph){
       
    }
    this.state.series[0].data = [
      this.state.graph.ProcessCpuTime.toFixed(2),
      this.state.graph.LoadAverage.toFixed(2),
      this.state.graph.AvailableProcessors.toFixed(2),
      this.state.graph.FreePhysicalMemorySize.toFixed(2) / 1024,
      this.state.graph.CPULoad.toFixed(2) * 100,
      this.state.graph.VirtulMemory.toFixed(2) / 1024,
    ];
    this.state.options.xaxis.categories = [
      "ProcessCpuTime",
      "LoadAverage",
      "AvailableProcessors",
      "FreePhysicalMemory(GB)",
      "CPULoad*100",
      "VirtulMemory(GB)",
    ];
  };

  render() {
    return (
      <div className="graph">
        <div>
          <div>
            <div className="mixed-chart">
              {this.state.loading || !this.state.graph ? (
                <Loading />
              ) : (
                <p className="graphs">
                  <div className="carrybox">
                    <Link to="/">
                      <AiIcons.AiFillCloseCircle />
                    </Link>
                    {this.changedata()}

                    <Chart
                      options={this.state.options}
                      series={this.state.series}
                      type="bar"
                      width="80%"
                    />
                    <button className="Upload" onClick={this.Refresh}>
                      Refresh
                    </button>
                  </div>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SuperAdminGraph;
