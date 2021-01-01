'use strict';

const R = require('ramda');

class InternalAnnouncementTransformer {
  static transform(rawAnnouncement) {
    return R.pick(
      [
        '_id',
        'no',
        'topic',
        'meetingTime',
        'chairman',
        'position',
        'sourceOfLaw',
        'process',
        'content',
        'notice',
        'receiver',
        'publishStartTime',
        'publishEndTime',
        'createdAt',
        'updatedAt',
      ],
      rawAnnouncement,
    );
  }

  static transformList(rawAnnouncements) {
    return R.map(
      R.pick(['no', 'topic', 'position', 'createdAt']),
      rawAnnouncements,
    );
  }
}

module.exports = InternalAnnouncementTransformer;
