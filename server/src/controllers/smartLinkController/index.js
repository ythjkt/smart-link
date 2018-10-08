const shortid = require("shortid")
const { base_url } = require('../../../config')

// Import models
const SmartLink = require('../../models/SmartLink')
const User = require('../../models/User')

// Import validators
const targetUrlValidator = require('./targetUrlValidator')

// @desc Redirects short_url to long_url
function redirectUrl(req, res) {
  const errors = {}
  const hash = req.params.hash

  SmartLink.findOne({ hash })
    .then(item => {
      if (item) {
        return res.redirect(item.targetUrl)
      } else {
        errors.msg = 'No such url'
        return res.status(401).json(errors)
      }
    })
}

// @desc Get all urls
function getUrls(req, res) {
  SmartLink.find({ user: req.user.id })
    .then(items => res.json(items))
}

// @desc Generate url
function createUrl(req, res) {
  const { errors, isValid } = targetUrlValidator(req.body)

   // Check if validation has passed
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const { targetUrl } = req.body
  const hash = shortid.generate()
  const smartLink = `${base_url}/${hash}`

  new SmartLink({
    user: req.user.id,
    targetUrl,
    smartLink,
    hash
  }).save()
    .then(item => {
      res.json(item)
    })
    .catch(err => {
      errors.db = 'Unable to save to database'
    })
}

// @desc Update targetUrl
function updateUrl(req, res) {
  const { errors, isValid } = targetUrlValidator(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  const { targetUrl } = req.body
  const id = req.params.id

  SmartLink.findOne({ _id: id, user: req.user.id }, { targetUrl }, (err, item) => {
    if (err) res.status(400).json(err)
    else res.json({ msg: 'Update Successful', item})
  })
}

// @desc remove smartlink
function deleteUrl(req, res) {
  const id = req.params.id
  SmartLink.findOneAndDelete({ _id: id, user: req.user.id }, (err, item) => {
    if(err) res.status(400).json(err);
    else res.json({ msg: 'Delete successful', item});
  })
}
  
module.exports = {
  redirectUrl,
  getUrls,
  createUrl,
  updateUrl,
  deleteUrl
}
