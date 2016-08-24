import React from 'react'
import request from 'superagent'
import createReactShape from '../../lib/createReactShape'

export default React.createClass({
  props: {
    concepts: React.PropTypes.array.isRequired
  },
  createSVG (concept, i) {
    const canvas = concept.diagram.map((elem, i) => {
      return createReactShape(elem, undefined, false, i)
    })
    return (
      <div className="concept" key={'concept'+i}>
        <div className="concept-info">
          <h3 className="concept-title"><strong>CONCEPT</strong><br />{concept.title}</h3>
          <p className="concept-description"><strong>DESCRIPTION</strong> <br />{concept.description}</p>
        </div>
        <svg  height="800"
              width="1000">
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
