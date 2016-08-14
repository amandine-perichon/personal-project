import React from 'react'
import {buildShape} from './buildShape'

// Remove inline style for width and height

export const DiagramEditor = React.createClass({
  propTypes: {
    diagram: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func.isRequired
  },
  getInitialState: function () {
    return {
      selectedTool: "rectangle",
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
        return <button className="tool selected" name={elem} onClick={this.props.onToolChange} key={i}>
                  {elem}
              </button>
      } else {
        return <button className="tool" name={elem} onClick={this.props.onToolChange} key={i}>{elem}</button>
      }
    })
    return <div className="toolbar">{toolbar}</div>
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

    return <div className="diagram">
            <svg height="600" width="800" onMouseDown={this.initializeAction}
                  onMouseUp={this.completeAction}>
                    {canvas}
            </svg>
          </div>
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
