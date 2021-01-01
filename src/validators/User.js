'use strict';

const Joi = require('joi');
const R = require('ramda');

const BaseValidator = require('./Base');
const commonSchemas = require('./commonSchemas');

class UserValidator extends BaseValidator {
  static async create(ctx, next) {
    try {
      const schema = Joi.object({
        username: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string()
          .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
          .required(),
      });

      await schema.validateAsync(ctx.request.body, { abortEarly: false });

      return next();
    } catch (error) {
      ctx.status = 400;
      ctx.body = {
        messages: error.details
          ? R.map(({ message }) => message, error.details)
          : error.message,
      };

      return ctx;
    }
  }

  static async update(ctx, next) {
    try {
      const { noSchema } = commonSchemas;
      const bodySchema = Joi.object({
        username: Joi.string().alphanum().min(3).max(30),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
      });

      const { no } = await noSchema.validateAsync(ctx.params, {
        abortEarly: false,
      });

      await bodySchema.validateAsync(ctx.request.body, { abortEarly: false });

      ctx.params.no = no;

      return next();
    } catch (error) {
      ctx.status = 400;
      ctx.body = {
        messages: error.details
          ? R.map(({ message }) => message, error.details)
          : error.message,
      };

      return ctx;
    }
  }
}

module.exports = UserValidator;
