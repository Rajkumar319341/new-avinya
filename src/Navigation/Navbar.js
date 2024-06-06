import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons";
import { APIData,org } from "../Authentication/APIData";
import axios from "axios";
import { useEffect } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
} from "react-pro-sidebar";
import "./Navbar.scss";
import { CgProfile } from "react-icons/cg";
import photo from "../Images/img back.png"


const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
// console.log(sessiondetails)
function Navbar() {
  function signout() {
    sessionStorage.removeItem(sessiondetails.user);
    localStorage.clear();
    //to be changed to smarterlearning.in
    const url = new URL(APIData.website);
    window.location.href = url;
  }
  function returnSidebar(item, index) {

    if (!item.child) {
      return (
        <MenuItem
          key={index}
          onClick={showSidebar}
          value={item}
          icon={item.icon}
        >
          <Link to={item.path}>{item.title}</Link>
        </MenuItem>
      );
    } else {
      return (
        <SubMenu key={index} title={item.title} value={item} icon={item.icon}>
          {item.child.map((subMenuitem, SubMenuindex) => {
            return (
              <MenuItem
                key={SubMenuindex}
                icon={subMenuitem.item}
                onClick={showSidebar}
              >
                <Link to={subMenuitem.path}>{subMenuitem.title}</Link>
              </MenuItem>
            );
          })}
        </SubMenu>
      );
    }
  }

  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  let [subsidebar, showsubsidebar] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [logoUrl, setLogoUrl] = useState(photo);

  function showSubsidebar(e) {
    e.preventDefault();
    console.log(subsidebar);
    showsubsidebar(!subsidebar);
  }

  const fetchicon = () => {
    axios.get(APIData.api + `org-placeholder/details/type?org=${org}&image_type=logo`, { headers: APIData.headers })
      .then((resp) => {
        if (resp.data.length > 0) {
          const firstItem = resp.data[0];
          const imageUrl = firstItem.placeholderImage;
          console.log(imageUrl);
          if(imageUrl===null||imageUrl==="" ){
            setLogoUrl(photo);
          }
          else{
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



  useEffect(() => {
    fetchicon();
  }, []);

  const handleClick = () => setClick(!click);

  return (
    <>
      <nav className="navbar">
        <Link to="/teaching-training" className="menu-bars01">
          <div className="holdnav">
            <FaIcons.FaBars onClick={showSidebar} />
          </div>
        </Link>
        <Link to='/teaching-training'>
          <div>
            <AiIcons.AiFillHome size={"25px"} />
          </div>
        </Link>
        <Link to='/'>
          <div className="holdnav">
            <img className="logo" src={logoUrl} alt="logo" border="0" />
          </div>
        </Link>
        <div className="holdnav">
          <marquee direction="left" scrolldelay="3" className="nametag">
            Welcome {sessiondetails.user}
          </marquee>
        </div>

        <div className="holdnav">
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-sign-in-alt"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <button className="nav-links" onClick={signout}>
                Sign Out
              </button>

            </li>
            {/* <li className="nav-item">
            <Link to="/facultyProfile">
                <CgProfile size={"30px"} color="blue" />
              </Link>
              </li> */}
            <li className="nav-item" style={{ position: 'relative' }}>
              <Link to="/facultyProfile"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>
                <CgProfile size={"30px"} color="blue" />
              </Link>
              {isHovered && (
                <span style={{ position: 'absolute', top: '70%', left: 0,  }}>
                  Profile
                </span>
              )}
            </li>
          </ul>
        </div>

        {/* <li className="nav-item">
              <Link to="/facultyProfile">
                <CgProfile size={"30px"} />
              </Link>
            </li> */}

      </nav>

      <IconContext.Provider value={{ color: "#fff" }}>
        <h5 className="HomeUser">
          <nav className={sidebar ? "nav-menu01 active" : "nav-menu01"}>
            <ProSidebar>
              <Menu iconShape="square">
                {SidebarData.map((item, index) => {
                  return <div>{returnSidebar(item, index)}</div>;
                })}
                <MenuItem></MenuItem>
                <MenuItem></MenuItem>
              </Menu>
            </ProSidebar>
          </nav>
        </h5>
      </IconContext.Provider>
    </>
  );
}
export default Navbar;
