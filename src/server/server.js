const express = require('express')
const bodyParser = require('body-parser')
const database = require('./db')

const PORT = process.env.PORT || 3000

const app = express()
app.use(bodyParser.json())

app.get('/diagrams', function (req, res) {
  res.send()
})

database.connect()
  .then(() => {
    app.listen(PORT, function () {
      console.log('Listening on port', PORT)
    })
  })
  .catch(() => console.log('Could not connect to DB'))
