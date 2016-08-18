const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://amandine:444719@ds161495.mlab.com:61495/diagrameditor'
const Users = null
const Diagrams = null

module.exports = {
  connect: connect,
  addUser: addUser,
  addDiagram: addDiagram,
  getAllDiagrams: getAllDiagrams
}

function connect () {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function(err, db) {
      if (err) {
        reject(err)
      } else {
        Users = db.collection('users')
        Diagrams = db.collection('diagrams')
        resolve()
      }
    })
  })
}

function addUser (username) {
  return Users.insertOne({username: username})
}

function addDiagram (diagram) {
  return Diagrams.insertOne(diagram)
}

function getAllDiagrams () {
  return Diagrams.find({})
}
