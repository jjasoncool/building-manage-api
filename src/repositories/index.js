'use strict';

const { AnnouncementModel, UserModel } = require('../models');
const AnnouncementRepository = require('./Announcement');
const UserRepository = require('./User');

const announcementRepository = new AnnouncementRepository({
  Announcement: AnnouncementModel,
});
const userRepository = new UserRepository({ User: UserModel });

// TODO: refactor & use DI IOC
module.exports = {
  announcementRepository,
  userRepository,
};
