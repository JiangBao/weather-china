/**
 * entry
 */
let express = require('express'),
    routes = require('./routes/index.js'),
    logger = require('./services/logger.js');

let app = express();
let port = process.env.PORT || 8888;

// routes
routes(app);

// set port, logger start
app.listen(port, () => {
  logger.info(`the server start success at port ${port} at ${new Date()}`);
})