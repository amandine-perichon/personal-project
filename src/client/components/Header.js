import React from 'react'
import {Link} from 'react-router'
import store from '../store'

export default React.createClass({
  createNewDiagram () {
    store.dispatch({type: "CREATE_CONCEPT_REQUESTED"})
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
        </header>
        <section>{this.props.children}</section>
      </div>
    )
  }
})
