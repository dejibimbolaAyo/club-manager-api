const appRoot = require('app-root-path');
const mongoose = require(`${appRoot}/database/config/connection`);
const crypt = require("../helper/crypt");

var Schema = mongoose.Schema;
const userSchema = new Schema({
  role: {
    type: String,
  },
  email: {
    type: 'string',
    unique: true,
    lowercase: true,
    trim: true,
    required: true
  },
  hash: {
    type: String
  },
  salt: {
    type: String
  },
  resetToken: String,
  resetTokenExpiration: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

userSchema.methods.generateSalt = function (length) {
  return crypt.getSalt(length);
}

userSchema.methods.hashPassword = function (salt, password) {
  const salted = salt + password;
  return crypt.getHash(salted);
}

userSchema.methods.verifyPassword = function (plainPassword) {
  const salted = this.salt + plainPassword;
  return crypt.compareHash(salted, this.hash);
};

userSchema.query.byEmail = function (query) {
  return this.where({email: query});
}

userSchema.post("create", function (next) {
  next()
})

userSchema
  .virtual('id')
  .get(function () {
    return this._id;
  });

userSchema.virtual('memberProfile', {
  ref: 'MemberProfile',
  localField: '_id',
  foreignField: 'user'
})

userSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.hash;
  delete obj.salt;
  return obj;
 }

userSchema.set('toJSON', {virtuals: true});
userSchema.set('toObject', {virtuals: true});

module.exports = mongoose.model('User', userSchema, 'user');