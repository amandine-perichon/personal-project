import React from 'react'
import ReactDOM from 'react-dom'

const DiagramEditor = React.createClass({
  propTypes: {
    shapes: React.PropTypes.array.isRequired
  },
  render: function () {
    var canvas = this.props.shapes.map((elem, i) => {
      const Type = elem.type
      return <Type {...elem.attributes} key={i}/>
    })

    return <svg height="500" width="500">{canvas}</svg>
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

const SVGRectangle = React.createClass({
  propTypes: {
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired
  },
  render: function () {
    return <rect 
      {...this.props}
      stroke="red" fill="none"/>
  }
})

const SVGEllipse = React.createClass({
  propTypes: {
    cx: React.PropTypes.number.isRequired,
    cy: React.PropTypes.number.isRequired,
    rx: React.PropTypes.number.isRequired,
    ry: React.PropTypes.number.isRequired
  },
  render: function () {
    return <ellipse 
      {...this.props}
      stroke="blue" fill="none"/>
  }
})

const SVGArrow = React.createClass({
  propTypes: {
    x1: React.PropTypes.number.isRequired,
    y1: React.PropTypes.number.isRequired,
    x2: React.PropTypes.number.isRequired,
    y2: React.PropTypes.number.isRequired
  },
  render: function () {
    return <svg>
      <defs>
        <marker id="arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L9,3 z" fill="red" />
        </marker>
      </defs>
      <line 
      {...this.props}
      stroke="black" />
      </svg>
  }
})

const SVGText = React.createClass({
  propTypes: {
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
    text: React.PropTypes.string.isRequired
  },
  render: function () {
    return  <text x={this.props.x} y={this.props.y} fill="green">
              {this.props.text}
            </text>
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
  },
  {
    type: SVGRectangle,
    attributes: {
      x: 50,
      y: 50,
      width: 100,
      height: 100
    }
  },
  {
    type: SVGEllipse,
    attributes: {
      cx: 150,
      cy: 150,
      rx: 50,
      ry: 100
    }
  },
  {
    type: SVGArrow,
    attributes: {
      x1: 0,
      y1: 0,
      x2: 200,
      y2: 200
    }
  },
  {
    type: SVGText,
    attributes: {
      x: 50,
      y: 50,
      text: "Miaou"
    }
  }
]

ReactDOM.render(<DiagramEditor shapes={shapes}/>, document.getElementById('app'))