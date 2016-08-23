import React from 'react'

export default React.createClass({
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
        return <button className="tool" name={elem} onClick={evt => this.props.onToolChange(evt.target.name)} key={i}>{elem}</button>
      }
    })
    return <div className="toolbar">{toolbar}</div>
  }
})
