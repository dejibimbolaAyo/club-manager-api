const Admin = require("../models/adminModel");
const Invitation = require("../models/invitationModel");

const moment = require('moment');

const {generateInvitationCode} = require('../helper/invitationCode')

// Create invitation
exports.create = async (data) => {
  const invitation = await Invitation.create({
      club: data.clubId,
      memberEmail: data.memberEmail,
      invitationCode: await generateInvitationCode(),
      expiry: moment.utc().add(2, 'days').format(),
      accepted: false
  });

  return {status: true, data: invitation};
}

// Accept invitation
exports.accept = async (data) => {
  const invitation = await Invitation.findByInvitationCode(data.invitationCode);

  if (!invitation) {
    return {status: false, message: `${query} not found.`}
  }

  invitation.accepted = true;
  invitation.save()

  return {status: true, data: invitation}
}

// Decline invitation
exports.decline = async (data) => {
    const invitation = await Invitation.findByInvitationCode(data.invitationCode);

    if (!invitation) {
      return {status: false, message: `${query} not found.`}
    }
  
    invitation.delete()
  
    return {status: true, data: invitation}
}