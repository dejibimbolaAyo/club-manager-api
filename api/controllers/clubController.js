const {validationResult} = require('express-validator')
const logger = require("../config/logger");
const Club = require("../services/clubService");
const {HTTP_STATUS} = require("../constants/httpStatus");

let {error, success} = require("../constants/response");
let response = require("../helper/responseWriter");

/**
 * Get users
 */
exports.getClubs = async function (req, res) {
    try {
      const clubs = await Club.getClubs();
  
      if (!clubs.status) {
        error.message = "No clubs found";
        return response.writeJson(res, error, HTTP_STATUS.NOT_FOUND.CODE)
      }
      success = clubs;
      return response.writeJson(res, success, HTTP_STATUS.OK.CODE)
  
    } catch (err) {
      logger.log("error", `Error occured, ${err}`);
      error.message = err.message || err._message;
      return response.writeJson(res, {message: error.message, status: false}, HTTP_STATUS.INTERNAL_SERVER_ERROR.CODE)
    }
  }
  