import {createStore} from 'redux'

const editorReducer = function (state = {diagram: []}, action) {
  switch(action.type) {
    case 'UPDATE_DIAGRAM':
      return Object.assign({}, {diagram: action.diagram})
    default:
      return state
  }
}

let store = createStore(editorReducer, window.devToolsExtension && window.devToolsExtension())

export default store
