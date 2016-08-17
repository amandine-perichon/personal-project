import React from 'react'
import buildShape from '../../lib/buildShape'

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
  svgNode: null,
  logSVG: function () {
    if (this.svgNode) {
      console.log(this.svgNode)
    }
  },
  render: function () {
    let temp = null
    if (this.state.action && creatingShapeAction(this.props.selectedTool)) {
      const tempData = buildShape(this.props.selectedTool, this.state.action)
      const TempType = tempData.type
      temp = <TempType {...tempData.attributes} />
    }

    return (
      <div className="diagram">
        <svg  ref={(node) => this.svgNode = node}
              height="600"
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
    this.logSVG()
  }
})

function creatingShapeAction (selectedTool) {
  return ['rectangle', 'ellipse', 'line', 'arrow'].includes(selectedTool)
}

function createCanvas (shapes) {
  return shapes.map((elem, i) => {
    const Type = elem.type
    return <Type {...elem.attributes} key={i}/>
  })
}

function coord (evt) {
  return {
    x: evt.nativeEvent.offsetX,
    y: evt.nativeEvent.offsetY
  }
}
