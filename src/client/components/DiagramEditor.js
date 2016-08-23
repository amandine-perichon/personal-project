import React from 'react'
import Toolbar from './Toolbar'
import Diagram from './Diagram'
import buildShape from '../../lib/buildShape'

// Remove inline style for width and height

export default React.createClass({
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
    // tools should contain text, move, resize
    // tools could contain select, color picker, line style, undo, redo
    const tools = ['cursor', 'rectangle', 'ellipse', 'line', 'arrow', 'text']
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
