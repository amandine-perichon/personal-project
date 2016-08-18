import React from 'react'
import request from 'superagent'

import createReactShape from '../../lib/createReactShape'

export default React.createClass({
  getInitialState () {
    return {
      diagrams: []
    }
  },
  componentDidMount () {
    request
      .get('http://localhost:3000/diagrams')
      .end((err, res) => {
        console.log(res.body)
        this.setState({diagrams: res.body})
      })
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
