import io from "../../connections/socket"
const User = require("../models/user");

exports.create = async function (data) {
  const user = await User.create(data);

  // Generate salt
  user.salt = await user.generateSalt(20);
  user.hash = await user.hashPassword(user.salt, data.password);

  user.save();
  //   emitEvent(user)
  io.on('connection', (socket) => {
    socket.on('fetchMembers', (data) => {
        console.log("From client", data)
    //   console.log('client is subscribing to timer with interval ', socket);
      socket.emit('newUser', user);
      console.log("")
    });
  });
  // console.log(io);
  return user;
};

exports.findOneById = function (query) {
  return User.findById(query);
};

exports.findAll = function (query) {
  return User.find(query);
}