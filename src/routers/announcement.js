'use strict';

const Router = require('koa-router');

const Guard = require('../auth/Guard');
const AnnouncementValidator = require('../validators/Announcement');
const AnnouncementController = require('../controllers/Announcement');

const announcementRouter = new Router();

announcementRouter
  .get('/', AnnouncementValidator.list, AnnouncementController.list)
  .get('/:no', AnnouncementValidator.get, AnnouncementController.get)
  .post(
    '/',
    Guard.isAuthenticated,
    AnnouncementValidator.create,
    AnnouncementController.create,
  )
  .put(
    '/:no',
    Guard.isAuthenticated,
    AnnouncementValidator.update,
    AnnouncementController.update,
  )
  .del(
    '/:no',
    Guard.isAuthenticated,
    AnnouncementValidator.delete,
    AnnouncementController.delete,
  );

module.exports = announcementRouter;
