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

module.exports = passport