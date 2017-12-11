const connecting = require('../config/connecting')
const Joi = require('joi')
const MongoClient = require('mongodb').MongoClient
const utilities = require('../libs/utilities')

const remove = module.exports = {}

const schema = {
  id: Joi.string().alphanum(),
  email: Joi.string().email().required(),
  forename: Joi.string().alphanum().required(),
  surname: Joi.string().alphanum().required()
}

remove.removeOne = (req, res) => {
  MongoClient.connect(connecting.mongodb.path, (err, client) => {
    if (err) console.log('++ err', err)
    const db = client.db(connecting.mongodb.database)
    const query = {}
    if (req.query.id) query['id'] = utilities.lowercase(req.query.id)
    if (req.query.email) query['email'] = utilities.lowercase(req.query.email)
    if (req.query.forename) query['forename'] = utilities.firstLetterUppercase(req.query.forename)
    if (req.query.surname) query['surname'] = utilities.firstLetterUppercase(req.query.surname)
    const validate = Joi.validate(query, schema)
    if (validate) {
      db.collection(connecting.mongodb.database)
      .deleteOne(query, (deleteErr, result) => {
        if (deleteErr) console.log('++ deleteErr', deleteErr)
        res.send('1 document deleted')
        client.close()
      })
    } else {
      res.send(validate)
    }
  })
}
