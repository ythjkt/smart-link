const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { secretOrKey } = require('../../../config')

const validateRegisterInput = require('./validateRegisterInput')

// @route   POST /users/register 
// @desc    Register user
// @access  Public
function registerUser(req, res) {
  const { errors, isValid } = validateRegisterInput(req.body)

  // Check if validation has passed
  if (!isValid) {
    return res.status(400).json(errors)
  }
  
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = 'Email already registered'
        return res.status(400).json(errors)
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        })

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
          })
        })
      }
    })
}

// @route   GET /users/login
// @desc    Returns JWT
// @access  Public
function loginUser(req, res) {
  const errors = {}
  const { email, password } = req.body

  User.findOne({ email })
    .then(user => {
      if (!user) {
        errors.email = 'User not found'
        return res.status(400).json(errors)
      }
      
      // Check if password is correct
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = { id: user.id, name: user.name }
            
            jwt.sign(
              payload,
              secretOrKey,
              { expiresIn: 604800 }, // Expires in a week
              (err, token) => {
                res.json({
                  success: true,
                  token: `Bearer ${token}`
                })
              }
            )
          } else {
            errors.password = 'Invalid password'
            return res.status(400).json(errors)
          }
        })
    })
}

// @route   GET /users/current
// @desc    Returns current user
// @access  Private
function getCurrentUser(req, res) {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  })
}

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser
}