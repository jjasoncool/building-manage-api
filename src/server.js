'use strict';

const Koa = require('koa');
const helmet = require('koa-helmet');
const cors = require('@koa/cors');
const compress = require('koa-compress');
const koaBody = require('koa-body');
const zlib = require('zlib');
const mongoose = require('mongoose');

const config = require('./config');
const router = require('./routers');

// TODO: refactor
mongoose.set('debug', config.db.MONGODB_DEBUG);
mongoose.connect(config.db.MONGODB_URI, {
  keepAlive: true,
  dbName: config.db.MONGODB_NAME,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  autoIndex: true,
  useUnifiedTopology: true,
  maxPoolSize: 5,
});

const app = new Koa();

app
  .use(helmet())
  .use(cors())
  .use(
    compress({
      filter(contentType) {
        return /text/i.test(contentType);
      },
      threshold: 2048,
      flush: zlib.constants.Z_SYNC_FLUSH,
    }),
  )
  .use(koaBody())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(config.app.PORT);
