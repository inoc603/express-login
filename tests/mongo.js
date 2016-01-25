'use nodent-promise';
'use nodent-es7'
'use strict'

const MongoUserStore = require('../user-stores/mongo')
const expect = require('chai').expect

let store

const rec = {
  username: Date.now().toString(),
  password: 'pass',
}

describe('Mongo user store', () => {
  it('should init correctly', async () => {
    store = new MongoUserStore({
      db: 'login-test',
    })
    await store.connect()
    expect(store).to.exist
    expect(store.client).to.exist
  })

  it('should add insert a doc', async () => {
    const res = await store.add(rec)
    expect(res).to.exist
  })

  it('should find the doc', async () => {
    const res = await store.findOne(rec)
    console.log(res)
  })
})
