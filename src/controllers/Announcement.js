'use strict';

const R = require('ramda');

const { announcementRepository } = require('../repositories');
const InternalAnnouncementTransformer = require('../transformers/Announcement/InternalAnnouncementTransformer');
const { calcOffset, getPagination } = require('../utils/queryHelpers');

class AnnouncementController {
  static async get(ctx) {
    const { no } = ctx.params;

    const targetAnnouncement = await announcementRepository.findByNo(no);

    if (R.isNil(targetAnnouncement)) {
      ctx.status = 404;
      ctx.body = {
        message: `Announce no[${no}] not found`,
      };

      return;
    }

    const result = InternalAnnouncementTransformer.transform(
      targetAnnouncement,
    );

    ctx.body = result;
  }

  static async list(ctx) {
    const { page = 1, pageSize = 10 } = ctx.request.query;

    const offset = calcOffset(page, pageSize);

    const [results, count] = await Promise.all([
      announcementRepository.find(offset, pageSize),
      announcementRepository.count(),
    ]);

    ctx.body = {
      ...getPagination(count, pageSize),
      items: InternalAnnouncementTransformer.transformList(results),
    };
  }

  static async create(ctx) {
    try {
      const result = InternalAnnouncementTransformer.transform(
        await announcementRepository.create(
          R.reject(R.isNil, ctx.request.body),
        ),
      );

      ctx.body = result;
      ctx.status = 200;
    } catch (error) {
      // Todo: refactor error handling
      ctx.status = 400;
      ctx.body = {
        message: 'Add announce error.',
      };
    }
  }

  static async update(ctx) {
    const { no } = ctx.params;

    const targetAnnouncement = await announcementRepository.findByNo(no);

    if (R.isNil(targetAnnouncement)) {
      ctx.status = 404;
      ctx.body = {
        message: `Announce no[${no}] not found`,
      };

      return;
    }

    const { _id: announcementId } = targetAnnouncement;

    const result = InternalAnnouncementTransformer.transform(
      await announcementRepository.update(
        announcementId,
        R.reject(R.isNil, ctx.request.body),
      ),
    );

    ctx.body = result;
  }

  static async delete(ctx) {
    // ...
    ctx.status = 200;
  }
}

module.exports = AnnouncementController;
