'use strict';

// const Joi = require('joi');

class UserValidator {
  static async create(ctx, next) {
    // const { body } = ctx.request;

    await next();
  }
}

module.exports = UserValidator;
