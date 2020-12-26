"use strict";

// const Joi = require("joi");
const Router = require("koa-router");
// const AnnouncementModel = require("../models/Announcement");
const UserModel = require("../models/User");
// const AnnouncementRepository = require("../repositories/Announcement");
const UserRepository = require("../repositories/User");

const router = new Router();

// const announcementRepository = new AnnouncementRepository({
//   Announcement: AnnouncementModel,
// });
const userRepository = new UserRepository({ User: UserModel });

// TODO: refactor & use DI IOC
// Just test
router.get("/", async (ctx) => {
  ctx.body = "Hello World!";
});

router
  .post("/login", async () => {
    // ...
  })
  .post("/logout", async () => {
    // ...
  });

router
  .get("/announcements", async () => {
    // ...
  })
  .post("/announcements", async () => {
    // ...
  })
  .put("/announcements/:id", async () => {
    // ...
  })
  .del("/announcements/:id", async () => {
    // ...
  });

router
  .get("/users", async () => {
    // ...
  })
  .post("/users", async (ctx) => {
    // Test only
    try {
      const { username, password } = ctx.request.body;

      const result = await userRepository.create({ username, password });

      ctx.body = result;
    } catch (error) {
      // Todo: refactor error handling
      ctx.status = 400;
      ctx.body = {
        message: "username is used",
      };
    }
  })
  .put("/users/:id", async () => {
    // ...
  })
  .del("/users/:id", async () => {
    // ...
  });

router.get("/me", async () => {
  // ...
});

module.exports = router;
