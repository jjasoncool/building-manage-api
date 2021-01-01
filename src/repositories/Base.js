'use strict';

const R = require('ramda');
const { isNilOrEmpty } = require('../utils/commomHelpers');
const STATUS = require('../constants/Status');

class BaseRepository {
  constructor({ model }) {
    this.model = model;
  }

  async create(item, { session = null } = {}) {
    // forget why use array here, something related to session or transaction in mongodb
    const created = await this.model.create([item], { session });

    const result = created[0].toObject();

    return result;
  }

  async findById(_id) {
    const query = this.model.findById(_id).lean();

    const result = await query.exec();

    return result;
  }

  async findByNo(no) {
    const result = R.head(await this.find(0, 1, { filter: { no } }));

    return result;
  }

  async findByIds(_ids) {
    const queryResults = await this.find(0, 0, {
      filter: { _id: { $in: _ids } },
    });

    const indexedResults = R.indexBy(R.prop('_id'), queryResults);

    const finalResults = R.reject(
      R.isNil,
      R.map((id) => R.prop(id, indexedResults), _ids),
    );

    return finalResults;
  }

  async findAll({ filter = {}, sort = {} } = {}) {
    const query = this.model.find(filter).lean().sort(sort).cursor();

    return query;
  }

  async find(offset = 0, limit = 20, { filter = {}, sort = {} } = {}) {
    const query = this.model
      .find(filter)
      .lean()
      .sort(sort)
      .skip(offset)
      .limit(limit);

    return query.exec();
  }

  async count(filter = {}) {
    return this.model.countDocuments(filter);
  }

  async update(_id, updates, { session = null } = {}) {
    return this.model
      .findByIdAndUpdate(
        _id,
        {
          ...updates,
        },
        {
          new: true,
          runValidators: true,
        },
      )
      .lean()
      .session(session)
      .exec();
  }

  async isExists(fields = {}) {
    if (isNilOrEmpty(fields)) {
      return false;
    }

    const result = await this.count({
      ...fields,
      status: { $ne: STATUS.DELETED },
    });

    return !!result;
  }
}

module.exports = BaseRepository;
