const connecting = require('../config/connecting')
const Joi = require('joi')
const MongoClient = require('mongodb').MongoClient
const utilities = require('../libs/utilities')

const remove = module.exports = {}

const schema = {
  id: Joi.string().alphanum(),
  email: Joi.string().email(),
  forename: Joi.string().alphanum(),
  surname: Joi.string().alphanum()
}

remove.removeOne = (req, res) => {
  MongoClient.connect(connecting.mongodb.path, (err, client) => {
    if (err) res.status(500).send(err)
    const db = client.db(connecting.mongodb.database)
    const query = {}
    if (req.query.id) query.id = utilities.lowercase(req.query.id)
    if (req.query.email) query.email = utilities.lowercase(req.query.email)
    if (req.query.forename) query.forename = utilities.firstLetterUppercase(req.query.forename)
    if (req.query.surname) query.surname = utilities.firstLetterUppercase(req.query.surname)
    console.log('++ del query', query)
    const validate = Joi.validate(query, schema)
    if (!validate.error) {
      db.collection(connecting.mongodb.database)
      .deleteOne(query, (err, result) => {
        if (err) res.status(500).send(err)
        res.status(204).send(result)
      })
    } else {
      res.status(500).send(validate)
    }
    client.close()
  })
}
