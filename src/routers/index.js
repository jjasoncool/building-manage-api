'use strict';

const Router = require('koa-router');
const serve = require('koa-static')('./src');

const announcementRouter = require('./announcement');
const userRouter = require('./user');

const router = new Router();

router
  .post('/login', async () => {
    // ...
  })
  .post('/logout', async () => {
    // ...
  });

router.get('/me', async () => {
  // ...
});

router.use(
  '/announcements',
  announcementRouter.routes(),
  announcementRouter.allowedMethods(),
);

router.use('/users', userRouter.routes(), userRouter.allowedMethods());

// only works without nested folder, investigate how to support nested folders
router.get('/static/public/:any', serve);

// Todo: add guard
router.get('/static/internal/:any', serve);

module.exports = router;
