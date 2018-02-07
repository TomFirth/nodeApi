const assert = require('assert')
const mongodb = require('mongo-mock')
const MongoClient = mongodb.MongoClient
const fixtures = require('./fixtures/users')

const url = 'mongodb://localhost:27017/users'

describe('Update users', () => {
  it('should update user', () => {
    MongoClient.connect(url, (err, db) => {
      if (err) throw err
      const collection = db.collection('users')
      collection.insertMany(fixtures, (err, result) => {
        if (err) throw err
        collection.updateOne({
          '_id': '5a2d98eedfa0c3443cad78c5'
        }, {
          'email': 'jane.doe@gmail.com'
        }, (err, result) => {
          if (err) throw err
          assert.equal(result.matchedCount, 1)
          assert.equal(result.modifiedCount, 1)
        })
      })
      db.close()
    })
  })

  it('should create a user document', () => {
    MongoClient.connect(url, (err, db) => {
      if (err) throw err
      const collection = db.collection('users')
      collection.insertMany(fixtures, (err, result) => {
        if (err) throw err
        collection.updateOne({
          _id: '5a2dc1a123750054headb9e0',
          email: 't.test@gmail.com',
          forename: 't',
          surname: 'test',
          created: '2017-12-10T21:22:30.886Z'
        }, {
          _id: '5a2dc1a123750054headb9e0',
          email: 't.test@gmail.com',
          forename: 't',
          surname: 'test',
          created: '2017-12-10T21:22:30.886Z'
        }, (err, result) => {
          if (err) throw err
          assert.equal(result.upsertedCount, 1)
          assert.equal(result.upsertedId, '5a2dc1a123750054headb9e0')
        })
      })
      db.close()
    })
  })
})
