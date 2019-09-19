let mongooseLib = require('mongoose');
const appRoot = require('app-root-path');
const Role = require(`${appRoot}/database/seeders/role.seeder`);

mongooseLib.Promise = global.Promise || Promise;

module.exports = {

  // Export the mongoose lib
  mongoose: mongooseLib,

  // Export the mongodb url
  mongoURL: process.env.MONGODB_SEEDER_URL || 'mongodb://localhost:27017/tradedepot',

  seedersList: {
    Role
  }
};