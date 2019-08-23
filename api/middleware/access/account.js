const {HTTP_STATUS} = require("../../constants/httpStatus");

exports.isVerified = function (req, res, next) {
  if (!req.user.authUser.verified) {
    res.status(HTTP_STATUS.UNAUTHORIZED.CODE)
    res.end(`Verify your account before you can access this resource.`)
  } else {
    next()
  }
}