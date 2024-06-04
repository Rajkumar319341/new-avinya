import React from "react";
import { useLocation } from "react-router-dom";
import './DetailPage.css'
import { Typography } from "@mui/material";
const DetailPage = () => {
  const location = useLocation();
  const selectedItem = location.state.item;

  return (
    <div className="detail-view">
      {selectedItem ? (
        <div className="detail-content">
     <h3 className="heading01">{selectedItem.placeholderTitle}</h3>

          <div className="image-container">
            <img className="img-details-homepagecard" src={selectedItem.placeholderImage} alt="IMAGES" />
          </div>
          <div className="description-container">
            <Typography>{selectedItem.placeholderDesc}</Typography>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DetailPage;


