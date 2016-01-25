'use nodent-promise';
'use nodent-es7'
'use strict'

const router = require('express').Router()
const MongoUserStore = require('../user-stores/mongo')

let store

router.post('/login', async function login(req, res) {
  const user = await store.findOne(req.body)
  console.log('found', user)
  if (user) {
    console.log(user.username, 'login')
    return res.status(200).json({
      status: 0,
    })
  }
  console.log('login failed')
  return res.status(403).json({
    status: 1,
    error: 'Wrong username/password',
  })
})

router.get('/captcha', function getCaptcha(req, res) {
  res.json({})
})

router.put('/signup', async function signup(req, res) {
  const check = await store.findOne({ username: req.body.username })
  if (check) {
    console.log('Username exists')
    return res.status(409).json({
      status: 1,
      error: 'Username already exists',
    })
  }
  await store.add(req.body)
  res.json({
    username: req.body.username,
  })
})

router.post('/retrivepass', function retrivePassword(req, res) {
  res.json({})
})

module.exports = function getRouter(config) {
  store = new MongoUserStore(config)
  store.connect()
  return router
}
