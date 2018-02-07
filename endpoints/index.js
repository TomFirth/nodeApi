const del = require('../controllers/delete')
const get = require('../controllers/get')
const post = require('../controllers/post')
const put = require('../controllers/put')

module.exports = (app) => {
  app.get('/', (req, res) => {
    if (Object.keys(req.query).length === 0) {
      get.readAll(res)
    } else {
      get.readOne(req, res)
    }
  })

  app.delete('/', (req, res) => {
    del.removeOne(req, res)
  })

  app.post('/', (req, res) => {
    post.createOne(req, res)
  })

  app.put('/', (req, res) => {
    put.updateOne(req, res)
  })

  app.get('/endpoints', (req, res) => {
    res.send({
      POST: {
        id: 'dynamic',
        email: 'required',
        forename: 'required',
        surname: 'required',
        created: 'dynamic'
      },
      PUT: {
        id: 'not required',
        email: 'required',
        forename: 'required',
        surname: 'required',
        newEmail: 'not required',
        newForename: 'not required',
        newSurname: 'not required'
      },
      GET: {
        id: 'not required',
        email: 'not required',
        forename: 'not required',
        surname: 'not required'
      },
      DELETE: {
        id: 'not required',
        email: 'not required',
        forename: 'not required',
        surname: 'not required'
      }
    })
  })
}
