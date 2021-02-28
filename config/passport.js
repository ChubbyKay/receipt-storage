const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  (req, email, password, done) => {
    User.findOne({ where: { email } })
      .then(user => {
        if (!user) {
          return done(null, false, req.flash('error_message', '帳號尚未註冊'))
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, req.flash('error_message', '密碼或帳號錯誤'))
        }
        return done(null, user)
      })
      .catch(err => done(err, false))
  }))

passport.serializeUser((user, done) => {
  done(null, user.id)
})
passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then((user) => {
      user = user.toJSON()
      return done(null, user)
    }).catch(err => done(err, null))
})

// JWT
const jwt = require('jsonwebtoken')
const passportJWT = require('passport-jwt')
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = process.env.JWT_SECRET

let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  User.findByPk(jwt_payload.id)
    .then(user => {
      if (!user) return next(null, false)
      return next(null, user)
    })
})
passport.use(strategy)

module.exports = passport