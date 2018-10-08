const Validator = require('validator')
const isEmpty = require('../../utils/isEmpty')

// @params req.body
module.exports = function targetUrlValidator(data) {
  const errors = {}
  const { targetUrl = '' } = data

  if (!Validator.isURL(targetUrl)) {
    errors.targetUrl = 'Invalid URL'
  }

  if (Validator.isEmpty(targetUrl)) {
    errors.targetUrl = 'targetUrl field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}