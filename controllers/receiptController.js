const db = require('../models')
const Receipt = db.Receipt
const Tag = db.Tag
const receiptService = require('../services/receiptService')

const receiptController = {
  getReceipts: (req, res) => {
    receiptService.getReceipts(req, res, (data) => {
      return res.render('user/receipts', data)
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
    receiptService.postReceipt(req, res, (data) => {
      if (data['status'] === 'error') {
        req.flash('error_messages', data['message'])
        return res.redirect('back')
      } else {
        req.flash('success_messages', data['message'])
        res.redirect('/receipts')
      }
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
    receiptService.putReceipt(req, res, (data) => {
      if (data['status'] === 'error') {
        req.flash('error_messages', data['message'])
        return res.redirect('back')
      } else {
        req.flash('success_messages', data['message'])
        res.redirect('/receipts')
      }
    })
  },
}
module.exports = receiptController