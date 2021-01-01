'use strict';

const R = require('ramda');

const commonSchemas = require('./commonSchemas');

class BaseValidator {
  static async get(ctx, next) {
    try {
      const { noSchema } = commonSchemas;

      const { no } = await noSchema.validateAsync(ctx.params, {
        abortEarly: false,
      });

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

  static async list(ctx, next) {
    try {
      const { paginationSchema } = commonSchemas;

      const { page, pageSize } = await paginationSchema.validateAsync(
        ctx.request.query,
        {
          abortEarly: false,
        },
      );

      ctx.query.page = page;
      ctx.query.pageSize = pageSize;

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

  static async delete(ctx, next) {
    try {
      const { noSchema } = commonSchemas;

      const { no } = await noSchema.validateAsync(ctx.params, {
        abortEarly: false,
      });

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

module.exports = BaseValidator;
