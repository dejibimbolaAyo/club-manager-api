const appRoot = require('app-root-path');
const mongoose = require(`${appRoot}/database/config/connection`);

var Schema = mongoose.Schema;
const profileSchema = new Schema({
  user: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
    // required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
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
  status: {
    type: String
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

profileSchema.post("create", function (next) {
  next()
})

profileSchema
  .virtual('id')
  .get(function () {
    return this._id;
  });

profileSchema.set('toJSON', {virtuals: true});
profileSchema.set('toObject', {virtuals: true});

module.exports = mongoose.model('Profile', profileSchema, 'profile');