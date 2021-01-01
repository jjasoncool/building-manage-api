'use strict';

const Joi = require('joi');
const R = require('ramda');

const BaseValidator = require('./Base');
const commonSchemas = require('./commonSchemas');

class AnnouncementValidator extends BaseValidator {
  static async create(ctx, next) {
    try {
      const schema = Joi.object({
        topic: Joi.string().min(3).required(),
        meetingTime: Joi.date().required(),
        chairman: Joi.string().min(2).required(),
        position: 3,
        sourceOfLaw: Joi.string().required(),
        process: Joi.string().required(),
        content: Joi.string().min(3).required(),
        notice: Joi.string(),
        receiver: Joi.string().required(),
        publishStartTime: Joi.date().required(),
        publishEndTime: Joi.date(),
        attachments: Joi.array(),
      });

      const {
        meetingTime,
        publishStartTime,
        publishEndTime,
      } = await schema.validateAsync(ctx.request.body, { abortEarly: false });

      if (!R.isNil(meetingTime)) {
        ctx.request.body.meetingTime = meetingTime;
      }

      if (!R.isNil(publishStartTime)) {
        ctx.request.body.publishStartTime = publishStartTime;
      }

      if (!R.isNil(publishEndTime)) {
        ctx.request.body.publishEndTime = publishEndTime;
      }

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
        topic: Joi.string().min(3),
        meetingTime: Joi.date(),
        chairman: Joi.string().min(2),
        position: 3,
        sourceOfLaw: Joi.string(),
        process: Joi.string(),
        content: Joi.string().min(3),
        notice: Joi.string(),
        receiver: Joi.string(),
        publishStartTime: Joi.date(),
        publishEndTime: Joi.date(),
        attachments: Joi.array(),
      });

      const { no } = await noSchema.validateAsync(ctx.params, {
        abortEarly: false,
      });

      const {
        meetingTime,
        publishStartTime,
        publishEndTime,
      } = await bodySchema.validateAsync(ctx.request.body, {
        abortEarly: false,
      });

      ctx.params.no = no;

      if (!R.isNil(meetingTime)) {
        ctx.request.body.meetingTime = meetingTime;
      }

      if (!R.isNil(publishStartTime)) {
        ctx.request.body.publishStartTime = publishStartTime;
      }

      if (!R.isNil(publishEndTime)) {
        ctx.request.body.publishEndTime = publishEndTime;
      }

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

module.exports = AnnouncementValidator;
