const assert = require('assert')
var mongodb = require('mongo-mock')
var MongoClient = mongodb.MongoClient
var fixtures = require('./fixtures/users')

var url = 'mongodb://localhost:27017/users'

describe('Delete user', () => {
  it('should delete a single user', () => {
    MongoClient.connect(url, (err, db) => {
      if (err) throw err
      var collection = db.collection('users')
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
