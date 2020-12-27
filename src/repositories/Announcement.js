'use strict';

const BaseRepository = require('./Base');

class AnnouncementRepository extends BaseRepository {
  constructor({ Announcement }) {
    super({ model: Announcement });
  }
}

module.exports = AnnouncementRepository;
