'use strict';

// const Joi = require("joi");
const Router = require('koa-router');

const UserController = require('../controllers/User');
const UserValidator = require('../validators/User');

const userRouter = new Router();

userRouter
  .get('/', UserValidator.list, UserController.list)
  .get('/:no', UserValidator.get, UserController.get)
  .post('/', UserValidator.create, UserController.create)
  .patch('/:no', UserValidator.update, UserController.update);

module.exports = userRouter;
