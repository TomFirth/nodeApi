const connecting = require('../config/connecting')
const Joi = require('joi')
const MongoClient = require('mongodb').MongoClient
const utilities = require('../libs/utilities')

const remove = module.exports = {}

const schema = {
  id: Joi.string().alphanum(),
  email: Joi.string().email().required(),
  forename: Joi.string().alphanum().required(),
  surname: Joi.string().alphanum().required(),
  newEmail: Joi.string().email().required(),
  newForename: Joi.string().alphanum().required(),
  newSurname: Joi.string().alphanum().required()
}

remove.removeOne = (req, res) => {
  MongoClient.connect(connecting.mongodb.path, (err, client) => {
    if (err) throw err
    var db = client.db(connecting.mongodb.database)
    var query = {}
    var newValues = {}
    if (req.query.id) query['id'] = utilities.lowercase(req.query.id)
    if (req.query.email) query['email'] = utilities.lowercase(req.query.email)
    if (req.query.forename) query['forename'] = utilities.firstLetterUppercase(req.query.forename)
    if (req.query.surname) query['surname'] = utilities.firstLetterUppercase(req.query.surname)
    if (req.query.newEmail) newValues['newEmail'] = utilities.lowercase(req.query.newEmail)
    if (req.query.newForename) newValues['newForename'] = utilities.firstLetterUppercase(req.query.newForename)
    if (req.query.newSurname) newValues['newSurname'] = utilities.firstLetterUppercase(req.query.newSurname)
    const validate = Joi.validate(query, schema)
    if (validate) {
      db.collection(connecting.mongodb.database)
      .updateOne(query, newValues, (err, result) => {
        if (err) throw err
        res.send('1 document updated')
        client.close()
      })
    } else {
      res.send(validate)
    }
  })
}
