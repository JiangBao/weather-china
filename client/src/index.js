import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SearchWeather from './SearchWeather';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <SearchWeather />, 
  document.getElementById('root')
);
registerServiceWorker();
