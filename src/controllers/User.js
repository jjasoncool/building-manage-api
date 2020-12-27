'use strict';

const R = require('ramda');

const { userRepository } = require('../repositories');
const InternalUserTransformer = require('../transformers/InternalUserTransformer');
const { calcOffset, getPagination } = require('../utils/queryHelpers');

class UserController {
  static async get(ctx) {
    const { no } = ctx.params;

    const targetUser = R.head(
      await userRepository.find(0, 1, { filter: { no } }),
    );

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

  static async update(ctx) {
    const { no } = ctx.params;
    const { username, password } = ctx.request.body;

    const targetUser = R.head(
      await userRepository.find(0, 1, { filter: { no } }),
    );

    if (R.isNil(targetUser)) {
      ctx.status = 404;
      ctx.body = {
        message: `User no[${no}] not found`,
      };

      return;
    }

    const { _id: userId } = targetUser;

    const result = InternalUserTransformer.transform(
      await userRepository.update(
        userId,
        R.reject(R.isNil, { username, password }),
      ),
    );

    ctx.body = result;
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
