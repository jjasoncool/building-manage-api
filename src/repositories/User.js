'use strict';

const bcrypt = require('bcrypt');
const BaseRepository = require('./Base');

class UserRepository extends BaseRepository {
  constructor({ User }) {
    super({ model: User });
  }

  async create(item, { session = null } = {}) {
    return super.create(
      {
        ...item,
        password: await bcrypt.hash(item.password, 8),
      },
      { session },
    );
  }

  async update(_id, updates, { session = null } = {}) {
    return super.update(
      _id,
      {
        ...updates,
        ...(updates.password
          ? { password: await bcrypt.hash(updates.password, 8) }
          : {}),
      },
      { session },
    );
  }

  static async validatePassword(password, encryptedPassword) {
    return bcrypt.compare(password, encryptedPassword);
  }
}

module.exports = UserRepository;
