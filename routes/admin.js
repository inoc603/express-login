const router = require('express').Router()

router.get('/users', function getUsers(req, res) {
  res.json({})
})

router.del('/user', function deleteUser(req, res) {
  res.json({})
})

router.patch('/user', function updateUser(req, res) {
  res.json({})
})

router.put('/user', function createUser(req, res) {
  res.json({})
})

module.exports = router
