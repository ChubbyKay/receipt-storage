// const express = require('express')
// const router = express.Router()

// const passport = require('../config/passport')

const userController = require('../controllers/userController')

module.exports = (app, passport) => {
  // 使用者認證檢查
  const authenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/signin')
  }

  // 登入及登出路由設定
  app.get('/signup', userController.signUpPage)
  app.post('/signup', userController.signUp)
  app.get('/signin', userController.signInPage)
  app.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
  app.get('/signOut', userController.signOut)

  // 發票相關路由設定
  app.get('/user', authenticated, (req, res) => { res.redirect('/user/receipts') })
  app.get('/user/receipts', authenticated, userController.getReceipts)
  app.get('/user/create', authenticated, userController.createReceipt)
  app.post('/user/receipts', authenticated, userController.postReceipt)
  // module.exports = router

}
