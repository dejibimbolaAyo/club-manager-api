const appRoot = require('app-root-path');
const mongoose = require(`${appRoot}/database/config/connection`);

var Schema = mongoose.Schema;
const memberClubSchema = new Schema({
  club: {
    ref: 'Club',
    type: mongoose.Schema.Types.ObjectId,
    // required: true
  },
  member: {
    ref: 'MemberProfile',
    type: mongoose.Schema.Types.ObjectId,
    // required: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

memberClubSchema.query.byMember = function (query) {
  return this.where({member: query});
}

memberClubSchema.query.byClub = function (query) {
  return this.where({club: query});
}

memberClubSchema.post("create", function (next) {
  next()
})

memberClubSchema
  .virtual('id')
  .get(function () {
    return this._id;
  });

memberClubSchema.set('toJSON', {virtuals: true});
memberClubSchema.set('toObject', {virtuals: true});

module.exports = mongoose.model('MemberClub', memberClubSchema, 'memberClub');