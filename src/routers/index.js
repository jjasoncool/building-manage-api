'use strict';

const Router = require('koa-router');
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

module.exports = router;
