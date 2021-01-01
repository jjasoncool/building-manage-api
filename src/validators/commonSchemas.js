'use strict';

const Joi = require('joi');

exports.noSchema = Joi.object({
  no: Joi.number().integer().min(1).required(),
});

exports.paginationSchema = Joi.object({
  page: Joi.number().integer().min(1),
  pageSize: Joi.number().integer().min(5),
});
