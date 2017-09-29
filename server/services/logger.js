/**
 * logger module
 */
let log4js = require('log4js'),
    logConfig = require('../config/log.json');

// load config
log4js.configure(logConfig);

// logger level
levels = {
  'trace'		: 	log4js.levels.TRACE,
  'debug'		: 	log4js.levels.DEBUG,
  'info'		: 	log4js.levels.INFO,
  'warn'		: 	log4js.levels.WARN,
  'error'		: 	log4js.levels.ERROR,
  'fatal'		: 	log4js.levels.FATAL
};

// debug level
let debug = (value) => {
  let logger = log4js.getLogger('logDebug');
  logger.setLevel(levels['debug']);
  return logger.debug(value);
};

// info level
let info = (value) => {
  let logger = log4js.getLogger('logInfo');
  logger.setLevel(levels['info']);
  return logger.info(value);
};

// error level
let error = (value) => {
  let logger = log4js.getLogger('logError');
  logger.setLevel(levels['error']);
  return logger.error(value);
};

module.exports = {
  debug	: debug,
  info	: info,
  error	: error
};
