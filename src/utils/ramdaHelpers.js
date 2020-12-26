"use strict";

const R = require("ramda");

exports.isNilOrEmpty = R.anyPass([R.isNil, R.isEmpty]);
