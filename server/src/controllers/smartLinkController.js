const validUrl = require("valid-url");
const shortid = require("shortid");
const SmartLink = require('../models/SmartLink');
const { base_url } = require('../../config')

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
  SmartLink.find()
    .then(items => res.json(items))
}

// @desc Generate url
function createUrl(req, res) {
  const errors = {}
  const { targetUrl } = req.body

  if (!validUrl.isUri(targetUrl)) {
    errors.targetUrl = 'Invalid Url'
    return res.status(400).json(errors)
  } else {
    const hash = shortid.generate()
    const smartLink = `${base_url}/${hash}`;
    const item = new SmartLink({
      targetUrl,
      smartLink,
      hash
    })
    item.save()
      .then(item => {
        return res.json(item)
      })
      .catch(err => {
        errors.db = 'Unable to save to database'
        return res.status(400).json(errors)
      })
  }
}

// @desc Update targetUrl
function updateUrl(req, res) {
  const errors = {}
  const { targetUrl } = req.body
  const _id = req.params.id
  if (!validUrl.isUri(targetUrl)) {
    errors.targetUrl = 'Invalid url'
    res.status(400).json(errors)
  } else {
    SmartLink.findByIdAndUpdate({_id}, { targetUrl }, (err, item) => {
      if (err) res.status(400).json(err)
      else res.json({ msg: 'Update Successful', item})
    })
  }
}

// @desc remove smartlink
function deleteUrl(req, res) {
  const _id = req.params.id
  SmartLink.findByIdAndRemove({ _id }, (err, item) => {
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
