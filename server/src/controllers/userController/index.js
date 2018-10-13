const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { secretOrKey } = require('../../../config')

const validateRegisterInput = require('./validateRegisterInput')
const validateLoginInput = require('./validateLoginInput')

// @desc    Register user
function registerUser(req, res) {
  const { errors, isValid } = validateRegisterInput(req.body)

  // Check if validation has passed
  if (!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already registered'
      return res.status(400).json(errors)
    } else {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password
      })

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err))
        })
      })
    }
  })
}

// @desc    Returns JWT
function loginUser(req, res) {
  const { errors, isValid } = validateLoginInput(req.body)

  // Check if validation has passed
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const { email, password } = req.body

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = 'User not found'
      return res.status(400).json(errors)
    }

    // Check if password is correct
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id }

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
        errors.password = 'Incorrect password'
        return res.status(400).json(errors)
      }
    })
  })
}

// @desc    Returns current user
function getCurrentUser(req, res) {
  res.json({
    id: req.user.id,
    email: req.user.email
  })
}

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser
}
