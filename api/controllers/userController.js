const {validationResult} = require('express-validator')
const logger = require("../config/logger");

const User = require("../services/userService");
const Member = require("../services/memberService");
const Admin = require("../services/adminService");

const {HTTP_STATUS} = require("../constants/httpStatus");
const {role} = require("../constants/roles");
const {getHash, getSalt, compareHash} = require("../helper/crypt")
const {generateJWT} = require("../helper/jwt")

let {error, success} = require("../constants/response");
let response = require("../helper/responseWriter");

/**
 * Authenticate Users
 */
exports.authenticate = async function (req, res) {

  const plainPassword = req.body.password;
  const email = req.body.email;

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      error.data = errors.array()
      return response.writeJson(res, error, 422)
    }

    let user = await User.findByEmail(email);

    if (!user.status) {
      error = {
        status: user.status,
        message: user.message
      };
      logger.error(error);
      return response.writeJson(res, {
        message: error.message,
        status: false
      }, HTTP_STATUS.NOT_FOUND.CODE)
    }

    user = user.data

    const isPasswordValid = await user.verifyPassword(plainPassword)

    if (isPasswordValid.status) {
      const token = generateJWT(email, role.user);

      success = {
        status: true,
        token
      };
      return response.writeJson(res, success, HTTP_STATUS.OK.CODE)
    }
    error = {
      status: false,
      message: "Incorrect password or email"
    }
    return response.writeJson(res, {
      message: error.message,
      status: false
    }, HTTP_STATUS.FORBIDDEN.CODE)

  } catch (err) {
    logger.log("error", `Error occured while authenticating, ${err}`);
    error = {
      status: false,
      message: err.message || err._message
    }
    return response.writeJson(res, error, HTTP_STATUS.INTERNAL_SERVER_ERROR.CODE)
  }
};

/**
 * Get users
 */
exports.getUsers = async function (req, res) {

  try {
    const users = await User.findAll();

    if (!users.status) {
      error.message = "No users found";
      return response.writeJson(res, error, HTTP_STATUS.NOT_FOUND.CODE)
    }
    success = users;
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
 * Get user details
 */
exports.getUser = async function (req, res) {}

exports.find = async function (req, res) {
  const {query} = req.params

  try {
    const result = await User.find(query)
    if (!result.status) {
      error.message = `${query} does not exist, ${result.message}`;
      return response.writeJson(res, error, HTTP_STATUS.NOT_FOUND.CODE)
    }
    success = result;
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
 * Create member
 */
exports.createMember = async function (req, res) {
  let data = req.body
  data.role = "MEMBER"

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      error.data = errors.array()
      return response.writeJson(res, error, 422)
    }

    let member = {}
    const user = await User.create(data);

    if (user.status) {
      // create member profile with basic details to be updated later
      member = await Member.create({
        user: user.data._id
      })
    }

    success.data = {
      user:user.data,
      member: member.data
    };

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
 * Create admin
 */
exports.createAdmin = async function (req, res) {
  let data = req.body
  data.role = "ADMIN"

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      error.data = errors.array()
      return response.writeJson(res, error, 422)
    }

    let admin = {}
    const user = await User.create(data);

    if (user.status) {
      // create admin profile
      admin = await Admin.create({
        user: user.data._id
      });
    }

    success.data = {
      user:user.data,
      admin: admin.data
    };
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
 * Delete member
 */
exports.deleteMember = async function (req, res) {}

/**
 * Delete admin
 */
exports.deleteAdmin = async function (req, res) {}