import React from 'react'
import request from 'superagent'
import createReactShape from '../../lib/createReactShape'

export default React.createClass({
  props: {
    concepts: React.PropTypes.array.isRequired
  },
  createSVG (concept, i) {
    const canvas = concept.diagram.map((elem, i) => {
      return createReactShape(elem, i)
    })
    return (
      <div className="concept" key={i}>
        <h3 className="concept-title">{concept.title}</h3>
        <p className="concept-description">Description: {concept.description}</p>
        <svg  height="600"
              width="800">
          {canvas}
        </svg>
      </div>
    )
  },
  render () {
    const concepts = this.props.concepts.map(this.createSVG)
    return (
    <div className='concept-list'>
      {concepts}
    </div>
    )
  }
})
