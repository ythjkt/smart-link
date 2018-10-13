const Validator = require('validator')
const isEmpty = require('../../utils/isEmpty')

// @params req.body
module.exports = function validateRegisterInput(data) {
  const errors = {}
  const { email = '', password = '', password2 = '' } = data

  if (Validator.isEmpty(email)) {
    errors.email = 'Email field is required'
  }

  if (!Validator.isEmail(email)) {
    errors.email = 'Invalid email'
  }

  if (Validator.isEmpty(password)) {
    errors.password = 'Password field is required'
  }

  if (!Validator.isLength(password, { min: 6, max: 30 })) {
    errors.password = 'Password must be between 6 and 30 characters'
  }

  if (!Validator.equals(password, password2)) {
    errors.password2 = 'Passwords must match'
  }

  if (Validator.isEmpty(password2)) {
    errors.password2 = 'Confirm password field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
