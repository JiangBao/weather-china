/**
 * weather service
 */
let axios = require('axios'),
    cheerio = require('cheerio'),
    logger = require('./logger.js'),
    dataFormat = require('./dataFormat.js'),
    CONST = require('../config/const.js'),
    ALL_CITY = require('../config/allCity.json');

let WeatherService = {
  /**
   * get weather by city(city code)
   * @param  {string}   city
   * @return {object}
   */
  getWeatherByCity: async (city) => {
    try {
      const url = `http://www.weather.com.cn/weather/${city}.shtml`;
      const resp = await axios.get(url);
      if(resp.data === '<!-- empty -->') {
        return dataFormat.errorMsg(CONST.CODE.NOT_FOUND);
      } else {
        let $ = cheerio.load(resp.data);
        const result = getDataByResp($);
        return dataFormat.successMsg(result);
      }
    } catch(err) {
      logger.error(`WeatherService.getWeatherByCity ERROR: ${err.stack}`);
      return dataFormat.errorMsg(CONST.CODE.SERVER_ERR);
    }
  },

  /**
   * get all city weather
   * @return {object}
   */
  getAllWeather: async () => {
    try {
      let result = [];
      for(let i in ALL_CITY) {
        const city = ALL_CITY[i];
        const url = `http://www.weather.com.cn/weather/${city}.shtml`;
        const resp = await axios.get(url);
        const $ = cheerio.load(resp.data);
        let data = getDataByResp($);
        data.unshift(i);
        result.push(data);
      }
      return dataFormat.successMsg(result);
    } catch(err) {
      logger.error(`WeatherService.getAllWeather ERROR: ${err.stack}`);
      return dataFormat.errorMsg(CONST.CODE.SERVER_ERR);
    }
  },

  /**
   * get near city by city(city code)
   * @param  {string}   city
   * @return {object}
   */
  getNearByCity: async (city) => {
    try {
      const url = `http://www.weather.com.cn/weather/${city}.shtml`;
      const resp = await axios.get(url);
      if(resp.data === '<!-- empty -->') {
        return dataFormat.errorMsg(CONST.CODE.NOT_FOUND);
      } else {
        let $ = cheerio.load(resp.data);
        const result = getNearDataByResp($);
        return dataFormat.successMsg(result);
      }
    } catch(err) {
      logger.error(`WeatherService.getNearByCity ERROR: ${err.stack}`);
      return dataFormat.errorMsg(CONST.CODE.SERVER_ERR);
    }
  }
};

/**
 * get weather data by req result
 * @param  {object}   $
 * @return {object}
 */
const getDataByResp = ($) => {
  let data = [];
  $('ul.t').find('li').each((idx, elem) => {
    const date      = $(elem).find('h1').text(),
          weather   = $(elem).find('.wea').text(),
          temElem   = $(elem).find('.tem'),
          temH      = temElem.find('span').text(),
          temL      = temElem.find('i').text().split('℃')[0],
          winElem   = $(elem).find('.win'),
          winLevel  = winElem.find('i').text(),
          winDire   = [];
    winElem.find('span').each((idx, item) => {
      winDire.push($(item).attr('title'));
    });

    data.push({
      date: date,         weather: weather,
      temH: temH,         temL: temL,
      winLevel: winLevel, winDire: winDire
    });
  });

  return data;
}

/**
 * get near data by req result
 * @param  {object}   $
 * @return {object}
 */
const getNearDataByResp = ($) => {
  let data = [];
  $('ul.city').find('li').each((idx, elem) => {
    data.push($(elem).find('span').text());
  });

  return data;
}

module.exports = WeatherService;