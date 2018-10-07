const { Router } = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')

const router = Router()

// @route   POST /users/register 
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  const errors = {}

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
})

module.exports = router