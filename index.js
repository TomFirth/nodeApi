const express = require('express')
const app = express()
require('./endpoints')(app)

const port = 12345

app.listen(port, () =>
  console.log(`Welcome to the HX Web Development API task - submission by Tom Firth\nListening on http://localhost:${port}`)
)
