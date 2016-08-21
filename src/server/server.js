const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const expressSession = require('express-session')
const bodyParser = require('body-parser')

const configureAuth = require('./configureAuth')
const db = require('./db')
const routes = require('./routes')
const cors = require('cors')

const PORT = process.env.PORT || 3000
var SESSION_KEY = process.env.SESSION_KEY || 'WoofWoof'

const app = express()
app.use(bodyParser.json())
app.use(expressSession({secret: SESSION_KEY}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cors())

passport.serializeUser(function(user, done) {
  done(null, user._id)
})

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user)
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
    console.log('login')
    res.json({username: req.user.username})
  } else {
    res.sendStatus(401)
  }
})

app.get('/logout', function(req, res) {
  console.log('logout')
  req.logout()
  res.sendStatus(200)
})

app.get('/concepts', routes.allConcepts)

app.get('/myconcepts', routes.myConcepts)

app.post('/concept', routes.addConcept)

app.put('/concept', routes.changeConcept)

db.connect()
  .then(() => {
    app.listen(PORT, function () {
      console.log('Listening on port', PORT)
    })
  })
  .catch(() => console.log('Could not connect to DB'))
