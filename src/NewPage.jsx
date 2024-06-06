import React, { useEffect, useState } from 'react';
import './NewPage.css';
import photo from './Images/7606000.jpg';
import { APIData, org } from './Authentication/APIData';
import HomePageCard from './HomepageCard';
import axios from 'axios';



const NewPage = () => {
    const [products, setProducts] = useState([])
    
    const getdeprts = () => {
        axios.get(APIData.api + `org-placeholder/details/type?org=${org}&image_type=product_image`, { headers: APIData.headers })
            .then((resp) => {
                console.log(resp.data);
                setProducts(resp.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }
    useEffect(() => {
        getdeprts()
    }, [])

    return (<>
        <div className="new-page">
            <div className="content">
                <h1>Welcome to {APIData.orgName} </h1>
                <p> We have consistently been at the forefront of academic and professional development. </p>
            </div>
            <div className="image-container">
                <img src={photo} alt='landing pic' />
            </div>

        </div> 
            {products && products.length > 0 ? (
                 <div style={{ textAlign: "center", fontSize: '20px', color: '#2217c5' }}>
                 <h2 style={{ fontSize: "2.5rem", marginBottom: 10 }}>Our Products</h2>
                <marquee direction="left" className="scroll">
                    {products.map((item) => (
                        <img src={item.placeholderImage} style={{ height: 100, width: 200, objectFit: "contain" }} alt="Product" key={item.id} />
                    ))}
                </marquee>
                </div>  ) : null}
       

        <HomePageCard />
      
    </>
    );
};

export default NewPage;

