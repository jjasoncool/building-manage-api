'use strict';

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const { Schema } = mongoose;

const usersSchema = new Schema(
  {
    no: {
      type: Number,
    },
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true },
);

usersSchema.plugin(AutoIncrement, {
  id: 'users_no',
  inc_field: 'no',
  start_seq: 1,
});

usersSchema.index({ no: 1 });
usersSchema.index({ username: 1 }, { unique: true });
usersSchema.index({ createAt: 1 });
usersSchema.index({ updateAt: 1 });

const UserModel = mongoose.model('User', usersSchema);

module.exports = UserModel;
