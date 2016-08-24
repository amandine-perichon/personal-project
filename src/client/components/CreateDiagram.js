import React from 'react'
import DiagramEditor from './DiagramEditor'
import store from '../reducers'

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
  changeConcept (diagram) {
    store.dispatch({type: "UPDATE_DIAGRAM", diagram: diagram})
  },
  render () {
    return (
    <div className="editor-view">
      <div className="editor-info">
        <form>
          <input  name="title"
                  placeholder="Title"
                  onChange={this.changeTitle}/><br />
          <textarea  name="description"
                  placeholder="Diagram description"
                  onChange={this.changeDescription} />
        </form>
        <button className="save" onClick={this.save}>SAVE</button>
      </div>
    <DiagramEditor diagram={store.getState().concept.diagram}
    onChange={this.changeConcept}/>
    </div>
    )
  }
})
