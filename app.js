require('./lib/loader')

const express = require('express'),
      // path = require('path'),
      logger = require('morgan'),
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser'),
      http = require('http')

const users = require('./routes/user')

const app = express()

app.set('port', 3030)

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/users', users({
  db: 'login-test',
}))

app.use(function (req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use(function (err, req, res) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: err,
  })
})

const server = http.createServer(app)

server.listen(3030)
server.on('error', (err) => {
  console.log(err.stack)
})
