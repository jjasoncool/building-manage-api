'use strict';

// const Joi = require("joi");
const Router = require('koa-router');

const UserController = require('../controllers/User');
const UserValidator = require('../validators/User');

const userRouter = new Router();

userRouter
  .get('/', UserValidator.list, UserController.list)
  .post('/', UserValidator.create, UserController.create)
  .put('/:id', async () => {
    // ...
  })
  .del('/:id', async () => {
    // ...
  });

module.exports = userRouter;
