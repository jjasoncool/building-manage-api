'use strict';

// const Joi = require("joi");
const Router = require('koa-router');

const Guard = require('../auth/Guard');
const UserValidator = require('../validators/User');
const UserController = require('../controllers/User');

const userRouter = new Router();

userRouter
  .get('/', Guard.isAuthenticated, UserValidator.list, UserController.list)
  .get('/me', Guard.isAuthenticated, UserController.getMe)
  .get('/:no', Guard.isAuthenticated, UserValidator.get, UserController.get)
  .post('/', UserValidator.create, UserController.create)
  .patch(
    '/:no',
    Guard.isAuthenticated,
    UserValidator.update,
    UserController.update,
  );

module.exports = userRouter;
