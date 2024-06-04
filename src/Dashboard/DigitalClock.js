import React from "react";
import './DigitalClock.css'
class DigitalClock extends React.Component {
    state = {
       time: new Date().toLocaleTimeString(navigator.language, {
           hour12: true
       })
   };

   componentDidMount() {
       setInterval(() => {
           this.setState({
               time: new Date().toLocaleTimeString(navigator.language, {
                   hour12: true
               })
           })
       }, 1000);
   }


   render() {
       const timeArr = this.state.time.split(':');
       return (
           <div className="digitalclock">
               <div className="timedigital">
                   {`${timeArr[0]} : ${timeArr[1]} `}<span className="sec">{timeArr[2]}</span>
               </div>
           </div>
       );
   };
}

export default DigitalClock;