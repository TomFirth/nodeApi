const assert = require('assert')
const mongodb = require('mongo-mock')
const MongoClient = mongodb.MongoClient
const fixtures = require('./fixtures/users')

const url = 'mongodb://localhost:27017/users'

describe('Delete user', () => {
  it('should delete a single user', () => {
    MongoClient.connect(url, (err, db) => {
      if (err) throw err
      const collection = db.collection('users')
      collection.insertMany(fixtures, (err, result) => {
        if (err) throw err
        collection.deleteOne({
          'surname': 'Doe'
        }, (err, result) => {
          if (err) throw err
          assert.equal(result.deletedCount, 1)
        })
      })
      db.close()
    })
  })
})
