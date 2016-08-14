import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'

import {DiagramEditor} from './diagramEditor'

// STORE
const editorReducer = function (state = {diagram: []}, action) {
  switch(action.type) {
    case 'UPDATE_DIAGRAM':
      return Object.assign({}, {diagram: action.diagram})
    default:
      return state
  }
}

let store = createStore(editorReducer, window.devToolsExtension && window.devToolsExtension())
refresh()

store.subscribe(refresh)

function changeDiagram (diagram) {
  store.dispatch({type: "UPDATE_DIAGRAM", diagram: diagram})
}


function refresh() {
  ReactDOM.render(<DiagramEditor diagram={store.getState().diagram}
                    onChange={changeDiagram}/>,
                    document.getElementById('app'))
}
