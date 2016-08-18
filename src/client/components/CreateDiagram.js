import React from 'react'
import DiagramEditor from './DiagramEditor'
import store from '../store'

export default React.createClass({
  render () {
    console.log(store.getState().diagram)
    return <DiagramEditor diagram={store.getState().diagram}
    onChange={this.changeDiagram}/>
  },
  changeDiagram (diagram) {
    store.dispatch({type: "UPDATE_DIAGRAM", diagram: diagram})
  }
})
