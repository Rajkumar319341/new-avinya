import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { APIData,org } from '../Authentication/APIData';

var sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));



export const DashboardDetails = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = `${APIData.api}org-placeholder/details/type?org=${org}&image_type=dashboard`;

    axios.get(url,{ headers: APIData.headers })
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>
          <h3>{item.placeholderTitle}</h3>
          <p>{item.placeholderDesc}</p>
          <img src={item.placeholderImage} alt={item.placeholderTitle} />
        </div>
      ))}
    </div>
  );
}