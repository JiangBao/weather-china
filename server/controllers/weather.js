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
  }
};

module.exports = WeatherController;