const receiptService = require('../../services/receiptService')

const receiptController = {
  getReceipts: (req, res) => {
    receiptService.getReceipts(req, res, (data) => {
      return res.json(data)
    })
  },
  postReceipt: (req, res) => {
    receiptService.postReceipt(req, res, (data) => {
      return res.json(data)
    })
  },
  putReceipt: (req, res) => {
    receiptService.putReceipt(req, res, (data) => {
      return res.json(data)
    })
  },
}
module.exports = receiptController