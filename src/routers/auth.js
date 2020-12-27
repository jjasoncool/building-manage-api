'use strict';

const Router = require('koa-router');

const Guard = require('../auth/Guard');
const AuthController = require('../controllers/Auth');

const authRouter = new Router();

authRouter
  .post('/login', AuthController.login)
  .post('/logout', Guard.isAuthenticated, AuthController.logout);

module.exports = authRouter;
