import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { APIData, org } from '../Authentication/APIData';

var sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));

const placeholderNames = [
  "Admin Jobs",
  "Faculty Jobs",
  "Profile",
  "Courses",
  "Policy",
  "Marks",
  "Timetables"
];


export const DashboardDetails = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const promises = placeholderNames.map((placeholderName) => {
      const url = `${APIData.api}org-placeholder/details/image?placeHolderName=${placeholderName}&org=${org}`;
      return axios.get(url, { headers: APIData.headers });
    });

    Promise.all(promises)
     .then((responses) => {
        const dataArray = responses.map((response) => response.data);
        setData(dataArray);
        const placeholderData = dataArray.map((item) => ({ placeholderName: item.placeholderName, placeholderImage: item.placeholderImage }));
        console.log("Placeholder Data:", placeholderData);

      })
     .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  return (
    <div>
    </div>
  );
}