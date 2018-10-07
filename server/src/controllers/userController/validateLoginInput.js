const Validator = require('validator')
const isEmpty = require('../../utils/isEmpty')

module.exports = function validateLoginInput(data) {
  const errors = {}
  const {
    email = '',
    password = ''
  } = data

  if (Validator.isEmpty(email)) {
    errors.email = 'Email field is required'
  }

  if (!Validator.isEmail(email)) {
    errors.email = 'Invalid email'
  }

  if (Validator.isEmpty(password)) {
    console.log('checking password')
    errors.password = 'Password field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}