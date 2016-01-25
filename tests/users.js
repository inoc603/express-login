'use strict'

const request = require('request')
const _ = require('lodash')
const expect = require('chai').expect

const account = {
  username: Date.now().toString(),
  password: 'pass',
}

function getUrl(endpoint) {
  return `http://127.0.0.1:3030/users/${endpoint}`
}

describe('User routes test', () => {
  describe('sign up', () => {
    it('should create an account', (cb) => {
      request.put(getUrl('signup'), {
        body: account,
        json: true,
      }, (e, r, b) => {
        console.log(b)
        expect(e).to.not.exists
        expect(r.statusCode).to.equal(200)
        cb()
      })
    })

    it('should create an account', (cb) => {
      request.put(getUrl('signup'), {
        body: account,
        json: true,
      }, (e, r, b) => {
        expect(e).to.not.exists
        expect(r.statusCode).to.equal(409)
        expect(b.status).to.equal(1)
        expect(b.error).to.equal('Username already exists')
        cb()
      })
    })
  })

  describe('login', () => {
    it('should login with the created account', (cb) => {
      request.post(getUrl('login'), {
        body: account,
        json: true,
      }, (e, r, b) => {
        expect(e).to.not.exists
        expect(r.statusCode).to.equal(200)
        expect(b.status).to.equal(0)
        cb()
      })
    })

    it('should failed to login with the wrong password', (cb) => {
      const wrongAuth = _.clone(account)
      wrongAuth.password = Date.now().toString()
      request.post(getUrl('login'), {
        body: wrongAuth,
        json: true,
      }, (e, r, b) => {
        expect(r.statusCode).to.equal(403)
        expect(e).to.not.exists
        expect(b.status).to.equal(1)
        expect(b.error).to.equal('Wrong username/password')
        cb()
      })
    })
  })
})
