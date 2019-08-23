const { role } = require("../../constants/roles");
const { HTTP_STATUS } = require("../../constants/httpStatus");

export const isAdmin = function (req, res, next) {
  if (req.user.role !== role.ADMIN) {
    res.status(HTTP_STATUS.UNAUTHORIZED.CODE)
    res.end(`${HTTP_STATUS.UNAUTHORIZED.MESSAGE} as a member.`)
  } else {
    next()
  }
}

export const isUser = function (req, res, next) {
  if (req.user.role !== role.USER) {
    res.status(HTTP_STATUS.UNAUTHORIZED.CODE)
    res.end(`${HTTP_STATUS.UNAUTHORIZED.MESSAGE} as a member.`)
  } else {
    next()
  }
}