require('dotenv').config()

const session = require('express-session')
const pgStore = require('connect-pg-simple')(session)

const express = require('express')
const app = express()
const passport = require('./passport.js')
const authRoute = require('./routes/auth.js')
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/views'))
app.use(express.urlencoded({ extended: true }))
app.use(session({
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 28 // 4 weeks
  },
  resave: false,
  saveUninitialized: false,
  secret: process.env.LOCAL_SECRET,
  store: new pgStore({
    conString: process.env.DB_STRING
  })
}))
app.use(passport.initialize())
app.use(passport.session())
app.use('/auth', authRoute)
app.get('/', (req, res, next) => {
  res.render('main.ejs', {
    title: 'Home'
  })
})
app.get('/secure', authCheck, (req, res, next) => {
  res.render('main.ejs', {
    title: 'Secure'
  })
})
app.get('/401', (req, res, next) => {
  res.render('error.ejs', {
    title: 'Error',
    errorStatus: 401,
    errorMessage: 'Unauthorized'
  })
})
app.get('*', (req, res, next) => {
  res.render('error.ejs', {
    title: 'Error',
    errorStatus: 404,
    errorMessage: 'Not Found'
  })
})
app.listen(process.env.PORT, () => {
  console.log(`App is now running on port ${process.env.PORT}`)
})

function authCheck(req, res, next) {
  if (req.isAuthenticated()) {
    next()
  }
  else {
    res.redirect('/401')
  }
}