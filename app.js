const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('./config/passport')
const flash = require('connect-flash')

const app = express()
const port = 3000

app.engine('handlebars', handlebars({
  defaultLayout: 'main', helpers: require('./config/handlebars-helpers')
}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  secret: 'MySecret',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  res.locals.user = req.user
  next()
})

// app.post('/users/login', passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/users/login'
// }))

// app.get('/', (req, res) => {
//   res.render('signup')
// })

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})

require('./routes')(app, passport)
module.exports = app