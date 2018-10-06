const { Router } = require('express')
const smartLinkController = require('../controllers/smartLinkController')

const router = Router()

// @route  GET /:hash
// @desc   Get item by id
// @access Public
router.get('/:hash', smartLinkController.redirectUrl)

// @route  GET /
// @desc   Get all urls
// @access Public
router.get('/', smartLinkController.getUrls)

// @route  POST /
// @desc   Generate url
// @access Public
router.post('/', smartLinkController.createUrl)

// @route  PUT /
// @desc   Update url
// @access Public
router.put('/:id', smartLinkController.updateUrl)

// @route  DELETE /
// @desc   Delete url
// @access Public
router.delete('/:id', smartLinkController.deleteUrl)

module.exports = router;
