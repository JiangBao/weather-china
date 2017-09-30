/**
 * index route
 */
let weatherController = require('../controllers/weather.js');

let Route = (app) => {
  /**
   * get weather data by city
   */
  app.get('/weather/:city', weatherController.handleGetWeatherByCity);

  /**
   * get all city weather
   */
  app.get('/all/weather', weatherController.handleGetAllWeather);

  /**
   * get near
   */
  app.get('/near/:city', weatherController.handleGetNearByCity);
}

module.exports = Route;