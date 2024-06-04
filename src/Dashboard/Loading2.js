import React, { Component } from 'react';
import logo from '../Images/logo_loading.gif';

class Loading2 extends Component {
    state = {}
    render() {
        return (
            <div className="loading">
                <div className="bringitcenter">
                    <img style={{ height: 100, width: 150, objectFit: "contain", mixBlendMode: 'color-burn', }} src={logo} alt="loading..." />
                    <div className="bringitcenter"> <div style={{ fontSize: 15 }}><marquee>Please wait</marquee></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Loading2;
