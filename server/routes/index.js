/**
 * index route
 */
let weatherController = require('../controllers/weather.js');

let Route = (app) => {
  /**
   * allow cross origin request
   */
  app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
  })

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