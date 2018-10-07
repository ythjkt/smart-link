const Validator = require('validator')
const isEmpty = require('../../utils/isEmpty')

module.exports = function validateRegisterInput(data) {
  const errors = {}
  const {
    name = '',
    email = '',
    password = '',
    password2 = ''
  } = data

  if (!Validator.isLength(name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters'
  }

  if (Validator.isEmpty(name)) {
    errors.name = 'Name field is required'
  }
  
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

  if (!Validator.isLength(password, { min: 6, max: 30})) {
    errors.password = 'Password must be between 6 and 30 characters'
  }
  
  if (!Validator.equals(password, password2)) {
    errors.password2 = 'Passwords must match'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}