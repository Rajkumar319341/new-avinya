import React,{Component} from 'react';
import logo from './Images/logo_loading.gif';

class Loading  extends Component {
    state = {  }
    render() { 
        return ( 
                <div className="loading">
                <div className="bringitcenter">
                <img className="Loading_Img" src={logo} alt="loading..." />
                <div className="bringitcenter"><marquee 	
            direction="left" scrolldelay="2" className="ptag">Please Wait
            </marquee>
            </div>
                </div>
            </div>
         );
    }
}
 
export default Loading ;