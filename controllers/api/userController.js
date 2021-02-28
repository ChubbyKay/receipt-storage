const bcrypt = require('bcryptjs')
const db = require('../../models')
const User = db.User

const jwt = require('jsonwebtoken')
const passportJWT = require('passport-jwt')
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

let userController = {
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
              }).then((user) => {
                return res.json({ status: 'success', message: '帳號註冊成功' })
              })
            }
          })
        }
      })
    }
  },
  signIn: (req, res) => {
    if (!req.body.email || !req.body.password) {
      return res.json({ status: 'error', message: "請確實填寫登入資訊" })
    }
    let username = req.body.email
    let password = req.body.password

    User.findOne({ where: { email: username } }).then(user => {
      if (!user) {
        return res.status(401).json({ status: 'error', message: '用戶未註冊' })
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ status: 'error', message: '請再次確認密碼' })
      }
      let payload = { id: user.id }
      let token = jwt.sign(payload, process.env.JWT_SECRET)
      return res.json({
        status: 'success',
        message: 'ok',
        token: token,
        user: {
          id: user.id, name: user.name, email: user.email, account: user.account
        }
      })
    })
  }
}
module.exports = userController
