/**
 * index route
 */
let weatherController = require('../controllers/weather.js');

let Route = (app) => {
  /**
   * get weather data by city
   */
  app.get('/weather/:city', weatherController.handleGetWeatherByCity);
}

module.exports = Route;