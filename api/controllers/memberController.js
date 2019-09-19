const {validationResult} = require('express-validator')
const logger = require("../config/logger");
const Invitation = require("../services/invitationService");
const Member = require("../services/memberService");
const {HTTP_STATUS} = require("../constants/httpStatus");

let {error, success} = require("../constants/response");
let response = require("../helper/responseWriter");

/**
  * Decline invitation
  */
exports.declineInvitation = async function (req, res) {
  const data = req.body

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      error.data = errors.array()
      return response.writeJson(res, error, 422)
    }

    const invitation = await Invitation.findOneByInvitationCode(data);

    invitation.delete();

    success = {
      status: true,
      message: "Invitation declined",
      data: {}
    }

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
   * Accept invitation
   */

exports.acceptInvitation = async function (req, res) {
  const data = req.body

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      error.data = errors.array()
      return response.writeJson(res, error, 422)
    }

    // Update invitation
    const invitation = await Invitation.findByInvitationCode(data);

    invitation.accepted = true;

    invitation.save();

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
 * Update member profile
 */
exports.updateProfile = async function (req, res) {
    try {
        const member = req.user;
        const updates = req.body;

        if(!member) {
            error.message= HTTP_STATUS.UNAUTHORIZED.MESSAGE;
            logger.error("Broken authentication token");
            return response.writeJson(res, error, HTTP_STATUS.UNAUTHORIZED.CODE);
        }
        const memberId = member._id;

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            error.data = errors.array();
            error.message = "Validation error occured"
            return res.status(HTTP_STATUS.NOT_FOUND.CODE).json(error);
        }

        if (!memberId) {
            error.message= HTTP_STATUS.UNAUTHORIZED.MESSAGE;
            logger.error("Broken authentication token");
            return response.writeJson(res, error, HTTP_STATUS.UNAUTHORIZED.CODE);
        }

        const memberUpdate = await Member.update(memberId, updates);

        if (!memberUpdate) {
            error.message = 'Details could not be updated';
            logger.error(message);
            return response.writeJson(res, error, HTTP_STATUS.INTERNAL_SERVER_ERROR.CODE);
        }
        success = memberUpdate
        return response.writeJson(res, success, HTTP_STATUS.OK.CODE);


    } catch (error) {
        logger.error(`Error occured while updating member ${error.message}`);
        return response.writeJson(res, error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR.CODE);

    }
}
