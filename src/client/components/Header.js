import React from 'react'
import request from 'superagent'
import {Link} from 'react-router'
import store from '../store'

export default React.createClass({
  createNewDiagram () {
    store.dispatch({type: "CREATE_CONCEPT_REQUESTED"})
  },
  login (evt) {
    evt.preventDefault()
    request
      .post('http://localhost:3000/login')
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
      <div>
        <header>
          <h1>Code concepts</h1>
          <Link to='/'>Home</Link>
          <Link to='/mydiagrams'>My diagrams</Link>
          <Link onClick={this.createNewDiagram} to='/create'>Create a new diagram</Link>
          <Link to='/register'>Register</Link>
          <form onSubmit={this.login}>
            <label htmlFor="username" />Username<br/>
            <input type="text" name="username" />
            <label htmlFor="password" />Password<br/>
            <input type="password" name="password" /><br/>
            <button type="submit" name="login">Login</button>
          </form>
        </header>
        <section>{this.props.children}</section>
      </div>
    )
  }
})
