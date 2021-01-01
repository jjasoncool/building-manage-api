'use strict';

const R = require('ramda');

class InternalUserTransformer {
  static transform(rawUser) {
    return R.pick(['_id', 'no', 'username', 'createdAt', 'updatedAt'], rawUser);
  }

  static transformList(rawUsers) {
    return R.map(R.pick(['no', 'username']), rawUsers);
  }
}

module.exports = InternalUserTransformer;
