const express = require('express');
const router = express.Router();
const passport = require('../config/passport')

const receiptController = require('../controllers/api/receiptController')
const tagController = require('../controllers/api/tagController')
const userController = require('../controllers/api/userController')

const authenticated = passport.authenticate('jwt', { session: false })

//登入&登出路由
router.post('/signin', userController.signIn)

// 發票相關路由
router.get('/', authenticated, (req, res) => res.redirect('/api/receipts'))
router.get('/receipts', authenticated, receiptController.getReceipts)
router.post('/receipts', authenticated, receiptController.postReceipt)
router.put('/receipts/:id', authenticated, receiptController.putReceipt)

// 標籤相關路由
router.get('/tags', authenticated, tagController.getTags)
router.post('/tags', authenticated, tagController.postTag)
router.get('/tags/:id', authenticated, tagController.getTags)
router.put('/tags/:id', authenticated, tagController.putTag)
router.delete('/tags/:id', authenticated, tagController.deleteTag)

module.exports = router