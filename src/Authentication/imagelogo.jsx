import axios from 'axios';
import React, { useEffect, useState } from 'react'; 
import { APIData, org } from './APIData';
import LazyLoad from 'react-lazyload';
import photo from "../Images/img back.png"

const ImageLogo = () => { 
    const [logoUrl, setLogoUrl] = useState(photo);
    const[titelname, setTitelname]=useState('')
    const fetchLogo = () => { 
        axios.get(APIData.api + `org-placeholder/details/type?org=${org}&image_type=logo`, { headers: APIData.headers })
            .then((resp) => {
                if (resp.data.length > 0) {
                    const firstItem = resp.data[0]; 
                    const imageUrl = firstItem.placeholderImage; 
                    const titel = firstItem.placeholderName; 
                    // console.log(resp.data);
                    // console.log(imageUrl);
                    setTitelname(titel);
                    if(imageUrl===null||imageUrl===" "){
                        setLogoUrl(photo);
                    }
                    else{
                        setLogoUrl(imageUrl); 
                    }
                    
                } else {
                    console.error("No data found.");
                    setLogoUrl(photo);
                }
            })
            .catch(error => {
                console.error(error); 
            });
    };
    

    useEffect(() => {
        fetchLogo();
    }, []); 

    return (
        <LazyLoad>
            <img  className="profile_img" style={{height:100, width:100, objectFit:"contain"}} src={logoUrl} loading='lazy' alt="Logo" />
        </LazyLoad>
    );
};

export default ImageLogo; 
