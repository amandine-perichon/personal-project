import React from 'react'
import request from 'superagent'
import store from '../reducers'

export default React.createClass({
  getInitialState() {
    return {
      error: ""
    }
  },
  register (evt) {
    evt.preventDefault()
    request
      .post('/register')
      .send({username: evt.target.username.value, password:evt.target.password.value})
      .end((err, res) => {
        if (err) {
          this.setState({error: "There was a problem with your registration"}, () => {
            setTimeout(() => this.setState({error: ""}), 3000)
          })
        } else {
          store.dispatch({type: "REGISTER", username: res.body.username})
        }
      })
  },
  render () {
    return (
      <div>
      <div className="error">{this.state.error}</div>
      <form className="register-form" onSubmit={this.register}>
        <label htmlFor="username" />Username<br/>
        <input type="text" name="username" />
        <label htmlFor="password" />Password<br/>
        <input type="password" name="password" /><br/>
        <button type="submit" name="register">Register</button>
      </form>
      </div>
    )
  }
})
