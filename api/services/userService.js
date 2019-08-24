import {emitEvent, broadcastUserEvent} from "../../connections/socket"
const User = require("../models/userModel");

exports.create = async function (data) {
  const user = await User.create(data);

  // Generate salt
  user.salt = await user.generateSalt(20);
  user.hash = await user.hashPassword(user.salt, data.password);

  user.save();
  broadcastUserEvent(user, 'newMember', '/users')

  return user;
};

exports.find = function (query) {
  const result =  User.find({
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

  if(!result) {
    return {
      status: false,
      message: "Resutl not found for query"
    }
  }

  return {
    status: true,
    message: "Result found",
    data: result
  }
}

exports.findOneById = function (query) {
  const user = User.findById(query);

  if(!user) {
    return {
      status: false,
      message: `${query} not found.`
    }
  }

  return {
    status: true,
    data: user
  }
};

exports.findByEmail = async function (query) {
  const user = await User.findOne().byEmail(query);

  if(!user) {
    return {
      status: false,
      message: `${query} not found.`
    }
  }

  return {
    status: true,
    data: user
  }
};

exports.findAll = async function (query) {
  const users = await User.find(query);

  if(!users) {
    return {
      status: false,
      message: "Users not found"
    }
  }

  return {
    status: true,
    message: "Users found",
    data: users
  };
}