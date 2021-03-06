const assert = require('assert')
const mongodb = require('mongo-mock')
const MongoClient = mongodb.MongoClient
const expected = require('./expected/post')
const fixtures = require('./fixtures/users')

const url = 'mongodb://localhost:27017/users'

describe('Create user', () => {
  it('should create a user document', () => {
    MongoClient.connect(url, (err, db) => {
      if (err) throw err
      const collection = db.collection('users')
      collection.insertMany(fixtures, (err, result) => {
        if (err) throw err
        collection.insertOne({
          _id: '5a2dc1a123750054headb9e0',
          email: 't.test@gmail.com',
          forename: 't',
          surname: 'test',
          created: '2017-12-10T21:22:30.886Z'
        }, (err, result) => {
          if (err) throw err
          assert.deepEqual(expected, result.ops)
          assert.equal(result.insertedCount, 1)
        })
      })
      db.close()
    })
  })
})
