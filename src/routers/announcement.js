'use strict';

const Router = require('koa-router');

const Guard = require('../auth/Guard');
const AnnouncementController = require('../controllers/Announcement');

const announcementRouter = new Router();

announcementRouter
  .get('/', AnnouncementController.list)
  .get('/:id', AnnouncementController.get)
  .post('/', Guard.isAuthenticated, AnnouncementController.create)
  .put('/:id', Guard.isAuthenticated, AnnouncementController.update)
  .del('/:id', Guard.isAuthenticated, AnnouncementController.delete);

module.exports = announcementRouter;
