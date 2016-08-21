const db = require('./db')

module.exports = {
  loginStrategy: loginStrategy,
  registerStrategy: registerStrategy
}


function loginStrategy (username, password, done) {
  db.findByUsername(username)
    .then(function (user) {
      if (!user) {
        console.log('Incorrect username.')
        done(null, false, { message: 'Incorrect username.' })
      } else if (user.password !== password) {
        done(null, false, { message: 'Incorrect password.' })
      } else {
        done(null, user)
      }
    })
    .catch(function (err) {
      done(err)
    })
}

function registerStrategy (req, username, password, done) {
  function findOrCreateUser () {
    db.findByUsername(username)
      .then(function (user) {
        if (user) {
        done(null, false,
           console.log('User Already Exists'))
        } else {
          db.createUser(username, password)
            .then(function (result) {
              done(null, result.ops[0])
            })
            .catch(function (err) {
              console.log('Error creating the user')
              done(err)
            })
        }
      })
      .catch(function (err) {
        console.log('Error in SignUp: '+err)
        done(err)
      })
  }
  // Delay the execution of findOrCreateUser and execute
  // the method in the next tick of the event loop
  process.nextTick(findOrCreateUser)
}
