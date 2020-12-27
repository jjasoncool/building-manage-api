'use strict';

const bcrypt = require('bcrypt');
const BaseRepository = require('./BaseRepository');

class UserRepository extends BaseRepository {
  constructor({ User }) {
    super({ model: User });
  }

  async create(item, { session = null } = {}) {
    const created = await this.model.create(
      [
        {
          ...item,
          password: await bcrypt.hash(item.password, 8),
        },
      ],
      { session },
    );

    const result = created[0].toObject();

    return result;
  }

  static async validatePassword(password, encryptedPassword) {
    return bcrypt.compare(password, encryptedPassword);
  }
}

module.exports = UserRepository;
