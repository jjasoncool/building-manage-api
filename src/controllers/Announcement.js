'use strict';

const R = require('ramda');

const { AnnouncementRepository } = require('../repositories');
const InternalUserTransformer = require('../transformers/InternalUserTransformer');
const { calcOffset, getPagination } = require('../utils/queryHelpers');

class AnnouncementController {
  static async get(ctx) {
    const { no } = ctx.params;

    const targetAnnounce = R.head(
      await AnnouncementRepository.find(0, 1, { filter: { no } }),
    );

    if (R.isNil(targetAnnounce)) {
      ctx.status = 404;
      ctx.body = {
        message: `Announce no[${no}] not found`,
      };

      return;
    }

    const result = InternalUserTransformer.transform(targetAnnounce);

    ctx.body = result;
    ctx.status = 200;
  }

  static async list(ctx) {
    let { page, pageSize } = ctx.request.query;

    page = parseInt(page, 10);
    pageSize = parseInt(pageSize, 10);

    const offset = calcOffset(page, pageSize);

    const [results, count] = await Promise.all([
      AnnouncementRepository.find(offset, pageSize),
      AnnouncementRepository.count(),
    ]);

    ctx.body = {
      ...getPagination(count, pageSize),
      items: InternalUserTransformer.transformList(results),
    };
    ctx.status = 200;
  }

  static async create(ctx) {
    try {
      const result = InternalUserTransformer.transform(
        await AnnouncementRepository.create(ctx.request.body),
      );

      ctx.body = result;
    } catch (error) {
      // Todo: refactor error handling
      ctx.status = 400;
      ctx.body = {
        message: 'Add announce error.',
      };
    }

    ctx.status = 200;
  }

  static async update(ctx) {
    const { no } = ctx.params;

    const targetAnnounce = R.head(
      await AnnouncementRepository.find(0, 1, { filter: { no } }),
    );

    if (R.isNil(targetAnnounce)) {
      ctx.status = 404;
      ctx.body = {
        message: `Announce no[${no}] not found`,
      };

      return;
    }

    const { _id: userId } = targetAnnounce;

    const result = InternalUserTransformer.transform(
      await AnnouncementRepository.update(
        userId,
        R.reject(R.isNil, ctx.request.body),
      ),
    );

    ctx.body = result;
    ctx.status = 200;
  }

  static async delete(ctx) {
    // ...
    ctx.status = 200;
  }
}

module.exports = AnnouncementController;
