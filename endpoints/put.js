const connecting = require('../config/connecting')
const MongoClient = require('mongodb').MongoClient
const utilities = require('../libs/utilities')

const create = module.exports = {}

create.createOne = (req, res) => {
  MongoClient.connect(connecting.mongodb.path, (err, client) => {
    if (err) console.log('++ err', err)
    if (!req.query.email || !req.query.forename || !req.query.surname) {
      res.send('Missing email, forename or surname')
    }
    var db = client.db(connecting.mongodb.database)
    var query = {}
    if (req.query.email) query['email'] = utilities.lowercase(req.query.email)
    if (req.query.forename) query['forename'] = utilities.firstLetterUppercase(req.query.forename)
    if (req.query.surname) query['surname'] = utilities.firstLetterUppercase(req.query.surname)
    db.collection(connecting.mongodb.database)
    .insertOne(query, (insertErr, result) => {
      if (insertErr) console.log('++ insertErr', insertErr)
      res.send('1 document inserted')
      client.close()
    })
  })
}
