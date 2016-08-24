import React from 'react'
import request from 'superagent'
import {Link} from 'react-router'
import store from '../reducers'

export default React.createClass({
  props: {
    logged: React.PropTypes.object.isRequired
  },
  createNewDiagram () {
    store.dispatch({type: "CREATE_CONCEPT_REQUESTED"})
  },
  login (evt) {
    evt.preventDefault()
    request
      .post('/login')
      .send({username: evt.target.username.value, password:evt.target.password.value})
      .end((err, res) => {
        if (err) {
          console.log("PROBLEM WITH AUTH")
          console.log(err)
        } else {
            store.dispatch({type: "LOGIN", username: res.body.username})
        }
      })
  },
  logout () {
    store.dispatch({type: "LOGOUT"})
    store.dispatch({type: "GET_ALL_CONCEPTS_REQUEST"})
  },
  render () {
    if (!this.props.logged.status) {
      return (
        <div>
          <header>
            <div className="row">
              <h1>Code Concepts</h1>
              <form onSubmit={this.login}>
                <label htmlFor="username" />Username <input type="text" name="username" />
                <label htmlFor="password" />Password <input type="password" name="password" />
                <button type="submit" name="login">Login</button>
              </form>
              <button type="button" name="register"><Link to='/register'>Register</Link></button>
            </div>
          </header>
          <section>{this.props.children}</section>
        </div>
      )
    } else {
      return (
        <div>
          <header>
            <div className="row">
              <h1>Code concepts</h1>
              <h3 className="username">{this.props.logged.username}</h3>
              <button type="button" name="logout" onClick={this.logout}><Link to='/'>LOGOUT</Link></button>
            </div>
            <div className="row">
              <Link to='/'>Search</Link>
              <Link to='/mydiagrams'>My concepts</Link>
              <Link onClick={this.createNewDiagram} to='/create'>Create a new concept</Link>
            </div>
          </header>
          <section>{this.props.children}</section>
        </div>
      )
    }
  }
})
