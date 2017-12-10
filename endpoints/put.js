const connecting = require('../config/connecting')
const Joi = require('joi')
const MongoClient = require('mongodb').MongoClient
const utilities = require('../libs/utilities')

const create = module.exports = {}

const schema = {
  id: Joi.guid(),
  email: Joi.string().email.required(),
  forename: Joi.string().alphanum().required(),
  surname: Joi.string().alphanum().required(),
  created: Joi.date().timestamp('javascript').default(Date.now)
}

create.createOne = (req, res) => {
  MongoClient.connect(connecting.mongodb.path, (err, client) => {
    if (err) console.log('++ err', err)
    const db = client.db(connecting.mongodb.database)
    const query = {}
    if (req.query.email) query['email'] = utilities.lowercase(req.query.email)
    if (req.query.forename) query['forename'] = utilities.firstLetterUppercase(req.query.forename)
    if (req.query.surname) query['surname'] = utilities.firstLetterUppercase(req.query.surname)
    query['created'] = new Date()
    const validate = Joi.validate(query, schema)
    if (validate) {
      db.collection(connecting.mongodb.database)
      .insertOne(query, (insertErr, result) => {
        if (insertErr) console.log('++ insertErr', insertErr)
        res.send('1 document inserted')
        client.close()
      })
    } else {
      res.send(validate)
    }
  })
}
