const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db')
const routes = require('./routes')
const cors = require('cors')

const PORT = process.env.PORT || 3000

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/diagrams', routes.diagrams)

db.connect()
  .then(() => {
    app.listen(PORT, function () {
      console.log('Listening on port', PORT)
    })
  })
  .catch(() => console.log('Could not connect to DB'))
