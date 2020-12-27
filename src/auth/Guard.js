'use strict';

class Guard {
  static async isAuthenticated(ctx, next) {
    if (!ctx.isAuthenticated()) {
      ctx.status = 403;

      return;
    }

    await next();
  }
}

module.exports = Guard;
