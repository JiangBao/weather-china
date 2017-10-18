/**
 * format response data
 */
const CONST = require('../config/const.js');

module.exports = {
  // success message formation
  successMsg: (data, code=CONST.CODE.SUCCESS, msg='success') => {
    return {
      status:       code,
      message:      msg,
      data:         data
    }
  },

  // error message formation
  errorMsg: (code=CONST.CODE.SERVER_ERR, msg='failed') => {
    return {
      status:       code,
      message:      msg,
      data:         []
    }
  }
}