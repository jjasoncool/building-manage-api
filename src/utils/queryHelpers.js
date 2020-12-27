'use strict';

const R = require('ramda');

const calcOffset = (page, pageSize) =>
  (R.max(1, page) - 1) * R.max(0, pageSize);

const getPagination = (totalResults, pageSize) => {
  const total = R.max(0, totalResults);
  const totalPages = Math.ceil(total / R.max(1, pageSize)) || 1;

  return { total, totalPages };
};

module.exports = {
  calcOffset,
  getPagination,
};
