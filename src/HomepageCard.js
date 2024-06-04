import React, { Component } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import ReadMoreReact from 'read-more-react';
import { APIData, org } from "./Authentication/APIData";
import './HomepageCard.css'

class HomePageCard extends Component {
  state = {
    loading: true,
    data: [],
  };

  async componentDidMount() {
    try {
      const url = APIData.api + `org-placeholder/details?org=${org}`;
      console.log("Home url:",url)
      const response = await fetch(url, { headers: APIData.headers });
      const jsonData = await response.json();
      this.setState({ data: jsonData, loading: false });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  render() {
    const { loading, data } = this.state;

    return (
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div className="webpage">
            <ul>
              {data.map((item, index) => (
                <li key={index}>
                  <div>
                    <h3 className="heading01">{item.placeholderTitle}</h3>
                  </div>

                  <Link className="homepage_card" to={{ pathname: `/detail/${index}`, state: { item } }}>
                    <img src={item.placeholderImage} alt="IMAGES" className="homepage_card_image" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default HomePageCard;
