import React from 'react'
import request from 'superagent'

import createReactShape from '../../lib/createReactShape'

export default React.createClass({
  getInitialState () {
    return {
      concepts: []
    }
  },
  componentDidMount () {
    request
      .get('http://localhost:3000/concepts')
      .end((err, res) => {
        this.setState({concepts: res.body})
      })
  },
  createSVG (concept, i) {
    const canvas = concept.diagram.map((elem, i) => {
      return createReactShape(elem, i)
    })
    return (
      <div className="concept" key={i}>
        <h3 className="concept-title">{concept.title}</h3>
        <p className="concept-description">{concept.description}</p>
        <svg  height="600"
              width="800">
          {canvas}
        </svg>
      </div>
    )
  },
  render () {
    const concepts = this.state.concepts.map(this.createSVG)
    return (
    <div className='concept-list'>
      {concepts}
    </div>
    )
  }
})
