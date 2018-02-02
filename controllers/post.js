const connecting = require('../config/connecting')
const Joi = require('joi')
const MongoClient = require('mongodb').MongoClient
const utilities = require('../libs/utilities')

const create = module.exports = {}

const schema = {
  id: Joi.string().alphanum(),
  email: Joi.string().email().required(),
  forename: Joi.string().alphanum().required(),
  surname: Joi.string().alphanum().required(),
  created: Joi.date()
}

create.createOne = (req, res) => {
  MongoClient.connect(connecting.mongodb.path, (err, client) => {
    if (err) res.status(500).send(err)
    const db = client.db(connecting.mongodb.database)
    const query = {
      email: utilities.lowercase(req.query.email),
      forename: utilities.firstLetterUppercase(req.query.forename),
      surname: utilities.firstLetterUppercase(req.query.surname),
      created: new Date()
    }
    const validate = Joi.validate(query, schema)
    console.log(query, validate)
    if (!validate.error) {
      db.collection(connecting.mongodb.database)
      .insertOne(query, (err, result) => {
        if (err) res.status(500).send(err)
        res.status(200).send(result)
      })
    } else {
      res.status(500).send(validate)
    }
    client.close()
  })
}
