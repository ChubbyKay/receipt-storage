const db = require('../models')
const Receipt = db.Receipt
const Tag = db.Tag

const receiptController = {
  getReceipts: (req, res) => {
    return Receipt.findAll({
      raw: true, nest: true, include: [Tag]
    }).then((receipts) => {
      return res.render('user/receipts', { receipts: receipts })
    })
  },
  createReceipt: (req, res) => {
    return Tag.findAll({
      raw: true,
      nest: true
    }).then((tags) => {
      return res.render('user/create', {
        tags: tags
      })
    })
  },
  postReceipt: (req, res) => {
    return Receipt.create({
      merchant: req.body.merchant,
      TagId: req.body.tagId,
      item: req.body.item,
      amount: req.body.amount,
      date: req.body.date,
    })
      .then((receipt) => {
        req.flash('success_messages', '成功建立發票')
        res.redirect('/receipts')
      })
  },
  editReceipt: (req, res) => {
    return Tag.findAll({
      raw: true,
      nest: true
    }).then((tags) => {
      return Receipt.findByPk(req.params.id, { raw: true })
        .then((receipt) => {
          return res.render('user/create', {
            tags: tags,
            receipt: receipt,
          })
        })
    })
  },
  putReceipt: (req, res) => {
    return Receipt.findByPk(req.params.id)
      .then((receipt) => {
        receipt.update({
          TagId: req.body.tagId,
        })
          .then((receipt) => {
            req.flash('success_messages', '成功更新發票資訊')
            res.redirect('/receipts')
          })
      })
  }
}
module.exports = receiptController