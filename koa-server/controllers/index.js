/**
 * index controller
 */
const weatherService = require('../services/weather.js');

const Controller = {
  /**
   * handle get weather by city
   * @param  {object}   ctx
   * @return {object}
   */
  handleGetWeatherByCity: async (ctx) => {
    const result = await weatherService.getWeatherByCity(ctx.params.city);
    ctx.body = result; 
  },

  /**
   * handle get city near
   * @param  {object}   ctx
   * @return {object}
   */
  handleGetNearByCity: async (ctx) => {
    const result = await weatherService.getNearByCity(ctx.params.city);
    ctx.body = result;
  }
}

module.exports = Controller;