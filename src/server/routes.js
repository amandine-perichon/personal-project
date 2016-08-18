var db = require('./db')

module.exports = {
  diagrams: diagrams
}

function diagrams (req, res) {
  db.getAllDiagrams()
    .then((diagrams) => {
      console.log(diagrams)
      res.send(diagrams)
    })
    .catch((err) => {
      console.log(err)
      res.sendStatus(500)
  })
}
