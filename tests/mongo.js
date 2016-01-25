'use nodent-promise';
'use nodent-es7'
'use strict'

const MongoUserStore = require('../user-stores/mongo')
const expect = require('chai').expect
const _ = require('lodash')

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

  it('should insert a doc', async () => {
    const res = await store.add(rec)
    expect(res).to.exist
  })

  it('should find the doc', async () => {
    const res = await store.findOne(rec)
    // console.log(res)
    expect(res).to.exist
  })

  it('should update the doc', async () => {
    const newRec = _.clone(rec)
    newRec.changed = 1
    const res = await store.update(rec, newRec)
    // console.log(res)
    expect(res).to.exist
  })

  it('should delete the doc', async () => {
    await store.remove(rec)
    const res = await store.findOne(rec)
    console.log(res)
  })
})
