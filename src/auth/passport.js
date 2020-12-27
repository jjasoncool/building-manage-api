'use strict';

const passport = require('koa-passport');
const { Strategy: LocalStrategy } = require('passport-local');
const R = require('ramda');

const { userRepository } = require('../repositories');
const UserRepository = require('../repositories/User');

passport.serializeUser((user, done) => {
  done(null, user.no);
});

passport.deserializeUser(async (no, done) => {
  try {
    const user = R.head(await userRepository.find(0, 1, { filter: { no } }));

    if (R.isNil(user)) {
      done(new Error(`User no[${no}] not found`));
    }

    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = R.head(
        await userRepository.find(0, 1, { filter: { username } }),
      );

      if (R.isNil(user)) {
        done(new Error(`User username[${username}] not found`));
      }

      const isValid = await UserRepository.validatePassword(
        password,
        user.password,
      );

      if (!isValid) {
        throw new Error('Username Password not match');
      }

      done(null, user);
    } catch (err) {
      done(err);
    }
  }),
);

module.exports = passport;
