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
      stroke="black"
      strokeWidth="3"
      strokeLinecap="round" />
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
      stroke="black"
      fill="none"
      strokeWidth="3"
      strokeLinejoin="round"/>
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
      stroke="black"
      fill="none"
      strokeWidth="3"
      strokeDasharray="5,10,5" />
  }
})
