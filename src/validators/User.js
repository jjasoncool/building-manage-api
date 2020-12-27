'use strict';

const Joi = require('joi');
const R = require('ramda');

const BaseValidator = require('./Base');

class UserValidator extends BaseValidator {
  static async get(ctx, next) {
    try {
      // validate param
      const { no } = ctx.params;

      const paramsSchema = Joi.object({
        no: Joi.number().integer().min(1).required(),
      });

      // casting params
      ctx.params = {
        no: parseInt(no, 10),
      };

      await paramsSchema.validateAsync(ctx.params, { abortEarly: false });

      await next();
    } catch (error) {
      ctx.status = 400;
      ctx.body = {
        messages: R.map(({ message }) => message, error.details),
      };
    }
  }

  static async create(ctx, next) {
    try {
      const { body } = ctx.request;

      const schema = Joi.object({
        username: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string()
          .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
          .required(),
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

  static async update(ctx, next) {
    try {
      // validate param
      const { no } = ctx.params;
      const paramsSchema = Joi.object({
        no: Joi.number().integer().min(1).required(),
      });
      const bodySchema = Joi.object({
        username: Joi.string().alphanum().min(3).max(30),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
      });

      // casting params
      ctx.params = {
        no: parseInt(no, 10),
      };

      await paramsSchema.validateAsync(ctx.params, { abortEarly: false });
      await bodySchema.validateAsync(ctx.request.body, { abortEarly: false });

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
