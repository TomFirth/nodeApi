const connecting = require('../config/connecting')
const Joi = require('joi')
const MongoClient = require('mongodb').MongoClient
const utilities = require('../libs/utilities')

const read = module.exports = {}

const schema = {
  id: Joi.string().alphanum(),
  email: Joi.string().email().required(),
  forename: Joi.string().alphanum().required(),
  surname: Joi.string().alphanum().required()
}

read.readAll = (res) => {
  MongoClient.connect(connecting.mongodb.path, (err, client) => {
    if (err) res.status(500).send(err)
    var db = client.db(connecting.mongodb.database)
    db.collection(connecting.mongodb.database)
    .find({})
    .toArray((err, result) => {
      if (err) res.status(500).send(err)
      res.status(200).send(result)
    })
    client.close()
  })
}

read.readOne = (req, res) => {
  MongoClient.connect(connecting.mongodb.path, (err, client) => {
    if (err) res.status(500).send(err)
    const db = client.db(connecting.mongodb.database)
    const query = {}
    if (req.query.id) query['id'] = utilities.lowercase(req.query.id)
    if (req.query.email) query['email'] = utilities.lowercase(req.query.email)
    if (req.query.forename) query['forename'] = utilities.firstLetterUppercase(req.query.forename)
    if (req.query.surname) query['surname'] = utilities.firstLetterUppercase(req.query.surname)
    const validate = Joi.validate(query, schema)
    if (validate) {
      db.collection(connecting.mongodb.database)
      .find(query)
      .toArray((err, result) => {
        if (err) res.status(500).send(err)
        res.status(200).send(result)
      })
    } else {
      res.status(500).send(validate)
    }
    client.close()
  })
}
