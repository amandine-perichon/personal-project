import React from 'react'
import buildShape from '../../lib/buildShape'
import createReactShape from '../../lib/createReactShape'

export default React.createClass({
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
    let temp = null
    if (this.state.action && creatingShapeAction(this.props.selectedTool)) {
      const tempData = buildShape(this.props.selectedTool, this.state.action)
      temp = createReactShape(tempData, 0)
    }

    return (
      <div className="diagram">
        <svg  height="600"
              width="800"
              onMouseDown={this.mouseDownAction}
              onMouseMove={this.mouseMoveAction}
              onMouseUp={this.mouseUpAction}>
          {createCanvas(this.props.shapes)}
          {temp}
        </svg>
      </div>
    )
  },
  mouseDownAction: function (evt) {
    evt.preventDefault()
    this.setState({action: {initial: coord(evt), final: coord(evt)}})
    if (this.props.selectedTool === "text") {
      console.log("Text should be handled")
    }
  },
  mouseMoveAction: function (evt) {
    evt.preventDefault()
    if (this.state.action) {
      const newAction = Object.assign({}, this.state.action, {final: coord(evt)})
      this.setState({action: newAction})
    }
  },
  mouseUpAction: function (evt) {
    if (creatingShapeAction(this.props.selectedTool)) {
      const newDiagram = [...this.props.shapes, buildShape(this.props.selectedTool, this.state.action)]
      this.props.onChange(newDiagram)
    }
    this.setState({action: null})
  }
})

function creatingShapeAction (selectedTool) {
  return ['rectangle', 'ellipse', 'line', 'arrow'].includes(selectedTool)
}

function createCanvas (shapes) {
  return shapes.map((elem, i) => {
    return createReactShape(elem, i)
  })
}

function coord (evt) {
  return {
    x: evt.nativeEvent.offsetX,
    y: evt.nativeEvent.offsetY
  }
}
