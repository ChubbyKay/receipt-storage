const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User
const Receipt = db.Receipt
const Tag = db.Tag

const userController = {
  signUpPage: (req, res) => {
    return res.render('signup')
  },

  signUp: (req, res) => {
    if (req.body.checkPassword !== req.body.password) {
      req.flash('error_messages', '請再次確認密碼')
      return res.redirect('/signup')
    } else {
      User.findOne({ where: { email: req.body.email } }).then(user => {
        if (user) {
          req.flash('error_messages', '信箱已註冊')
          return res.redirect('/signup')
        } else {
          User.findOne({ where: { account: req.body.account } }).then(user => {
            if (user) {
              req.flash('error_messages', '帳號已註冊!')
              return res.redirect('/signup')
            } else {
              User.create({
                email: req.body.email,
                name: req.body.name,
                account: req.body.account,
                password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
              }).then(() => {
                req.flash('success_messages', '帳號註冊成功')
                return res.redirect('/signin')
              })
            }
          })
        }
      })
    }
  },
  signInPage: (req, res) => {
    return res.render('signin')
  },
  signIn: (req, res) => {
    req.flash('success_messages', '登入成功')
    res.redirect('/user/receipts')
  },
  signOut: (req, res) => {
    req.flash('success_messages', '用戶已登出')
    res.redirect('/signin')
  },

  getReceipts: (req, res) => {
    return Receipt.findAll({
      raw: true, nest: true, include: [Tag]
    }).then(receipts => {
      return res.render('user/receipts', { receipts: receipts })
    })
  }
}
module.exports = userController