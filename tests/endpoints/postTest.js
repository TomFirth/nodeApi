const assert = require('assert')
var mongodb = require('mongo-mock')
var MongoClient = mongodb.MongoClient
const expected = require('./expected/post')
var fixtures = require('./fixtures/users')

var url = 'mongodb://localhost:27017/users'

describe('Update users', () => {
  it('should update user', () => {
    MongoClient.connect(url, (err, db) => {
      var collection = db.collection('users')
      collection.insertMany(fixtures, (err, result) => {
        if (err) console.log('insertmany', err)
        collection.updateOne({
          '_id': '5a2d98eedfa0c3443cad78c5'
        },{
          'email': 'jane.doe@gmail.com'
        }, (err, result) => {
          if (!err) assert.equal(expected, result)
        })
      })
      db.close()
    })
  })
})
