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
  render: function () {
    const canvas = this.props.shapes.map((elem, i) => {
      const Type = elem.type
      return <Type {...elem.attributes} key={i}/>
    })

    let temp = null
    if (this.state.action) {
      const tempData = buildShape(this.props.selectedTool, this.state.action)
      const TempType = tempData.type
      temp = <TempType {...tempData.attributes} />
    }

    return <div className="diagram">
            <svg height="600" width="800" onMouseDown={this.initializeAction}
                  onMouseMove={this.tempAction} onMouseUp={this.completeAction}>
                    {canvas}{temp}
            </svg>
          </div>
  },
  initializeAction: function (evt) {
    evt.preventDefault()
    const initial = coord(evt)
    this.setState({action: {initial: initial, final: initial}})
  },
  tempAction: function (evt) {
    evt.preventDefault()
    if (this.state.action) {
      const final = coord(evt)
      const newAction = Object.assign({}, this.state.action, {final: final})
      this.setState({action: newAction})
    }
  },
  completeAction: function (evt) {
    const newDiagram = [...this.props.shapes, buildShape(this.props.selectedTool, this.state.action)]
    this.props.onChange(newDiagram)
    this.setState({action: null})
  }
})

function coord (evt) {
  return {
    x: evt.nativeEvent.offsetX,
    y: evt.nativeEvent.offsetY
  }
}
