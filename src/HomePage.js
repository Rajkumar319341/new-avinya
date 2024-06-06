import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navigation/Navbar.css';
import { APIData } from './Authentication/APIData'
import axios from 'axios';
import { org } from './Authentication/APIData';
import NewPage from './NewPage';
import photo from "../src/Images/img back.png"





function HomePage() {

  const [click, setClick] = useState(false);
  const [logoUrl, setLogoUrl] = useState(photo);

  const fetchicon = () => {
    axios.get(APIData.api + `org-placeholder/details/type?org=${org}&image_type=logo`, { headers: APIData.headers })
      .then((resp) => {
        if (resp.data.length > 0) {
          const firstItem = resp.data[0];
          const imageUrl = firstItem.placeholderImage;
          console.log(imageUrl);
          if (imageUrl === null || imageUrl === "") {
            setLogoUrl(photo);
          }
          else {
            setLogoUrl(imageUrl)
          }

        } else {
          console.error("No data found.");
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  useEffect(() => {
    fetchicon();
  }, []);


  return (
    <div className="homepage">
      
      <nav className='navbar'>
        <Link to="/">
          <div className="holdnav">
            {<img className="logo" src={logoUrl} alt="logo" border="0" />}
          </div>
        </Link>
        <div className="holdnav" >
          {
            // eslint-disable-next-line 
            <marquee
              direction="left" scrolldelay="3" className="nametag">
              Welcome To {APIData.orgName}
            </marquee>
          }
        </div>
        <div className="holdnav">
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-sign-in-alt'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/signup' className='nav-links' onClick={closeMobileMenu}>
                Sign Up
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/institutionalSignIn' className='nav-links' onClick={closeMobileMenu}>
                Org Sign In
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/user-signin' className='nav-links' onClick={closeMobileMenu}>
                User Sign In
              </Link>

            </li>
            <li className='nav-item'>
              <Link to='/userjob' className='nav-links' onClick={closeMobileMenu}>
                Career
              </Link>

            </li>
          </ul>
        </div>
      </nav>

      <div>
        <main className="wrapper">

          <NewPage />

        </main>
      </div>

    </div>

  )
}
export default HomePage;
