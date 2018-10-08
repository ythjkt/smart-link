const { Router } = require('express')
const smartLinkController = require('../controllers/smartLinkController')
const passport = require('passport')

const router = Router()

// @route  GET /:hash
// @desc   Redirects user
// @access Public
router.get('/:hash', smartLinkController.redirectUrl)

// @route  GET /
// @desc   Get all urls made by current user
// @access Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  smartLinkController.getUrls
)

// @route  POST /
// @desc   Generate url
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  smartLinkController.createUrl
)

// @route  PUT /
// @desc   Update url
// @access Private
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  smartLinkController.updateUrl
)

// @route  DELETE /
// @desc   Delete url
// @access Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  smartLinkController.deleteUrl
)

module.exports = router
