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
  render () {
    return (
    <div>
    <form>
      <input  name="title" placeholder="Title" onChange={this.changeTitle}/>
      <input  name="description" placeholder="Diagram description" onChange={this.changeDescription} />
    </form>
    <button name="save" onClick={this.save}>SAVE</button>
    <DiagramEditor diagram={store.getState().concept.diagram}
    onChange={this.changeConcept}/>
    </div>
    )
  },
  changeConcept (diagram) {
    store.dispatch({type: "UPDATE_DIAGRAM", diagram: diagram})
  }
})
