const Mongo = require('mongodb')
const MongoClient = Mongo.MongoClient
const ObjectID = Mongo.ObjectID
const url = 'mongodb://amandine:444719@ds161495.mlab.com:61495/diagrameditor'
let Users = null
let Concepts = null

module.exports = {
  connect: connect,
  findByUsername: findByUsername,
  findById: findById,
  createUser: createUser,
  createConcept: createConcept,
  updateConcept: updateConcept,
  getAllConcepts: getAllConcepts
}

function connect () {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function(err, db) {
      if (err) {
        reject(err)
      } else {
        Users = db.collection('users')
        Concepts = db.collection('concepts')
        resolve()
      }
    })
  })
}

function findByUsername (username) {
  return Users.findOne({username: username})
}

function findById (id) {
  return Users.findOne({ _id: new ObjectID(id) })
}

function createUser (username, password) {
  return Users.insertOne({username: username, password: password})
}

function createConcept (concept) {
  return Concepts.insertOne(concept)
}

function updateConcept (concept) {
  const {_id, title, description, diagram} = concept
  const updateConcept = {"title": title, "description": description, "diagram": diagram}
  return Concepts.updateOne({ _id: new ObjectID(concept._id) }, updateConcept)
}

function getAllConcepts () {
  return new Promise((resolve, reject) => {
    Concepts.find({}).toArray((err, docs) => {
      if (err) {
        reject(err)
      } else {
        resolve(docs)
      }
    })
  })
}
