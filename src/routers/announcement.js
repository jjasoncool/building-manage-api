'use strict';

const Router = require('koa-router');

// const AnnouncementController = require('../controllers/Announcement');

const announcementRouter = new Router();

announcementRouter
  .get('/', async () => {
    // ...
  })
  .post('/', async () => {
    // ...
  })
  .put('/:id', async () => {
    // ...
  })
  .del('/:id', async () => {
    // ...
  });

module.exports = announcementRouter;
