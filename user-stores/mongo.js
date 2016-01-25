'use nodent-promise';
'use nodent-es7'
'use strict'

const MongoClient = require('mongodb').MongoClient

function getMongoUrl(opts) {
  let auth = ''
  if (opts.password && opts.username)
    auth += `${opts.username}:${opts.password}@`
  const host = opts.host || 'localhost'
  const port = opts.port || '27017'
  return `mongodb://${auth}${host}:${port}/${opts.db}`
}

class MongoUserStore {
  constructor(opts) {
    this.url = getMongoUrl(opts)
  }

  async connect() {
    this.client = await MongoClient.connect(this.url)
    this.users = this.client.collection('user')
  }

  find(opts) {
    return this.users.find(opts)
  }

  findOne(opts) {
    return this.users.findOne(opts)
  }

  add(user) {
    // TODO: validation
    return this.users.insert(user)
  }

  remove(opts) {
    return this.users.deleteOne(opts)
  }

  update(query, opts) {
    return this.users.update(query, opts)
  }
}

module.exports = MongoUserStore
