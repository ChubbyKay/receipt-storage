const express = require('express');
const router = express.Router();
const passport = require('../config/passport')

const userController = require('../controllers/userController')
const tagController = require('../controllers/tagController')
const receiptController = require('../controllers/receiptController')

// 使用者認證檢查
const authenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/signin')
}

// 登入及登出路由設定
router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)
router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
router.get('/signOut', userController.signOut)

// 發票相關路由設定
router.get('/', authenticated, (req, res) => { res.redirect('/user/receipts') })
router.get('/receipts', authenticated, receiptController.getReceipts)
router.get('/create', authenticated, receiptController.createReceipt)
router.post('/receipts', authenticated, receiptController.postReceipt)
router.get('/receipts/:id/edit', authenticated, receiptController.editReceipt)
router.put('/receipts/:id', authenticated, receiptController.putReceipt)

// 標籤相關路由設定
router.get('/tags', authenticated, tagController.getTags)
router.post('/tags', authenticated, tagController.postTag)
router.get('/tags/:id', authenticated, tagController.getTags)
router.put('/tags/:id', authenticated, tagController.putTag)
router.delete('/tags/:id', authenticated, tagController.deleteTag)

module.exports = router