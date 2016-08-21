var db = require('./db')

module.exports = {
  allConcepts: allConcepts,
  addConcept: addConcept,
  changeConcept: changeConcept
}

function allConcepts (req, res) {
  console.log(req.session)
  if (req.session.passport) {
    var id = req.session.passport.user
    console.log(id)
  }
  db.getAllConcepts()
    .then((concepts) => {
      res.send(concepts)
    })
    .catch((err) => {
      console.log(err)
      res.sendStatus(500)
    })
}

function addConcept (req, res) {
    var concept = req.body
    db.createConcept(concept)
    .then((result) => {
      res.send(result.ops[0])
    })
    .catch((err) => {
      console.log(err)
      res.sendStatus(500)
    })
}

function changeConcept (req, res) {
    var concept = req.body
    db.updateConcept(concept)
    .then((result) => {
      res.sendStatus(200)
    })
    .catch((err) => {
      console.log(err)
      res.sendStatus(500)
    })
}
