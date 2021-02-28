const db = require('../models')
const Receipt = db.Receipt
const Tag = db.Tag

const receiptController = {
  getReceipts: (req, res, callback) => {
    const whereQuery = {}
    let tagId = ''
    if (req.query.tagId) {
      tagId = Number(req.query.tagId)
      whereQuery.TagId = tagId
    }
    Receipt.findAll({
      raw: true, nest: true, include: [Tag], where: whereQuery
    }).then((receipts) => {
      Tag.findAll({ raw: true, nest: true })
        .then((tags) => {
          return callback({
            receipts: receipts, tags: tags, tagId: tagId
          })
        })
    })
  },
  postReceipt: (req, res, callback) => {
    if (!req.body.merchant) {
      return callback({ status: 'error', message: "請填寫商家名稱" })
    } else {
      return Receipt.create({
        merchant: req.body.merchant,
        TagId: req.body.tagId,
        item: req.body.item,
        amount: req.body.amount,
        date: req.body.date,
      }).then((receipt) => {
        callback({ status: 'success', message: '已成功建立發票' })
      })
    }
  },
  putReceipt: (req, res, callback) => {
    if (!req.body.TagId) {
      return callback({ status: 'error', message: "請選擇標籤" })
    }
    return Receipt.findByPk(req.params.id)
      .then((receipt) => {
        receipt.update({
          TagId: req.body.tagId,
        })
          .then((receipt) => {
            callback({ status: 'success', message: '已成功更新標籤' })
          })
      })
  }
}
module.exports = receiptController