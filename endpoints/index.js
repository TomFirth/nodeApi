const del = require('./delete')
const get = require('./get')
const post = require('./post')
const put = require('./put')

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
    post.updateOne(req, res)
  })

  app.put('/', (req, res) => {
    put.createOne(req, res)
  })
}
