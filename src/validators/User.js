'use strict';

const Joi = require('joi');
const R = require('ramda');

const BaseValidator = require('./Base');

class UserValidator extends BaseValidator {
  static async create(ctx, next) {
    try {
      const { body } = ctx.request;

      const schema = Joi.object({
        username: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
      });

      await schema.validateAsync(body, { abortEarly: false });

      await next();
    } catch (error) {
      ctx.status = 400;
      ctx.body = {
        messages: R.map(({ message }) => message, error.details),
      };
    }
  }

  static async list(ctx, next) {
    // Todo: refactor, bad structure
    try {
      await super.list(ctx);
      await next();
    } catch (error) {
      ctx.status = 400;
      ctx.body = {
        messages: R.map(({ message }) => message, error.details),
      };
    }
  }
}

module.exports = UserValidator;
