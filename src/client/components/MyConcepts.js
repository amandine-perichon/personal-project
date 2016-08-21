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
      .get('/myconcepts')
      .end((err, res) => {
        this.setState({concepts: res.body})
      })
  },
  render () {
    return <DiagramView concepts={this.state.concepts} />
  }
})
