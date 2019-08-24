const {check} = require('express-validator');
const User = require("../../services/userService")
const Profile = require("../../services/profileService")

// Validator
exports.validate = (method) => {
  switch (method) {
    case 'createUser':
      {
        return [
          check('email', `Invalid email`)
            .exists()
            .withMessage('Email is required')
            .isEmail()
            .not()
            .custom(emailExists)
            .withMessage("Email already exists in database"),
          check('password', "Provide a valid password")
            .exists()
            .withMessage('Password is required')
            .not()
            .isEmpty()
            .withMessage('Password cannot be empty')
            .isLength({min: 6, max: 16})
            .withMessage("Password shoulld contain a minimum of 6 and a maximum of 16 characters")
        ]
      }
    case 'updateUser':
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
          check('address', "Please provide a valid address")
            .not()
            .isEmpty()
            .optional(),
          check('phone', `Please provide a valid phone number`)
            .exists()
            .trim()
            .customSanitizer(sanitizePhoneNo)
            .isMobilePhone()
            .not()
            .custom(phoneExists)
            .withMessage("User with the provided phone number already exists in database"),
          check('status', "Please provide a valid status")
            .optional()
            .isIn(["ACTIVE", "SUSPENDED"])
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

const phoneExists = async(phoneNumber) => {
  const profile = await Profile.findByPhone(phoneNumber)

  if (profile.status) {
    return true
  }
  throw 0;
}

const sanitizePhoneNo = (phoneNo) => {
  // return valid phone number without the + sign
  return `${phoneNo.replace('+', '')}`
}
