'use strict';

const Router = require('koa-router');

const Guard = require('../auth/Guard');
const AnnouncementController = require('../controllers/Announcement');

const announcementRouter = new Router();

announcementRouter
  .get('/', AnnouncementController.list)
  .get('/:no', AnnouncementController.get)
  .post('/', Guard.isAuthenticated, AnnouncementController.create)
  .put('/:no', Guard.isAuthenticated, AnnouncementController.update)
  .del('/:no', Guard.isAuthenticated, AnnouncementController.delete);

module.exports = announcementRouter;
