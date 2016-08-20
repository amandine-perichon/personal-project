import React from 'react'
import DiagramEditor from './DiagramEditor'
import store from '../store'

export default React.createClass({
  changeTitle (evt) {
    store.dispatch({type: "UPDATE_TITLE", title: evt.target.value})
  },
  changeDescription (evt) {
    store.dispatch({type: "UPDATE_DESCRIPTION", description: evt.target.value})
  },
  save (evt) {
    store.dispatch({type: "UPDATE_CONCEPT_REQUEST"})
  },
  undo (evt) {
    // TO DO
    //store.dispatch({type: "UNDO_DIAGRAM_CHANGE"})
  },
  changeConcept (diagram) {
    store.dispatch({type: "UPDATE_DIAGRAM", diagram: diagram})
  },
  render () {
    return (
    <div>
    <form>
      <input  name="title" placeholder="Title" onChange={this.changeTitle}/>
      <input  name="description" placeholder="Diagram description" onChange={this.changeDescription} />
    </form>
    <button name="save" onClick={this.save}>SAVE</button>
    <button name="undo" onClick={this.undo}>UNDO</button>
    <DiagramEditor diagram={store.getState().concept.diagram}
    onChange={this.changeConcept}/>
    </div>
    )
  }
})
