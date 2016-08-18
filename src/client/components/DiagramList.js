import React from 'react'
import request from 'superagent'

import createReactShape from '../../lib/createReactShape'

export default React.createClass({
  getInitialState () {
    return {
      diagrams: [{title: "Test diagram",author: "Amandine", shapes: [{type: "SVGRectangle", attributes: {x: 0, y: 0, width:200, height:100 }}]}, {title: "Test diagram", author: "Amandine", shapes: [{type: "SVGRectangle", attributes: {x: 0, y: 0, width:200, height:100 }}]}]
    }
  },
  componentDidMount () {

  },
  createSVG (diagram, i) {
    const canvas = diagram.shapes.map((elem, i) => {
      return createReactShape(elem, i)
    })
    return (
      <div className="diagram" key={i}>
        <h3 className="diagram-title">{diagram.title}</h3>
        <p className="diagram-author">{diagram.author}</p>
        <svg  height="600"
              width="800">
          {canvas}
        </svg>
      </div>
    )
  },
  render () {
    const diagrams = this.state.diagrams.map(this.createSVG)
    return (
    <div className='diagram-list'>
      {diagrams}
    </div>
    )
  }
})
