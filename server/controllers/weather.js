/**
 * weather controller
 */
let weatherService = require('../services/weather.js');

let WeatherController = {
  /**
   * handle get weather by city
   * @param  {object}   req
   * @param  {object}   res
   * @return {object}
   */
  handleGetWeatherByCity: async (req, res) => {
    const result = await weatherService.getWeatherByCity(req.params.city);
    res.json(result);
  },

  /**
   * handle get all city weather
   * @param  {object}   req
   * @param  {object}   res
   * @return {object}
   */
  handleGetAllWeather: async (req, res) => {
    const result = await weatherService.getAllWeather();
    res.json(result);
  },

  /**
   * handle get city near
   * @param  {object}   req
   * @param  {object}   res
   * @return {object}
   */
  handleGetNearByCity: async (req, res) => {
    const result = await weatherService.getNearByCity(req.params.city);
    res.json(result);
  }
};

module.exports = WeatherController;