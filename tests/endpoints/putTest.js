const assert = require('assert')
var mongodb = require('mongo-mock')
var MongoClient = mongodb.MongoClient
const expected = require('./expected/put')
var fixtures = require('./fixtures/users')

var url = 'mongodb://localhost:27017/users'

describe('Create user', () => {
  it('should create a user document', () => {
    MongoClient.connect(url, (err, db) => {
      var collection = db.collection('users')
      collection.insertMany(fixtures, (err, result) => {
        if (err) console.log('insertmany', err)
        collection.insertOne({
          _id: '5a2dc1a123750054aeadb6f3',
          email: 't.test@gmail.com',
          forename: 't',
          surname: 'test',
          created: '2017-12-10T21:22:30.886Z'
        }, (err, result) => {
          if (!err) assert.equal(expected, result)
        })
      })
      db.close()
    })
  })
})
