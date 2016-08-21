import React from 'react'
import request from 'superagent'

export default React.createClass({
  register (evt) {
    evt.preventDefault()
    request
      .post('http://localhost:3000/register')
      .send({username: evt.target.username.value, password:evt.target.password.value})
      .end((err, res) => {
        if (err) {
          console.log(err)
        } else {
          console.log(res.status, res)
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