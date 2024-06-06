import React, { useState, useEffect } from "react";
import { Grid, Typography } from '@material-ui/core';
import { APIData, org } from "./Authentication/APIData";
import Loading from "./Loading";
import './HomepageCard.css';
import { Paper } from "@mui/material";
import ReadMoreReact from 'read-more-react';


const HomePageCard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${APIData.api}org-placeholder/details/type?org=${org}&image_type=homepage_course`;
        console.log("Home url:", url);
        const response = await fetch(url, { headers: APIData.headers });
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);



  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div style={{ marginTop: 70 }}>
          <ul>
          <h2 style={{ fontSize: "2rem", marginBottom: 5, textAlign: "center", color: "#2217c5" }}>What we Provide</h2>
            {data.map((item, index) => (
              
              <Paper elevation={24} style={{ marginLeft: 10, marginRight: 10, color: " rgb(233, 228, 228)", }}>
                <Grid
                  container
                  alignItems="center"
                  key={index}
                  className="homepage_card"
                  style={{
                    flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
                    marginBottom: 29,
                    padding: 20,
                  }}
                >
                  <Grid item xs={12} sm={6} style={{ padding: '20px' }}>
                    <Typography variant="h4" gutterBottom style={{ fontFamily: 'Roboto Slab', color: "#2217c5", }}>
                      { } {item.placeholderTitle}
                    </Typography>
                    <Typography variant="h6" style={{ fontFamily: 'Roboto Slab', color: "black" , fontWeight:"normal",cursor:'pointer'}}>
                      {/* {item.placeholderDesc} */}{item.placeholderDesc.split(' ').length < 7 ? <p>Lorem ipsum</p> :  <ReadMoreReact text={item.placeholderDesc}
                        min={0}
                        ideal={100}
                        max={150}
                        readMoreText="...read more" /> } 
                    
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}  style={{ padding: '20px', display: 'flex', justifyContent: 'center', mixBlendMode: "darken", }}>
                    <img
                      src={item.placeholderImage}
                      alt="SolidCAM"
                      style={{ width:'100%', height:'auto', Width:250, height:250, objectFit:'contain',}}
                    />
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HomePageCard;
