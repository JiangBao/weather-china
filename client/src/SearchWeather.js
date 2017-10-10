import './SearchWeather.css';
import axios from 'axios';
import CITY from './city.js';
import React, { Component } from 'react';

class SearchWeather extends Component {
  constructor(props) {
    super(props);
    this.onClickSearch = this.onClickSearch.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.state = {
      weather: []
    };
  }

  onClickSearch() {
    const city = this.refs.cityInput.value;
    const cityCode = CITY[city];
    axios.get(`http://127.0.0.1:8888/weather/${cityCode}`)
      .then((resp) => {
        if (resp.data.status !== 200) {
          return alert("something error!");
        }
        this.setState({weather: resp.data.data, city: city});
      })
      .catch((err) => {
        console.error(`onClickSearch ERROR: ${err.stack}`);
      })
  }

  onInputChange(event) {
    this.setState({city: event.target.value});
  }

  render() {
    return (
      <div className="search-weather-page">
        {!this.state.weather.length 
          ? <div className="search-wrap">
          <i className="iconfont icon-tianqi"></i>
          <input type="text" ref="cityInput" />
          <button onClick={this.onClickSearch}><i className="iconfont icon-sousuo"></i>search</button>
        </div>
          : <div className="search-display">
          <div className="display-search-wrap">
            <i className="iconfont icon-tianqi"></i>
            <input type="text" ref="cityInput" value={this.state.city} onChange={this.onInputChange} />
            <button onClick={this.onClickSearch}><i className="iconfont icon-sousuo"></i>search</button>
          </div>
          <div className="display-content">
            {
              this.state.weather.map((v, i) => {
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
        </div>
        }
      </div>
    );
  }
}

export default SearchWeather;
