const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const mongoose = require('mongoose')
const User = require('../src/models/User')
const keys = require('../config')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = keys.secretOrKey

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
      .then(user => {
        if (user) {
          // This will add user to req.user
          return done(null, user) // (err, response)
        }
        return done(null, false)
      })
      .catch(err => console.log(err))
  }))
}