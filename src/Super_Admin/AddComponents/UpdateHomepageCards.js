
import React from 'react';
import UpdateDashboardImg from "../../Dashboard/UpdateDashboardImg";

const UpdateHomepageCards = ({ data }) => {
  console.log("Data in homepagecards:",data)

  return (
    <div>
      <UpdateDashboardImg data={data} />

    </div>
  );

};

export default UpdateHomepageCards;
