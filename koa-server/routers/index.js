/**
 * index router
 */
const router = require('koa-router')();
const controller = require('../controllers/index.js');

/**
 * get weather data by city
 */
router.get('/weather/:city', controller.handleGetWeatherByCity)

/**
 * get near
 */
router.get('/near/:city', controller.handleGetNearByCity);

module.exports = router.routes();