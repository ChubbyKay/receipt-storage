const db = require('../../models')
const Receipt = db.Receipt
const Tag = db.Tag

const receiptController = {
  getReceipts: (req, res) => {
    return Receipt.findAll({
      raw: true, nest: true, include: [Tag]
    }).then(receipts => {
      return res.json({ receipts: receipts })
    })
  }
}
module.exports = receiptController