'use strict';

const Router = require('koa-router');
const serve = require('koa-static')('./src');

const Guard = require('../auth/Guard');

const staticRouter = new Router();

staticRouter
  // only works without nested folder, investigate how to support nested folders
  .get('/public/:any', serve)

  // Todo: add guard
  .get('/internal/:any', Guard.isAuthenticated, serve);

module.exports = staticRouter;
