const connecting = require('../config/connecting')
const Joi = require('joi')
const MongoClient = require('mongodb').MongoClient
const utilities = require('../libs/utilities')

const read = module.exports = {}

const schema = {
  id: Joi.guid(),
  email: Joi.string().email.required(),
  forename: Joi.string().alphanum().required(),
  surname: Joi.string().alphanum().required()
}

read.readAll = (res) => {
  MongoClient.connect(connecting.mongodb.path, (err, client) => {
    if (err) console.log('++ err', err)
    var db = client.db(connecting.mongodb.database)
    db.collection(connecting.mongodb.database)
    .find({})
    .toArray((findErr, result) => {
      if (findErr) console.log('++ findErr', findErr)
      client.close()
      res.send(result)
    })
  })
}

read.readOne = (req, res) => {
  MongoClient.connect(connecting.mongodb.path, (err, client) => {
    if (err) console.log('++ err', err)
    var db = client.db(connecting.mongodb.database)
    var query = {}
    if (req.query.id) query['id'] = utilities.lowercase(req.query.id)
    if (req.query.email) query['email'] = utilities.lowercase(req.query.email)
    if (req.query.forename) query['forename'] = utilities.firstLetterUppercase(req.query.forename)
    if (req.query.surname) query['surname'] = utilities.firstLetterUppercase(req.query.surname)
    if (Joi.validate(query, schema)) {
      db.collection(connecting.mongodb.database)
      .find(query)
      .toArray((findErr, result) => {
        if (findErr) console.log('++ findErr', findErr)
        client.close()
        res.send(result)
      })
    } else {
      res.send('Validation failed')
    }
  })
}
