'use strict';

const R = require('ramda');

const { userRepository } = require('../repositories');
const InternalUserTransformer = require('../transformers/User/InternalUserTransformer');
const { calcOffset, getPagination } = require('../utils/queryHelpers');

class UserController {
  static async get(ctx) {
    const { no } = ctx.params;

    const targetUser = await userRepository.findByNo(no);

    if (R.isNil(targetUser)) {
      ctx.status = 404;
      ctx.body = {
        message: `User no[${no}] not found`,
      };

      return;
    }

    const result = InternalUserTransformer.transform(targetUser);

    ctx.body = result;
  }

  static async getMe(ctx) {
    const { user: me } = ctx.state;

    const result = InternalUserTransformer.transform(me);

    ctx.body = result;
  }

  static async create(ctx) {
    try {
      const result = InternalUserTransformer.transform(
        await userRepository.create(R.reject(R.isNil, ctx.request.body)),
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

  static async update(ctx) {
    const { no } = ctx.params;

    const targetUser = await userRepository.findByNo(no);

    if (R.isNil(targetUser)) {
      ctx.status = 404;
      ctx.body = {
        message: `User no[${no}] not found`,
      };

      return;
    }

    const { _id: userId } = targetUser;

    const result = InternalUserTransformer.transform(
      await userRepository.update(userId, R.reject(R.isNil, ctx.request.body)),
    );

    ctx.body = result;
  }

  static async list(ctx) {
    const { page = 1, pageSize = 10 } = ctx.request.query;

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
