'use strict';

const passport = require('../auth/passport');
const InternalUserTransformer = require('../transformers/InternalUserTransformer');

class AuthController {
  static async login(ctx) {
    return passport.authenticate('local', (err, user) => {
      // Todo: investigate 4 inputs here: err, user, info, status
      if (user) {
        const me = InternalUserTransformer.transform(user);

        ctx.login(me);
        ctx.status = 200;
        ctx.body = me;
      } else {
        ctx.logout();

        // Todo: investigate how to use ctx.throw(401);
        ctx.status = 401;

        // Do not expose why login fail
        // ctx.body = {
        //   message: err.message,
        // };
      }
    })(ctx);
  }

  static async logout(ctx) {
    ctx.logout();
    ctx.status = 200;
  }
}

module.exports = AuthController;
