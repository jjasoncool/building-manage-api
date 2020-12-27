'use strict';

const R = require('ramda');

class InternalUserTransformer {
  static transform(rawUser) {
    return R.pick(['_id', 'no', 'username', 'createdAt', 'updatedAt'], rawUser);
  }

  static transformList(rawUsers) {
    return R.map(InternalUserTransformer.transform, rawUsers);
  }
}

module.exports = InternalUserTransformer;
