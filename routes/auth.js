const db = require('../db.js')

const express = require('express')
const router = express.Router()
const passport = require('../passport.js')
const bcrypt = require('bcrypt')
router.get('/register', alreadyAuthenticated, (req, res, next) => {
  res.render('auth.ejs', {
    title: 'Register',
    route: '/auth/register'
  })
})
router.post('/register', async (req, res, next) => {
  let foundUser = await db.query('SELECT * FROM users WHERE username = $1', [req.body.username])
  if (foundUser.rows[0]) {
    res.redirect('/auth/register')
  }
  else {
    let hashedPassword = await bcrypt.hash(req.body.password, 10)
    await db.query('INSERT INTO users (username, password) VALUES ($1, $2)', [req.body.username, hashedPassword])
    res.redirect('/auth/login')
  }
})
router.get('/login', alreadyAuthenticated, (req, res, next) => {
  res.render('auth.ejs', {
    title: 'Login',
    route: '/auth/login'
  })
})
router.post('/login', passport.authenticate('local', {
  failureRedirect: '/auth/login',
  successRedirect: '/secure'
}))
router.get('/logout', (req, res, next) => {
  if (req.isAuthenticated()) {
    req.logout()
    res.redirect('/')
  }
  else {
    res.redirect('back')
  }
})
module.exports = router

function alreadyAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('back')
  }
  else {
    next()
  }
}