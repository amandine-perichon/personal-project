import React from 'react'
import {buildShape} from './buildShape'

export const DiagramEditor = React.createClass({
  propTypes: {
    diagram: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func.isRequired
  },
  getInitialState: function () {
    return {
      selectedTool: "line",
    }
  },
  render: function () {
    const tools = ['rectangle', 'ellipse', 'line', 'arrow', 'text']
    return <div className="diagram-editor" style={{width:800}}>
      <Toolbar selectedTool={this.state.selectedTool} onToolChange={this.onToolChange} tools={tools}/>
      <Diagram selectedTool={this.state.selectedTool} shapes={this.props.diagram} onChange={this.props.onChange}/>
      </div>
  },
  onToolChange: function (evt) {
    this.setState({
      selectedTool: evt.target.name
    })
  }
})

const Toolbar = React.createClass({
  propTypes: {
    selectedTool: React.PropTypes.string.isRequired,
    onToolChange: React.PropTypes.func.isRequired,
    tools: React.PropTypes.array.isRequired
  },
  render: function () {
    const toolbar = this.props.tools.map((elem, i) => {
      if (elem === this.props.selectedTool) {
        return <button style={{color:"red"}} name={elem} onClick={this.props.onToolChange} key={i}>
                  {elem}
              </button>
      } else {
        return <button name={elem} onClick={this.props.onToolChange} key={i}>{elem}</button>
      }
    })
    return <section style={{width:800}}>{toolbar}</section>
  }
})

const Diagram = React.createClass({
  propTypes: {
    selectedTool: React.PropTypes.string.isRequired,
    shapes: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func.isRequired
  },
  getInitialState: function () {
    return {
      action: null,
    }
  },
  render: function () {
    const canvas = this.props.shapes.map((elem, i) => {
    const Type = elem.type
      return <Type {...elem.attributes} key={i}/>
    })

    return <svg height="600" width="800" onMouseDown={this.initializeAction}
                onMouseUp={this.completeAction}>
                  {canvas}
          </svg>
  },
  initializeAction: function (evt) {
    const initial =  {
          x: evt.nativeEvent.offsetX,
          y: evt.nativeEvent.offsetY
        }
    this.setState(Object.assign({}, this.state, {action: {initial: initial}}))
  },
  completeAction: function (evt) {
    const final =  {
          x: evt.nativeEvent.offsetX,
          y: evt.nativeEvent.offsetY
        }
    const newAction = Object.assign({}, this.state.action, {final: final})
    console.log(newAction)
    this.setState(Object.assign({}, this.state, {action: newAction}), function () {
      const newDiagram = [...this.props.shapes, buildShape(this.props.selectedTool, this.state.action)]
      this.props.onChange(newDiagram)
  })
  }
})

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
      stroke="black" strokeWidth="3"/>
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
      stroke="red" fill="none" strokeWidth="3"/>
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
      stroke="blue" fill="none" strokeWidth="3"/>
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
      stroke="black" strokeWidth="3"/>
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
    return  <text x={this.props.x} y={this.props.y} fill="green" strokeWidth="3">
              {this.props.text}
            </text>
  }
})
