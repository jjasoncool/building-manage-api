"use strict";

const BaseRepository = require("./BaseRepository");

class AnnouncementRepository extends BaseRepository {
  constructor({ Announcement }) {
    super({ model: Announcement });
  }
}

module.exports = AnnouncementRepository;
