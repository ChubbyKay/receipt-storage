// const express = require('express')
// const router = express.Router()

// const passport = require('../config/passport')

const userController = require('../controllers/userController')
const tagController = require('../controllers/tagController')
const receiptController = require('../controllers/receiptController')

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
  app.get('/', authenticated, (req, res) => { res.redirect('/user/receipts') })
  app.get('/user', authenticated, (req, res) => { res.redirect('/user/receipts') })
  app.get('/user/receipts', authenticated, receiptController.getReceipts)
  app.get('/user/create', authenticated, receiptController.createReceipt)
  app.post('/user/receipts', authenticated, receiptController.postReceipt)
  app.get('/user/receipts/:id/edit', authenticated, receiptController.editReceipt)
  app.put('/user/receipts/:id', authenticated, receiptController.putReceipt)

  // 標籤相關路由設定
  app.get('/user/tags', authenticated, tagController.getTags)
  app.post('/user/tags', authenticated, tagController.postTag)
  app.get('/user/tags/:id', authenticated, tagController.getTags)
  app.put('/user/tags/:id', authenticated, tagController.putTag)
  app.delete('/user/tags/:id', authenticated, tagController.deleteTag)

  // module.exports = router

}
