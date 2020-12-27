'use strict';

const dotenv = require('dotenv');
const R = require('ramda');

dotenv.config();

module.exports = {
  app: {
    NODE_ENV: process.env.NODE_ENV || 'local',
    PORT: process.env.PORT || 3000,
    // key to encrypt cookies, see https://koajs.com/
    KEYS: R.split(',', process.env.KEYS || 'dummy'),
  },
  session: {
    // https://github.com/koajs/session
    CONFIG: {
      key: 'koa.sess',
      maxAge: 86400000,
      autoCommit: true,
      overwrite: true,
      httpOnly: true,
      signed: true,
      rolling: false,
      renew: false,
      secure: process.env.NODE_ENV !== 'local',
      sameSite: null,
    },
  },
  db: {
    MONGODB_DEBUG: process.env.MONGODB_DEBUG === 'true',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017',
    MONGODB_NAME: process.env.MONGODB_NAME || 'building-management',
  },
};
