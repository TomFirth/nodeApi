const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('./endpoints')(app)

const port = 12345

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json({
  extended: true
}))

app.listen(port, () =>
  console.log(`Welcome to the HX Web Development API task - submission by Tom Firth\nListening on http://localhost:${port}`)
)
