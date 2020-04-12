import './SearchWeather.css';
import axios from 'axios';
import CITY from './city.js';
import Seven from './Seven';
import Around from './Around';
import AllMap from './AllMap';
import React, { Component } from 'react';

class SearchWeather extends Component {
  constructor(props) {
    super(props);
    this.onClickSearch = this.onClickSearch.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onClickNav = this.onClickNav.bind(this);
    this.state = {
      city:     "",
      weather:  [],
      around:   [],
      nav:      {seven: "active", around: "sleep", all: "sleep"}
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
        this.setState({
          weather:  resp.data.data, 
          city:     city,
          nav:      {seven: "active", around: "sleep", all: "sleep"}
        });
      })
      .catch((err) => {
        console.error(`onClickSearch ERROR: ${err.stack}`);
      })
  }

  onInputChange(event) {
    this.setState({city: event.target.value});
  }

  onClickNav(event) {
    const tag = event.target.getAttribute('id');
    const nav = this.state.nav;
    for (var i in nav) {
      i === tag ? nav[i] = "active" : nav[i] = "sleep";
    }
    this.setState({nav: nav});
    switch(tag) {
      case 'around':
        const cityCode = CITY[this.state.city];
        axios.get(`http://127.0.0.1:8888/near/${cityCode}`)
          .then((resp) => {
            this.setState({around: resp.data.data});
          })
          .catch((err) => {
            console.error(`get around ERROR: ${err.stack}`);
          })
        break;
      case 'all':
        break;
      default:
        break;
    }
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
            <ul className="search-nav">
              <li id="seven" title="未来七天天气" className={this.state.nav.seven} onClick={this.onClickNav}>7 Day</li>
              <li id="around" title="周边地区" className={this.state.nav.around} onClick={this.onClickNav}>around</li>
              <li id="all" title="全国省会天气" className={this.state.nav.all} onClick={this.onClickNav}>all</li>
            </ul>
          </div>
          {
            this.state.nav.seven === 'active' ? <Seven weather={this.state.weather} /> : ''
          }
          {
            this.state.nav.around === 'active' ? <Around around={this.state.around} /> : ''
          }
          {
            this.state.nav.all === 'active' ? <AllMap /> : ''
          }
        </div>
        }
        <div className="footer">©<a href="https://github.com/JiangBao">酱鲍</a> | 数据来自-<a href="http://www.weather.com.cn/">中国天气网</a></div>
      </div>
    );
  }
}

export default SearchWeather;
