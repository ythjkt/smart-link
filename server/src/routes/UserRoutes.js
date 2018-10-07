const { Router } = require('express')
const passport = require('passport')
const userController = require('../controllers/userController')

const router = Router()

// @route   POST /users/register 
// @desc    Register user
// @access  Public
router.post('/register', userController.registerUser)

// @route   GET /users/login
// @desc    Returns JWT
// @access  Public
router.post('/login', userController.loginUser)

// @route   GET /users/current
// @desc    Returns current user
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  userController.getCurrentUser
)

module.exports = router