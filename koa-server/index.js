/**
 * entry
 */
const Koa = require('koa');
const cors = require('koa-cors');
const router = require('./routers/index.js');

const app = new Koa();
const port = process.env.PORT || 8888;

// cross origin
app.use(cors());

// router
app.use(router);

// set port, log start
app.listen(port, () => {
  console.log(`the server start success at port ${port}`);
});