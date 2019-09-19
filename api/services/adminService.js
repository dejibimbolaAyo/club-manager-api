const Admin = require("../models/adminModel");
const User = require("../models/userModel");
const MemberClub = require("../models/memberClubModel");

// Create admin account
exports.create = async (data) => {
  const admin = await Admin.create({
      user: data.user,
      role: data.role
  });

  if(!admin) {
      return {
          status: false,
          message: "Could not create Admin profile"
      }
  }

  return {status: true, data: admin};
};

exports.findOneById = function (query) {
  const admin = User.findById(query);

  if (!admin) {
    return {status: false, message: `${query} not found.`}
  }

  return {status: true, data: admin}
}

// Update admin details
exports.update = async (userId, updates) => {
  try {
    const oldAdminData = await Admin.findOne({user: userId});

    let updatables = {
      'firstName': updates['firstName'] || oldAdminData['firstName'],
      'lastName': updates['lastName'] || oldAdminData['lastName'],
      'phone': updates['phone'] || oldAdminData['phone'],
      'pictureUrl': updates['pictureUrl'] || oldAdminData['pictureUrl']
    }

    const admin = await Admin.findOneAndUpdate({user: userId}, {$set: updatables}, {new: true});

    if (!admin) {
      return {status: false, message: `${userId} not updated.`}
    }

    return {status: true, message: "Admin profile updated", data: admin};
  } catch (error) {
    return {status: false, message: `Error occured on the server while updating member, ${error.message}`};
  }

}

// Find admin
exports.findOneById = async (query) => {
  const admin = await Admin.findById(query);

  if (!admin) {
    return {status: false, message: `${query} not found.`}
  }

  return {status: true, data: admin}
};

// Delete club member
exports.deleteMember = async (query) => {
  const admin = await Admin.findById(query);

  if (!admin) {
    return {status: false, message: `${query} not found.`}
  }

  admin.delete()

  return {status: true, message: "Admin profile deleted", data: admin}
}