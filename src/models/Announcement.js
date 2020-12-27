'use strict';

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const { Schema } = mongoose;

const announcementsSchema = new Schema(
  {
    no: {
      type: Number,
    },
    topic: {
      type: String,
    },
    meetingTime: {
      type: Date,
    },
    chairman: {
      type: String,
    },
    position: {
      type: Number,
    },
    // sourceOfLaw 法源依據（開會依據什麼法律開會）
    sourceOfLaw: {
      type: String,
    },
    // process 開會議程（開會流程）
    process: {
      type: String,
    },
    content: {
      type: String,
    },
    // notice 注意事項
    notice: {
      type: String,
    },
    attachments: {
      // paths of static files
      type: [String],
    },
    receiver: {
      type: String,
    },
    publishStartTime: {
      type: Date,
      required: false,
    },
    publishEndTime: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true },
);

announcementsSchema.plugin(AutoIncrement, {
  id: 'announcements_no',
  inc_field: 'no',
  start_seq: 1,
});

announcementsSchema.index({ no: 1 });
announcementsSchema.index({ createAt: 1 });
announcementsSchema.index({ updateAt: 1 });

const AnnouncementModel = mongoose.model('Announcement', announcementsSchema);

module.exports = AnnouncementModel;
