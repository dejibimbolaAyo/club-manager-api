const Profile = require("../models/profileModel");

exports.find = function (query) {
  const result = Profile.find({
    $or: [
      {
        "firstName": {
          $regex: '.*' + query + '.*',
          $options: 'gi'
        }
      }, {
        "lastName": {
          $regex: '.*' + query + '.*',
          $options: 'gi'
        }
      }
    ]
  })

  if (!result) {
    return {status: false, message: "Resutl not found for query"}
  }

  return {status: true, message: "Result found", data: result}
}

exports.findByPhone = async function (query) {
  const profile = await Profile
    .findOne()
    .byPhone(query);

  if (!profile) {
    return {status: false, message: `${query} not found.`}
  }

  return {status: true, data: profile}
};

exports.update = function (data) {}