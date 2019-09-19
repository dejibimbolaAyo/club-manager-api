const appRoot = require('app-root-path');
const mongoose = require(`${appRoot}/database/config/connection`);

var Schema = mongoose.Schema;
const memberProfileSchema = new Schema({
  user: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
    // required: true
  },
  firstName: {
    type: String,
    // required: true
  },
  lastName: {
    type: String,
    // required: true
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
  },
  gender: {
    type: String
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});


memberProfileSchema.query.byPhone = function (query) {
    return this.where({phone: query});
  }
  

memberProfileSchema.post("create", function (next) {
  next()
})

memberProfileSchema
  .virtual('id')
  .get(function () {
    return this._id;
  });

memberProfileSchema.set('toJSON', {virtuals: true});
memberProfileSchema.set('toObject', {virtuals: true});

module.exports = mongoose.model('MemberProfile', memberProfileSchema, 'memberProfile');