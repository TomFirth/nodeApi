const connecting = require('../config/connecting')
const MongoClient = require('mongodb').MongoClient
const utilities = require('../libs/utilities')

const remove = module.exports = {}

remove.removeOne = (req, res) => {
  MongoClient.connect(connecting.mongodb.path, (err, client) => {
    if (err) console.log('++ err', err)
    if (!req.query.email || !req.query.forename || !req.query.surname) {
      res.send('Missing email, forename or surname')
    }
    var db = client.db(connecting.mongodb.database)
    var query = {}
    var newValues = {}
    if (req.query.id) query['id'] = utilities.lowercase(req.query.id)
    if (req.query.email) query['email'] = utilities.lowercase(req.query.email)
    if (req.query.forename) query['forename'] = utilities.firstLetterUppercase(req.query.forename)
    if (req.query.surname) query['surname'] = utilities.firstLetterUppercase(req.query.surname)
    if (req.query.newEmail) newValues['email'] = utilities.lowercase(req.query.newEmail)
    if (req.query.newForename) newValues['forename'] = utilities.firstLetterUppercase(req.query.newForename)
    if (req.query.newSurname) newValues['surname'] = utilities.firstLetterUppercase(req.query.newSurname)
    db.collection(connecting.mongodb.database)
    .updateOne(query, newValues, (updateErr, result) => {
      if (updateErr) console.log('++ updateErr', updateErr)
      res.send('1 document updated')
      client.close()
    })
  })
}
