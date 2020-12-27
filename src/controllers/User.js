'use strict';

const { userRepository } = require('../repositories');
const InternalUserTransformer = require('../transformers/InternalUserTransformer');
const { calcOffset, getPagination } = require('../utils/queryHelpers');

class UserController {
  static async create(ctx) {
    try {
      const { username, password } = ctx.request.body;

      const result = InternalUserTransformer.transform(
        await userRepository.create({ username, password }),
      );

      ctx.body = result;
    } catch (error) {
      // Todo: refactor error handling
      ctx.status = 400;
      ctx.body = {
        message: 'username is used',
      };
    }
  }

  static async list(ctx) {
    let { page, pageSize } = ctx.request.query;

    page = parseInt(page, 10);
    pageSize = parseInt(pageSize, 10);

    const offset = calcOffset(page, pageSize);

    const [results, count] = await Promise.all([
      userRepository.find(offset, pageSize),
      userRepository.count(),
    ]);

    ctx.body = {
      ...getPagination(count, pageSize),
      items: InternalUserTransformer.transformList(results),
    };
  }
}

module.exports = UserController;
