const {check} = require('express-validator');
const User = require("../../services/userService")

// Validator
exports.validate = (method) => {
  switch (method) {
    case 'createUser':
      {
        return [
          check('firstName', "Please provide a valid first name")
            .not()
            .isEmpty()
            .isAlpha()
            .exists(),
          check('lastName', "Please provide a valid last name")
            .not()
            .isEmpty()
            .exists(),
          check('email', `Invalid email`)
            .exists()
            .isEmail()
            .not()
            .custom(emailExists)
            .withMessage("Email already exists in database"),
          check('phone').isInt(),
          check('password', "Provide a valid email")
            .not()
            .isEmpty()
            .withMessage('Password cannot be empty')
            .exists()
            .withMessage('Password is required')
        ]
      }
    case 'authUser':
      {
        return [
          check('email', "Please provide a valid email")
            .exists()
            .isEmail(),
          check('password', "Please enter your password")
            .exists()
            .withMessage('Password is required')
            .isLength({min: 8, max: 12})
            .withMessage('Enter a minimum of 8 characters and a maximum of 12 characters valid password')
            .not()
            .isEmpty()
            .withMessage('Password cannot be empty')
        ]
      }
  }
}

const emailExists = async(email) => {
  const user = await User.findByEmail(email)

  if (user.status) {
    return true
  }
  throw 0;
}
