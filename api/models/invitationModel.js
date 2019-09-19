const appRoot = require('app-root-path');
const mongoose = require(`${appRoot}/database/config/connection`);

var Schema = mongoose.Schema;
const invitationSchema = new Schema({
  club: {
    ref: 'Club',
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  memberEmail: {
    type: String,
    required: true
  },
  invitationCode: {
    type: String,
    unique: true,
    trim: true
  },
  expiry: {
    type: String
  },
  accepted: {
      type: Boolean
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

invitationSchema.query.byInvitationCode = function (query) {
  return this.where({invitationCode: query});
}

invitationSchema.query.byEmail = function (query) {
  return this.where({email: query});
}

invitationSchema.post("create", function (next) {
  next()
})

invitationSchema
  .virtual('id')
  .get(function () {
    return this._id;
  });

invitationSchema.set('toJSON', {virtuals: true});
invitationSchema.set('toObject', {virtuals: true});

module.exports = mongoose.model('Invitation', invitationSchema, 'invitation');