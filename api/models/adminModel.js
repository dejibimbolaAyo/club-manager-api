const appRoot = require('app-root-path');
const mongoose = require(`${appRoot}/database/config/connection`);

var Schema = mongoose.Schema;
const adminSchema = new Schema({
  user: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  club: {
    ref: 'Club',
    type: mongoose.Schema.Types.ObjectId,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  phone: {
    type: String,
    unique: true,
    trim: true
  },
  pictureUrl: {
    type: String
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

adminSchema.query.byPhone = function (query) {
  return this.where({phone: query});
}

adminSchema.post("create", function (next) {
  next()
})

adminSchema
  .virtual('id')
  .get(function () {
    return this._id;
  });

adminSchema.set('toJSON', {virtuals: true});
adminSchema.set('toObject', {virtuals: true});

module.exports = mongoose.model('Admin', adminSchema, 'admin');