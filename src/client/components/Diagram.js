import React from 'react'
import buildShape from '../../lib/buildShape'
import createReactShape from '../../lib/createReactShape'

export default React.createClass({
  propTypes: {
    selectedTool: React.PropTypes.string.isRequired,
    shapes: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onToolChange: React.PropTypes.func.isRequired
  },
  getInitialState: function () {
    return {
      action: null,
    }
  },
  render: function () {
    let temp = null
    if (this.state.action && creatingShapeAction(this.props.selectedTool)) {
      const tempDataArr = buildShape(this.props.selectedTool, this.state.action)
      temp = tempDataArr.map(createReactShape)
    }

    return (
      <div className="diagram">
        <svg  viewBox="0 0 1000 800"
              onMouseDown={this.props.selectedTool !== 'cursor' && this.mouseDownAction}
              onMouseMove={this.props.selectedTool !== 'cursor' && this.mouseMoveAction}
              onMouseUp={this.props.selectedTool !== 'cursor' && this.mouseUpAction}>
          {createCanvas(this.props.shapes, this.onTextChange)}
          {temp}
        </svg>
      </div>
    )
  },
  mouseDownAction: function (evt) {
    evt.preventDefault()
    this.setState({action: {initial: coord(evt), final: coord(evt)}})
  },
  mouseMoveAction: function (evt) {
    evt.preventDefault()
    if (this.state.action) {
      const newAction = Object.assign({}, this.state.action, {final: coord(evt)})
      this.setState({action: newAction})
    }
  },
  mouseUpAction: function (evt) {
    if (creatingShapeAction(this.props.selectedTool) || (this.props.selectedTool === 'text')) {
      const newDiagram = [...this.props.shapes, ...buildShape(this.props.selectedTool, this.state.action)]
      this.props.onChange(newDiagram)
      if (this.props.selectedTool === 'text') {
        this.props.onToolChange('cursor')
      }
    }
    this.setState({action: null})
  },
  onTextChange(updatedShape) {
    const newDiagram = [
      ...this.props.shapes.filter((shape) => {
        return (shape.id !== updatedShape.id)
      }),
      updatedShape
    ]
    this.props.onChange(newDiagram)
  }
})

function creatingShapeAction (selectedTool) {
  return ['rectangle', 'ellipse', 'line', 'arrow'].includes(selectedTool)
}

function createCanvas (shapes, onTextChange) {
  return shapes.map((elem, i) => {
    return createReactShape(elem, onTextChange, true, i)
  })
}

function coord (evt) {
  const svg = evt.nativeEvent.target
  let pt = svg.createSVGPoint()
  pt.x = evt.clientX
  pt.y = evt.clientY
  pt = pt.matrixTransform(svg.getScreenCTM().inverse())
  return {
    x: Math.floor(pt.x),
    y:Math.floor(pt.y)
  }
}
