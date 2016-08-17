const express = require('express')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3000

const app = express()
app.use(bodyParser.json())

app.get('/diagrams', function (req, res) {
  res.send([])
})

app.listen(PORT, function () {
  console.log('Listening on port', PORT)
})
