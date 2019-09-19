var Seeder = require('mongoose-data-seed').Seeder;
const appRoot = require('app-root-path');
const Role = require(`${appRoot}/api/models/roleModel`);

let data = [
  {
    name: 'ADMIN',
    description: 'Club Admin'
  },
  {
    name: 'MEMBER',
    description: 'Club Member'
  }
];

let RoleSeeder = Seeder.extend({
  shouldRun: function () {
    return Role.countDocuments().exec().then(count => count === 0);
  },
  run: function () {
    return Role.create(data);
  }
});

module.exports = RoleSeeder;