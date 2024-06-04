import React, { Component } from 'react';
import { CSVLink } from 'react-csv';
import * as FaIcons from 'react-icons/fa';
import { APIData, org } from '../Authentication/APIData';
import Loading from '../Loading';
import HolidayData from '../SQLTables/HolidayData';

class SuperAdminHolidayAPI extends Component {
  state = {
    loading: true,
    holidays: null,
  };

  async componentDidMount() {
    const url = APIData.api + `holidays/?org=${org}`;
    // console.log(url);
    const response = await fetch(url, { headers: APIData.headers });
    const holidays = await response.json();
    this.setState({ holidays, loading: false });
  }

  render() {
    return (
      <div className="superAdminHolidayAPI">
        {this.state.loading || !this.state.holidays ? (
          <Loading />
        ) : (
          <div>
            <div className="carrybox">
              <HolidayData data={this.state.holidays} />
            </div>
            <CSVLink data={this.state.holidays} filename={'Holidays'}>
              <button className="Downloadbutton">
                <FaIcons.FaDownload /> Download Holidays
              </button>
            </CSVLink>
          </div>
        )}
      </div>
    );
  }
}

export default SuperAdminHolidayAPI;

