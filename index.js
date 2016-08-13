import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'


const DiagramEditor = React.createClass({
  propTypes: {
    state: React.PropTypes.object.isRequired
  },
  render: function () {
    return <div className="diagram-editor">
      <Toolbar tools={this.props.state.tools}/>
      <Diagram shapes={this.props.state.shapes}/>
      </div>
  }
})

const Toolbar = React.createClass({
  propTypes: {
    tools: React.PropTypes.array.isRequired 
  },
  render: function () {
    return <p>{this.props.tools}</p>
  }
})

const Diagram = React.createClass({
  propTypes: {
    shapes: React.PropTypes.array.isRequired
  },
  render: function () {
    const canvas = this.props.shapes.map((elem, i) => {
    const Type = elem.type
      return <Type {...elem.attributes} key={i}/>
    })

    return <svg height="500" width="500" onClick={this.useTool}>{canvas}</svg>
  },
  useTool: function (evt) {
    console.log('clicked, position: ', evt.nativeEvent.offsetX, evt.nativeEvent.offsetY)
    store.dispatch({type: "ADD_SHAPE", 
      shape: {
        type: SVGLine,
        attributes: {
          x1: evt.nativeEvent.offsetX,
          y1: evt.nativeEvent.offsetY,
          x2: 200,
          y2: 200
        }
      }
    })
  }
})

const SVGLine = React.createClass({
  propTypes: {
    x1: React.PropTypes.number.isRequired,
    y1: React.PropTypes.number.isRequired,
    x2: React.PropTypes.number.isRequired,
    y2: React.PropTypes.number.isRequired
  },
  render: function () {
    return <line 
      {...this.props}
      stroke="black" />
  }
})

const SVGRectangle = React.createClass({
  propTypes: {
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired
  },
  render: function () {
    return <rect 
      {...this.props}
      stroke="red" fill="none"/>
  }
})

const SVGEllipse = React.createClass({
  propTypes: {
    cx: React.PropTypes.number.isRequired,
    cy: React.PropTypes.number.isRequired,
    rx: React.PropTypes.number.isRequired,
    ry: React.PropTypes.number.isRequired
  },
  render: function () {
    return <ellipse 
      {...this.props}
      stroke="blue" fill="none"/>
  }
})

const SVGArrow = React.createClass({
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
      stroke="black" />
      </svg>
  }
})

const SVGText = React.createClass({
  propTypes: {
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
    text: React.PropTypes.string.isRequired
  },
  render: function () {
    return  <text x={this.props.x} y={this.props.y} fill="green">
              {this.props.text}
            </text>
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