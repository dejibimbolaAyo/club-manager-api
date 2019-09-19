const {validationResult} = require('express-validator')
const logger = require("../config/logger");
const Admin = require("../services/adminService");
const Invitation = require("../services/invitationService");
const Club = require("../services/clubService");
const {HTTP_STATUS} = require("../constants/httpStatus");

let {error, success} = require("../constants/response");
let response = require("../helper/responseWriter");

const {sendMail} = require('../helper/email')

/**
 * Create club
 */
exports.createClub = async function (req, res) {
  let data = req.body
  data.admin = req.user._id

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      error.data = errors.array()
      return response.writeJson(res, error, 422)
    }

    const club = await Club.create(data);

    success = club;

    return response.writeJson(res, success, HTTP_STATUS.OK.CODE)
  } catch (err) {
    logger.log("error", `Error occured, ${err}`);
    error.message = err.message || err._message;
    return response.writeJson(res, {
      message: error.message,
      status: false
    }, HTTP_STATUS.INTERNAL_SERVER_ERROR.CODE)
  }
}

/**
   * Get club metrics
   */
exports.getClubMetrics = async function (req, res) {
  const {clubId} = req.params
  const admin = req.user.id

  try {
    const club = await Club.getClub(clubId);

    if (!club.status) {
      return response.writeJson(res, {
        status: false,
        message: "Club not found"
      }, HTTP_STATUS.NOT_FOUND.CODE)
    }

    if (!club.data.admin.equals(admin)) {
      return response.writeJson(res, {
        status: false,
        message: `You are not authorized to access ${club.data.name} details`
      }, HTTP_STATUS.UNAUTHORIZED.CODE)
    }

    const memberStatistics = await Club.memberStatistics(clubId);

    success = memberStatistics;

    return response.writeJson(res, success, HTTP_STATUS.OK.CODE)
  } catch (err) {
    logger.log("error", `Error occured, ${err}`);
    error.message = err.message || err._message;
    return response.writeJson(res, {
      message: error.message,
      status: false
    }, HTTP_STATUS.INTERNAL_SERVER_ERROR.CODE)
  }
}

/**
   * Fetch club members
   */
exports.getClubMembers = async function (req, res) {
  const {clubId} = req.params
  const admin = req.user.id

  try {
    const club = await Club.getClub(clubId);

    if (!club.status) {
      return response.writeJson(res, {
        status: false,
        message: "Club not found"
      }, HTTP_STATUS.NOT_FOUND.CODE)
    }

    if (!club.data.admin.equals(admin)) {
      return response.writeJson(res, {
        status: false,
        message: `You are not authorized to access ${club.data.name} details`
      }, HTTP_STATUS.UNAUTHORIZED.CODE)
    }

    const clubMetrics = await Club.getClubMembers(clubId);

    success = clubMetrics;

    return response.writeJson(res, success, HTTP_STATUS.OK.CODE)
  } catch (err) {
    logger.log("error", `Error occured, ${err}`);
    error.message = err.message || err._message;
    return response.writeJson(res, {
      message: error.message,
      status: false
    }, HTTP_STATUS.INTERNAL_SERVER_ERROR.CODE)
  }
}

/**
    * Delete club member
    */

exports.deleteClubMember = async function (req, res) {}

/**
 * Send invitation to member
 */
exports.sendInvitation = async function (req, res) {
  const data = req.body
  const admin = req.user.id

  try {
    const club = await Club.getClub(data.clubId);

    if (!club.status) {
      return response.writeJson(res, {
        status: false,
        message: "Club not found"
      }, HTTP_STATUS.NOT_FOUND.CODE)
    }

    if (!club.data.admin.equals(admin)) {
      return response.writeJson(res, {
        status: false,
        message: `You are not authorized to access ${club.data.name} details`
      }, HTTP_STATUS.UNAUTHORIZED.CODE)
    }

    if (club.status = false) {
      // reject invitation process
      logger.log("error", `Error occured, ${club.message}`);
      error.message = club.message;
      return response.writeJson(res, {
        message: error.message,
        status: false
      }, HTTP_STATUS.NOT_FOUND.CODE)
    }

    const invitation = await Invitation.create(data);

    if (invitation.status) {
      // Send email
    //   sendMail(data.email, `Invitation to ${club.name}`, 'invitation', data)
    }

    success.data = invitation;
    return response.writeJson(res, success, HTTP_STATUS.OK.CODE)
  } catch (err) {
    logger.log("error", `Error occured, ${err}`);
    error.message = err.message || err._message;
    return response.writeJson(res, {
      message: error.message,
      status: false
    }, HTTP_STATUS.INTERNAL_SERVER_ERROR.CODE)
  }
}

/**
 * Update admin profile
 */
exports.updateProfile = async function (req, res) {
  try {
    const admin = req.user;
    const updates = req.body;
    const adminId = admin._id;

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      error.data = errors.array();
      error.message = "Validation error occured"
      return res
        .status(HTTP_STATUS.NOT_FOUND.CODE)
        .json(error);
    }

    if (!adminId) {
      error.message = HTTP_STATUS.BAD_REQUEST.MESSAGE;
      logger.error("Broken authentication token");
      return response.writeJson(res, error, HTTP_STATUS.BAD_REQUEST.CODE);
    }

    const adminUpdate = await Admin.update(adminId, updates);

    if (!adminUpdate) {
      error.message = 'Details could not be updated';
      logger.error(message);
      return response.writeJson(res, error, HTTP_STATUS.INTERNAL_SERVER_ERROR.CODE);
    }
    success = adminUpdate
    return response.writeJson(res, success, HTTP_STATUS.OK.CODE);

  } catch (error) {
    logger.error(`Error occured while updating member ${error.message}`);
    return response.writeJson(res, error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR.CODE);

  }
}