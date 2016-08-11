import React from 'react'
import ReactDOM from 'react-dom'

const DiagramEditor = React.createClass({
  propTypes: {
    shapes: React.PropTypes.array.isRequired
  },
  render: function () {
    const Type = this.props.shapes[0].type
    const shape = <Type
      {...this.props.shapes[0].attributes} />

    return <svg height="500" width="500">{shape}</svg>
  }
})

const SVGLine = React.createClass({
  propTypes: {
    x1: React.PropTypes.number.isRequired,
    y1: React.PropTypes.number.isRequired,
    x2: React.PropTypes.number.isRequired,
    y2: React.PropTypes.number.isRequired
  },
  render: function () {
    return <line 
      {...this.props}
      stroke="black" />
  }
})

var shapes = [
  {
    type: SVGLine,
    attributes: {
      x1: 0,
      y1: 0,
      x2: 200,
      y2: 200
    }
  }
]

ReactDOM.render(<DiagramEditor shapes={shapes}/>, document.getElementById('app'))