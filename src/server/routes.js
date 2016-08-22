var db = require('./db')

module.exports = {
  allConcepts: allConcepts,
  myConcepts: myConcepts,
  addConcept: addConcept,
  changeConcept: changeConcept
}

function allConcepts (req, res) {
  db.getAllConcepts()
    .then((concepts) => {
      res.send(concepts)
    })
    .catch((err) => {
      console.log(err)
      res.sendStatus(500)
    })
}

function myConcepts (req, res) {
  if (req.session.passport) {
    var id = req.session.passport.user
    db.getMyConcepts(id)
      .then((concepts) => {
        res.send(concepts)
      })
      .catch((err) => {
        console.log(err)
        res.sendStatus(500)
      })
  } else {
    db.getAllConcepts()
      .then((concepts) => {
        res.send(concepts)
      })
      .catch((err) => {
        console.log(err)
        res.sendStatus(500)
      })
  }
}

function addConcept (req, res) {
    var concept = Object.assign({}, req.body, {user_id: req.user._id})
    console.log(concept)
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
    var concept = Object.assign({}, req.body, {user_id: req.user._id})
    db.updateConcept(concept)
    .then((result) => {
      res.sendStatus(200)
    })
    .catch((err) => {
      console.log(err)
      res.sendStatus(500)
    })
}
