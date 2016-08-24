const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const configureAuth = require('./configureAuth')
const db = require('./db')
const routes = require('./routes')

const PORT = process.env.PORT || 3000
var SESSION_KEY = process.env.SESSION_KEY || 'WoofWoof'

const app = express()

app.use(cookieParser())
app.use(bodyParser.json())
app.use(session({ secret: SESSION_KEY, resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(function(user, done) {
  done(null, user._id)
})

passport.deserializeUser(function(id, done) {
  db.findById(id)
    .then((user) => {
      console.log(user)
      done(null, user)
    })
    .catch((err) => {
      console.log(err)
      done(err, null)
    })
})

passport.use('login', new LocalStrategy(configureAuth.loginStrategy))
passport.use('signup', new LocalStrategy({
    passReqToCallback : true
  }, configureAuth.registerStrategy))

app.post('/register', passport.authenticate('signup'), function (req, res) {
  if (req.user) {
    res.json({username: req.user.username})
  } else {
    res.sendStatus(401)
  }
})

app.post('/login', passport.authenticate('login'), function (req, res) {
  if (req.user) {
    res.json({username: req.user.username})
  } else {
    res.sendStatus(401)
  }
})

app.get('/logout', function(req, res) {
  req.logout()
  res.sendStatus(200)
})

// FIXME put all these routes in a Router from /api

app.get('/concepts', routes.allConcepts)

app.get('/myconcepts', routes.myConcepts)

app.post('/concept', routes.addConcept)

app.put('/concept', routes.changeConcept)

app.get('/searchconcepts', routes.searchConcepts)

db.connect()
  .then(() => {
    app.listen(PORT, function () {
      console.log('Listening on port', PORT)
    })
  })
  .catch(() => console.log('Could not connect to DB'))
