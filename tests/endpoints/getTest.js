const assert = require('assert')
var mongodb = require('mongo-mock')
var MongoClient = mongodb.MongoClient
const expected = require('./expected/get')
var fixtures = require('./fixtures/users')

var url = 'mongodb://localhost:27017/users'

describe('Get users', () => {
  it('should return all user documents', () => {
    MongoClient.connect(url, (err, db) => {
      var collection = db.collection('users')
      collection.insertMany(fixtures, (err, result) => {
        if (err) console.log(err)
        collection.find({})
        .toArray((err, result) => {
          if (!err) assert.equal(expected.find, result)
        })
      })
      collection.remove(fixtures, (err, result) => {
        if (err) console.log(err)
      })
      db.close()
    })
  })

  it('should return user by id', () => {
    MongoClient.connect(url, (err, db) => {
      var collection = db.collection('users')
      collection.insertMany(fixtures, (err, result) => {
        if (err) console.log('insertmany', err)
        collection.findOne({
          '_id': '5a2d98eedfa0c3443cad78c5'
        }, (err, result) => {
          if (!err) assert.equal(expected.id, result)
        })
      })
      db.close()
    })
  })

  it('should return user by email', () => {
    MongoClient.connect(url, (err, db) => {
      var collection = db.collection('users')
      collection.insertMany(fixtures, (err, result) => {
        if (err) console.log(err)
        collection.findOne({
          'email': 'joe.bloggs@gmail.com'
        }, (err, result) => {
          if (!err) assert.equal(expected.email, result)
        })
      })
      collection.remove(fixtures, (err, result) => {
        if (err) console.log(err)
      })
      db.close()
    })
  })

  it('should return user by forename', () => {
    MongoClient.connect(url, (err, db) => {
      var collection = db.collection('users')
      collection.insertMany(fixtures, (err, result) => {
        if (err) console.log(err)
        collection.findOne({
          'forename': 'John'
        }, (err, result) => {
          if (!err) assert.equal(expected.forename, result)
        })
      })
      collection.remove(fixtures, (err, result) => {
        if (err) console.log(err)
      })
      db.close()
    })
  })

  it('should return user by surname', () => {
    MongoClient.connect(url, (err, db) => {
      var collection = db.collection('users')
      collection.insertMany(fixtures, (err, result) => {
        if (err) console.log(err)
        collection.findOne({
          'surname': 'Doe'
        }, (err, result) => {
          if (!err) assert.equal(expected.surname, result)
        })
      })
      collection.remove(fixtures, (err, result) => {
        if (err) console.log(err)
      })
      db.close()
    })
  })
})
