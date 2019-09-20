const {emitEvent, broadcastUserEvent} = require("../../connections/socket");
const User = require("../models/userModel");

exports.create = async (data) => {
  const user = await User.create(data);

  // Generate salt
  user.salt = await user.generateSalt(20);
  user.hash = await user.hashPassword(user.salt, data.password);

  user.save();
  broadcastUserEvent(user, 'newMember', '/users')

  return {
    status: true,
    data: user
  };
};

exports.findOneById = async (query) => {
  let user = await User.findOne({_id: query}).populate('adminProfile').populate('memberProfile').exec();

  if(!user) {
    return {
      status: false,
      message: `${query} not found.`
    }
  }

  console.log("uodsufodadf", user)

  if(user.role === "ADMIN") {
    user = user.toObject();
    user.profile = user.adminProfile
    delete user.hash;
    delete user.salt;
    delete user.memberProfile;
    delete user.adminProfile;
  }

  if(user.role === "MEMBER") {
    // user = await user.populate('memberProfile').exec()
    user = user.toObject();
    user.profile = user.memberProfile
    delete user.hash;
    delete user.salt;
    delete user.adminProfile;
    delete user.memberProfile;

    console.log(user);
  }

  return {
    status: true,
    data: user
  }
};

exports.findByEmail = async (query) => {
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

exports.findAll = async (query) => {
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