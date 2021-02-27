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
  // app.get('/user', authenticated, (req, res) => { res.redirect('/user/receipts') })
  app.get('/receipts', authenticated, receiptController.getReceipts)
  app.get('/create', authenticated, receiptController.createReceipt)
  app.post('/receipts', authenticated, receiptController.postReceipt)
  app.get('/receipts/:id/edit', authenticated, receiptController.editReceipt)
  app.put('/receipts/:id', authenticated, receiptController.putReceipt)

  // 標籤相關路由設定
  app.get('/tags', authenticated, tagController.getTags)
  app.post('/tags', authenticated, tagController.postTag)
  app.get('/tags/:id', authenticated, tagController.getTags)
  app.put('/tags/:id', authenticated, tagController.putTag)
  app.delete('/tags/:id', authenticated, tagController.deleteTag)

  // module.exports = router

}
