'use strict';

const Joi = require('joi');

class BaseValidator {
  static async list(ctx) {
    const { query } = ctx.request;

    // type conversion
    ctx.request.query = {
      ...query,
      ...(query.page && { page: parseInt(query.page, 10) }),
      ...(query.pageSize && { pageSize: parseInt(query.pageSize, 10) }),
    };

    const schema = Joi.object({
      page: Joi.number().integer().min(1),
      pageSize: Joi.number().integer().min(5),
    });

    await schema.validateAsync(query, { abortEarly: false });
  }
}

module.exports = BaseValidator;
