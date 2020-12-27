'use strict';

const Router = require('koa-router');

const announcementRouter = require('./announcement');
const authRouter = require('./auth');
const userRouter = require('./user');
const staticRouter = require('./static');

const router = new Router();

router.use('/auth', authRouter.routes(), authRouter.allowedMethods());

router.use(
  '/announcements',
  announcementRouter.routes(),
  announcementRouter.allowedMethods(),
);

router.use('/users', userRouter.routes(), userRouter.allowedMethods());

router.use('/static', staticRouter.routes(), staticRouter.allowedMethods());

module.exports = router;
