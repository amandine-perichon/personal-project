import React from 'react'
import request from 'superagent'
import createReactShape from '../../lib/createReactShape'
import DiagramView from './DiagramView'

export default React.createClass({
  getInitialState () {
    return {
      concepts: []
    }
  },
  componentDidMount () {
    request
      .get('/concepts')
      .end((err, res) => {
        this.setState({concepts: res.body})
      })
  },
  render () {
    return (
      <div>
        <form>
          <label htmlFor="keyword" />Keyword search
          <input type="text" name="keyword" />
        </form>
        <DiagramView concepts={this.state.concepts} />
      </div>
    )
  }
})
