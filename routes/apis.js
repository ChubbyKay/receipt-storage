const express = require('express');
const router = express.Router();

const receiptController = require('../controllers/api/receiptController')
const tagController = require('../controllers/api/tagController')
const userController = require('../controllers/api/userController')

//登入&登出路由
router.post('/signin', userController.signIn)

// 發票相關路由
router.get('/receipts', receiptController.getReceipts)
router.post('/receipts', receiptController.postReceipt)
router.put('/receipts/:id', receiptController.putReceipt)

// 標籤相關路由
router.get('/tags', tagController.getTags)
router.post('/tags', tagController.postTag)
router.get('/tags/:id', tagController.getTags)
router.put('/tags/:id', tagController.putTag)
router.delete('/tags/:id', tagController.deleteTag)

module.exports = router