import React, { Component } from 'react';
// import skateboardImg from './Images/smart.png';
import c4eLogo from './Images/smart.png';
import shikshakProLogo from './Images/portalLogo_picture@2x.png';
import { Link } from "react-router-dom";
import {APIData} from './Authentication/APIData'

class Landing extends Component {
    render() {
        return (
            <div>
                <nav className="navbar-main">
                    <div className="logo">
                        <img className="software-logo" src={c4eLogo} alt='C4E Logo' />
                        <span className="logo-text">{APIData.orgName}<div className='landing-subtitle'>Solutions Private Limited</div></span>
                    </div>
                </nav>
                <div className="main software-wrapper">
                    <div className="split left">
                        {/* <i className="fas fa-chevron-left"></i> */}
                        {/* <img src={skateboardImg} className="skateboard" alt="Care4Edu Logo" /> */}
                        <div className="text">
                            {/* <h1 className="title">Software Solutions</h1> */}
                            <p className="subtitle">Software <br />Solutions</p>
                            <p className="desc">
                                Navigate to the Software Solutions webpage
                            </p>
                            <Link to="/software-solutions">
                                <div className='landing-button'>
                                    <button className="button">
                                        Discover More
                                        <i className="fas fa-long-arrow-alt-right"></i>
                                    </button>
                                </div>
                            </Link>
                            <div className="promotion">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <img src={shikshakProLogo} height={'70px'} />
                                    <Link to="/shikshakpro">
                                        <div className='landing-button'>
                                            <button className="button">
                                                Open
                                                <i className="fas fa-long-arrow-alt-right"></i>
                                            </button>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="split right">
                        {/* <i className="fas fa-chevron-right"></i> */}
                        {/* <img src={shoesImg} className="shoes" alt="Care4Edu Logo" /> */}
                        <div className="text">
                            {/* <h1 className="title">Teaching and Training</h1> */}
                            <p className="subtitle">Teaching <br /> and <br />Training</p>
                            <p className="desc">
                                Navigate to the Teaching and Training webpage
                            </p>
                            <Link to="/teaching-training">
                                <div className='landing-button'>
                                    <button className="button">
                                        Discover More
                                        <i className="fas fa-long-arrow-alt-right"></i>
                                    </button>
                                </div>
                            </Link>
                            <div className="promotion">
                                <p className="promotion-text">Quizathon Results are Here!!!</p>
                                <Link to="/quizathon">
                                    <div className='landing-button'>
                                        <button className="button">
                                            View
                                            <i className="fas fa-long-arrow-alt-right"></i>
                                        </button>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        const content = document.querySelector(".main");
        const left = document.querySelector(".left");
        const right = document.querySelector(".right");

        left.addEventListener('mouseenter', () => {
            content.classList.add('hoverLeft');
        })

        left.addEventListener('mouseleave', () => {
            content.classList.remove('hoverLeft');
        })

        right.addEventListener('mouseenter', () => {
            content.classList.add('hoverRight');
        })

        right.addEventListener('mouseleave', () => {
            content.classList.remove('hoverRight');
        })
    }
}

export default Landing;
