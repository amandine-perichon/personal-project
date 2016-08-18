import React from 'react'
import {Link} from 'react-router'

export default React.createClass({
  render () {
    return (
      <div>
        <header>
          <h1>Code concepts</h1>
          <Link to='/'>Home</Link>
          <Link to='/diagrams'>All diagrams</Link>
          <Link to='/create'>New diagram</Link>
        </header>
        <section>{this.props.children}</section>
      </div>
    )
  }
})
