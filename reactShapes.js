import React from 'react'


export const SVGLine = React.createClass({
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

export const SVGRectangle = React.createClass({
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

export const SVGEllipse = React.createClass({
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

export const SVGArrow = React.createClass({
  propTypes: {
    x1: React.PropTypes.number.isRequired,
    y1: React.PropTypes.number.isRequired,
    x2: React.PropTypes.number.isRequired,
    y2: React.PropTypes.number.isRequired
  },
  render: function () {
    return <svg>
      {/*Need an arrow head*/}
      <line 
      {...this.props}
      stroke="black"/>
      </svg>
  }
})

export const SVGText = React.createClass({
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
