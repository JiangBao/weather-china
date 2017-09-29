/**
 * weather service
 */
let axios = require('axios'),
    cheerio = require('cheerio'),
    logger = require('./logger.js'),
    dataFormat = require('./dataFormat.js'),
    CONST = require('../config/const.js');

let WeatherService = {
  /**
   * get weather by city(city code)
   * @param  {string}   city
   * @return {object}
   */
  getWeatherByCity: async (city) =>{
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
      return dataFormat.errorMsg();
    }
  }
};

/**
 * get weather date by req result
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

module.exports = WeatherService;