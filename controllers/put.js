const connecting = require('../config/connecting')
const Joi = require('joi')
const MongoClient = require('mongodb').MongoClient
const utilities = require('../libs/utilities')

const update = module.exports = {}

const schema = {
  id: Joi.string().alphanum(),
  email: Joi.string().email().required(),
  forename: Joi.string().alphanum().required(),
  surname: Joi.string().alphanum().required(),
  newEmail: Joi.string().email(),
  newForename: Joi.string().alphanum(),
  newSurname: Joi.string().alphanum()
}

update.updateOne = (req, res) => {
  MongoClient.connect(connecting.mongodb.path, (err, client) => {
    if (err) res.status(500).send(err)
    const db = client.db(connecting.mongodb.database)
    const query = {
      id: utilities.lowercase(req.query.id) || undefined,
      email: utilities.lowercase(req.query.email) || undefined,
      forename: utilities.firstLetterUppercase(req.query.forename) || undefined,
      surname: utilities.firstLetterUppercase(req.query.surname) || undefined
    }
    let newValues = {}
    if (req.query.newEmail) newValues.email = utilities.lowercase(req.query.newEmail)
    if (req.query.newForename) newValues.forename = utilities.firstLetterUppercase(req.query.newForename)
    if (req.query.newSurname) newValues.surname = utilities.firstLetterUppercase(req.query.newSurname)
    if (!req.query.newEmail && !req.query.newForename && !req.query.newSurname) {
      res.status(400).send('no changes were submitted')
    }
    const validate = Joi.validate(query, schema)
    const validateNew = Joi.validate(newValues, schema)
    if (!validate.error && !validateNew.error) {
      db.collection(connecting.mongodb.database)
      .updateOne(query, newValues, (err, result) => {
        if (err) res.status(500).send(err)
        res.status(200).send(result)
      })
    } else {
      res.status(500).send(validate)
    }
    client.close()
  })
}
