const router = require('express').Router()

let store

router.post('/login', function login(req, res) {
  const user = store.findOne(req.body)

  if (user) {
    console.log(user.id, 'login')
    return res.status(200).json(user)
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

router.put('/signup', function signup(req, res) {
  res.json({})
})

router.post('/retrivepass', function retrivePassword(req, res) {
  res.json({})
})

module.exports = function getRouter(config) {
  store = config.store
  return router
}
