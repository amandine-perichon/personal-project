import React from 'react'
import request from 'superagent'
import {Link} from 'react-router'
import store from '../reducers'

export default React.createClass({
  props: {
    logged: React.PropTypes.object.isRequired
  },
  getInitialState() {
    return {
      error: ""
    }
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
          this.setState({error: "There was a problem with your login"}, () => {
            setTimeout(() => this.setState({error: ""}), 3000)
          })
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
              <h1><Link to='/'>CODE CONCEPTS</Link></h1>
              <div>
                <form onSubmit={this.login}>
                  <input type="text" name="username" placeholder="Username" />
                  <input type="password" name="password" placeholder="Password" />
                  <button type="submit" name="login">Login</button>
                </form>
                <div className="error">{this.state.error}</div>
              </div>
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
              <h1><Link to='/'>CODE CONCEPTS</Link></h1>
              <div>
                <h3 className="username">Hi {this.props.logged.username}!</h3>
                <button type="button" name="logout" onClick={this.logout}><Link to='/'>LOGOUT</Link></button>
              </div>
            </div>
            <div className="row menu">
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
