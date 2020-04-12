/**
 * seven days weather in future
 */
import React, { Component } from 'react';

class Seven extends Component {
  render() {
    return (
      <div className="display-content">
        {
          this.props.weather.map((v, i) => {
            return (
              <div key={i} className="weather-item">
                <div className="item-date">{v.date}</div>
                <div className="item-weather">{v.weather}</div>
                <div className="item-tem">{v.temL}-{v.temH} ℃</div>
                <div className="item-winDire">{v.winDire[0]}-{v.winDire[1]}</div>
                <div className="item-winLevel">{v.winLevel}</div>
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default Seven;
