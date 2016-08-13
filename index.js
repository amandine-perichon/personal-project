import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'

import {SVGLine, SVGRectangle, SVGEllipse, SVGText, SVGArrow} from './reactShapes'
import {buildShape} from './buildShape'

const DiagramEditor = React.createClass({
  propTypes: {
    state: React.PropTypes.object.isRequired
  },
  getInitialState: function () {
    return {
      selectedTool: "line"
    }
  },
  render: function () {
    return <div className="diagram-editor">
      <Toolbar selectedTool={this.state.selectedTool} onToolChange={this.onToolChange} tools={this.props.state.tools}/>
      <Diagram selectedTool={this.state.selectedTool} shapes={this.props.state.shapes}/>
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
      return <button name={elem} onClick={this.props.onToolChange} key={i}>An {elem}</button>
    })
    return <p>{toolbar}</p>
  }
})

const Diagram = React.createClass({
  propTypes: {
    selectedTool: React.PropTypes.string.isRequired,
    shapes: React.PropTypes.array.isRequired
  },
  render: function () {
    const canvas = this.props.shapes.map((elem, i) => {
    const Type = elem.type
      return <Type {...elem.attributes} key={i}/>
    })

    return <svg height="500" width="500" onMouseUp={this.useTool}>{canvas}</svg>
  },
  useTool: function (evt) {

    console.log('clicked, position: ', evt.nativeEvent.offsetX, evt.nativeEvent.offsetY, this.props.selectedTool, (buildShape(this.props.selectedTool, evt)))
    store.dispatch({type: "ADD_SHAPE", 
      shape: (buildShape(this.props.selectedTool, evt))
    })
  }
})

var init = 
{
  tools: ['rectangle', 'ellipse', 'line', 'arrow', 'text'],
  shapes: [
    {
      type: SVGRectangle,
      attributes: {
        x: 50,
        y: 50,
        width: 100,
        height: 100
      }
    },
    {
      type: SVGEllipse,
      attributes: {
        cx: 150,
        cy: 150,
        rx: 50,
        ry: 100
      }
    },
    {
      type: SVGText,
      attributes: {
        x: 50,
        y: 50,
        text: "Miaou"
      }
    }
  ]
}

// STORE
const editorReducer = function (state = init, action) {
  switch(action.type) {
    case 'ADD_SHAPE':
      return Object.assign({}, state, {shapes: [...state.shapes, action.shape]})
    default:
      return state
  }
}

let store = createStore(editorReducer, window.devToolsExtension && window.devToolsExtension())
refresh()

store.subscribe(refresh)

function refresh() {
  ReactDOM.render(<DiagramEditor state={store.getState()}/>, document.getElementById('app'))
}