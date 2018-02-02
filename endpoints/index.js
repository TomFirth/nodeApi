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
}
