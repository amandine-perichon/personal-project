import {createStore, applyMiddleware, compose} from 'redux'
import request from 'superagent'

const editorReducer = function (state = {"search": [], "mydiagrams": [],
                                "concept": {"_id": "", "title": "", "description": "", "diagram": []}},
                                action) {
    switch(action.type) {
      case 'UPDATE_DIAGRAM':
        const diagramUpdate = Object.assign({}, state.concept, {diagram: action.diagram})
        return Object.assign({}, state, {"concept": diagramUpdate})
      case 'UPDATE_TITLE':
        const titleUpdate = Object.assign({}, state.concept, {title: action.title})
        return Object.assign({}, state, {"concept": titleUpdate})
      case 'UPDATE_DESCRIPTION':
        const descriptionUpdate = Object.assign({}, state.concept, {description: action.description})
        return Object.assign({}, state, {"concept": descriptionUpdate})
      case 'CREATE_CONCEPT_SUCCEEDED':
        return Object.assign({}, state, {"concept": action.concept})
    default:
      return state
  }
}

const saveToDB = store => next => action => {
  if (action.type === "CREATE_CONCEPT_REQUESTED") {
    request
      .post('http://localhost:3000/concept')
      .send({"title": "", "description": "", "diagram": []})
      .end((err, res) => {
        if (err) {
          console.log(err)
        } else {
          store.dispatch({ type: "CREATE_CONCEPT_SUCCEEDED", concept: res.body})
        }
      })
  }
  return next(action)
}

const updateInDB = store => next => action => {
  if (action.type === "UPDATE_CONCEPT_REQUEST") {
    request
      .put('http://localhost:3000/concept')
      .send(store.getState().concept)
      .end((err, res) => {
        if (err) {
          console.log(err)
        } else {
          store.dispatch({ type: "UPDATE_CONCEPT_SUCCEEDED"})
        }
      })
  }
  return next(action)
}

let store = createStore(editorReducer, compose(applyMiddleware(saveToDB, updateInDB), window.devToolsExtension && window.devToolsExtension()))

export default store
