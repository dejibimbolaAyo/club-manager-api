const Club = require("../models/clubModel");
const MemberClub = require("../models/memberClubModel");


// create new club
exports.create = async (data) => {
    const club = await Club.create(data);

    return {
        status: true,
        data: club
    };
}

exports.getClub = async (query) => {
    const club = await Club.findById(query);

    if (!club) {
      return {status: false, message: `${query} not found.`}
    }
  
    return {status: true, data: club}
}

// Get all clubs
exports.getClubs = async (query) => {
    const clubs = await Club.find(query);

  if(!clubs) {
    return {
      status: false,
      message: "clubs not found"
    }
  }

  return {
    status: true,
    message: "clubs found",
    data: clubs
  };
}

// update club details
exports.update = async (data) => {
    try {
        const oldClubData = await Club.findOneById(data.clubId);
    
        let updatables = {
          'name': updates['name'] || oldClubData['name'],
          'address': updates['address'] || oldClubData['address'],
          'email': updates['email'] || oldClubData['email'],
          'phone': updates['phone'] || oldClubData['phone']
        }
    
        const club = await Club.findOneAndUpdate({_id: data.clubId}, {$set: updatables}, {new: true});
    
        if (!club) {
          return {status: false, message: `${data.clubId} not updated.`}
        }
    
        return {status: true, message: "Admin profile updated", data: club};
      } catch (error) {
        return {status: false, message: `Error occured on the server while updating member, ${error.message}`};
      }
}

// fetch club members statistics
exports.memberStatistics = async (query) => {
    const clubMembers = await MemberClub.find().byClub(query)

    if(!clubMembers) {
      return {status: false, message: `${query} not found.`}
    }
  
    return {status: true, data: clubMembers.length}
}

exports.getClubMembers = async (query) => {
    const clubMembers = await MemberClub.find().byClub(query)

    if(!clubMembers) {
      return {status: false, message: `${query} not found.`}
    }
  
    return {status: true, data: clubMembers}
}