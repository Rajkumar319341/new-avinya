import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navigation/Navbar.css';
import logo from "./Images/Image.png"
import { APIData } from './Authentication/APIData'
import HomePageCard from './HomepageCard';
import axios from 'axios';
import { org } from './Authentication/APIData';
import ImageLogo from './Authentication/imagelogo';


function HomePage() {
  const [click, setClick] = useState(false);
  const [logoUrl, setLogoUrl] = useState('');

  const fetchicon = () => {
    axios.get(APIData.api + `org-placeholder/details/type?org=${org}&image_type=logo`, { headers: APIData.headers })
      .then((resp) => {
        if (resp.data.length > 0) {
          const firstItem = resp.data[0];
          const imageUrl = firstItem.placeholderImage;
          console.log(imageUrl);
          setLogoUrl(imageUrl);
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
            <img className="logo" src={logoUrl} alt="logo" border="0" />
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

            {/* <li className='nav-item'>
            <Link  className='nav-links' onClick={closeMobileMenu}>
              <div style={BUTTON_WRAPPER_STYLES} onClick={() => console.log('clicked')}>
                <Link onClick={() => setIsOpen(true)}>User Sign In</Link>
                  <SignInModal open={isOpen} onClose={() => setIsOpen(false)}>
                   <Signin />
                  </SignInModal>
                </div>    
            </Link>
          </li> */}
            {/* <li
            className='nav-item'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
          <Link
         
            className='nav-links'
            onClick={closeMobileMenu}
          >
            Sign In <i className='fas fa-caret-down' />
          </Link>
          {dropdown && <Dropdown />}
          </li> */}
            {/*
          <li className='nav-item'>
            <Link
              to='/products'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Products
            </Link>
          </li>
            <div>
        <img className="logo01" src="https://i.ibb.co/tPBqzm4/loogo.png" />
        </div>*/}
          </ul>
        </div>
      </nav>
      {/* {console.log(dropdown)} */}


      <div>
        <main className="wrapper">
          <section className="hero">
            <h1>{APIData.orgName}<div className='subtitle-hero'></div></h1>
            {/* <div>
                Solutions Private Limited
              </div> */}
            <article>
              <p>Welcome</p>
              <Link to="contact"><a href="#webpage" >Contact Us</a></Link>
              {/* <Link to="contact"><a href="#webpage" >Apply For Job</a></Link>  */}
            </article>
          </section>
          {/* <ImageLogo/> */}
          <HomePageCard />
        </main>
      </div>

    </div>

  )
}
export default HomePage;
