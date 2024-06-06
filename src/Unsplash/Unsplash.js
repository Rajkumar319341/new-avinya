import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { APIData, org } from '../Authentication/APIData';

const Unsplash = ({ onSelectImage }) => {
    const [data, setData] = useState([]);

    const searchImages = async () => {
        try {
            const response = await axios.get(APIData.api + `product-catalogue/?org=${org}`, { headers: APIData.headers });
            setData(response.data);
        } catch (error) {
            console.error('Error fetching images from API', error);
        }
    };

    useEffect(() => {
        searchImages();
    }, []);

    return (
        <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '10px', padding: '10px', width: "90%", height: "30%" }}>
                {data.map((item) => (
                    <div key={item.pid} onClick={() => onSelectImage(item.image)}>
                        <img src={item.image} alt={item.name || 'Image'} style={{ width: '200px', height: '150px', cursor: 'pointer', objectFit: "contain" }} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Unsplash;
