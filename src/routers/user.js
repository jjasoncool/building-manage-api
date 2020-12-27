'use strict';

// const Joi = require("joi");
const Router = require('koa-router');

const UserController = require('../controllers/User');

const userRouter = new Router();

userRouter
  .get('/', UserController.list)
  .post('/', UserController.create)
  .put('/:id', async () => {
    // ...
  })
  .del('/:id', async () => {
    // ...
  });

module.exports = userRouter;
