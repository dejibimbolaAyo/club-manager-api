const { role } = require("../../constants/roles");
const { HTTP_STATUS } = require("../../constants/httpStatus");

exports.isAdmin = function (req, res, next) {
  if (req.user.role !== role.ADMIN) {
    res.status(HTTP_STATUS.UNAUTHORIZED.CODE)
    res.end(`${HTTP_STATUS.UNAUTHORIZED.MESSAGE} as a member.`)
  } else {
    next()
  }
}

exports.isMember = function (req, res, next) {
  console.log(req.user)
  if (req.user.role !== role.MEMBER) {
    res.status(HTTP_STATUS.UNAUTHORIZED.CODE)
    res.end(`${HTTP_STATUS.UNAUTHORIZED.MESSAGE} as a member.`)
  } else {
    next()
  }
}