const MemberProfile = require("../models/memberProfileModel");
const MemberClub = require("../models/memberClubModel");

exports.create = async(data) => {
  const member = await MemberProfile.create({user: data.user, role: data.role});

  if (!member) {
    return {status: false, message: "Could not create Memeber profile"}
  }

  return {status: true, data: member};
}

exports.find = async(query) => {
  const result = await Profile.find({
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

exports.joinClub = async(data) => {
  const clubMembership = await MemberClub.create({club: data.clubId, member: data.memberId})

  if (!clubMembership) {
    return {status: false, message: 'Error occured while joining club'}
  }

  return {status: true, data: clubMembership};
}

exports.update = async(userId, updates) => {
  try {
    const oldMemberData = await MemberProfile.findOne({user: userId});

    let updatables = {
      'firstName': updates['firstName'] || oldMemberData['firstName'],
      'lastName': updates['lastName'] || oldMemberData['lastName'],
      'phone': updates['phone'] || oldMemberData['phone'],
      'address': updates['address'] || oldMemberData['address'],
      'pictureUrl': updates['pictureUrl'] || oldMemberData['pictureUrl']
    }

    const member = await MemberProfile.findOneAndUpdate({
      user: userId
    }, {
      $set: updatables
    }, {new: true});

    if (!member) {
      return {status: false, message: `${userId} not updated.`}
    }

    return {status: true, message: "Member profile updated", data: member};
  } catch (error) {
    return {status: false, message: `Error occured on the server while updating member, ${error.message}`};
  }
}