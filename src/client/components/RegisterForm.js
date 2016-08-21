import React from 'react'
import request from 'superagent'
import store from '../store'

export default React.createClass({
  register (evt) {
    evt.preventDefault()
    request
      .post('/register')
      .send({username: evt.target.username.value, password:evt.target.password.value})
      .end((err, res) => {
        if (err) {
          console.log("PROBLEM WITH REGISTER")
          console.log(err)
        } else {
          store.dispatch({type: "REGISTER", username: res.body.username})
        }
      })
  },
  render () {
    return (
      <form onSubmit={this.register}>
        <label htmlFor="username" />Username<br/>
        <input type="text" name="username" />
        <label htmlFor="password" />Password<br/>
        <input type="password" name="password" /><br/>
        <button type="submit" name="register">Register</button>
      </form>
    )
  }
})
