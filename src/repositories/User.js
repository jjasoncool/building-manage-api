"use strict";

const BaseRepository = require("./BaseRepository");

class UserRepository extends BaseRepository {
  constructor({ User }) {
    super({ model: User });
  }
}

module.exports = UserRepository;
