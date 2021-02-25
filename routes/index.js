// const express = require('express')
// const router = express.Router()

// const passport = require('../config/passport')

const receiptController = require('../controllers/receriptController')
const userController = require('../controllers/userController')

module.exports = (app, passport) => {
  app.get('/', (req, res) => {
    res.redirect('/receipts')
  })

  app.get('/receipts', receiptController.getReceipts)


  const authenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/signin')
  }

  // 登入及登出的路由設定
  app.get('/signup', userController.signUpPage)
  app.post('/signup', userController.signUp)
  app.get('/signin', userController.signInPage)
  app.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
  app.get('/signOut', userController.signOut)

  // module.exports = router

}
