const appRoot = require('app-root-path');
const mongoose = require(`${appRoot}/database/config/connection`);

var Schema = mongoose.Schema;
const clubSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    unique: true,
    trim: true,
  },
  address: {
    type: String,
  },
  pictureUrl: {
    type: String,
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});


clubSchema.query.byPhone = function (query) {
    return this.where({phone: query});
  }
  

clubSchema.post("create", function (next) {
  next()
})

clubSchema
  .virtual('id')
  .get(function () {
    return this._id;
  });

clubSchema.set('toJSON', {virtuals: true});
clubSchema.set('toObject', {virtuals: true});

module.exports = mongoose.model('Club', clubSchema, 'club');