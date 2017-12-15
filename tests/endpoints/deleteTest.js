const assert = require('assert')
var mongodb = require('mongo-mock')
var MongoClient = mongodb.MongoClient
const expected = require('./expected/delete')
var fixtures = require('./fixtures/users')

var url = 'mongodb://localhost:27017/users'

describe('Delete user', () => {
  it('should delete a single user', () => {
    MongoClient.connect(url, (err, db) => {
      var collection = db.collection('users')
      collection.insertMany(fixtures, (err, result) => {
        if (err) console.log('insertmany', err)
        collection.deleteOne({
          'surname': 'Doe'
        }, (err, result) => {
          if (!err) assert.equal(expected, result)
        })
      })
      db.close()
    })
  })
})
