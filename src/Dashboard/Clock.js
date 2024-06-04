import React from "react";
import "./Clock.scss";

class Clock extends React.Component {
  render() {
    return (
      <div className="clockcenter">
        <div>
          <div className="copy">
            Click anywhere to {this.state.mute ? "un" : null}mute
          </div>
          <div className="clock">
            <div className="nums">
              {Array(12)
                .fill()
                .map(() => (
                  <div className="num" />
                ))}
            </div>
            <div className="clock-container">
              <ClockHand name="hour" rotate={this.state.h} />
              <ClockHand name="min" rotate={this.state.m} />
              <ClockHand name="second" rotate={this.state.s} />
            </div>
            <audio src="http://ianespanto.com/archive/files/tick.mp3" />
          </div>
        </div>
      </div>
    );
  }
}

class ClockHand extends React.Component {
  render() {
    var tf = {
      transform: `translateY(-50%) rotate(${this.props.rotate * 6 - 90}deg)`,
    };
    return <div className={`hand ${this.props.name}`} style={tf} />;
  }
}

export default Clock;
